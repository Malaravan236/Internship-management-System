import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown, faArrowRight, faBuilding, faUserTie,
  faChalkboardTeacher, faAward, faComments, faBriefcase, faArrowUp,
  faTimes, faStar
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const InternConnect: React.FC = () => {
  // State hooks
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }

      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert('Thank you for your application! We will contact you soon.');
    setIsModalOpen(false);
    e.currentTarget.reset();
  };

  return (
    <>
      <header
        id="header"
        className={`fixed w-full z-40 bg-gray-200 transition-all duration-300 mt-16 ${isHeaderScrolled ? 'shadow-md py-2' : 'py-4'
          }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center" role="navigation">
            {/* Desktop and Mobile Menu */}
            <ul className="flex items-center space-x-8 lg:space-x-12">
              <li>
                <a
                  onClick={() => scrollToSection('features')}
                  className="text-gray-600 hover:text-emerald-600 cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection('process')}
                  className="text-gray-600 hover:text-emerald-600 cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-600 hover:text-emerald-600 cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection('program')}
                  className="text-gray-600 hover:text-emerald-600 cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  Program
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>



      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
        {/* Background Image with Opacity */}
        <div className="absolute inset-0 bg-[url('https://static-cse.canva.com/blob/1535032/Sanstitre.jpg')] bg-cover bg-center opacity-90"></div>

        {/* Foreground Content */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 mt-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Launch Your Career with <span className="text-emerald-700">Premium Internships</span>
              </h1>
              <p className="text-lg text-black mb-8">
                Connect with top companies and gain valuable experience that will set you apart in the job market.
                Our platform matches students with opportunities that align with their skills and career goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                {/* <button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.5rem',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
                >
                  Apply Now
                </button> */}


                <button
                  onClick={() => navigate('/available-internships')}  // 👈 Change route here
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.5rem',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
                >
                  Apply Now
                </button>
                <button
                  onClick={() => scrollToSection('program')}
                  className="border-2 border-black text-primary hover:bg-green-700 hover:text-white hover:border-none px-8 py-3 rounded-lg transition-colors duration-300"
                >
                  Learn More
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-gray-900">Partner Companies</div>
                </div>
                <div className="bg-white/80 p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                  <div className="text-gray-900">Successful Placements</div>
                </div>
                <div className="bg-white/80 p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary mb-2">92%</div>
                  <div className="text-gray-900">Job Offer Rate</div>
                </div>
              </div>

            </div>
          </div>
          <div className="flex justify-center mt-16">
            <button
              onClick={() => scrollToSection('features')}
              className="flex flex-col items-center text-white animate-bounce"
            >
              <FontAwesomeIcon icon={faChevronDown} />
              <span className="mt-2 text-sm text-white">Scroll Down</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 bg-white-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 relative">
          {/* Abstract decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-300 opacity-10 rounded-full transform -translate-x-1/4 translate-y-1/4"></div>

          <div className="text-center mb-20 relative z-10">
            <div className="inline-block px-4 py-1 bg-emerald-600 rounded-full text-white font-medium mb-3 tracking-wider uppercase text-sm">Why Choose Us</div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">Features That Set Us <span className="text-emerald-600">Apart</span></h2>
            <p className="text-gray-800 max-w-2xl mx-auto text-lg">
              Our platform offers unique advantages designed to help you succeed in today's competitive job market.
            </p>
            <div className="w-24 h-1 bg-emerald-700 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Card 1 - Sky blue */}
            <div className="bg-sky-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 transform border-l-4 border-sky-400">
              <div className="w-16 h-16 bg-sky-200 rounded-lg flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                <FontAwesomeIcon icon={faBuilding} className="text-sky-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Premium Company Network</h3>
              <p className="text-gray-900 mb-6 leading-relaxed">
                Access opportunities with Fortune 500 companies and innovative startups that are looking for fresh talent.
              </p>
              <a href="#" className="inline-flex items-center text-sky-500 font-medium group-hover:text-sky-600 transition-colors duration-300">
                Learn More <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Card 2 - Lavender */}
            <div className="bg-purple-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 transform border-t-4 border-purple-300">
              <div className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                <FontAwesomeIcon icon={faUserTie} className="text-purple-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Personalized Matching</h3>
              <p className="text-gray-900 mb-6 leading-relaxed">
                Our algorithm matches you with internships that align with your skills, interests, and career goals.
              </p>
              <a href="#" className="inline-flex items-center text-purple-500 font-medium group-hover:text-purple-600 transition-colors duration-300">
                Learn More <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Card 3 - Rose */}
            <div className="bg-rose-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 transform border-r-4 border-rose-300">
              <div className="w-16 h-16 bg-rose-200 rounded-lg flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                <FontAwesomeIcon icon={faChalkboardTeacher} className="text-rose-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Career Mentorship</h3>
              <p className="text-gray-900 mb-6 leading-relaxed">
                Receive guidance from industry professionals who will help you navigate your internship and career path.
              </p>
              <a href="#" className="inline-flex items-center text-rose-500 font-medium group-hover:text-rose-600 transition-colors duration-300">
                Learn More <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Card 4 - Amber */}
            <div className="bg-amber-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 transform border-b-4 border-amber-300">
              <div className="w-16 h-16 bg-amber-200 rounded-lg flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                <FontAwesomeIcon icon={faAward} className="text-amber-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Skills Development</h3>
              <p className="text-gray-900 mb-6 leading-relaxed">
                Access exclusive workshops and courses designed to build the skills employers are looking for.
              </p>
              <a href="#" className="inline-flex items-center text-amber-500 font-medium group-hover:text-amber-600 transition-colors duration-300">
                Learn More <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Card 5 - Teal */}
            <div className="bg-pink-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 transform border-l-4 border-pink-300">
              <div className="w-16 h-16 bg-pink-200 rounded-lg flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                <FontAwesomeIcon icon={faComments} className="text-pink-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Feedback & Support</h3>
              <p className="text-gray-900 mb-6 leading-relaxed">
                Get real-time feedback during your internship to help you improve and succeed in your role.
              </p>
              <a href="#" className="inline-flex items-center text-pink-500 font-medium group-hover:text-pink-600 transition-colors duration-300">
                Learn More <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Card 6 - Light Green */}
            <div className="bg-green-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 transform border-r-4 border-green-300">
              <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300">
                <FontAwesomeIcon icon={faBriefcase} className="text-green-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Job Placement Assistance</h3>
              <p className="text-gray-900 mb-6 leading-relaxed">
                Our program includes post-internship support to help you transition into a full-time role.
              </p>
              <a href="#" className="inline-flex items-center text-green-500 font-medium group-hover:text-green-600 transition-colors duration-300">
                Learn More <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <a href="#" className="inline-block bg-emerald-700 from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Explore All Features
            </a>
          </div>
        </div>
      </section>


      {/* Process Section - Alternative Timeline Format */}
      <section id="process" className="py-28 bg-white from-indigo-50 via-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-emerald-900 font-medium mb-3 tracking-wider uppercase text-sm">How It Works</div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">Your Journey to <span className="text-emerald-600">Success</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our streamlined process makes it easy to find and secure your dream internship.
            </p>
            <div className="w-24 h-1 bg-emerald-700 from-emerald-500 to-blue-500 mx-auto mt-8 rounded-full"></div>
          </div>

          {/* Hexagonal Timeline */}
          <div className="max-w-6xl mx-auto relative">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center mb-20">
              {/* Left number indicator */}
              <div className="flex-shrink-0 mb-8 md:mb-0">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 text-white text-3xl font-bold shadow-lg transform rotate-45">
                  <span className="transform -rotate-45">1</span>
                </div>
              </div>

              {/* Content */}
              <div className="md:ml-12 flex-grow bg-white rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Create Your Profile</h3>
                <p className="text-gray-600 mb-4">
                  Sign up and build your profile showcasing your skills, experience, and career interests.
                  Upload your resume and portfolio to stand out from the competition.
                </p>
                <div className="flex items-center text-pink-600 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>5 minutes to complete</span>
                </div>
              </div>
            </div>

            {/* Connector line */}
            <div className="hidden md:block absolute left-10 top-20 bottom-0 border-l-2 border-dashed border-gray-300 -z-10"></div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center mb-20 md:pl-20">
              {/* Right number indicator */}
              <div className="flex-shrink-0 mb-8 md:mb-0">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-cyan-800 to-cyan-800 text-white text-3xl font-bold shadow-lg transform rotate-45">
                  <span className="transform -rotate-45">2</span>
                </div>
              </div>

              {/* Content */}
              <div className="md:mr-12 flex-grow bg-white rounded-xl shadow-lg p-8 border-t-4 border-cyan-800">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Get Matched</h3>
                <p className="text-gray-600 mb-4">
                  Our AI-powered system matches you with internships that align with your profile and career goals,
                  saving you time in your search.
                </p>
                <div className="flex items-center text-cyan-900 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Instant matches within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center mb-20">
              {/* Left number indicator */}
              <div className="flex-shrink-0 mb-8 md:mb-0">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-emerald-900 to-emerald-800 text-white text-3xl font-bold shadow-lg transform rotate-45">
                  <span className="transform -rotate-45">3</span>
                </div>
              </div>

              {/* Content */}
              <div className="md:ml-12 flex-grow bg-white rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Prepare & Apply</h3>
                <p className="text-gray-600 mb-4">
                  Receive personalized coaching to prepare for interviews and assessments.
                  Apply to your matched opportunities with just a few clicks.
                </p>
                <div className="flex items-center text-emerald-800 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Includes 1:1 coaching sessions</span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center mb-20 md:pl-20">
              {/* Right number indicator */}
              <div className="flex-shrink-0 mb-8 md:mb-0">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white text-3xl font-bold shadow-lg transform rotate-45">
                  <span className="transform -rotate-45">4</span>
                </div>
              </div>

              {/* Content */}
              <div className="md:mr-12 flex-grow bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Succeed in Your Internship</h3>
                <p className="text-gray-600 mb-4">
                  Get ongoing support throughout your internship, including regular check-ins,
                  skill development workshops, and mentorship.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Weekly mentorship and support</span>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col md:flex-row items-center mb-10">
              {/* Left number indicator */}
              <div className="flex-shrink-0 mb-8 md:mb-0">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-rose-800 to-rose-900 text-white text-3xl font-bold shadow-lg transform rotate-45">
                  <span className="transform -rotate-45">5</span>
                </div>
              </div>

              {/* Content */}
              <div className="md:ml-12 flex-grow bg-white rounded-xl shadow-lg p-8 border-t-4 border-rose-800">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Launch Your Career</h3>
                <p className="text-gray-600 mb-4">
                  Transform your internship into a job offer or leverage our network for your next
                  opportunity with our placement assistance program.
                </p>
                <div className="flex items-center text-rose-800 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>92% job offer rate</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-20 text-center">
              <button className="bg-emerald-800 from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-10 py-4 rounded-lg transition-all duration-300 shadow-lg font-medium">
                Start Your Journey Today
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-emerald-900 font-medium mb-3 tracking-wider uppercase text-sm">Success Stories</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our <span className="text-emerald-600">Interns Say</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students who transformed their careers through our internship program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-6 italic">
                "InternConnect helped me land an internship at my dream tech company. The mentorship
                and interview prep were game-changers for my career!"
              </p>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="https://img.freepik.com/free-photo/indian-business-man-reading-using-smart-phone-office_231208-2569.jpg"
                    alt="Sarah Johnson"
                    className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-800">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Software Engineering Intern at TechGiant</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-6 italic">
                "The personalized matching actually works! I was paired with a finance internship that
                perfectly aligned with my career goals and interests."
              </p>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="https://www.vivertourism.com/images/Cool-look-boy-image-for-whatsapp-dp-7.jpg"
                    alt="Michael Chen"
                    className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-800">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">Investment Banking Intern at GlobalFinance</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} className="text-yellow-200" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-6 italic">
                "The skills workshops prepared me for challenges I faced during my internship.
                My manager was impressed with how quickly I adapted!"
              </p>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg"
                    alt="Jessica Patel"
                    className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-800">Jessica Patel</h4>
                  <p className="text-gray-600 text-sm">Marketing Intern at BrandInnovate</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section id="program" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>

                {/* Main image container */}
                <div className="relative h-80 lg:h-96 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 to-blue-600/80 mix-blend-multiply"></div>
                  <img
                    src="https://dpscriz4jc899.cloudfront.net/wp-content/uploads/2020/08/5-Steps-to-Engage-Your-Alumni-Interns.jpg"
                    alt="Interns collaborating"
                    className="w-full h-full object-cover"
                  />

                  {/* Floating badge */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                    <span className="text-primary font-bold">500+ Placements</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="inline-block px-4 py-1 bg-emerald-800 text-white font-semibold rounded-full mb-3">Program Highlights</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Makes Our <span className='text-emerald-800'>Internships Special</span></h2>
              <p className="text-gray-600 mb-8 text-lg">
                Our comprehensive program is designed to provide you with more than just work experience.
                We focus on building your career foundation with real-world skills.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-10">
                {/* Feature Items - First Column */}
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Competitive Pay</h3>
                      <p className="text-gray-600 text-sm">Paid internships with industry-standard compensation</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Flexible Format</h3>
                      <p className="text-gray-600 text-sm">Remote and in-person opportunities available</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Learning Curriculum</h3>
                      <p className="text-gray-600 text-sm">Structured educational components alongside work</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Regular Feedback</h3>
                      <p className="text-gray-600 text-sm">1-on-1 sessions with experienced supervisors</p>
                    </div>
                  </div>
                </div>

                {/* Feature Items - Second Column */}
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Professional Networking</h3>
                      <p className="text-gray-600 text-sm">Events with industry leaders and professionals</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Resume Projects</h3>
                      <p className="text-gray-600 text-sm">Build your portfolio with measurable results</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Career Support</h3>
                      <p className="text-gray-600 text-sm">Post-internship guidance and job placement</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-emerald-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Mentorship</h3>
                      <p className="text-gray-600 text-sm">One-on-one guidance from industry experts</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/available-internships')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 font-bold text-lg flex items-center justify-center"
                >
                  Apply Now
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>


              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-gray-700 hover:bg-primary-dark text-white p-3 rounded-full shadow-lg transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Apply Now</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  required
                />
                <textarea
                  placeholder="Tell us about yourself and your career goals..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  rows="4"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors duration-300"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InternConnect;