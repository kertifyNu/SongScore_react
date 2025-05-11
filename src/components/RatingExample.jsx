import { Star, StarHalf } from "lucide-react";

export default function RatingExample({ artist, album, rating, imageUrl }) {
  // Generate stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-5 h-5 text-yellow-400 fill-yellow-400 "
          strokeWidth={2}
          fill="currentColor"
        />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 text-yellow-400 fill-yellow-400"
        />
      );
    }

    return stars;
  };

  return (
    <div className="bg-[#0f0f0f] rounded-lg p-4 flex items-center space-x-4">
      <div className="h-16 w-16 flex-shrink-0 bg-[#1A1A1A] rounded overflow-hidden">
        <img
          src={imageUrl}
          alt={`${artist} - ${album}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-base font-medium">{artist}</h3>
        <p className="text-sm text-[#E0E0E0]">{album}</p>
      </div>
      <div className="flex-shrink-0 flex items-center space-x-1">
        {renderStars(rating)}
      </div>
    </div>
  );
}
