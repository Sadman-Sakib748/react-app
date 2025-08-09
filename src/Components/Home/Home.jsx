import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Header from "../Header/Header";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewList from "../ReviewList/ReviewList";

const Home = () => {
    const [reviews, setReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [toastId, setToastId] = useState(null);

    useEffect(() => {
        const loadReviews = () => {
            try {
                const savedReviews = localStorage.getItem("shopReviews");
                if (savedReviews) {
                    const parsedReviews = JSON.parse(savedReviews);
                    if (Array.isArray(parsedReviews)) {
                        setReviews(parsedReviews);
                    }
                }
            } catch (error) {
                console.error("Failed to parse reviews from localStorage", error);
                toast.error("Failed to load saved reviews", { id: 'load-error' });
            } finally {
                setIsLoading(false);
            }
        };

        loadReviews();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem("shopReviews", JSON.stringify(reviews));
            } catch (error) {
                console.error("Failed to save reviews to localStorage", error);
                toast.error("Failed to save reviews", { id: 'save-error' }); 
            }
        }
    }, [reviews, isLoading]);

    const addReview = (newReview) => {
        const id = toast.loading("Adding review");
        setToastId(id);
        
        setReviews((prev) => {
            const updatedReviews = [newReview, ...prev];
            toast.success("Review added successfully!", { id }); 
            return updatedReviews;
        });
    };

    const updateReview = (updatedReview) => {
        const id = toast.loading("Updating review");
        setToastId(id);
        
        setReviews((prev) => {
            const updatedReviews = prev.map((review) =>
                review.id === updatedReview.id ? updatedReview : review
            );
            toast.success("Review updated successfully!", { id });
            return updatedReviews;
        });
    };

    const deleteReview = (id) => {
        const toastId = toast.loading("Deleting review...");
        setToastId(toastId);
        
        setReviews((prev) => {
            const updatedReviews = prev.filter((review) => review.id !== id);
            toast.success("Review deleted successfully!", { id: toastId });
            return updatedReviews;
        });
    };

    const filteredReviews = reviews.filter((review) =>
        review.shopName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading reviews...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Header reviews={reviews} averageRating={getAverageRating()} />
                <ReviewForm onSubmit={addReview} />
                <ReviewList
                    reviews={filteredReviews}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onEdit={updateReview}
                    onDelete={deleteReview}
                />
            </div>
        </div>
    );
};

export default Home;