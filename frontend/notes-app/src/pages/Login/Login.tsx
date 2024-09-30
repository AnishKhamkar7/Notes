import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { LoginSchema, loginSchema } from "../../validation/auth/auth";
import axiosInstance from "../../utils/axiosInstance";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SubmitChangeEvent = React.FormEvent<HTMLFormElement>;

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitChangeEvent) => {
    e.preventDefault();

    const formData: LoginSchema = { email, password };

    const validateData = loginSchema.safeParse(formData);

    if (!validateData.success) {
      const errorMessages = validateData.error.errors
        .map((error) => error.message)
        .join(" :: ");
      setError(errorMessages);
      return;
    }

    setError(null);

    try {
      const response = await axiosInstance.post("/api/users/login", {
        email,
        password,
      });

      if (response.data && response.data.data.accessToken) {
        localStorage.setItem("token", response.data.data.accessToken);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (e: InputChangeEvent) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: InputChangeEvent) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={handleEmailChange}
            />

            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/Signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
