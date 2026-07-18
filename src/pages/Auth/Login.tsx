import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import Button from "../../components/Shared/Button";

interface LoginResponse {
  success?: boolean;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "employer" | "jobseeker";
    profilePicture?: string;
  };
  message?: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {

      const response = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );


      const { token, user } = response.data;


      if (!token || !user) {
        throw new Error(
          "Invalid login response from server"
        );
      }


      // IMPORTANT:
      // AuthContext should save token and user
      await login(user, token);



      // Role based navigation

      if (user.role === "admin") {

        navigate(
          "/admin/dashboard",
          {
            replace: true,
          }
        );

      } 
      else if (user.role === "employer") {

        navigate(
          "/dashboard",
          {
            replace: true,
          }
        );

      } 
      else if (user.role === "jobseeker") {

        navigate(
          "/jobs",
          {
            replace: true,
          }
        );

      } 
      else {

        navigate(
          "/",
          {
            replace: true,
          }
        );

      }


    } catch (error: any) {

      console.error(
        "LOGIN ERROR:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Invalid email or password"
      );


    } finally {

      setIsLoading(false);

    }
  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">


      <form
        onSubmit={handleLogin}
        className="
          bg-white
          w-full
          max-w-md
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-8
          space-y-6
        "
      >


        <div className="text-center">

          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>


          <p className="text-slate-500 mt-2">
            Login to continue to CareerHub
          </p>

        </div>



        {error && (

          <div
            className="
              bg-red-50
              border
              border-red-200
              text-red-600
              p-3
              rounded-lg
              text-sm
            "
          >

            {error}

          </div>

        )}



        <div className="space-y-4">


          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-600
            "
          />



          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-blue-600
            "
          />


        </div>




        <Button
          type="submit"
          isLoading={isLoading}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-4
            rounded-xl
            font-semibold
          "
        >

          Login

        </Button>




        <div className="text-center">

          <Link
            to="/forgot-password"
            className="
              text-blue-600
              text-sm
              hover:underline
            "
          >

            Forgot Password?

          </Link>

        </div>




        <p className="text-center text-sm text-slate-600">

          Don't have an account?{" "}


          <Link
            to="/register"
            className="
              text-blue-600
              font-semibold
              hover:underline
            "
          >

            Register here

          </Link>


        </p>


      </form>


    </div>

  );
};


export default Login;