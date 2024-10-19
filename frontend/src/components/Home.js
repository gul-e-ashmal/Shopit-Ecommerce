import React, { useEffect } from 'react'
import MetaData from './layouts/MetaData'
import ProductItem from './product/ProductItem'
import { useGetProductsQuery } from '../reudx/API/productApi'
import Loader from './layouts/Loader'
import toast from 'react-hot-toast'
import CustomPagination from './layouts/CustomPagination'
import Filters from './layouts/Filters'
import { useSearchParams } from 'react-router-dom'


const Home = () => {
  const [currentPage] = useSearchParams();
  const page = Number(currentPage.get('page')) || 1;
  const keyword = currentPage.get('keyword') || "";
  const min = currentPage.get('min');
  const max = currentPage.get('max');
  const category = currentPage.get("category")
  const ratings = currentPage.get("ratings")
  const colNumber = keyword ? 4 : 3

  const params = { page, keyword }
  min !== null && (params.min = min);
  max !== null && (params.max = max)
  category !== null && (params.category = category)
  ratings !== null && (params.ratings = ratings)

  const { data, isLoading, isError, error } = useGetProductsQuery(params);
 

  useEffect(() => {

    if (isError) {
      toast.error(error?.data?.message)
    }

  }, [isError])

  if (isLoading) return <Loader />


  return (
    <div className='home'>
      <MetaData title={"Buy online products"} />
      <h1 className='homeHeading'>{keyword ? `${data?.product?.length} found with this keyword : ${keyword}` : "Latest Product"}</h1>
      <section className={` container   `}>
        <div className='row'>

          {keyword && <div className=' col-md-3 col-lg-3'>
            <Filters />

          </div>}
          <div className={keyword ? "col-md-9" : "col-md-12"}>
            <div className='row'>
              {
                data?.product?.map((product) => {
                  return <ProductItem product={product} colNumber={colNumber} />
                })
              }
            </div>
          </div>

        </div>
      </section>

      <CustomPagination resperpage={data?.resperpage} filterProductCount={data?.filterProductCount} />
      <div className='space'></div>
    </div>
  )
}

export default Home