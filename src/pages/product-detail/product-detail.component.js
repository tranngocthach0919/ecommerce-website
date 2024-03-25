import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProductQuery } from "../../redux/api/api.slice";
import { addProductToCart, statusChange } from "../../redux/client/carts.slice";


const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id: idParam } = useParams();
    const { data = [] } = useGetProductQuery(idParam);

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
        <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={data?.image} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-xl title-font font-medium text-gray-700 tracking-widest">{data?.category}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data?.proname}</h1>
                        <p className="leading-relaxed">{data?.desc}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                            <div className="flex">
                                <span className="mr-3">Color: {data?.color}</span>
                            </div>
                        </div>
                        <div className="flex">
                            {
                                data?.discount === 0 ?
                                    <span className="title-font font-medium text-2xl text-gray-900">
                                        {data?.saleprice}đ
                                    </span>
                                    :
                                    <>
                                        <span className="title-font font-medium text-2xl text-red-500 italic line-through px-4">
                                            {data?.price}đ
                                        </span>
                                        <span className="title-font font-medium text-2xl text-gray-900">
                                            {data?.saleprice}đ
                                        </span>
                                    </>
                            }
                            <button
                                onClick={() => hanleAddtoCart(data)}
                                className="flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;