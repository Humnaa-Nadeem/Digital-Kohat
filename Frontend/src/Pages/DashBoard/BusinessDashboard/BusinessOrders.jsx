import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const BusinessOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('/business/orders/get-orders', { withCredentials: true });
            if (res.data.success) setOrders(res.data.orders);
        } catch (err) {
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const updateStatus = async (id, status) => {
        try {
            const res = await axios.put(`/business/orders/update-status/${id}`, { status }, { withCredentials: true });
            if (res.data.success) {
                toast.success("Order status updated");
                fetchOrders();
            }
        } catch (err) {
            toast.error("Update failed");
        }
    };

    if (loading) return <div>Loading Orders...</div>;

    return (
        <div className="fd-card">
            <h2 className="fd-section-title">Order Management</h2>
            <div className="fd-orders-list">
                {orders.map(o => (
                    <div className="fd-order-card" key={o._id}>
                        <div className="fd-order-header">
                            <h4>Order #{o._id.slice(-6)}</h4>
                            <span className={`fd-status-pill ${o.status.toLowerCase()}`}>{o.status}</span>
                        </div>
                        <div className="fd-order-body">
                            <p><strong>Customer:</strong> {o.customerName}</p>
                            <p><strong>Items:</strong> {o.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}</p>
                            <p className="fd-total-price">Total: Rs. {o.totalAmount}</p>
                        </div>
                        <div className="fd-order-actions">
                            <select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)} className="fd-input" style={{ width: 'auto' }}>
                                <option>New</option>
                                <option>Pending</option>
                                <option>Approved</option>
                                <option>Rejected</option>
                                <option>Received</option>
                            </select>
                        </div>
                    </div>
                ))}
                {orders.length === 0 && <p>No orders found.</p>}
            </div>
        </div>
    );
};
