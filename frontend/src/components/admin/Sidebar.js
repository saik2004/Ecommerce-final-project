import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export default function Sidebar () {

    const navigate = useNavigate();

   return (
    <div className="sidebar-wrapper">
        <nav id="sidebar" className="admin-sidebar-nav">

            <div className="sidebar-heading">
                <span>ADMIN PANEL</span>
            </div>

            <ul className="list-unstyled components">

                <li>
                    <Link to="/admin/dashboard" className="sidebar-link">
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li className="sidebar-dropdown-item">
                    <NavDropdown
                        title={
                            <span className="sidebar-dropdown-title">
                                <i className="fab fa-product-hunt"></i>
                                <span>Product</span>
                            </span>
                        }
                        className="sidebar-product-dropdown"
                    >
                        <NavDropdown.Item
                            onClick={() => navigate('/admin/products')}
                        >
                            <i className="fas fa-shopping-basket"></i>
                            All Products
                        </NavDropdown.Item>

                        <NavDropdown.Item
                            onClick={() => navigate('/admin/products/create')}
                        >
                            <i className="fas fa-plus"></i>
                            Create Product
                        </NavDropdown.Item>
                    </NavDropdown>
                </li>

                <li>
                    <Link to="/admin/orders" className="sidebar-link">
                        <i className="fas fa-shopping-basket"></i>
                        <span>Orders</span>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/users" className="sidebar-link">
                        <i className="fas fa-users"></i>
                        <span>Users</span>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/reviews" className="sidebar-link">
                        <i className="fas fa-star"></i>
                        <span>Reviews</span>
                    </Link>
                </li>

            </ul>
        </nav>
    </div>
);
}