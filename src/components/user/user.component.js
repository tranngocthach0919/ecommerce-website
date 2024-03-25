import { useState } from "react";
import { useGetUserQuery } from "../../redux/api/api.slice";
import { useNavigate } from "react-router-dom";

const User = () => {
    const { data } = useGetUserQuery();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    return (
        <>
            <div className="relative"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-9 h-9 cursor-pointer"  
                    onClick={() => setShow(!show)}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {show && (
                    <div className="absolute w-max top-full right-0 mt-2 bg-white border-2 border-gray-300 rounded-3xl">
                        <div className="py-1">
                            <div className="text-black-500 font-medium px-4 py-2 text-sm">
                                <span className={`p-2 rounded-lg ${data ? 'bg-gray-100' : ''} `}>{data?.username}</span>
                            </div>
                            <form>
                                <button
                                    type="submit"
                                    className="flex justify-around text-black-500 font-bold w-full px-5 py-2 text-left text-sm"
                                    onClick={() => {
                                        if (data) {
                                            localStorage.removeItem('accessToken');
                                        } else {
                                            navigate('/login');
                                        }
                                    }}
                                >
                                    { data ? 'Sign out' : 'Sign in' }
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default User;
