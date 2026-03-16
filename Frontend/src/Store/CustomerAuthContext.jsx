import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CustomerAuthContext = createContext();

export const CustomerAuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial load: check for token in localStorage
    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('customerToken');
            if (token) {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const res = await axios.get('/customer/auth/me');
                    if (res.data.success) {
                        setCustomer(res.data.customer);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error('Error verifying customer token', error);
                    logout();
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = (token, customerData) => {
        localStorage.setItem('customerToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setCustomer(customerData);
    };

    const logout = () => {
        localStorage.removeItem('customerToken');
        delete axios.defaults.headers.common['Authorization'];
        setCustomer(null);
    };

    return (
        <CustomerAuthContext.Provider value={{ customer, login, logout, loading }}>
            {children}
        </CustomerAuthContext.Provider>
    );
};
