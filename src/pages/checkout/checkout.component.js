import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeAll } from "../../redux/client/carts.slice";
import { useAddOrderMutation, useGetCustomerQuery, useGetUserQuery } from "../../redux/api/api.slice";

const CheckOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cusname, setCusname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const { cart, totalCost, totalQuantity } = useSelector(state => state.carts);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = data => console.log(data);

    const { data: user } = useGetUserQuery();
    let username = '';
    if (user) {
        username = user.username;
    }

    const { data: customer } = useGetCustomerQuery(username);
    useEffect(() => {
        if (!customer) {
            return;
        }
        setCusname(customer.cusname);
        setPhonenumber(customer.phonenumber);
        setAddress(customer.address);
    }, [customer]);

    const [addorder] = useAddOrderMutation();
    const handleCheckout = () => {
        if (cusname && phonenumber && address ? true : isValid) {
            try {
                let order = {
                    cusname,
                    phonenumber,
                    address,
                    products: [...cart],
                    totalCost,
                    status: 'pending'
                };
                addorder(order);
                dispatch(removeAll());
                alert('Your order will be processed as soon as possible!');
            } catch (err) {
                alert('Failed!');
                console.log(err);
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="leading-loose flex justify-around">
            <div
                className="max-w-xl mt-14 p-10 bg-white rounded shadow-2xl">
                <p className="text-gray-800 font-medium">Thông tin đơn hàng</p>
                <div className="flex mb-2 font-medium">
                    <label className="w-2/3 block text-md text-gray-600">
                        Tổng số lượng:
                    </label>
                    <label>{totalQuantity}</label>
                </div>
                <div className="flex mb-2 font-medium">
                    <label className="w-2/3 block text-md text-gray-600">
                        Tổng chi phí:
                    </label>
                    <label>{totalCost}đ</label>
                </div>
                <p className="text-gray-800 font-medium">Thông tin khách hàng</p>
                <div className="">
                    <label className="block text-md text-gray-600">
                        Tên khách hàng
                    </label>
                    <input
                        className="w-full px-5 py-1 text-gray-700 bg-gray-50 rounded"
                        id="cusname"
                        name="cusname"
                        type="text"
                        value={cusname}
                        placeholder="Your Name"
                        {...register("cusname", {
                            required: cusname ? false : 'Please enter your name!',
                            onChange: (event) => setCusname(event.target.value),
                        })}
                    />
                    <p className="text-red-500 text-xs">
                        {errors.cusname?.message}
                    </p>
                </div>
                <div className="mt-2">
                    <label className="block text-md text-gray-600">
                        Số điện thoại
                    </label>
                    <input
                        className="w-full px-5 py-2 text-gray-700 bg-gray-50 rounded"
                        id="phonenumber"
                        name="phonenumber"
                        type="text"
                        value={phonenumber}
                        placeholder="+84"
                        {...register("phonenumber", {
                            required: phonenumber ? false : "This field cannot be left blank!",
                            minLength: {
                                value: 10,
                                message: "This input must exceed 10 charac  ters"
                            },
                            maxLength: {
                                value: 10,
                                message: "This input must not exceed 10 characters"
                            },
                            onChange: (event) => setPhonenumber(event.target.value),
                        })}
                    />
                    <p className="text-red-500 text-xs">
                        {errors.phonenumber?.message}
                    </p>
                </div>
                <div className="mt-2">
                    <label className=" block text-md text-gray-600">
                        Địa chỉ
                    </label>
                    <input
                        className="w-full px-5 py-2 text-gray-700 bg-gray-50 rounded"
                        id="address"
                        name="address"
                        type="text"
                        value={address}
                        placeholder="Street"
                        {...register("address", {
                            required: address ? false : 'Please enter your address!',
                            onChange: (event) => setAddress(event.target.value),
                        })}
                    />
                    <p className="text-red-500 text-xs">
                        {errors.address?.message}
                    </p>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => navigate('/cart')}
                        className="mr-3 px-4 py-1 text-white font-light tracking-wider bg-gray-500 rounded hover:bg-gray-800">
                        Cancel
                    </button>
                    <button
                        className="px-4 py-1 text-white font-light tracking-wider bg-gray-500 rounded hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-gray-500"
                        onClick={handleCheckout}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CheckOut;
