import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

// import App from './App';
import store from './redux/store';
import Login from './pages/login/login.component';
import CreateAccount from './pages/create-account/create-account.component';
import Home from './pages/home/home.component';
import Template from './components/template/template.component';
import Cart from './pages/cart/cart.component';
import About from './pages/about/about.component';
import Product from './pages/product/product.component';
import ProductDetail from './pages/product-detail/product-detail.component';
import CheckOut from './pages/checkout/checkout.component';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/create-account',
        element: <CreateAccount />
    },
    {
        path: '/checkout',
        element: <CheckOut />
    },
    {
        path: '/',
        element: <Template />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/product',
                element: <Product />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/product-detail/:id',
                element: <ProductDetail />,
            },
        ]
    },
    
])

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

