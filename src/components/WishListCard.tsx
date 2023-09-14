import { Link } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import { IWishList } from "../types/wishList.type";
import Loading from "./Loading";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDeleteWishListMutation } from "../redux/features/wishList/wishListApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

type IProps = {
  wishList: IWishList;
};

const WishListCard = ({ wishList }: IProps) => {
  const { data, isLoading } = useGetSingleBookQuery(wishList?.bookId);

  const [
    deleteWishlist,
    { isLoading: deleteWishLoading, isSuccess: deleteWishSuccess },
  ] = useDeleteWishListMutation();

  const handleRemoveFromWishlist = () => {
    deleteWishlist(wishList?.bookId);
  };

  useEffect(() => {
    if (deleteWishSuccess) {
      toast.success("Book removed from wish list");
    }
  }, [deleteWishSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="card bg-base-100 shadow-xl p-4 mx-4 my-8 cursor-pointer">
      <figure>
        {deleteWishLoading ? (
          <div className=" absolute -top-2 right-4 z-30">
            <Loading />
          </div>
        ) : (
          <XMarkIcon
            onClick={handleRemoveFromWishlist}
            className="w-8 bg-white text-black rounded-full p-1 absolute top-4 right-4 z-10"
          />
        )}
        <img
          className="w-full h-56 hover:scale-105 duration-200"
          src={data?.data?.photoURL}
          alt="Book Image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl text-yellow-500">
          {data?.data?.title}
        </h2>
        <p>Author: {data?.data?.author}</p>
        <p>Genre: {data?.data?.genre}</p>

        <Link to={`/book/${data?.data?._id}`}>
          <span className="btn btn-xs btn-primary w-full">view details...</span>
        </Link>
      </div>
    </div>
  );
};

export default WishListCard;
