/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../redux/features/user/userApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [createUser, { data, error }] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/login";

  useEffect(() => {
    if (data?.data?.email) {
      toast.success("User created successfully");
      toast.success("Please login now", {
        duration: 6000,
      });
      navigate(from, { replace: true });
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [data, error]);

  const onSubmit = (data: SignupFormInputs) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password do not match");
    } else {
      createUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    }
  };

  return (
    <div className="hero my-12 bg-base-100">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body my-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              id="name"
              placeholder="Name"
              type="text"
              autoComplete="name"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              placeholder="example@gmail.com"
              type="email"
              autoComplete="email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              placeholder="password"
              type="password"
              autoComplete="password"
              className="input input-bordered"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              id="confirmPassword"
              placeholder="confirm password"
              type="password"
              autoComplete="confirm password"
              className="input input-bordered"
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <div className="form-control mt-4">
            <button className="btn btn-primary">Register</button>
          </div>
          <p className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
