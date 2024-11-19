import React, { useEffect, useState } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import { useParams } from 'react-router-dom'
import { useGetProductDetailQuery, useUpdateProductsMutation } from '../../reudx/API/productApi';
import toast from 'react-hot-toast';

const UpdateProduct = () => {

    const param = useParams();

    const { data } = useGetProductDetailQuery({ id: param?.id.toString() });
    const [updateProducts, { error, isSuccess }] = useUpdateProductsMutation({ id: param?.id.toString() })

    const [product, setProduct] = useState({
        name: "",
        description: "",
        stock: 0,
        price: 0,
        seller: "",
        category: "",

    })

    useEffect(()=>{
        if(error){
            toast?.error(error?.data?.message);
        }if(isSuccess){
            toast?.success("Successfully updated");
        }
    },[error,isSuccess])
    useEffect(() => {

        if (data?.product) {
            setProduct({
                name: data?.product?.name,
                description: data?.product?.description,

                stock: data?.product?.stock,
                price: data?.product?.price,
                category: data?.product?.category,
                seller: data?.product?.seller



            })
        }

    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault();
      updateProducts({id:param.id,product})
    }
    return (
        <AdminLayout>
            <div className="row wrapper">
                <div className="col-10 col-lg-10 mt-5 mt-lg-0">
                    <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
                        <h2 className="mb-4">Update Product</h2>
                        <div className="mb-3">
                            <label for="name_field" className="form-label"> Name </label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name={"name"}
                                value={product?.name}
                                onChange={(e)=>setProduct({...product,name:e.target.value})}
                            />
                        </div>

                        <div className="mb-3">
                            <label for="description_field" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="description_field"
                                rows="8"
                                name="description"
                                value={product?.description}
                                onChange={(e)=>setProduct({...product,description:e.target.value})}
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="mb-3 col">
                                <label for="price_field" className="form-label"> Price </label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    name="price"
                                    value={product.price}
                                    onChange={(e)=>setProduct({...product,price:e.target.value})}
                                />
                            </div>

                            <div className="mb-3 col">
                                <label for="stock_field" className="form-label"> Stock </label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    name="stock"
                                    value={product.stock}
                                    onChange={(e)=>setProduct({...product,stock:e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col">
                                <label for="category_field" className="form-label"> Category </label>
                                <select className="form-select" id="category_field" name="category" value={product.category}
                                    onChange={(e)=>setProduct({...product,category:e.target.value})}
                                    >
                                    <option value="Electronics">Electronics</option>
                                    <option value="Cameras">Cameras</option>
                                    <option value="Laptops">Laptops</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Headphones">Headphones</option>
                                    <option value="Clothes/Shoes">Clothes/Shoes</option>
                                    <option value="Beauty/Health">Beauty/Health</option>
                                    <option value="Food">Food</option>
                                    <option value="Books">Books</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Outdoor">Outdoor</option>
                                    <option value="Home">Home</option>
                                </select>
                            </div>
                            <div className="mb-3 col">
                                <label for="seller_field" className="form-label"> Seller Name </label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    name="seller"
                                    value={product.seller}
                                    onChange={(e)=>setProduct({...product,seller:e.target.value})}

                                />
                            </div>
                        </div>
                        <button type="submit" className="btn w-100 py-2">Update</button>
                    </form>
                </div>
            </div>

        </AdminLayout>
    )
}

export default UpdateProduct    