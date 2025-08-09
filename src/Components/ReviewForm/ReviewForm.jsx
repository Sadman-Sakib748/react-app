import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const ReviewForm = ({ onSubmit }) => {
    const [shopName, setShopName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!shopName.trim()) {
            toast.error("Please enter a shop name");
            return;
        }

        if (!reviewText.trim()) {
            toast.error("Please enter your review");
            return;
        }

        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        const newReview = {
            id: Date.now().toString(),
            shopName: shopName.trim(),
            reviewText: reviewText.trim(),
            rating,
            date: new Date().toISOString()
        };

        onSubmit(newReview);
        setShopName("");
        setReviewText("");
        setRating(0);
    };

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
        <div className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg">
            <div className="p-6 border-b">
                <div className="flex items-center gap-2 text-xl font-semibold mb-1">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Write a Review
                </div>
                <p className="text-gray-600 text-sm">
                    Share your experience with an online shop to help other shoppers
                </p>
            </div>
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">
                                Shop Name
                            </label>
                            <input
                                id="shopName"
                                type="text"
                                placeholder="e.g., Amazon, eBay, Shopify Store..."
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Rating</label>
                            <div className="flex items-center gap-2">
                                {renderStars(rating, true, setRating)}
                                <span className="text-sm text-gray-600 ml-2">
                                    {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select rating'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">
                            Your Review
                        </label>
                        <textarea
                            id="reviewText"
                            placeholder="Share your experience... What did you like or dislike about this shop?"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-md transition-all disabled:opacity-50"
                        disabled={!shopName.trim() || !reviewText.trim() || rating === 0}
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;