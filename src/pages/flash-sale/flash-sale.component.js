import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { useGetProductsQuery } from "../../redux/api/api.slice";
import './flash-sale.styles.css';
import { addProductToCart, statusChange } from "../../redux/client/carts.slice";

const FlashSale = () => {
    const dispatch = useDispatch();
    const { data } = useGetProductsQuery();
    let dataProducts = [];
    if (data) {
        dataProducts = [...data.dataProducts];
        dataProducts = dataProducts.filter(product => product.discount);
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="container my-4 mx-auto px-4 pb-7 md:px-12 bg-gray-50 rounded-xl">
            <Slider {...settings}>
                {dataProducts?.map(pro => (
                    <div key={pro.id} className="grid grid-cols-1 gap-8 mt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 ">
                        <div className="flex flex-col items-center justify-center w-5/6 max-w-lg mx-auto rounded-2xl" >
                            <img className="object-cover w-full h-60 rounded-2xl" src={pro.image} alt="Laptop" />
                            <h4 className="mt-2 text-lg font-medium text-gray-700">{pro.proname}</h4>
                            <div>
                                <span className="text-red-500 italic line-through px-4">{pro.price}đ</span>
                                <span className="text-black px-4">{pro.saleprice}đ</span>
                            </div>
                            <button
                                onClick={() => hanleAddtoCart(pro)}
                                className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-400 rounded-md hover:bg-gray-500 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                <span className="mx-1">Add to cart</span>
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FlashSale;