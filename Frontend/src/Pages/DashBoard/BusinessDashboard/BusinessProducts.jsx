import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

export const BusinessProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ name: "", description: "", price: "", image: "" });

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/business/products/get-products', { withCredentials: true });
            if (res.data.success) setProducts(res.data.products);
        } catch (err) {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = currentProduct._id
                ? await axios.put(`/business/products/update-product/${currentProduct._id}`, currentProduct, { withCredentials: true })
                : await axios.post('/business/products/add-product', currentProduct, { withCredentials: true });

            if (res.data.success) {
                toast.success(res.data.message);
                setShowModal(false);
                fetchProducts();
            }
        } catch (err) {
            toast.error("Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            const res = await axios.delete(`/business/products/delete-product/${id}`, { withCredentials: true });
            if (res.data.success) {
                toast.success("Product deleted");
                fetchProducts();
            }
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    if (loading) return <div>Loading Products...</div>;

    return (
        <div className="fd-card">
            <div className="fd-section-header-flex">
                <h2 className="fd-section-title">Manage Products</h2>
                <button className="fd-btn-primary" onClick={() => { setCurrentProduct({ name: "", description: "", price: "", image: "" }); setShowModal(true); }}>
                    <FaPlus /> Add Product
                </button>
            </div>

            <div className="fd-menu-list">
                {products.map(p => (
                    <div className="fd-menu-item" key={p._id}>
                        <img src={p.image || "https://via.placeholder.com/100"} alt={p.name} className="fd-menu-img" />
                        <div className="fd-menu-details">
                            <h4>{p.name}</h4>
                            <p>{p.description}</p>
                            <span className="fd-price-tag">Rs. {p.price}</span>
                        </div>
                        <div className="fd-menu-btns">
                            <button className="fd-btn-edit" onClick={() => { setCurrentProduct(p); setShowModal(true); }}><FaEdit /> Edit</button>
                            <button className="fd-btn-delete" onClick={() => handleDelete(p._id)}><FaTrash /> Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fd-modal-overlay">
                    <div className="fd-modal-content">
                        <h3>{currentProduct._id ? "Edit Product" : "Add New Product"}</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="fd-input" placeholder="Product Name" value={currentProduct.name} onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })} required />
                            <textarea className="fd-textarea" placeholder="Description" value={currentProduct.description} onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })} required />
                            <input type="number" className="fd-input" placeholder="Price" value={currentProduct.price} onChange={e => setCurrentProduct({ ...currentProduct, price: e.target.value })} required />
                            <input type="text" className="fd-input" placeholder="Image URL" value={currentProduct.image} onChange={e => setCurrentProduct({ ...currentProduct, image: e.target.value })} />
                            <div className="fd-menu-btns">
                                <button type="submit" className="fd-btn-primary">Save</button>
                                <button type="button" className="fd-btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
