import React, { useState, useEffect } from "react";
import { Star, Pencil, Trash2, Send, Search } from "lucide-react";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";

interface Review {
  id: string;
  trainerName: string;
  courseName: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

interface TrainerReviewProps {
  // Removed currentStudentId and currentStudentName from props
}

const PersonalTrainerReview: React.FC<TrainerReviewProps> = () => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [trainerName, setTrainerName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [trainers, setTrainers] = useState<string[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Get student info from localStorage
  const [studentInfo, setStudentInfo] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  // Reference to the reviews collection in Firestore
  const reviewsCollection = collection(db, "trainerReviews");

  // Get student info from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setStudentInfo({
          id: userData.uid,
          name: userData.username || userData.displayName || "Anonymous",
          email: userData.email || "No email"
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Set default student info if parsing fails
        setStudentInfo({
          id: "unknown",
          name: "Anonymous",
          email: "No email"
        });
      }
    } else {
      // Handle case where user is not logged in
      setStudentInfo(null);
    }
  }, []);

  // Fetch available trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainersQuery = query(collection(db, "trainers"));
        const querySnapshot = await getDocs(trainersQuery);
        const trainersList: string[] = [];
        querySnapshot.forEach((doc) => {
          trainersList.push(doc.data().name);
        });
        setTrainers(trainersList);
      } catch (error) {
        console.error("Error fetching trainers:", error);
        // Fallback with some example trainers if DB fetch fails
        setTrainers(["John Smith", "Maria Rodriguez", "David Johnson", "Sarah Wong"]);
      }
    };

    fetchTrainers();
  }, []);

  // Listen for real-time updates on current student's reviews only
  useEffect(() => {
    if (!studentInfo?.id) {
      setMyReviews([]);
      setLoading(false);
      return;
    }

    console.log("Setting up listener for student ID:", studentInfo.id);

    const q = query(
      reviewsCollection,
      where("studentId", "==", studentInfo.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log("Received snapshot with", snapshot.docs.length, "docs");
        const reviewsData: Review[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          trainerName: doc.data().trainerName,
          courseName: doc.data().courseName,
          studentId: doc.data().studentId,
          studentName: doc.data().studentName,
          studentEmail: doc.data().studentEmail,
          rating: doc.data().rating,
          comment: doc.data().comment,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        setMyReviews(reviewsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching reviews: ", error);
        setLoading(false);
      }
    );

    return () => {
      console.log("Cleaning up listener");
      unsubscribe();
    };
  }, [studentInfo?.id]);

  // Handle sending (creating or updating) a review
  const handleSubmit = async () => {
    if (!studentInfo) {
      alert("Please log in to submit a review");
      return;
    }

    const finalTrainerName = selectedTrainer || trainerName;
    
    if (!finalTrainerName || !courseName || !rating || !comment) {
      alert("Please fill in all fields");
      return;
    }

    const reviewData = {
      trainerName: finalTrainerName,
      courseName,
      studentId: studentInfo.id,
      studentName: studentInfo.name,
      studentEmail: studentInfo.email,
      rating,
      comment,
      createdAt: new Date(),
    };

    try {
      if (editId) {
        // Update existing review
        const reviewRef = doc(db, "trainerReviews", editId);
        await updateDoc(reviewRef, reviewData);
        setEditId(null);
      } else {
        // Check if student already reviewed this trainer
        const existingReviewQuery = query(
          reviewsCollection, 
          where("studentId", "==", studentInfo.id),
          where("trainerName", "==", finalTrainerName)
        );
        
        const querySnapshot = await getDocs(existingReviewQuery);
        
        if (!querySnapshot.empty) {
          if (!confirm("You've already reviewed this trainer. Would you like to submit another review?")) {
            return;
          }
        }
        
        // Add new review
        await addDoc(reviewsCollection, reviewData);
      }
      
      // Reset form
      setTrainerName("");
      setSelectedTrainer("");
      setCourseName("");
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error with review:", error);
      alert("Failed to submit review");
    }
  };

  // Populate the form with the selected review's data for editing
  const handleEdit = (review: Review) => {
    setEditId(review.id);
    if (trainers.includes(review.trainerName)) {
      setSelectedTrainer(review.trainerName);
      setTrainerName("");
    } else {
      setTrainerName(review.trainerName);
      setSelectedTrainer("");
    }
    setCourseName(review.courseName);
    setRating(review.rating);
    setComment(review.comment);
  };

  // Delete a review
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteDoc(doc(db, "trainerReviews", id));
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review");
      }
    }
  };

  // Render stars for rating display
  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < count ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
        />
      ));
  };

  // Filter reviews based on search term
  const filteredReviews = filter
    ? myReviews.filter(
        (review) =>
          review.trainerName.toLowerCase().includes(filter.toLowerCase()) ||
          review.courseName.toLowerCase().includes(filter.toLowerCase())
      )
    : myReviews;

  if (!studentInfo) {
    return (
      <div className="max-w-3xl mx-auto p-6 pt-40 mb-20 bg-gray-50 rounded-lg shadow-md">
        <div className="text-center text-gray-500 py-8 bg-white rounded-lg shadow border p-6">
          <p className="mb-4">Please log in to view and submit trainer reviews.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 pt-40 mb-20 bg-gray-50 rounded-lg shadow-md">
        <div className="text-center text-gray-500 py-8 bg-white rounded-lg shadow border p-6">
          <p className="mb-4">Loading your reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-40 mb-20 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        My Trainer Reviews
      </h2>

      <div className="mb-6 bg-white p-4 rounded-md shadow">
        <h3 className="font-semibold text-lg mb-4">
          {editId ? "Edit Review" : "Rate a Trainer"}
        </h3>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Trainer</label>
          {trainers.length > 0 ? (
            <div>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedTrainer}
                onChange={(e) => {
                  setSelectedTrainer(e.target.value);
                  if (e.target.value) {
                    setTrainerName("");
                  }
                }}
              >
                <option value="">-- Select a trainer --</option>
                {trainers.map((trainer) => (
                  <option key={trainer} value={trainer}>
                    {trainer}
                  </option>
                ))}
                <option value="other">Other (not listed)</option>
              </select>
              
              {selectedTrainer === "other" && (
                <input
                  type="text"
                  placeholder="Enter trainer name"
                  className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                />
              )}
            </div>
          ) : (
            <input
              type="text"
              placeholder="Enter trainer name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Course Name</label>
          <input
            type="text"
            placeholder="Enter course name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  size={24}
                  className={
                    star <= rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Your Feedback</label>
          <textarea
            placeholder="Share your experience with this trainer..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => {
              setEditId(null);
              setTrainerName("");
              setSelectedTrainer("");
              setCourseName("");
              setRating(0);
              setComment("");
            }}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              (!selectedTrainer && !trainerName) || !courseName || !rating || !comment
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={(!selectedTrainer && !trainerName) || !courseName || !rating || !comment}
          >
            <Send size={16} />
            {editId ? "Update Review" : "Submit Review"}
          </button>
        </div>
      </div>

      {myReviews.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center bg-white p-2 border border-gray-300 rounded-lg">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search your reviews..."
              className="w-full focus:outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="font-semibold text-lg mb-2">My Reviews</h3>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="border p-4 rounded shadow bg-white"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-bold text-lg">{review.trainerName}</h3>
                <div className="flex gap-2">
                  <button
                    className="text-green-600 hover:text-green-800 p-1"
                    onClick={() => handleEdit(review)}
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 p-1"
                    onClick={() => handleDelete(review.id)}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-1">Course: {review.courseName}</p>
              <div className="flex mb-2">{renderStars(review.rating)}</div>
              <p className="mb-2">{review.comment}</p>
              <div className="text-sm text-gray-600 text-right">
                <span>
                  {review.createdAt.toLocaleDateString()} {review.createdAt.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8 bg-white rounded-lg shadow border p-6">
            <p className="mb-4">
              {filter 
                ? "No reviews match your search." 
                : "You haven't submitted any trainer reviews yet."}
            </p>
            {!filter && (
              <p>Rate your trainers to help improve the quality of education!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalTrainerReview;












