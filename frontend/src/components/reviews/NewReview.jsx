import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings';
import { useCanReviewQuery, useSubmitReviewMutation } from '../../reudx/API/productApi';
import toast from 'react-hot-toast';

const NewReview = ({ productId }) => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const [submitReview, {  isError, isSuccess, error }] = useSubmitReviewMutation();
    // alert(typeof productId)
    const {data}=useCanReviewQuery(productId);

    // alert(data);

    useEffect(() => {

        if (isError) {
            toast.error(error?.data?.message);

        }
        if (isSuccess) {
            toast.success("Review Posted")
        }
        // if(data){
        //     alert(data.can_review)
        // }

    }, [isError, isSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = { rating, comment, productId };
        submitReview(review);
    }

    return (
        <div><div>
           { data?.can_review && 
           <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-bs-toggle="modal"
                data-bs-target="#ratingModal"
            >
                Submit Your Review
            </button>
             }

            <div className="row mt-2 mb-5">
                <div className="rating w-50">
                    <div
                        className="modal fade"
                        id="ratingModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="ratingModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ratingModalLabel">
                                        Submit Review
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="star-ratings">
                                        <StarRatings
                                            rating={rating}
                                            starRatedColor="#ffb829"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="22px"
                                            starSpacing='1px'
                                            changeRating={(e) => setRating(e)}
                                        />
                                    </div>

                                    <textarea
                                        name="review"
                                        id="review"
                                        className="form-control mt-4"
                                        placeholder="Enter your comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>

                                    <button
                                        id="new_review_btn"
                                        className="btn w-100 my-4 px-4"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default NewReview