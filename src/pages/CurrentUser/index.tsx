// In a parent component where the student is authenticated
import { auth } from '../../firebase/firebaseConfig';
import PersonalTrainerReview from '../Studentreview';  // Corrected import path

function StudentDashboard() {
  // Assuming you have user auth information
  const currentUser = auth.currentUser; // Added missing currentUser definition
  const studentId = currentUser?.uid;   // Added optional chaining for safety
  const studentName = currentUser?.displayName || "Student";
    
  return (
    <PersonalTrainerReview
      currentStudentId={studentId || ''} // Fixed prop name and provided fallback
      currentStudentName={studentName}   // Fixed duplicate prop name
    />
  );
}

export default StudentDashboard; // Added missing export