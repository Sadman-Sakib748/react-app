import { useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import ReviewItem from "../ReviewItem/ReviewItem";
import EditReviewModal from "../EditReviewModal/EditReviewModal";


const ReviewList = ({ reviews, searchTerm, onSearchChange, onEdit, onDelete }) => {
    const [editingReview, setEditingReview] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEditClick = (review) => {
        setEditingReview(review);
        setIsEditModalOpen(true);
    };

    const handleUpdate = () => {
        if (!editingReview) return;
        onEdit(editingReview);
        setIsEditModalOpen(false);
        setEditingReview(null);
    };

    return (
        <div className="space-y-4">
            {reviews.length > 0 && (
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search reviews by shop name..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            )}

            {reviews.length === 0 ? (
                <div className="text-center py-12 bg-white/60 backdrop-blur-sm border-dashed border rounded-lg">
                    <div className="p-6">
                        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {reviews.length === 0 ? "No reviews yet" : "No matching reviews"}
                        </h3>
                        <p className="text-gray-600">
                            {reviews.length === 0
                                ? "Be the first to share your shopping experience!"
                                : "Try adjusting your search terms"}
                        </p>
                    </div>
                </div>
            ) : (
                reviews.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                        onEdit={handleEditClick}
                        onDelete={onDelete}
                    />
                ))
            )}

            {editingReview && (
                <EditReviewModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    review={editingReview}
                    onChange={setEditingReview}
                    onSave={handleUpdate}
                />
            )}
        </div>
    );
};

export default ReviewList;