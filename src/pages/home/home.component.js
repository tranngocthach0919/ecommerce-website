import { Link } from 'react-router-dom';
import Category from "../category/category.component";
import FlashSale from "../flash-sale/flash-sale.component";

const Home = () => {

    return (
        <div className="bg-gray-50">
            <div className="mx-14">
                {/* section 1 */}
                <section className="bg-white rounded-xl">
                    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                        <div className="font-light text-gray-500 sm:text-lg">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">"Khám phá thế giới công nghệ dẫn đầu cùng với chúng tôi!"</h2>
                            <p className="mb-4">Chào mừng đến với cửa hàng bán laptop của chúng tôi! Chúng tôi cung cấp một bộ sưu tập đa dạng các laptop chất lượng từ các thương hiệu hàng đầu. Tìm kiếm và mua sắm laptop đã trở nên dễ dàng với trang web đơn giản và thông tin chi tiết. </p>
                            <p>Hãy khám phá ngay hôm nay và tìm chiếc laptop hoàn hảo cho nhu cầu của bạn.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <img className="w-full rounded-lg" src="https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="office content 1" />
                            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://images.unsplash.com/photo-1519332978332-21b7d621d05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="office content 2" />
                        </div>
                    </div>
                </section>
                {/* section 2 */}
                <section className="bg-white my-4 p-4 rounded-xl">
                    <h1 className="font-bold text-3xl text-gray-900">Giá sốc săn ngay!!!</h1>
                    <FlashSale />
                </section>
                {/* section 3 */}
                <section className="bg-white my-4 p-4 rounded-xl">
                    <Category per={8} />
                    <div className='flex justify-around'>
                        <Link to='/product' className="bg-teal-700 px-4 py-2 text-white font-medium rounded-lg">Xem thêm</Link>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default Home;