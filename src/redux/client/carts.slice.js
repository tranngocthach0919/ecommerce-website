import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const nextId = (list) => {
    let maxId;
    if (list && list.length > 0) {
        maxId = list[list.length - 1].cartId + 1;
    } else {
        maxId = 1;
    }
    return maxId;
}

const initialState = {
    cart: [],
    totalQuantity: 0,
    totalCost: 0,
    cartStatus: false,
};

if (localStorage.getItem('list-cart')) {
    const storedCart = JSON.parse(localStorage.getItem('list-cart'));
    if (Array.isArray(storedCart)) {
        initialState.cart = storedCart;
    } else {
        initialState.cart = [];
    }
    initialState.totalQuantity = initialState.cart.reduce((acc, cart) => acc + cart.quantity, 0);
    initialState.totalCost = initialState.cart.reduce((acc, cart) => acc + (cart.saleprice * cart.quantity), 0);
}

const cartsSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        // addToCart: (state, action) => {
        //     const target = state.cart.find(cart => cart.id === action.payload.id);
        //     if (target) {
        //         target.quantity += 1;
        //     } else {
        //         const cartItem = {
        //             cartId: nextId(state.cart),
        //             ...action.payload,
        //             quantity: 1,
        //         };
        //         state.cart.push(cartItem);
        //     }
        //     localStorage.setItem('list-cart', JSON.stringify(state.cart));
        // },

        // updateQuantity: (state, action) => {
        //     const { quantity, product } = action.payload;
        //     const target = state.cart.find(cart => cart.id === product.id);
        //     if (target) {
        //         target.quantity = quantity;
        //     }
        //     localStorage.setItem('list-cart', JSON.stringify(state.cart));
        // },

        // removeCart: (state, action) => {
        //     const target = state.cart.find(cart => cart.id === action.payload);
        //     if (target) {
        //         state.cart.splice(state.cart.indexOf(target), 1);
        //     }
        //     localStorage.setItem('list-cart', JSON.stringify(state.cart));
        // }
        statusChange: (state, action) => {
            state.cartStatus = action.payload;
        },
        removeAllCart: (state) => {
            state.cart = [];
            window.location.href = '/';
        }
    },
    extraReducers: builder => (
        builder
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.totalQuantity = state.cart.reduce((acc, cart) => acc + cart.quantity, 0);
                state.totalCost = state.cart.reduce((acc, cart) => acc + (cart.saleprice * cart.quantity), 0);
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.totalQuantity = state.cart.reduce((acc, cart) => acc + cart.quantity, 0);
                state.totalCost = state.cart.reduce((acc, cart) => acc + (cart.saleprice * cart.quantity), 0);
            })
    )
});

export const {
    // addToCart, 
    // updateQuantity, 
    // removeCart,
    statusChange,
    removeAllCart,
} = cartsSlice.actions;

export const addProductToCart = createAsyncThunk(
    'carts/addProductToCart',
    async (product, { getState }) => {
        let { cart } = getState().carts;
        const newCart = cart.map(cart => {
            if (cart.id === product.id) {
                return { ...cart, quantity: cart.quantity + 1 };
            }
            return cart;
        });
        if (newCart.every(cart => cart.id !== product.id)) {
            newCart.push({
                cartId: nextId(newCart),
                ...product,
                quantity: 1,
            });
        }
        localStorage.setItem('list-cart', JSON.stringify(newCart));
        return newCart;
    }
)

export const updateQuantity = createAsyncThunk(
    'carts/updateQuantity',
    async ({ product, quantity }, { getState }) => {
        const { cart } = getState().carts;
        const newCart = cart.map(cart => {
            if (cart.id === product.id) {
                return { ...cart, quantity };
            }
            return cart;
        });
        localStorage.setItem('list-cart', JSON.stringify(newCart));
        return newCart;
    }
);

export const removeCart = createAsyncThunk(
    'carts/updateQuantity',
    async (id, { getState }) => {
        const { cart } = getState().carts;
        const newCart = [...cart];
        const target = newCart.find(cart => cart.id === id);
        if (target) {
            newCart.splice(newCart.indexOf(target), 1);
        }
        localStorage.setItem('list-cart', JSON.stringify(newCart));
        return newCart;
    }
)

export const removeAll = createAsyncThunk(
    'carts/removeAll',
    async (_undefined, { dispatch }) => {
        localStorage.removeItem('list-cart');
        dispatch(removeAllCart());
    }
)


export default cartsSlice.reducer;
