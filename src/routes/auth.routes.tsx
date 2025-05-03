import { lazy } from "react";

const Home = lazy(() => import('../pages/HomePage'));



const Login = lazy(() => import('../pages/LoginPage'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Profile = lazy(() => import('../pages/Profile'));
const Contact = lazy(() => import('../pages/ContactPage'));
const CustomerQuery = lazy(() => import('../pages/CustomerQuery'));
const Applicationform = lazy(() => import('../pages/Applicationform'));
const NotificationManager = lazy(() => import('../pages/NotificationManager'));
const StudentReview = lazy(() => import('../pages/Studentreview'));
const CurrentUser = lazy(() => import('../pages/CurrentUser'));
const Adminsideviewreview = lazy(() => import('../pages/Adminsideviewreview'));
const StudentInternApplication = lazy(() => import('../pages/StudentInternApplication'));
const AvailableInterns = lazy(() => import('../pages/AvailableInterns'));
const InternshipRequest = lazy(() => import('../pages/InternshipRequest'));
const UpdateIntern = lazy(() => import('../pages/UpdateIntern'));
export const navigationRouts =  [
    {
        name: 'Home',
        path: '/',
        component: <Home/>
    },
    
    
    {
        name: 'Login',
        path: '/login',
        component: <Login/>

    },
    {
        name: 'SignUp',
        path: '/signup',
        component: <SignUp/>

    },
    {
        name: 'Profile',
        path: '/profile',
        component: <Profile/>

    },
    {
        name: 'Contact',
        path: '/contact',
        component: <Contact/>

    },
    {
        name: 'CustomerQuery',
        path: '/customerquery',
        component: <CustomerQuery/>

    },
    {
        name: 'Applicationform',
        path: '/applicationform',
        component: <Applicationform isOpen={false} onClose={function (): void {
            throw new Error("Function not implemented.");
        } }/>

    },
    {
        name: 'NotificationManager',
        path: '/notificationmanager',
        component: <NotificationManager/>

    },
    {
        name: 'StudentReview',
        path: '/studentreview',
        component: <StudentReview currentStudentId={""} currentStudentName={""}/>

    },
    {
        name: 'CurrentUser',
        path: '/currentuser',
        component: <CurrentUser/>

    },
    {
        name: 'Adminsideviewreview',
        path: '/adminsideviewreview',
        component: <Adminsideviewreview/>

    },
    {
        name: 'StudentInternApplication',
        path: '/studentinternapplication',
        component: <StudentInternApplication isModalOpen={false} setIsModalOpen={function (isOpen: boolean): void {
            throw new Error("Function not implemented.");
        } } internshipId={""}/>

    },
    {
        name: 'AvailableInterns',
        path: '/available-internships',
        component: <AvailableInterns/>

    },
    {
        name: 'InternshipRequest',
        path: '/internship-request',
        component: <InternshipRequest/>

    },
    {
        name: 'UpdateIntern',
        path: '/updateintern',
        component: <UpdateIntern/>

    }
];

export default {
    navigationRouts
};

