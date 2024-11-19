import React from 'react'
import StarRatings from 'react-star-ratings'

const ListReview = ({ review }) => {
    return (
        <div> <div class="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {
                review.map((item, index) => (<div class="review-card my-3">
                    <div class="row" key={index}>
                        <div class="col-1">
                            <img
                                src={item?.user?.avatar ? item?.user?.avatar?.url : "../images/default_avatar.jpg"}
                                alt="User Name"
                                width="50"
                                height="50"
                                class="rounded-circle"
                            />
                        </div>
                        <div class="col-11">
                            <div class="star-ratings">
                                <StarRatings
                                    rating={item.rating}
                                    starRatedColor="#ffb829"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="22px"
                                    starSpacing='1px'
                                // changeRating={(e) => setRating(e)}
                                />
                            </div>
                            <p class="review_user">{item.name}</p>
                            <p class="review_comment">{item.comment}</p>
                        </div>
                    </div>
                    <hr />
                </div>))
            }

        </div></div>
    )
}

export default ListReview