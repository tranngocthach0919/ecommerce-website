import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/api.slice";
import { addProductToCart, statusChange } from "../../redux/client/carts.slice";


const Product = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useSelector(state => state.filters);
    const { data } = useGetProductsQuery({ search });
    let dataProducts = [];
    if (data) {
        dataProducts = [...data.filterProducts];
    }

    const hanleAddtoCart = (product) => {
        try {
            dispatch(addProductToCart(product));
            dispatch(statusChange(true))
            setTimeout(() => {
                dispatch(statusChange(false));
            }, 100)
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="m-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 p-4">
                {
                    dataProducts?.map(pro => (
                        <div key={pro.id} className="w-full h-[23rem] p-4 bg-gray-50 rounded-3xl">
                            <img
                                src={pro.image}
                                className="w-full h-2/3 rounded-xl"
                                alt=''
                            />
                            <div className="flex justify-between mt-2 px-3">
                                <h4 className="font-bold">{pro.proname}</h4>
                                {
                                    pro.discount === 0 ? (
                                        <h3 className="font-medium">{pro.saleprice}đ</h3>
                                    ) : (
                                        <div className="flex-col">
                                            <h3 className="font-medium">{pro.saleprice}đ</h3>
                                            <h3 className="font-medium text-sm text-gray-500 line-through">{pro.price}đ</h3>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='flex justify-between'>
                                <button 
                                onClick={() => navigate(`/product-detail/${pro.id}`)}
                                className="w-2/6 px-2 py-2 mt-4 font-medium bg-gray-300 rounded-xl hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                                    <span>View</span>
                                </button>
                                <button
                                    onClick={() => hanleAddtoCart(pro)}
                                    className="flex items-center justify-center w-3/5 px-2 py-2 mt-4 font-medium bg-gray-300 rounded-xl hover:bg-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <span>Add to cart</span>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Product;