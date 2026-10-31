import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import {getUsers} from '../../actions/userActions'
import {adminOrders as adminOrdersAction} from '../../actions/orderActions'
import { Link } from "react-router-dom";

export default function Dashboard () {
    const { products = [] } = useSelector( state => state.productsState);
    const { adminOrders = [] } = useSelector( state => state.orderState);
    const { users = [] } = useSelector( state => state.userState);
    const dispatch = useDispatch();
    let outOfStock = 0;

    if (products.length > 0) {
        products.forEach( product => {
            if( product.stock === 0  ) {
                outOfStock = outOfStock + 1;
            }
        })
    }

    let totalAmount = 0;
    if (adminOrders.length > 0) {
        adminOrders.forEach( order => {
            totalAmount += order.totalPrice
        })
    }



    useEffect( () => {
       dispatch(getAdminProducts);
       dispatch(getUsers);
       dispatch(adminOrdersAction)
    }, [dispatch])


    return (
    <div className="admin-dashboard">

        <div className="admin-sidebar">
            <Sidebar />
        </div>

        <div className="admin-dashboard-content">

            {/* Dashboard Header */}
            <div className="dashboard-header">
                <div>
                    <span className="dashboard-eyebrow">ADMINISTRATION</span>
                    <h1>Dashboard</h1>
                    <p>Overview of your store's performance.</p>
                </div>
            </div>

            {/* Revenue Card */}
            <div className="revenue-card">
                <div className="revenue-card-content">
                    <span className="revenue-label">TOTAL REVENUE</span>
                    <h2>${totalAmount}</h2>
                    <p>Total amount generated from orders</p>
                </div>

                <div className="revenue-icon">
                    <i className="fas fa-wallet"></i>
                </div>
            </div>

            {/* Statistics */}
            <div className="dashboard-stats-grid">

                {/* Products */}
                <div className="dashboard-stat-card">
                    <div className="stat-card-top">
                        <div className="stat-icon products-icon">
                            <i className="fas fa-box"></i>
                        </div>
                        <span className="stat-category">INVENTORY</span>
                    </div>

                    <h3>{products.length}</h3>
                    <p>Total Products</p>

                    <Link to="/admin/products" className="stat-card-link">
                        View Products
                        <i className="fa fa-arrow-right"></i>
                    </Link>
                </div>

                {/* Orders */}
                <div className="dashboard-stat-card">
                    <div className="stat-card-top">
                        <div className="stat-icon orders-icon">
                            <i className="fas fa-shopping-bag"></i>
                        </div>
                        <span className="stat-category">SALES</span>
                    </div>

                    <h3>{adminOrders.length}</h3>
                    <p>Total Orders</p>

                    <Link to="/admin/orders" className="stat-card-link">
                        View Orders
                        <i className="fa fa-arrow-right"></i>
                    </Link>
                </div>

                {/* Users */}
                <div className="dashboard-stat-card">
                    <div className="stat-card-top">
                        <div className="stat-icon users-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <span className="stat-category">CUSTOMERS</span>
                    </div>

                    <h3>{users.length}</h3>
                    <p>Registered Users</p>

                    <Link to="/admin/users" className="stat-card-link">
                        View Users
                        <i className="fa fa-arrow-right"></i>
                    </Link>
                </div>

                {/* Out of Stock */}
                <div className="dashboard-stat-card">
                    <div className="stat-card-top">
                        <div className="stat-icon stock-icon">
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <span className="stat-category">INVENTORY</span>
                    </div>

                    <h3>{outOfStock}</h3>
                    <p>Out of Stock</p>

                    <div className="stat-card-note">
                        Products unavailable
                    </div>
                </div>

            </div>
        </div>
    </div>
);
}