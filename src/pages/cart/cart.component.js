import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeCart, updateQuantity } from '../../redux/client/carts.slice';
import './cart.styles.css';

const Cart = () => {
    const { cart, totalQuantity, totalCost } = useSelector(state => state.carts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let dataCarts = [...cart];

    const handleChangeQuantity = (event, product) => {
        const quantity = Number(event.target.value);
        dispatch(updateQuantity({ quantity, product }));
    }

    const handleDeleted = (product) => {
        dispatch(removeCart(product.id))
    }

    return (
        <>
            <div className="">
                <div className="container mx-auto mt-10">
                    <div className="flex shadow-2xl my-10">
                        <div className="w-3/4 bg-white px-10 py-10">
                            <>
                                <div className="flex justify-between border-b pb-8">
                                    <h1 className="font-semibold text-2xl">GIỎ HÀNG</h1>
                                    <h2 className="font-semibold text-2xl">{totalQuantity} Mặt hàng</h2>
                                </div>

                                <div>
                                    <div className="flex mt-10 mb-5">
                                        <h3 className="font-semibold text-gray-600 text-lg uppercase w-2/5">CHI TIẾT SẢN PHẨM</h3>
                                        <h3 className="font-semibold text-center text-gray-600 text-lg uppercase w-1/5 text-center">SỐ LƯỢNG</h3>
                                        <h3 className="font-semibold text-center text-gray-600 text-lg uppercase w-1/5 text-center">GIÁ GỐC</h3>
                                        <h3 className="font-semibold text-center text-gray-600 text-lg uppercase w-1/5 text-center">GIẢM GIÁ (%)</h3>
                                        <h3 className="font-semibold text-center text-gray-600 text-lg uppercase w-1/5 text-center">GIÁ SAU GIẢM</h3>
                                        <h3 className="font-semibold text-center text-gray-600 text-lg uppercase w-1/5 text-center">TỔNG TIỀN</h3>
                                    </div>
                                    {
                                        totalQuantity === 0 ?
                                            (
                                                <div className='text-2xl font-bold px-12'>
                                                    Không có sản phẩm nào được thêm vào giỏ
                                                </div>
                                            ) :
                                            dataCarts?.map((cart) => (
                                                <div key={cart.cartId} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                                    <div className="flex w-2/5" >
                                                        <div className="w-28">
                                                            <img className="h-28" src={cart.image} alt="" />
                                                        </div>
                                                        <div className="flex flex-col justify-between ml-4 flex-grow">
                                                            <span className="font-bold text-sx">{cart.proname}</span>
                                                            <span className="font-bold text-sx">{cart.category}</span>
                                                            <Link
                                                                onClick={() => handleDeleted(cart)} className="font-semibold hover:text-red-700 text-red-500 text-sx"
                                                            >
                                                                Xoá đơn hàng
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center w-1/5">
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            className="mx-2 pl-2 border text-justify w-2/5"
                                                            value={cart.quantity}
                                                            onChange={(event) => handleChangeQuantity(event, cart)}
                                                        />
                                                    </div>
                                                    <span className={`text-center w-1/5 font-semibold text-sx ${cart.discount ? 'line-through text-red-500 italic' : ''}`}>{cart.price}đ</span>
                                                    <span className="text-center w-1/5 font-semibold text-sx">
                                                        {cart.discount ? `${cart.discount}%` : 'No Discount'}
                                                    </span>
                                                    <span className="text-center w-1/5 font-semibold text-sx">
                                                        {cart.saleprice}đ
                                                    </span>
                                                    <span className="text-center w-1/5 font-semibold text-sx">
                                                        {cart.saleprice * cart.quantity}đ
                                                    </span>
                                                </div>
                                            ))
                                    }
                                </div>


                                <Link to='/' className="flex font-semibold text-indigo-600 text-sm mt-10">
                                    <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                                    Tiếp tục mua sắm
                                </Link>
                            </>
                        </div>

                        <div id="sumary" className="w-1/4 px-8 py-10">
                            <h1 className="font-semibold text-2xl border-b pb-8">Tổng đơn hàng</h1>
                            <div className="flex justify-between mt-10 mb-5">
                                <span className="font-semibold text-sm uppercase">Số lượng: {totalQuantity}</span>
                                <span className="font-semibold text-sm">{totalCost}</span>
                            </div>
                            <div className="border-t mt-8">
                                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                    <span>Tổng chi phí</span>
                                    <span>{totalCost}</span>
                                </div>
                                <button
                                    disabled={totalCost === 0}
                                    className="bg-gray-500 font-semibold hover:bg-gray-600 py-3 text-sm text-white uppercase w-full rounded-xl disabled:hover:bg-gray-500 disabled:opacity-25 "
                                    onClick={() => navigate('/checkout')}
                                >
                                    Đặt mua
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;