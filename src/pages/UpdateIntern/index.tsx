// import { useState, useEffect } from 'react';
// import { 
//   Briefcase,
//   Calendar,
//   Clock,
//   MapPin,
//   DollarSign,
//   Edit,
//   Trash2,
//   Plus,
//   Search,
//   Loader2,
//   Check,
//   X,
//   ChevronDown,
//   ChevronUp
// } from "lucide-react";
// import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../../firebase/firebaseConfig';
// import { Link } from 'react-router-dom';

// interface Internship {
//   id: string;
//   internshipTitle: string;
//   description: string;
//   requiredSkills: string[];
//   numberOfPositions: string;
//   department: string;
//   eligibilityCriteria: string;
//   startDate: string;
//   endDate: string;
//   duration: string;
//   workHours: string;
//   locationType: 'onsite' | 'remote' | 'hybrid';
//   city: string;
//   state: string;
//   isPaid: boolean;
//   stipendAmount: string;
//   applicationDeadline: string;
//   coordinatorName: string;
//   internshipImageUrl: string;
//   isActive: boolean;
// }

// export default function InternshipListingsAdmin() {
//   const [internships, setInternships] = useState<Internship[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [expandedInternship, setExpandedInternship] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [processingId, setProcessingId] = useState<string | null>(null);
//   const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

//   // Fetch internships from Firestore
//   const fetchInternships = async () => {
//     setLoading(true);
//     try {
//       const querySnapshot = await getDocs(collection(db, 'internships'));
//       const internshipsData = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Internship[];
      
//       setInternships(internshipsData);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching internships:", err);
//       setError("Failed to load internships. Please try again later.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInternships();
//   }, []);

//   // Toggle internship active status
//   const toggleInternshipStatus = async (internshipId: string, currentStatus: boolean) => {
//     setProcessingId(internshipId);
//     try {
//       const internshipRef = doc(db, 'internships', internshipId);
//       await updateDoc(internshipRef, {
//         isActive: !currentStatus
//       });
      
//       // Update local state
//       setInternships(internships.map(internship => 
//         internship.id === internshipId ? { ...internship, isActive: !currentStatus } : internship
//       ));
      
//       setProcessingId(null);
//     } catch (err) {
//       console.error("Error updating internship status:", err);
//       setError("Failed to update internship status.");
//       setProcessingId(null);
//     }
//   };

//   // Delete internship
//   const handleDeleteInternship = async (internshipId: string) => {
//     if (!window.confirm("Are you sure you want to delete this internship? This action cannot be undone.")) {
//       return;
//     }
    
//     setProcessingId(internshipId);
//     try {
//       await deleteDoc(doc(db, 'internships', internshipId));
//       setInternships(internships.filter(internship => internship.id !== internshipId));
//       setProcessingId(null);
//     } catch (err) {
//       console.error("Error deleting internship:", err);
//       setError("Failed to delete internship.");
//       setProcessingId(null);
//     }
//   };

//   // Format date string
//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Filter internships based on search term and status
//   const filteredInternships = internships.filter(internship => {
//     // Apply status filter
//     if (statusFilter === 'active' && !internship.isActive) return false;
//     if (statusFilter === 'inactive' && internship.isActive) return false;
    
//     // Apply search term filter
//     if (!searchTerm) return true;
    
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       internship.internshipTitle.toLowerCase().includes(searchLower) ||
//       internship.department.toLowerCase().includes(searchLower) ||
//       internship.description.toLowerCase().includes(searchLower) ||
//       internship.requiredSkills.some(skill => skill.toLowerCase().includes(searchLower))
//     );
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 size={40} className="animate-spin text-emerald-600" />
//         <span className="ml-2 text-gray-600 text-lg">Loading internships...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
//         <p>{error}</p>
//         <button 
//           onClick={fetchInternships}
//           className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-16">
//         <h1 className="text-2xl font-bold text-emerald-800 mb-4 md:mb-0">Manage Internships</h1>
        
//         <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
//           {/* Search */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search internships..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
//             />
//             <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
          
//           {/* Status Filter */}
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
//             className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
//           >
//             <option value="all">All Statuses</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
          
//           {/* Add New Button */}
//           <Link
//             to="/admin/internships/new"
//             className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
//           >
//             <Plus size={18} className="mr-1" />
//             Add New
//           </Link>
//         </div>
//       </div>
      
