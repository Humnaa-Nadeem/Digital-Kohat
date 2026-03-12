import { FaStar } from "react-icons/fa";
import "./RatingSection.css";
import { useState } from "react";
import { ChangeRatingData } from "../../ApiCalls/ApiCalls";
import { ToastContainer, toast } from "react-toastify";

export const RatingSection = ({ ratingData, id, cata }) => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [ratingSubmitted, setRatingSubmitted] = useState(false);

    const handleRating = (star) => setSelectedRating(star);

    const calculateRating = () => {
        if (!selectedRating) return toast.warning("Select at least one star!");
        ChangeRatingData({ rating: selectedRating, id, coll: cata }, setRatingSubmitted);
    };

    // Display current average
    const renderStars = () => {
        const avg = ratingData?.average || 0;
        if (!ratingData || !ratingData.totalReviews) {
            return <div className="starsCont">New</div>;
        }

        const fullStars = Math.floor(avg);
        const halfStar = avg - fullStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <div className="starsCont">
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} color="yellow" />
                ))}
                {[...Array(halfStar)].map((_, i) => (
                    <FaStar
                        key={`half-${i}`}
                        color="yellow"
                        style={{ clipPath: "inset(0 50% 0 0)" }}
                    />
                ))}
                {[...Array(emptyStars)].map((_, i) => (
                    <FaStar key={`empty-${i}`} color="lightgray" />
                ))}
                <span className="reviewCount">({ratingData.totalReviews})</span>
            </div>
        );
    };

    return (
        <section className="SP_Sec reviewSec">
            <ToastContainer />
            <h2 className="SP_Sec_hd">Rate Us</h2>
            <p>Share your experience while dealing with us.</p>

            <div className="rateUsStrCont">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={selectedRating >= star ? "ratusStr ratedStr" : "ratusStr"}
                        onClick={() => handleRating(star)}
                    />
                ))}
            </div>

            {ratingSubmitted ? (
                <p>Your rating has been submitted.</p>
            ) : (
                <button className="rateUsSubmtBtn" onClick={calculateRating}>
                    Submit
                </button>
            )}

            {renderStars()}
        </section>
    );
};