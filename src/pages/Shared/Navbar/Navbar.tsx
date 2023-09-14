import { Link } from "react-router-dom";
import logo from "../../../../public/Logo.ico";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { userLoggedOut } from "../../../redux/features/user/userSlice";
import {
  UserIcon,
  HeartIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useGetAllWishListsQuery } from "../../../redux/features/wishList/wishListApi";
import { useGetAllReadingListsQuery } from "../../../redux/features/readingList/readingListApi";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: wishListData } = useGetAllWishListsQuery(undefined);
  const { data: readingListData } = useGetAllReadingListsQuery(undefined);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    toast.success("User logout successfully");
  };

  const navItems = [
    <Link to="/">Home</Link>,
    <Link to="/books">All Books</Link>,
    <Link to="/bookFair">Book Fair</Link>,
  ];

  const items = navItems.map((item, idx) => <li key={idx}>{item}</li>);

  return (
    <div className="navbar bg-base-100 sticky top-0 z-20 border border-b-[1px]">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {items}
        </ul>
      </div>
      <div className="navbar-start">
        <Link to="/">
          <img className="w-40" src={logo} alt="website-logo" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">{items}</ul>
      </div>

      {!user?.email ? (
        <div className="navbar-end">
          <Link to="/login">
            <button className="btn btn-outline btn-sm btn-primary">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Link to="/wishLists">
                <div className="indicator">
                  <HeartIcon className="w-6" />
                  <span className="badge badge-sm indicator-item">
                    {wishListData?.data?.length}
                  </span>
                </div>
              </Link>
            </label>
          </div>
          <button className="btn btn-ghost btn-circle">
            <Link to="/readingLists">
              <div className="indicator">
                <ClipboardDocumentListIcon className="w-6" />
                <span className="badge badge-xs badge-primary indicator-item">
                  {readingListData?.data?.length}
                </span>
              </div>
            </Link>
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-6 rounded-full">
                <UserIcon className="w-6" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <Link to="add-new-book">Add New Book</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
