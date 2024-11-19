import React, { useEffect, useState } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import { MDBDataTable } from 'mdbreact';
import { useDeleteReviewMutation, useLazyGetProductReviewQuery } from '../../reudx/API/productApi';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ProductReviews = () => {

    const [productId, setProductId] = useState();
    const [getProductReview, { data }] = useLazyGetProductReviewQuery(productId);
    const [deleteReview, { error, isSuccess }] = useDeleteReviewMutation()

    const handleSearch = (e) => {
        e.preventDefault()
        getProductReview(productId);
    }

    const handleDeleteButton = (e,id) => {
        e.preventDefault();
        deleteReview({productId,id});
    }

    useEffect(() => {

        if (error) {
            toast.error(error?.data?.message

            )
        }
        if (isSuccess) {
            toast.success("Deleted Review Successfully")
        }

    }, [error, isSuccess])

    const setData = () => {

        const reviews = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc"
                },
                {
                    label: "Rating",
                    field: "rating",
                    sort: "asc"
                }, {
                    label: "Comment",
                    field: "comment",
                    sort: "asc"
                }, {
                    label: "Actions",
                    field: "actions",
                    sort: "asc"
                }
            ],
            rows: []
        }

        data?.reviews?.map((item) => {
            reviews.rows.push({
                id: item._id,
                name: item.user.name,
                rating: item.rating,
                comment: item.comment,
                actions: <>
                    <Link
                        onClick={(e) => handleDeleteButton(e, item._id)}
                        className="btn btn-success  ">
                        <MdDelete /></Link>
                </>
            })
        })

        return reviews

    }

    return (
        <AdminLayout>
            <div class="row justify-content-center my-5">
                <div class="col-6">
                    <form>
                        <div class="mb-3">
                            <label for="productId_field" class="form-label">
                                Enter Product ID
                            </label>
                            <input
                                type="text"
                                id="productId_field"
                                class="form-control"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <button
                            id="search_button"
                            type="submit"
                            class="btn btn-primary w-100 py-2"
                            onClick={handleSearch}
                        >
                            SEARCH
                        </button>
                    </form>
                </div>
            </div>

            {/* <h5 class="mt-3 text-center">Product name: <b></b></h5> */}
            {/* <table class="table table-bordered table-striped mt-5">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Rating</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table> */}
            <MDBDataTable
                data={setData()}
                className=" px-3"
                bordered
                striped
                hover
            />
        </AdminLayout>
    )
}

export default ProductReviews