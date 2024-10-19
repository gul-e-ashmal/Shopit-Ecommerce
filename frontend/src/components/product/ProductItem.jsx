import React from 'react'
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const ProductItem = ({ product,colNumber }) => {

    console.log(product.images[0]?.url)
    return (
        <div className= {`col-sm-12 col-md-6 col-lg-${colNumber}`} >
            <div className='productItem'>
                <div className=' productImage'>
                    <img src='' alt='' />
                </div>
                <h4 className='productTitle'>
                    <Link className="productTitleLink" to={`products/${product._id}`}>{product.name}</Link>
                </h4>
                <div className='productRating'>
                    <StarRatings
                        rating={product.ratings}
                        starRatedColor="#ffb829"
                        // changeRating={this.changeRating}
                        numberOfStars={5}
                        name='rating'
                        starDimension="22px"
                        starSpacing='1px'
                    />
                    <sub>({product.numOfReviews})</sub>
                </div>
                <p className=' productPrice'>${product.price}</p>

                <button className=' productButton'>View Details</button>
            </div>
        </div>
    )
}

export default ProductItem