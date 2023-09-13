import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [login, { data, error }] = useLoginUserMutation();

  const isLoggedIn = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data: LoginFormInputs) => {
    login({ email: data.email, password: data.password });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (data?.data?.accessToken) {
      toast.success("User logging successfully");
      navigate(from, { replace: true });
    }
  }, [data, error]);

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body my-2">
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
            <label className="label">
              <Link to="" className="label-text-alt link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control">
            <button className="btn btn-primary">Login</button>
          </div>
          <p className="mt-4 text-center font-normal">
            Haven't an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
