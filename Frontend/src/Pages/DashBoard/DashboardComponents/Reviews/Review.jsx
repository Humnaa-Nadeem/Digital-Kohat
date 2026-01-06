import "./Review.css";
import "../DashboardComponents.css";
import { useState } from "react";

export const ReviewForm = () => {
    let [reviews, setReviews] = useState({
        firstReview: "",
        secReview: "",
        thirdReview: "",
        fourthReview: ""
    });

    const hndleReviewChng = (e) => {
        let { name, value } = e.target;
        setReviews({ ...reviews, [name]: value });
    }

    const FinalFun = (e) => {
        e.preventDefault();
        let parentReviews = [];
        for (const key in reviews) {
            parentReviews.push(reviews[key]);
        }
        console.log(parentReviews);
        setReviews({
            firstReview: "",
            secReview: "",
            thirdReview: "",
            fourthReview: ""
        })
    }

    return (
        <section className="form-area">
            <form onSubmit={(e) => FinalFun(e)}>
                <h2>Reviews</h2>
                <p className="addressingPara">Enter Top reviews about your service.</p>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label >1st Review</label>
                        <input type="text" name="firstReview" value={reviews.firstReview} onChange={(e) => hndleReviewChng(e)} required/>
                    </div>
                    <div className="form-group">
                        <label >2nd Review</label>
                        <input type="text" name="secReview" value={reviews.secReview} onChange={(e) => hndleReviewChng(e)} required/>
                    </div>
                </div>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label >3rd Review</label>
                        <input type="text" name="thirdReview" value={reviews.thirdReview} onChange={(e) => hndleReviewChng(e)} required/>
                    </div>
                    <div className="form-group">
                        <label >4th Review (<em>optional</em>)</label>
                        <input type="text" name="fourthReview" value={reviews.fourthReview} onChange={(e) => hndleReviewChng(e)} />
                    </div>
                </div>
                <div className="form-actions">
                    <button className="save-btn">Save</button>
                </div>
            </form>
        </section>
    )
}