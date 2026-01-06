import { FaStar } from "react-icons/fa"
import "./RatingSection.css"
import { useState } from "react";
export const RatingSection = ({ ratingData }) => {
    // Rating data from where rating will calculate.
    let [ratingObj, setRatingObj] = useState(ratingData);
    let [ratedStr, setratedStr] = useState({
        firstratestr: false,
        secratestar: false,
        thirdratestar: false,
        fourthratestar: false,
        fifthratestar: false
    });
    let [ratingSubmitted, setRatingSubmitted] = useState(false);

    // Handling rating
    const handleRating = (star) => {
        setratedStr({ ...ratedStr, [star]: !ratedStr[star] });
    }
    // Rate Calculation
    const calculateRating = () => {
        let newratedStr = 0;
        for (const key in ratedStr) {
            if (ratedStr[key]) {
                newratedStr++;
            }
        }
        if (newratedStr === 0) {
            alert("Fill atleast one rating stars.");
        } else {
            setRatingObj({ ...ratingObj, ["totalStrs"]: ratingData["totalStrs"] + 5, ["allratedStrs"]: ratingData["allratedStrs"] + newratedStr });
            alert("Your rating is submitted Successfully ✅.");
        }
        setRatingSubmitted(true);
    }


    return (
        <section className="SP_Sec reviewSec">
            <h2 className="SP_Sec_hd">Rate Us</h2>
            <p>Share your experience while dealing with us.</p>
            <div className="rateUsStrCont">
                <FaStar className={(ratedStr.firstratestr) ? "ratusStr ratedStr" : "ratusStr"} name="firstratestr" onClick={() => handleRating("firstratestr")} />
                <FaStar className={(ratedStr.secratestar) ? "ratusStr ratedStr" : "ratusStr"} name="secratestar" onClick={() => handleRating("secratestar")} />
                <FaStar className={(ratedStr.thirdratestar) ? "ratusStr ratedStr" : "ratusStr"} name="thirdratestar" onClick={() => handleRating("thirdratestar")} />
                <FaStar className={(ratedStr.fourthratestar) ? "ratusStr ratedStr" : "ratusStr"} name="fourthratestar" onClick={() => handleRating("fourthratestar")} />
                <FaStar className={(ratedStr.fifthratestar) ? "ratusStr ratedStr" : "ratusStr"} name="fifthratestar" onClick={() => handleRating("fifthratestar")} />
            </div>
            {(ratingSubmitted)
                ?
                <p>Your rating is submitted.</p>
                :
                <button className="rateUsSubmtBtn" onClick={calculateRating}>Submit</button>
            }
        </section>
    )
}