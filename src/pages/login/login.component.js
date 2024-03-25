import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDataLoginMutation } from "../../redux/api/api.slice";


const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);
    const [dataLogin] = useDataLoginMutation();

    const getDataLogin = () => {
        const { email, password } = getValues();
        dataLogin({ email, password })
            .unwrap()
            .then((data) => {
                localStorage.setItem('accessToken', data.accessToken);
                navigate('/');
                alert('Login successfully');
            })
            .catch((err) => {
                console.log('error: ', err);
                alert('Login failed, please try again!');
            });
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="min-h-screen bg-teal-50 flex justify-center items-center">
                <div className="py-12 px-12 bg-white rounded-2xl shadow-2xl z-20">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-6 cursor-pointer">Sign in</h1>
                    </div>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Email Addres"
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            {...register("email", {
                                required: "Email is required!",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: 'Please enter email valid'
                                },
                            })}
                        />
                        <p className="text-red-500 text-sm">
                            {errors.email?.message}
                        </p>
                        <input
                            type="password"
                            placeholder="********"
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            {...register("password", {
                                required: "Password is required!",
                            })}
                        />
                        <p className="text-red-500 text-sm">
                            {errors.password?.message}
                        </p>
                    </div>
                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            onClick={getDataLogin}
                            className="py-3 w-64 text-xl text-white bg-teal-600 hover:bg-teal-700 rounded-2xl">
                            Sign in
                        </button>
                        <p className="mt-4 text-sm">
                            Don't Have An Account?
                            <Link
                                to='/create-account'
                                className="underline font-medium text-black-700 hover:text-gray-600 px-2">
                                Register now
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;