import PasswordInput from "../../components/Input/PasswordInput";

import { Link } from "react-router-dom";
import { useState } from "react";

import { RegisterSchema, registerSchema } from "../../validation/auth/auth";

type SubmitChangeEvent = React.FormEvent<HTMLFormElement>;

function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any | null>(null);

  const handleSubmit = async (e: SubmitChangeEvent) => {
    e.preventDefault();

    const formData: RegisterSchema = { name, email, password };

    const validateData = registerSchema.safeParse(formData);

    if (!validateData.success) {
      const errorMessages = validateData.error.errors
        .map((error) => error.message)
        .join(" :: ");
      setError(errorMessages);
      return;
    }

    setError(null);
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl mb-7">Register</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
