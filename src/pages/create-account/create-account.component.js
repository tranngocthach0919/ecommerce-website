import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAddAccountMutation, useAddCustomerMutation } from "../../redux/api/api.slice";

const CreateAccount = () => {
    const navigate = useNavigate();
    const {
        register,
        getValues,
        watch,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm();
    const onSubmit = data => console.log(data);

    const [addAccount] = useAddAccountMutation();
    const [addCustomer] = useAddCustomerMutation();

    const handleCreate = () => {
        const { cusname, email, password, phonenumber, address } = getValues();
        if (isValid) {
            try {
                addAccount({ username: email, password });
                addCustomer({ cusname, email, password, phonenumber, address });
                alert("Account created");
                navigate("/login");
            } catch (err) {
                console.log(err);
                alert('Failed to create account');
            }
        }

    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="min-h-screen bg-teal-50 flex justify-center items-center">
                <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-6 cursor-pointer">
                            Sign up
                        </h1>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="cusname"
                                placeholder="Full name..."
                                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                                {...register("cusname",
                                    {
                                        required: "This field cannot be left blank!"
                                    })
                                }
                            />
                            <p className="text-red-500 text-xs">
                                {errors.cusname?.message}
                            </p>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email Addres"
                                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                                {...register("email", {
                                    required: "This field cannot be left blank!",
                                    pattern: {
                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: 'Please enter email valid'
                                    },
                                })}
                            />
                            <p className="text-red-500 text-xs">
                                {errors.email?.message}
                            </p>
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                                {...register("password", {
                                    required: "Password is required!",
                                    minLength: {
                                        value: 4,
                                        message: "Password length must be >=4",
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Password length must be <=12",
                                    },
                                })}
                            />
                            <p className="text-red-500 text-sm">
                                {errors.password?.message}
                            </p>
                        </div>
                        <div>
                            <input
                                type="password"
                                name="passwordConfirm"
                                placeholder="Password Confirmation"
                                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                                {...register("passwordConfirm", {
                                    required: "PasswordConfirm is required!",
                                    minLength: {
                                        value: 4,
                                        message: "PasswordConfirm length must be >=4",
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "PasswordConfirm length must be <=12",
                                    },
                                    validate: (value) => {
                                        if (watch("password") !== value) {
                                            return "Your passwords do not match";
                                        }
                                    },
                                })}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="phonenumber"
                                placeholder="+84"
                                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                                {...register("phonenumber", {
                                    required: "This field cannot be left blank!",
                                    minLength: {
                                        value: 10,
                                        message: "This input must exceed 10 characters"
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "This input must not exceed 10 characters"
                                    },
                                })}
                            />
                            <p className="text-red-500 text-xs">
                                {errors.phonenumber?.message}
                            </p>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                                {...register("address", { required: "This field cannot be left blank!" })}
                            />
                            <p className="text-red-500 text-xs">
                                {errors.address?.message}
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <button 
                         onClick={handleCreate}   
                        className="py-3 w-64 text-xl text-white bg-teal-600 hover:bg-teal-700 rounded-2xl">
                            Create Account
                        </button>
                        <p className="mt-4 text-sm">
                            Already Have An Account?
                            <Link
                                to="/login"
                                className="underline font-medium text-black-700 hover:text-gray-600 px-2"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateAccount;
