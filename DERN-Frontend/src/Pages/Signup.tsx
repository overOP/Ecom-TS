import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "@/Components/Components/Input";
import { http } from "../config/Axios";
import { gsap } from "gsap";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface ApiResponse {
  success: boolean;
  accessToken: string;
  user: User;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  accountType: "normal" | "business";
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      "#box1",
      { opacity: 0, y: 50, scale: 3 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        borderRadius: "1rem",
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }, []);

  const handleTabClick = (isLoginTab: boolean) => {
    setIsLogin(isLoginTab);
  };

  const handlePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const signup = async (data: FormData) => {
    try {
      const response = await http.post<ApiResponse>("users/signUp", data);
      console.log("SignUp response:", response.data);
      if (response.data.success) {
        alert("SignUp successful");
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("SignUp error:", error);
      alert("SignUp failed");
    }
  };

  const login = async (data: FormData) => {
    try {
      const response = await http.post<ApiResponse>("users/login", data);
      console.log("Login response:", response.data);
      if (response.data.success) {
        alert("Login successful");
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1f2937] via-[#334155] to-[#64748b]">
      <div
        id="box1"
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
      >
        <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-bold">
            {isLogin ? "LogIn Form" : "SignUp Form"}
          </h2>
        </div>

        <div className="flex justify-between bg-gray-100 rounded-full p-1 mb-6">
          <button
            className={`w-1/2 py-2 rounded-full font-medium ${
              isLogin
                ? "text-white bg-gradient-to-r from-blue-900 to-blue-500"
                : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-500"
            }`}
            onClick={() => handleTabClick(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-full font-medium ${
              !isLogin
                ? "text-white bg-gradient-to-r from-blue-900 to-blue-500"
                : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-500"
            }`}
            onClick={() => handleTabClick(false)}
          >
            Signup
          </button>
        </div>

        {isLogin ? (
          <form className="space-y-4" onSubmit={handleSubmit(login)}>
            <Input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={handlePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <img
                  className="w-6"
                  src={showPassword ? "/public/view.png" : "/public/eye.png"}
                  alt="Toggle Password"
                />
              </button>
            </div>

            <a href="#" className="text-blue-500 text-sm block mb-2">
              Forgot password?
            </a>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-900 to-blue-500 text-white py-3 rounded-md font-semibold"
            >
              LogIn
            </button>
            <p className="text-sm text-center">
              Not a member?{" "}
              <a href="/signup" className="text-blue-500">
                SignUp now
              </a>
            </p>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit(signup)}>
            <Input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            <Input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={handlePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <img
                  className="w-6"
                  src={showPassword ? "/public/view.png" : "/public/eye.png"}
                  alt="Toggle Password"
                />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Account Type
              </label>
              <div className="flex items-center space-x-4 ">
                <label className="inline-flex items-center">
                  <Input
                    type="radio"
                    value="normal"
                    {...register("accountType", {
                      required: "Account type is required",
                    })}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Normal</span>
                </label>
                <label className="inline-flex items-center">
                  <Input
                    type="radio"
                    value="business"
                    {...register("accountType")}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Business</span>
                </label>
              </div>
              {errors.accountType && (
                <span className="text-red-500">{errors.accountType.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-900 to-blue-500 text-white py-3 rounded-md font-semibold"
            >
              SignUp
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
