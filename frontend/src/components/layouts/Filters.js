import React, { useEffect, useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import "../../App.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPriceQueryParams } from '../../helpers/helpers';
import StarRatings from 'react-star-ratings';


const Filters = () => {
  const [price, setPrice] = useState([1, 1000])
  const [min, setMin] = useState()
  const [max, setMax] = useState();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has("min")) {
      setMin(searchParams.get("min"))
    }

    if (searchParams.has("max")) {
      setMax(searchParams.get("max"))
    }
  }, [])

  // handle cateodory and ratingd
  const handleCategoryAndRating = (checkbox) => {

    const category = document.getElementsByName(checkbox.name);

    category.forEach((ele) => { if (ele !== checkbox) ele.checked = false })

    if (checkbox.checked === false) {
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
      }

    } else {

      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value)
      }
      else {
        searchParams.append(checkbox.name, checkbox.value)
      }
    }



    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path)

  }


  // default value 
  const checkDefaultFromPath = (checkbox, CheckValue) => {
    const value = searchParams.get(checkbox)

   

    if (value === CheckValue){
      console.log(true)
      return true}

    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // searchParams.has('min')
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();

    navigate(path);
  }

  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    "Books",
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
  ]

  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form
        id="filter_form"
        className="px-2"
        action="your_action_url_here"
        method="get"
      >
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              onChange={(e) => setMin(e.target.value)}
              value={min}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              name="max"
              onChange={(e) => setMax(e.target.value)}
              value={max}
            />
          </div>
          <div className="col">
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">GO</button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>


      {categories.map((ele) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id="check4"
            value={ele}
            onClick={(e) => handleCategoryAndRating(e.target)}
            defaultChecked={checkDefaultFromPath("category", ele)}
          />
          <label className="form-check-label" for="check4"> {ele} </label>
        </div>
      ))}


      <hr />
      <h5 className="mb-3">Ratings</h5>


      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id="check7"
            value={rating}
            defaultChecked={checkDefaultFromPath("ratings", rating?.toString())}
            onClick={(e) => handleCategoryAndRating(e.target)}
          />
          <label className="form-check-label" for="check7">
            <StarRatings
              rating={rating}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name='rating'
              starDimension="20px"
              starSpacing='1px'
            />
          </label>
        </div>
      ))}

    </div>

  )
}
export default Filters