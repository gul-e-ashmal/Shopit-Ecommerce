import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductDetailQuery } from "../../reudx/API/productApi"

const ProductDetail = () => {

  const param = useParams();

  const { error, isError, data, isLoading } = useGetProductDetailQuery(param?.id);
  const product = data?.product
  console.log(data.product.name)

  return (
    <>
      <Fragment>
        <div className=' container row'>
          <div className=' col-md-6  col-sm-12'></div>
          <div className=' col-md-6
          col-sm-12'>
            <div>
              <h3>{product.name}</h3>
            </div>
          </div>

        </div>
        <div className='space'></div>

      </Fragment>
    </>
  )
}

export default ProductDetail