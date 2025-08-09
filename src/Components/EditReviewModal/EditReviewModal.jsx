import { Star } from "lucide-react";
const EditReviewModal = ({ isOpen, onClose, review, onChange, onSave }) => {
    if (!isOpen || !review) return null;

    const renderStars = (currentRating, interactive = false, onClick) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-5 h-5 ${star <= currentRating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
                        onClick={() => interactive && onClick(star)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Edit Review</h3>
                    <p className="text-gray-600 mb-4">Make changes to your review below.</p>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="editShopName" className="block text-sm font-medium text-gray-700">
                                Shop Name
                            </label>
                            <input
                                id="editShopName"
                                type="text"
                                value={review.shopName}
                                onChange={(e) => onChange({ ...review, shopName: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Rating</label>
                            <div className="flex items-center gap-2">
                                {renderStars(review.rating, true, (rating) =>
                                    onChange({ ...review, rating })
                                )}
                                <span className="text-sm text-gray-600 ml-2">
                                    {review.rating} star{review.rating !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="editReviewText" className="block text-sm font-medium text-gray-700">
                                Review
                            </label>
                            <textarea
                                id="editReviewText"
                                value={review.reviewText}
                                onChange={(e) => onChange({ ...review, reviewText: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditReviewModal;