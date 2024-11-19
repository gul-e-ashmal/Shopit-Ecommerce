import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../layouts/AdminLayout'
import { FaTimes, FaTrash } from "react-icons/fa";
import { useDeleteProductImagesMutation, useGetProductDetailQuery, useUploadProductImagesMutation } from '../../reudx/API/productApi';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const UploadProductImages = () => {

    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const param = useParams()

    const { data } = useGetProductDetailQuery({ id: param.id });
    const [uploadProductImages, { error, isSuccess }] = useUploadProductImagesMutation();
    const [deleteProductImages, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteProductImagesMutation();
    useUploadProductImagesMutation();
    const product = data?.product;


    useEffect(() => {

        if (product?.images) {
            setOldImages(product?.images)
        }

    }, [data])

    useEffect(() => {
        if (deleteError) {
            toast.error(deleteError?.data?.message)
        }
        if (deleteSuccess) {
            toast.success("Deleted successfully")
        }
    }, [deleteError, deleteSuccess])

    useEffect(() => {

        if (error) {
            toast.error(error?.data?.message)
        }
        if (isSuccess) {
            toast.success("Uploaded successfully")
        }

    }, [error, isSuccess])


    const onChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((array) => [...array, reader.result]);
                    setPreviewImages((array) => [...array, reader.result]);
                    console.log(reader.result)
                }
            }
            reader.readAsDataURL(file)
        })
    }

    const previewImageDelete = (image) => {
        const fileteredProduct = previewImages.filter((img) => img != image);

        setImages(fileteredProduct);
        setPreviewImages(fileteredProduct)
    }

    const handleFileInputRef = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }

    }

    const handleUpload = (e) => {
        e.preventDefault();
        // alert(product?._id)
        uploadProductImages({ id: product?._id, images })
    }

    const handleDelete = (e, imgId) => {
        e.preventDefault();
        deleteProductImages({ id: product?._id,  imgId })
    }

    return (

        <AdminLayout> <div class="row wrapper">
            <div class="col-10 col-lg-8 mt-5 mt-lg-0">
                <form class="shadow rounded bg-body" enctype="multipart/form-data" onSubmit={handleUpload}>
                    <h2 class="mb-4">Upload Product Images</h2>

                    <div class="mb-3">
                        <label for="customFile" class="form-label">Choose Images</label>

                        <div class="custom-file">
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="product_images"
                                className="form-control"
                                id="customFile"
                                multiple={true}
                                onChange={onChange}
                                onClick={handleFileInputRef}
                            />
                        </div>
                        {
                            previewImages.length > 0 && (
                                <div class="new-images my-4">
                                    <p class="text-warning">New Images:</p>
                                    <div class="row mt-4">
                                        {
                                            previewImages.map((item) => (
                                                <div class="col-md-3 mt-2">
                                                    <div class="card">
                                                        <img
                                                            src={item}
                                                            alt="Card"
                                                            class="card-img-top p-2"
                                                            style={{ width: "100%", height: "80px" }}
                                                        />
                                                        <button
                                                            style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                                                            type="button"
                                                            class="btn btn-block btn-danger cross-button mt-1 py-0"
                                                            onClick={() => previewImageDelete(item)}
                                                        >
                                                            {/* <i class="fa fa-times"></i> */}
                                                            <FaTimes />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                        {
                            oldImages?.length > 0 && (
                                <div class="uploaded-images my-4">
                                    <p class="text-success">Product Uploaded Images:</p>
                                    <div class="row mt-1">
                                        {
                                            oldImages?.map((item) => (
                                                <div class="col-md-3 mt-2">
                                                    <div class="card">
                                                        <img
                                                            src={item.url}
                                                            alt="Card"
                                                            class="card-img-top p-2"
                                                            style={{ width: "100%", height: "80px" }}
                                                        />
                                                        <button
                                                            style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                                                            class="btn btn-block btn-danger cross-button mt-1 py-0"
                                                            type="button"
                                                            onClick={(e) => handleDelete(e, item?.public_id)}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <button id="register_button" type="submit" class="btn w-100 py-2">
                        Upload
                    </button>
                </form>
            </div>
        </div></AdminLayout>
    )
}

export default UploadProductImages