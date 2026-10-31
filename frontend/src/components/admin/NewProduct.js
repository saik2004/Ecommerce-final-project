import {useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export  default function NewProduct () {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    
    const { loading, isProductCreated, error } = useSelector( state => state.productState)

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2 ) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }
            }

            reader.readAsDataURL(file)


        })

    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name' , name);
        formData.append('price' , price);
        formData.append('stock' , stock);
        formData.append('description' , description);
        formData.append('seller' , seller);
        formData.append('category' , category);
        images.forEach (image => {
            formData.append('images', image)
        })
        dispatch(createNewProduct(formData))
    }

    useEffect(() => {
        if(isProductCreated) {
            toast('Product Created Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductCreated())
            })
            navigate('/admin/products')
            return;
        }

        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
    }, [isProductCreated, error, dispatch,navigate])


  return (
    <div className="admin-dashboard">

        <div className="admin-sidebar">
            <Sidebar />
        </div>

        <div className="admin-dashboard-content">

            <div className="product-form-page">

                <div className="product-form-header">
                    <span className="dashboard-eyebrow">PRODUCT MANAGEMENT</span>
                    <h1>Add New Product</h1>
                    <p>Enter the product details to add it to your store.</p>
                </div>

                <form
                    onSubmit={submitHandler}
                    className="new-product-form"
                    encType="multipart/form-data"
                >

                    <div className="product-form-section">
                        <h3>Basic Information</h3>

                        <div className="product-form-group">
                            <label htmlFor="name_field">Product Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="product-form-control"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className="product-form-row">
                            <div className="product-form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="product-form-control"
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>

                            <div className="product-form-group">
                                <label htmlFor="category_field">Category</label>
                                <select
                                    onChange={e => setCategory(e.target.value)}
                                    className="product-form-control"
                                    id="category_field"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="product-form-group">
                            <label htmlFor="description_field">Description</label>
                            <textarea
                                className="product-form-control product-description-field"
                                id="description_field"
                                rows="6"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            ></textarea>
                        </div>
                    </div>

                    <div className="product-form-section">
                        <h3>Inventory & Seller</h3>

                        <div className="product-form-row">
                            <div className="product-form-group">
                                <label htmlFor="stock_field">Stock Quantity</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="product-form-control"
                                    onChange={e => setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>

                            <div className="product-form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="product-form-control"
                                    onChange={e => setSeller(e.target.value)}
                                    value={seller}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="product-form-section">
                        <h3>Product Images</h3>

                        <div className="product-form-group">
                            <label htmlFor="customFile">Upload Images</label>

                            <div className="product-upload-box">
                                <input
                                    type="file"
                                    name="product_images"
                                    className="product-file-input"
                                    id="customFile"
                                    multiple
                                    onChange={onImagesChange}
                                />

                                <label htmlFor="customFile" className="product-upload-label">
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    <span>Choose product images</span>
                                    <small>Select one or more images from your device</small>
                                </label>
                            </div>

                            {imagesPreview.length > 0 && (
                                <div className="product-image-previews">
                                    {imagesPreview.map(image => (
                                        <img
                                            className="product-preview-image"
                                            key={image}
                                            src={image}
                                            alt="pic Preview"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        id="login_button"
                        type="submit"
                        disabled={loading}
                        className="create-product-button"
                    >
                        {loading ? 'CREATING...' : 'CREATE PRODUCT'}
                    </button>

                </form>
            </div>

        </div>
    </div>
);
}