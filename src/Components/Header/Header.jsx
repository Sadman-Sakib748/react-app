import { ShoppingBag, Star } from "lucide-react";

const Header = ({ reviews, averageRating }) => {
   return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
          <ShoppingBag className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Shop Review Hub
        </h1>
      </div>
      <p className="text-gray-600 text-lg">
        Share your online shopping experiences and help others make better choices
      </p>

      {reviews.length > 0 && (
        <div className="flex items-center justify-center gap-6 mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{reviews.length}</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
          <div className="h-8 w-px bg-gray-300"></div>
          <div className="text-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      )}
    </div>
    );
};

export default Header;