//       {filteredInternships.length === 0 ? (
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
//           <p className="text-gray-600">No internships found.</p>
//         </div>
//       ) : (
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Internship
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Department
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Dates
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredInternships.map((internship) => (
//                 <>
//                   <tr key={internship.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="text-sm font-medium text-gray-900">{internship.internshipTitle}</div>
//                       <div className="text-sm text-gray-500 line-clamp-1">{internship.description}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {internship.department}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {formatDate(internship.startDate)} - {formatDate(internship.endDate)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         internship.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {internship.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button
//                         onClick={() => setExpandedInternship(expandedInternship === internship.id ? null : internship.id)}
//                         className="text-emerald-600 hover:text-emerald-900 mr-3"
//                       >
//                         {expandedInternship === internship.id ? 'Hide' : 'Details'}
//                         {expandedInternship === internship.id ? 
//                           <ChevronUp size={16} className="inline ml-1" /> : 
//                           <ChevronDown size={16} className="inline ml-1" />
//                         }
//                       </button>
//                     </td>
//                   </tr>
                  
//                   {/* Expanded View */}
//                   {expandedInternship === internship.id && (
//                     <tr className="bg-gray-50">
//                       <td colSpan={5} className="px-6 py-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div className="space-y-4">
//                             {/* Internship Details */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">Internship Details</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
//                                 <div className="flex items-start">
//                                   <div className="w-1/3 text-sm text-gray-500">Description:</div>
//                                   <div className="w-2/3 text-sm">{internship.description}</div>
//                                 </div>
//                                 <div className="flex items-start">
//                                   <div className="w-1/3 text-sm text-gray-500">Eligibility:</div>
//                                   <div className="w-2/3 text-sm">{internship.eligibilityCriteria}</div>
//                                 </div>
//                                 <div className="flex items-start">
//                                   <div className="w-1/3 text-sm text-gray-500">Positions:</div>
//                                   <div className="w-2/3 text-sm">{internship.numberOfPositions}</div>
//                                 </div>
//                                 <div className="flex items-start">
//                                   <div className="w-1/3 text-sm text-gray-500">Coordinator:</div>
//                                   <div className="w-2/3 text-sm">{internship.coordinatorName}</div>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             {/* Schedule */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">Schedule</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div className="flex items-center text-sm">
//                                     <Calendar size={16} className="mr-2 text-emerald-600" />
//                                     <span>Duration: {internship.duration}</span>
//                                   </div>
//                                   <div className="flex items-center text-sm">
//                                     <Clock size={16} className="mr-2 text-emerald-600" />
//                                     <span>Work Hours: {internship.workHours}</span>
//                                   </div>
//                                   <div className="flex items-center text-sm">
//                                     <MapPin size={16} className="mr-2 text-emerald-600" />
//                                     <span>
//                                       {internship.locationType === 'remote' ? 'Remote' : 
//                                        internship.locationType === 'onsite' ? `${internship.city}, ${internship.state}` : 
//                                        'Hybrid'}
//                                     </span>
//                                   </div>
//                                   <div className="flex items-center text-sm">
//                                     <DollarSign size={16} className="mr-2 text-emerald-600" />
//                                     <span>
//                                       {internship.isPaid ? `Stipend: ${internship.stipendAmount}` : 'Unpaid'}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
                          
//                           <div className="space-y-4">
//                             {/* Required Skills */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">Required Skills</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                                 <div className="flex flex-wrap gap-2">
//                                   {internship.requiredSkills.map((skill, index) => (
//                                     <span key={index} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
//                                       {skill}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
                            
//                             {/* Important Dates */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">Important Dates</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                                 <div className="space-y-3">
//                                   <div className="flex justify-between text-sm">
//                                     <span className="text-gray-500">Start Date:</span>
//                                     <span>{formatDate(internship.startDate)}</span>
//                                   </div>
//                                   <div className="flex justify-between text-sm">
//                                     <span className="text-gray-500">End Date:</span>
//                                     <span>{formatDate(internship.endDate)}</span>
//                                   </div>
//                                   <div className="flex justify-between text-sm">
//                                     <span className="text-gray-500">Application Deadline:</span>
//                                     <span>{formatDate(internship.applicationDeadline)}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             {/* Actions */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Internship</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                                 <div className="flex flex-col sm:flex-row justify-between gap-4">
//                                   <div className="space-y-2">
//                                     <Link
//                                       to={`/admin/internships/edit/${internship.id}`}
//                                       className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50"
//                                     >
//                                       <Edit size={16} className="mr-2" />
//                                       Edit
//                                     </Link>
//                                     <button
//                                       onClick={() => handleDeleteInternship(internship.id)}
//                                       disabled={processingId === internship.id}
//                                       className="flex items-center px-4 py-2 border border-red-300 text-red-700 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 w-full sm:w-auto"
//                                     >
//                                       {processingId === internship.id ? 
//                                         <Loader2 size={16} className="animate-spin mr-2" /> : 
//                                         <Trash2 size={16} className="mr-2" />
//                                       }
//                                       Delete
//                                     </button>
//                                   </div>
                                  
//                                   <button
//                                     onClick={() => toggleInternshipStatus(internship.id, internship.isActive)}
//                                     disabled={processingId === internship.id}
//                                     className={`flex items-center px-4 py-2 rounded-lg ${
//                                       internship.isActive ? 
//                                         'bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200' : 
//                                         'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
//                                     }`}
//                                   >
//                                     {processingId === internship.id ? 
//                                       <Loader2 size={16} className="animate-spin mr-2" /> : 
//                                       internship.isActive ? <X size={16} className="mr-2" /> : <Check size={16} className="mr-2" />
//                                     }
//                                     {internship.isActive ? 'Deactivate' : 'Activate'}
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }









// import { useState, useEffect } from 'react';
// import { 
//   Briefcase,
//   Calendar,
//   Clock,
//   MapPin,
//   DollarSign,
//   Edit,
//   Trash2,
//   Plus,
//   Search,
//   Loader2,
//   Check,
//   X,
//   ChevronDown,
//   ChevronUp,
//   Image as ImageIcon,
//   Mail,
//   Phone,
//   FileText
// } from "lucide-react";
// import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../../firebase/firebaseConfig';
// import { Link } from 'react-router-dom';

// interface Internship {
//   id: string;
//   internshipTitle: string;
//   description: string;
//   requiredSkills: string[];
//   numberOfPositions: string;
//   department: string;
//   eligibilityCriteria: string;
//   startDate: string;
//   endDate: string;
//   duration: string;
//   workHours: string;
//   locationType: 'onsite' | 'remote' | 'hybrid';
//   city: string;
//   state: string;
//   address: string;
//   isPaid: boolean;
//   stipendAmount: string;
//   paymentMode: string;
//   applicationStartDate: string;
//   applicationDeadline: string;
//   coordinatorName: string;
//   coordinatorEmail: string;
//   coordinatorPhone: string;
//   requireResume: boolean;
//   internshipImageUrl: string;
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export default function InternshipListingsAdmin() {
//   const [internships, setInternships] = useState<Internship[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [expandedInternship, setExpandedInternship] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [processingId, setProcessingId] = useState<string | null>(null);
//   const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

//   // Fetch internships from Firestore
//   const fetchInternships = async () => {
//     setLoading(true);
//     try {
//       const querySnapshot = await getDocs(collection(db, 'internships'));
//       const internshipsData = querySnapshot.docs.map(doc => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           ...data,
//           createdAt: data.createdAt?.toDate() || new Date(),
//           updatedAt: data.updatedAt?.toDate() || new Date()
//         } as Internship;
//       });
      
//       setInternships(internshipsData);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching internships:", err);
//       setError("Failed to load internships. Please try again later.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInternships();
//   }, []);

//   // Toggle internship active status
//   const toggleInternshipStatus = async (internshipId: string, currentStatus: boolean) => {
//     setProcessingId(internshipId);
//     try {
//       const internshipRef = doc(db, 'internships', internshipId);
//       await updateDoc(internshipRef, {
//         isActive: !currentStatus,
//         updatedAt: new Date()
//       });
      
//       setInternships(internships.map(internship => 
//         internship.id === internshipId ? { 
//           ...internship, 
//           isActive: !currentStatus,
//           updatedAt: new Date()
//         } : internship
//       ));
      
//       setProcessingId(null);
//     } catch (err) {
//       console.error("Error updating internship status:", err);
//       setError("Failed to update internship status.");
//       setProcessingId(null);
//     }
//   };

//   // Delete internship
//   const handleDeleteInternship = async (internshipId: string) => {
//     if (!window.confirm("Are you sure you want to delete this internship? This action cannot be undone.")) {
//       return;
//     }
    
//     setProcessingId(internshipId);
//     try {
//       await deleteDoc(doc(db, 'internships', internshipId));
//       setInternships(internships.filter(internship => internship.id !== internshipId));
//       setProcessingId(null);
//     } catch (err) {
//       console.error("Error deleting internship:", err);
//       setError("Failed to delete internship.");
//       setProcessingId(null);
//     }
//   };

//   // Format date string
//   const formatDate = (dateStr: string | Date) => {
//     if (!dateStr) return 'Not specified';
//     const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Format datetime string
//   const formatDateTime = (dateStr: string | Date) => {
//     if (!dateStr) return 'Not specified';
//     const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
//     return date.toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Filter internships based on search term and status
//   const filteredInternships = internships.filter(internship => {
//     // Apply status filter
//     if (statusFilter === 'active' && !internship.isActive) return false;
//     if (statusFilter === 'inactive' && internship.isActive) return false;
    
//     // Apply search term filter
//     if (!searchTerm) return true;
    
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       internship.internshipTitle.toLowerCase().includes(searchLower) ||
//       internship.department.toLowerCase().includes(searchLower) ||
//       internship.description.toLowerCase().includes(searchLower) ||
//       (internship.coordinatorName && internship.coordinatorName.toLowerCase().includes(searchLower)) ||
//       internship.requiredSkills.some(skill => skill.toLowerCase().includes(searchLower))
//     );
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 size={40} className="animate-spin text-emerald-600" />
//         <span className="ml-2 text-gray-600 text-lg">Loading internships...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
//         <p>{error}</p>
//         <button 
//           onClick={fetchInternships}
//           className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-16">
//         <h1 className="text-2xl font-bold text-emerald-800 mb-4 md:mb-0">Manage Internships</h1>
        
//         <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
//           {/* Search */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search internships..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
//             />
//             <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
          
//           {/* Status Filter */}
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
//             className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
//           >
//             <option value="all">All Statuses</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
          
//           {/* Add New Button */}
//           <Link
//             to="/admin/internships/new"
//             className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
//           >
//             <Plus size={18} className="mr-1" />
//             Add New
//           </Link>
//         </div>
//       </div>
      
//       {filteredInternships.length === 0 ? (
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
//           <p className="text-gray-600">No internships found.</p>
//         </div>
//       ) : (
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Internship
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Department
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Dates
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredInternships.map((internship) => (
//                 <>
//                   <tr key={internship.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         {internship.internshipImageUrl && (
//                           <img 
//                             src={internship.internshipImageUrl} 
//                             alt={internship.internshipTitle}
//                             className="w-12 h-12 rounded-md object-cover mr-4"
//                           />
//                         )}
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">{internship.internshipTitle}</div>
//                           <div className="text-sm text-gray-500 line-clamp-1">{internship.description}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {internship.department}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {formatDate(internship.startDate)} - {formatDate(internship.endDate)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         internship.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {internship.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button
//                         onClick={() => setExpandedInternship(expandedInternship === internship.id ? null : internship.id)}
//                         className="text-emerald-600 hover:text-emerald-900 mr-3"
//                       >
//                         {expandedInternship === internship.id ? 'Hide' : 'Details'}
//                         {expandedInternship === internship.id ? 
//                           <ChevronUp size={16} className="inline ml-1" /> : 
//                           <ChevronDown size={16} className="inline ml-1" />
//                         }
//                       </button>
//                     </td>
//                   </tr>
                  
//                   {/* Expanded View */}
//                   {expandedInternship === internship.id && (
//                     <tr className="bg-gray-50">
//                       <td colSpan={5} className="px-6 py-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div className="space-y-4">
//                             {/* Internship Details */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">Internship Details</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
//                                 <div className="flex items-start">
//                                   <div className="w-1/3 text-sm text-gray-500">Description:</div>
//                                   <div className="w-2/3 text-sm">{internship.description}</div>
//                                 </div>
//                                 <div className="flex items-start">
//                                   <div className="w-1/3 text-sm text-gray-500">Eligibility:</div>
//                                   <div className="w-2/3 text-sm">{internship.eligibilityCriteria || 'Not specified'}</div>
//                                 </div>
//                                 <div className="flex items-start">
//                                   <div className="w-1/3 text-sm text-gray-500">Positions:</div>
//                                   <div className="w-2/3 text-sm">{internship.numberOfPositions}</div>
//                                 </div>
//                                 <div className="flex items-start">
//                                   <div className="w-1/3 text-sm text-gray-500">Duration:</div>
//                                   <div className="w-2/3 text-sm">{internship.duration}</div>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             {/* Schedule */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">Schedule</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div className="flex items-center text-sm">
//                                     <Calendar size={16} className="mr-2 text-emerald-600" />
//                                     <span>Start: {formatDate(internship.startDate)}</span>
//                                   </div>
//                                   <div className="flex items-center text-sm">
//                                     <Calendar size={16} className="mr-2 text-emerald-600" />
//                                     <span>End: {formatDate(internship.endDate)}</span>
//                                   </div>
//                                   <div className="flex items-center text-sm">
//                                     <Clock size={16} className="mr-2 text-emerald-600" />
//                                     <span>Work Hours: {internship.workHours}</span>
//                                   </div>
//                                   <div className="flex items-center text-sm">
//                                     <MapPin size={16} className="mr-2 text-emerald-600" />
//                                     <span>
//                                       {internship.locationType === 'remote' ? 'Remote' : 
//                                        internship.locationType === 'onsite' ? `${internship.city}, ${internship.state}` : 
//                                        'Hybrid'}
//                                       {internship.address && internship.locationType !== 'remote' && (
//                                         <span className="block text-gray-500 text-xs mt-1">{internship.address}</span>
//                                       )}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Payment Details */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Details</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div className="flex items-center text-sm">
//                                     <DollarSign size={16} className="mr-2 text-emerald-600" />
//                                     <span>
//                                       {internship.isPaid ? `Stipend: ${internship.stipendAmount}` : 'Unpaid'}
//                                     </span>
//                                   </div>
//                                   {internship.isPaid && (
//                                     <div className="flex items-center text-sm">
//                                       <span className="mr-2 text-gray-500">Payment Mode:</span>
//                                       <span>{internship.paymentMode}</span>
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
                          
//                           <div className="space-y-4">
//                             {/* Required Skills */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">Required Skills</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                                 <div className="flex flex-wrap gap-2">
//                                   {internship.requiredSkills?.map((skill, index) => (
//                                     <span key={index} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
//                                       {skill}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
                            
//                             {/* Application Details */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">Application Details</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                                 <div className="space-y-3">
//                                   <div className="flex justify-between text-sm">
//                                     <span className="text-gray-500">Start Date:</span>
//                                     <span>{formatDate(internship.applicationStartDate)}</span>
//                                   </div>
//                                   <div className="flex justify-between text-sm">
//                                     <span className="text-gray-500">Deadline:</span>
//                                     <span>{formatDate(internship.applicationDeadline)}</span>
//                                   </div>
//                                   <div className="flex items-center text-sm">
//                                     <FileText size={16} className="mr-2 text-emerald-600" />
//                                     <span>Resume Required: {internship.requireResume ? 'Yes' : 'No'}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Coordinator Details */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">Coordinator Details</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                                 <div className="space-y-3">
//                                   <div className="flex items-center text-sm">
//                                     <span className="w-1/3 text-gray-500">Name:</span>
//                                     <span className="w-2/3">{internship.coordinatorName}</span>
//                                   </div>
//                                   <div className="flex items-center text-sm">
//                                     <Mail size={16} className="mr-2 text-emerald-600" />
//                                     <span>{internship.coordinatorEmail}</span>
//                                   </div>
//                                   {internship.coordinatorPhone && (
//                                     <div className="flex items-center text-sm">
//                                       <Phone size={16} className="mr-2 text-emerald-600" />
//                                       <span>{internship.coordinatorPhone}</span>
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>

//                             {/* System Info */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900 mb-2">System Information</h3>
//                               <div className="bg-white p-4 rounded-lg border border-gray-200">
//                                 <div className="space-y-3">
//                                   <div className="flex justify-between text-sm">
//                                     <span className="text-gray-500">Created:</span>
//                                     <span>{formatDateTime(internship.createdAt)}</span>
//                                   </div>
//                                   <div className="flex justify-between text-sm">
//                                     <span className="text-gray-500">Last Updated:</span>
//                                     <span>{formatDateTime(internship.updatedAt)}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Actions */}
//                         <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
//                           <div className="flex flex-col sm:flex-row justify-between gap-4">
//                             <div className="space-y-2">
//                               <Link
//                                 to={`/admin/internships/edit/${internship.id}`}
//                                 className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50"
//                               >
//                                 <Edit size={16} className="mr-2" />
//                                 Edit
//                               </Link>
//                               <button
//                                 onClick={() => handleDeleteInternship(internship.id)}
//                                 disabled={processingId === internship.id}
//                                 className="flex items-center px-4 py-2 border border-red-300 text-red-700 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 w-full sm:w-auto"
//                               >
//                                 {processingId === internship.id ? 
//                                   <Loader2 size={16} className="animate-spin mr-2" /> : 
//                                   <Trash2 size={16} className="mr-2" />
//                                 }
//                                 Delete
//                               </button>
//                             </div>
                            
//                             <button
//                               onClick={() => toggleInternshipStatus(internship.id, internship.isActive)}
//                               disabled={processingId === internship.id}
//                               className={`flex items-center px-4 py-2 rounded-lg ${
//                                 internship.isActive ? 
//                                   'bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200' : 
//                                   'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
//                               }`}
//                             >
//                               {processingId === internship.id ? 
//                                 <Loader2 size={16} className="animate-spin mr-2" /> : 
//                                 internship.isActive ? <X size={16} className="mr-2" /> : <Check size={16} className="mr-2" />
//                               }
//                               {internship.isActive ? 'Deactivate' : 'Activate'}
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }










import { useState, useEffect } from 'react';
import { 
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  Search,
  Loader2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Mail,
  Phone,
  FileText,
  Save,
  ChevronLeft
} from "lucide-react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Link } from 'react-router-dom';

interface Internship {
  id: string;
  internshipTitle: string;
  description: string;
  requiredSkills: string[];
  numberOfPositions: string;
  department: string;
  eligibilityCriteria: string;
  startDate: string;
  endDate: string;
  duration: string;
  workHours: string;
  locationType: 'onsite' | 'remote' | 'hybrid';
  city: string;
  state: string;
  address: string;
  isPaid: boolean;
  stipendAmount: string;
  paymentMode: string;
  applicationStartDate: string;
  applicationDeadline: string;
  coordinatorName: string;
  coordinatorEmail: string;
  coordinatorPhone: string;
  requireResume: boolean;
  internshipImageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const departmentOptions = ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'IT', 'Other'];
const durationOptions = ['1 month', '2 months', '3 months', '4 months', '5 months', '6 months', '6+ months'];
const paymentModeOptions = ['Bank Transfer', 'UPI', 'Cheque', 'Cash', 'Other'];
const locationTypeOptions = ['onsite', 'remote', 'hybrid'];

export default function InternshipListingsAdmin() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedInternship, setExpandedInternship] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Internship>>({});

  // Fetch internships from Firestore
  const fetchInternships = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'internships'));
      const internshipsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Internship;
      });
      
      setInternships(internshipsData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching internships:", err);
      setError("Failed to load internships. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  // Toggle internship active status
  const toggleInternshipStatus = async (internshipId: string, currentStatus: boolean) => {
    setProcessingId(internshipId);
    try {
      const internshipRef = doc(db, 'internships', internshipId);
      await updateDoc(internshipRef, {
        isActive: !currentStatus,
        updatedAt: new Date()
      });
      
      setInternships(internships.map(internship => 
        internship.id === internshipId ? { 
          ...internship, 
          isActive: !currentStatus,
          updatedAt: new Date()
        } : internship
      ));
      
      setProcessingId(null);
    } catch (err) {
      console.error("Error updating internship status:", err);
      setError("Failed to update internship status.");
      setProcessingId(null);
    }
  };

  // Delete internship
  const handleDeleteInternship = async (internshipId: string) => {
    if (!window.confirm("Are you sure you want to delete this internship? This action cannot be undone.")) {
      return;
    }
    
    setProcessingId(internshipId);
    try {
      await deleteDoc(doc(db, 'internships', internshipId));
      setInternships(internships.filter(internship => internship.id !== internshipId));
      setProcessingId(null);
    } catch (err) {
      console.error("Error deleting internship:", err);
      setError("Failed to delete internship.");
      setProcessingId(null);
    }
  };

  // Start editing an internship
  const startEditing = (internship: Internship) => {
    setEditingInternship(internship);
    setEditFormData({ ...internship });
    setExpandedInternship(internship.id);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingInternship(null);
    setEditFormData({});
  };

  // Handle form field changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle array field changes (like requiredSkills)
  // const handleArrayChange = (field: string, index: number, value: string) => {
  //   setEditFormData(prev => {
  //     const currentArray = [...(prev[field as keyof Internship] || [])] as string[];
  //     currentArray[index] = value;
  //     return { ...prev, [field]: currentArray };
  //   });
  // };

  const handleArrayChange = (field: keyof Internship, index: number, value: string) => {
    setEditFormData(prev => {
      // Ensure we're only working with array fields
      if (field !== 'requiredSkills') {
        console.error(`Field ${field} is not an array`);
        return prev;
      }
  
      // Type-safe way to handle the array
      const currentArray = Array.isArray(prev[field]) ? [...prev[field] as string[]] : [];
      currentArray[index] = value;
      
      return { 
        ...prev, 
        [field]: currentArray 
      };
    });
  };

  // Add new skill to requiredSkills
  const addSkill = () => {
    setEditFormData(prev => {
      const currentSkills = [...(prev.requiredSkills || [])] as string[];
      return { ...prev, requiredSkills: [...currentSkills, ''] };
    });
  };

  // Remove skill from requiredSkills
  const removeSkill = (index: number) => {
    setEditFormData(prev => {
      const currentSkills = [...(prev.requiredSkills || [])] as string[];
      currentSkills.splice(index, 1);
      return { ...prev, requiredSkills: currentSkills };
    });
  };

  // Save edited internship
  const saveEditedInternship = async () => {
    if (!editingInternship) return;
    
    setProcessingId(editingInternship.id);
    try {
      const internshipRef = doc(db, 'internships', editingInternship.id);
      await updateDoc(internshipRef, {
        ...editFormData,
        updatedAt: new Date()
      });
      
      setInternships(internships.map(internship => 
        internship.id === editingInternship.id ? { 
          ...internship, 
          ...editFormData,
          updatedAt: new Date()
        } : internship
      ));
      
      setEditingInternship(null);
      setEditFormData({});
      setProcessingId(null);
    } catch (err) {
      console.error("Error updating internship:", err);
      setError("Failed to update internship.");
      setProcessingId(null);
    }
  };

  // Format date string
  const formatDate = (dateStr: string | Date) => {
    if (!dateStr) return 'Not specified';
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format datetime string
  const formatDateTime = (dateStr: string | Date) => {
    if (!dateStr) return 'Not specified';
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter internships based on search term and status
  const filteredInternships = internships.filter(internship => {
    // Apply status filter
    if (statusFilter === 'active' && !internship.isActive) return false;
    if (statusFilter === 'inactive' && internship.isActive) return false;
    
    // Apply search term filter
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      internship.internshipTitle.toLowerCase().includes(searchLower) ||
      internship.department.toLowerCase().includes(searchLower) ||
      internship.description.toLowerCase().includes(searchLower) ||
      (internship.coordinatorName && internship.coordinatorName.toLowerCase().includes(searchLower)) ||
      internship.requiredSkills.some(skill => skill.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 size={40} className="animate-spin text-emerald-600" />
        <span className="ml-2 text-gray-600 text-lg">Loading internships...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
        <p>{error}</p>
        <button 
          onClick={fetchInternships}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-16">
        <h1 className="text-2xl font-bold text-emerald-800 mb-4 md:mb-0">Manage Internships</h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          {/* Add New Button */}
          {/* <Link
            to="/"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Add New
          </Link> */}
        </div>
      </div>
      
      {filteredInternships.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No internships found.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Internship
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInternships.map((internship) => (
                <>
                  <tr key={internship.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {internship.internshipImageUrl && (
                          <img 
                            src={internship.internshipImageUrl} 
                            alt={internship.internshipTitle}
                            className="w-12 h-12 rounded-md object-cover mr-4"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {editingInternship?.id === internship.id ? (
                              <input
                                type="text"
                                name="internshipTitle"
                                value={editFormData.internshipTitle || ''}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded"
                              />
                            ) : (
                              internship.internshipTitle
                            )}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {editingInternship?.id === internship.id ? (
                              <textarea
                                name="description"
                                value={editFormData.description || ''}
                                onChange={handleEditChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                rows={2}
                              />
                            ) : (
                              internship.description
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingInternship?.id === internship.id ? (
                        <select
                          name="department"
                          value={editFormData.department || ''}
                          onChange={handleEditChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          {departmentOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        internship.department
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(internship.startDate)} - {formatDate(internship.endDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        internship.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {internship.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingInternship?.id === internship.id ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={saveEditedInternship}
                            disabled={processingId === internship.id}
                            className="text-emerald-600 hover:text-emerald-800 flex items-center"
                          >
                            {processingId === internship.id ? (
                              <Loader2 size={16} className="animate-spin mr-1" />
                            ) : (
                              <Save size={16} className="mr-1" />
                            )}
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="text-gray-600 hover:text-gray-800 flex items-center"
                          >
                            <ChevronLeft size={16} className="mr-1" />
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            if (expandedInternship === internship.id) {
                              setExpandedInternship(null);
                            } else {
                              setExpandedInternship(internship.id);
                            }
                          }}
                          className="text-emerald-600 hover:text-emerald-900 mr-3"
                        >
                          {expandedInternship === internship.id ? 'Hide' : 'Details'}
                          {expandedInternship === internship.id ? 
                            <ChevronUp size={16} className="inline ml-1" /> : 
                            <ChevronDown size={16} className="inline ml-1" />
                          }
                        </button>
                      )}
                    </td>
                  </tr>
                  
                  {/* Expanded View */}
                  {expandedInternship === internship.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="px-6 py-4">
                        {editingInternship?.id === internship.id ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                              {/* Basic Details */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Details</h3>
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
                                    <input
                                      type="text"
                                      name="eligibilityCriteria"
                                      value={editFormData.eligibilityCriteria || ''}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border border-gray-300 rounded"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Positions</label>
                                    <input
                                      type="text"
                                      name="numberOfPositions"
                                      value={editFormData.numberOfPositions || ''}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border border-gray-300 rounded"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                    <select
                                      name="duration"
                                      value={editFormData.duration || ''}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border border-gray-300 rounded"
                                    >
                                      {durationOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>

                              {/* Schedule */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Schedule</h3>
                                <div className="grid grid-cols-1 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Hours</label>
                                    <input
                                      type="text"
                                      name="workHours"
                                      value={editFormData.workHours || ''}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border border-gray-300 rounded"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
                                    <select
                                      name="locationType"
                                      value={editFormData.locationType || 'onsite'}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border border-gray-300 rounded"
                                    >
                                      {locationTypeOptions.map(option => (
                                        <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                                      ))}
                                    </select>
                                  </div>
                                  {editFormData.locationType !== 'remote' && (
                                    <>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                          type="text"
                                          name="city"
                                          value={editFormData.city || ''}
                                          onChange={handleEditChange}
                                          className="w-full p-2 border border-gray-300 rounded"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <input
                                          type="text"
                                          name="state"
                                          value={editFormData.state || ''}
                                          onChange={handleEditChange}
                                          className="w-full p-2 border border-gray-300 rounded"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                          type="text"
                                          name="address"
                                          value={editFormData.address || ''}
                                          onChange={handleEditChange}
                                          className="w-full p-2 border border-gray-300 rounded"
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                              {/* Payment Details */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Details</h3>
                                <div className="space-y-4">
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      id="isPaid"
                                      name="isPaid"
                                      checked={editFormData.isPaid || false}
                                      onChange={handleEditChange}
                                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="isPaid" className="ml-2 block text-sm text-gray-700">
                                      Paid Internship
                                    </label>
                                  </div>
                                  {editFormData.isPaid && (
                                    <>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Stipend Amount</label>
                                        <input
                                          type="text"
                                          name="stipendAmount"
                                          value={editFormData.stipendAmount || ''}
                                          onChange={handleEditChange}
                                          className="w-full p-2 border border-gray-300 rounded"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                                        <select
                                          name="paymentMode"
                                          value={editFormData.paymentMode || ''}
                                          onChange={handleEditChange}
                                          className="w-full p-2 border border-gray-300 rounded"
                                        >
                                          {paymentModeOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                          ))}
                                        </select>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Required Skills */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Required Skills</h3>
                                <div className="space-y-2">
                                  {(editFormData.requiredSkills || []).map((skill, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        value={skill}
                                        onChange={(e) => handleArrayChange('requiredSkills', index, e.target.value)}
                                        className="flex-1 p-2 border border-gray-300 rounded"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeSkill(index)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <X size={16} />
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={addSkill}
                                    className="text-emerald-600 hover:text-emerald-800 text-sm flex items-center"
                                  >
                                    <Plus size={14} className="mr-1" />
                                    Add Skill
                                  </button>
                                </div>
                              </div>

                              {/* Application Details */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Application Details</h3>
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Start Date</label>
                                    <input
                                      type="date"
                                      name="applicationStartDate"
                                      value={editFormData.applicationStartDate || ''}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border border-gray-300 rounded"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                                    <input
                                      type="date"
                                      name="applicationDeadline"
                                      value={editFormData.applicationDeadline || ''}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border border-gray-300 rounded"
                                    />
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      id="requireResume"
                                      name="requireResume"
                                      checked={editFormData.requireResume || false}
                                      onChange={handleEditChange}
                                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="requireResume" className="ml-2 block text-sm text-gray-700">
                                      Require Resume
                                    </label>
                                  </div>
                                </div>
                              </div>

                              {/* Coordinator Details */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Coordinator Details</h3>
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                      type="text"
                                      name="coordinatorName"
                                      value={editFormData.coordinatorName || ''}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border border-gray-300 rounded"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                      type="email"
                                      name="coordinatorEmail"
                                      value={editFormData.coordinatorEmail || ''}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border border-gray-300 rounded"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                      type="tel"
                                      name="coordinatorPhone"
                                      value={editFormData.coordinatorPhone || ''}
                                      onChange={handleEditChange}
                                      className="w-full p-2 border border-gray-300 rounded"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                              {/* Basic Details */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Internship Details</h3>
                                <div className="space-y-4">
                                  <div className="flex items-start">
                                    <div className="w-1/3 text-sm text-gray-500">Description:</div>
                                    <div className="w-2/3 text-sm">{internship.description}</div>
                                  </div>
                                  <div className="flex items-start">
                                    <div className="w-1/3 text-sm text-gray-500">Eligibility:</div>
                                    <div className="w-2/3 text-sm">{internship.eligibilityCriteria || 'Not specified'}</div>
                                  </div>
                                  <div className="flex items-start">
                                    <div className="w-1/3 text-sm text-gray-500">Positions:</div>
                                    <div className="w-2/3 text-sm">{internship.numberOfPositions}</div>
                                  </div>
                                  <div className="flex items-start">
                                    <div className="w-1/3 text-sm text-gray-500">Duration:</div>
                                    <div className="w-2/3 text-sm">{internship.duration}</div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Schedule */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Schedule</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="flex items-center text-sm">
                                    <Calendar size={16} className="mr-2 text-emerald-600" />
                                    <span>Start: {formatDate(internship.startDate)}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Calendar size={16} className="mr-2 text-emerald-600" />
                                    <span>End: {formatDate(internship.endDate)}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Clock size={16} className="mr-2 text-emerald-600" />
                                    <span>Work Hours: {internship.workHours}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <MapPin size={16} className="mr-2 text-emerald-600" />
                                    <span>
                                      {internship.locationType === 'remote' ? 'Remote' : 
                                       internship.locationType === 'onsite' ? `${internship.city}, ${internship.state}` : 
                                       'Hybrid'}
                                      {internship.address && internship.locationType !== 'remote' && (
                                        <span className="block text-gray-500 text-xs mt-1">{internship.address}</span>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Payment Details */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="flex items-center text-sm">
                                    <DollarSign size={16} className="mr-2 text-emerald-600" />
                                    <span>
                                      {internship.isPaid ? `Stipend: ${internship.stipendAmount}` : 'Unpaid'}
                                    </span>
                                  </div>
                                  {internship.isPaid && (
                                    <div className="flex items-center text-sm">
                                      <span className="mr-2 text-gray-500">Payment Mode:</span>
                                      <span>{internship.paymentMode}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Right Column */}
                            <div className="space-y-4">
                              {/* Required Skills */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                  {internship.requiredSkills?.map((skill, index) => (
                                    <span key={index} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Application Details */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Application Details</h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Start Date:</span>
                                    <span>{formatDate(internship.applicationStartDate)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Deadline:</span>
                                    <span>{formatDate(internship.applicationDeadline)}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <FileText size={16} className="mr-2 text-emerald-600" />
                                    <span>Resume Required: {internship.requireResume ? 'Yes' : 'No'}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Coordinator Details */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Coordinator Details</h3>
                                <div className="space-y-3">
                                  <div className="flex items-center text-sm">
                                    <span className="w-1/3 text-gray-500">Name:</span>
                                    <span className="w-2/3">{internship.coordinatorName}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Mail size={16} className="mr-2 text-emerald-600" />
                                    <span>{internship.coordinatorEmail}</span>
                                  </div>
                                  {internship.coordinatorPhone && (
                                    <div className="flex items-center text-sm">
                                      <Phone size={16} className="mr-2 text-emerald-600" />
                                      <span>{internship.coordinatorPhone}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* System Info */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">System Information</h3>
                                <div className="space-y-3">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Created:</span>
                                    <span>{formatDateTime(internship.createdAt)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Last Updated:</span>
                                    <span>{formatDateTime(internship.updatedAt)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div className="space-y-2">
                              {editingInternship?.id === internship.id ? null : (
                                <button
                                  onClick={() => startEditing(internship)}
                                  className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 w-full sm:w-auto"
                                >
                                  <Edit size={16} className="mr-2" />
                                  Edit
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteInternship(internship.id)}
                                disabled={processingId === internship.id}
                                className="flex items-center px-4 py-2 border border-red-300 text-red-700 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 w-full sm:w-auto"
                              >
                                {processingId === internship.id ? 
                                  <Loader2 size={16} className="animate-spin mr-2" /> : 
                                  <Trash2 size={16} className="mr-2" />
                                }
                                Delete
                              </button>
                            </div>
                            
                            <button
                              onClick={() => toggleInternshipStatus(internship.id, internship.isActive)}
                              className={`flex items-center px-4 py-2 rounded-lg ${
                                internship.isActive ? 
                                  'bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200' : 
                                  'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                              }`}
                            >
                              {processingId === internship.id ? 
                                <Loader2 size={16} className="animate-spin mr-2" /> : 
                                internship.isActive ? <X size={16} className="mr-2" /> : <Check size={16} className="mr-2" />
                              }
                              {internship.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}