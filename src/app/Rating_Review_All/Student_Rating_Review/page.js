'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { GET_TOKAN_MANAGEMENT_DATA } from '../../query/authTokanQuery';
import { GET_STUDENT_RATING_DATA } from '../../query/StudentRatingQuery/fetchStudentQuery';
import { CREATE_STUDENT_RATING_MUTATION } from '../../mutation/StudentRatingMutation/createStudentMutation';
import { GET_PARENT_RATING_DATA } from '../../query/ParentRatingQuery/fetchParentQuery';
import { CREATE_PARENT_RATING_MUTATION } from '../../mutation/ParentRatingMutation/createParentMutation';
import { executeQuery, executeMutation } from '../../graphqlClient';

export default function RatingReviewPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [userData, setUserData] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showMessagePopup, setShowMessagePopup] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await executeQuery(GET_TOKAN_MANAGEMENT_DATA);
        const user = response?.getUserDataFromToken;
        console.log('User data:', user);

        if (user && (user.role === 'student' || user.role === 'parent')) {
          setUserData(user);

          // Choose the appropriate query based on role
          const ratingQuery = user.role === 'student' ? GET_STUDENT_RATING_DATA : GET_PARENT_RATING_DATA;
          const ratingResponse = await executeQuery(ratingQuery, {
            userid: user.userid,
          });

          // Adjust response key based on role
          const ratingData = user.role === 'student' 
            ? ratingResponse?.getStudentRatings 
            : ratingResponse?.getParentRatings;
          console.log(`${user.role} Rating Data:`, ratingData);

          const alreadyRated = ratingData?.some(
            (record) => record.userid === user.userid
          );

          if (!alreadyRated) {
            setIsOpen(true);
          }
        } else {
          console.warn('User is not a student or parent.');
        }
      } catch (error) {
        console.error('Error fetching user or rating data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleStarClick = (star) => setRating(star);

  const handleSubmit = async () => {
    if (!userData || !rating || !review) {
      setErrorMsg('Please provide both a rating and a review.');
      setShowMessagePopup(true);
      return;
    }

    try {
      // Choose the appropriate mutation based on role
      const mutation = userData.role === 'student' 
        ? CREATE_STUDENT_RATING_MUTATION 
        : CREATE_PARENT_RATING_MUTATION;

      const response = await executeMutation(mutation, {
        first_name: userData.first_name,
        middle_name: userData.middle_name || '',
        last_name: userData.last_name,
        userid: userData.userid,
        review,
        rating: rating.toString(),
      });

      // Adjust response key based on role
      const mutationResult = userData.role === 'student' 
        ? response?.createStudentRating 
        : response?.createParentRating;

      if (mutationResult?.success_msg) {
        setSuccessMsg(mutationResult.success_msg);
        setErrorMsg('');
        setShowMessagePopup(true);
        setIsOpen(false);
      } else if (mutationResult?.error_msg) {
        setErrorMsg(mutationResult.error_msg);
        setSuccessMsg('');
        setShowMessagePopup(true);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
        setSuccessMsg('');
        setShowMessagePopup(true);
      }
    } catch (error) {
      setErrorMsg('An unexpected error occurred. Please try again.');
      setSuccessMsg('');
      setShowMessagePopup(true);
      console.error('Mutation Error:', error);
    }
  };

  const closeMessagePopup = () => {
    setShowMessagePopup(false);
    setSuccessMsg('');
    setErrorMsg('');
  };

  if (!isOpen && !showMessagePopup) return null;

  const title = userData?.role === 'student' ? 'Rate Your Experience' : 'Rate Your Child’s Progress';
  const message =
    userData?.role === 'student'
      ? 'Share your feedback about your learning experience.'
      : 'Share your thoughts on your child’s academic journey.';

  return (
    <>
      {/* Inline Styles for Animation */}
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>

      {/* Rating Popup */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-full max-w-[90%] sm:max-w-md p-4 sm:p-0">
          <div className="bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl border border-gray-100 p-5 sm:p-6 transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{message}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <div className="mt-4 sm:mt-6">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Your Rating</label>
              <div className="flex space-x-1 sm:space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className={`text-xl sm:text-2xl transition-transform transform hover:scale-110 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <textarea
                rows={3}
                placeholder="Write your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!rating || !review}
              className={`mt-4 w-full py-2 sm:py-2.5 px-4 rounded-lg text-white font-medium text-sm sm:text-base transition-all duration-200 ${
                !rating || !review
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Success/Error Message Popup */}
      {showMessagePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 p-4">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md p-6 transform transition-all duration-300 animate-fade-in">
            {/* Colored Header Bar */}
            <div
              className={`absolute top-0 left-0 w-full h-2 rounded-t-lg ${
                successMsg ? 'bg-green-500' : 'bg-red-500'
              }`}
            />

            {/* Icon */}
            <div className="flex justify-center mb-4">
              {successMsg ? (
                <div className="p-3 bg-green-100 rounded-full">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : (
                <div className="p-3 bg-red-100 rounded-full">
                  <svg
                    className="h-8 w-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Dynamic Title with First Name */}
            <h3
              className={`text-xl font-semibold text-center ${
                successMsg ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {successMsg ? `Thank You, ${userData?.first_name || ''}` : 'Error'}
            </h3>
            <p className="text-sm text-gray-600 text-center mt-3 leading-relaxed">
              {successMsg || errorMsg}
            </p>

            {/* Close Button */}
            <button
              onClick={closeMessagePopup}
              className={`mt-6 w-full py-2.5 px-4 rounded-lg text-white font-medium text-sm sm:text-base transition-all duration-200 ${
                successMsg
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              } shadow-md hover:shadow-lg`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}