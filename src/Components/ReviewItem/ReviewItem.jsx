import { Star, Calendar, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

const ReviewItem = ({ review, onEdit, onDelete }) => {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const renderStars = (rating) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-5 h-5 ${star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                    />
                ))}
            </div>
        );
    };

    const handleDelete = () => {
        onDelete(review.id);
        setIsDeleteConfirmOpen(false);
    };

    return (
        <div className="shadow-md hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{review.shopName}</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {review.rating} ⭐
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            {renderStars(review.rating)}
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(review.date)}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(review)}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setIsDeleteConfirmOpen(true)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
            </div>

            {isDeleteConfirmOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Review</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this review? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setIsDeleteConfirmOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewItem;