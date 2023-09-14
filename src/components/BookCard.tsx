import { IBook } from "../types/book.type";
import { useEffect } from "react";
import {
  HeartIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  useCreateWishListMutation,
  useDeleteWishListMutation,
  useGetSingleWishListsQuery,
} from "../redux/features/wishList/wishListApi";

import toast from "react-hot-toast";
import Loading from "./Loading";
import { useAppSelector } from "../redux/hook";
import {
  useCreateReadingListMutation,
  useDeleteReadingListMutation,
  useGetSingleReadingListsQuery,
} from "../redux/features/readingList/readingListApi";

type IProps = {
  book: IBook;
};

const BookCard = ({ book }: IProps) => {
  const { user } = useAppSelector((state) => state.user);

  //wish list functionality
  const { data: wishData } = useGetSingleWishListsQuery(book?._id);

  const [
    createWishList,
    {
      isLoading: createWishLoading,
      isSuccess: createWishSuccess,
      isError: createWishError,
    },
  ] = useCreateWishListMutation();

  const [
    deleteWishlist,
    {
      isLoading: deleteWishLoading,
      isSuccess: deleteWishSuccess,
      isError: deleteWishError,
    },
  ] = useDeleteWishListMutation();

  const handleAddToWishlist = () => {
    if (user) {
      const wishListData = {
        userEmail: user?.email,
        bookId: book?._id,
      };

      createWishList(wishListData);
    } else {
      toast.error("Please login first!");
    }
  };

  const handleRemoveFromWishList = () => {
    deleteWishlist(book._id);
  };

  useEffect(() => {
    if (createWishSuccess === true) {
      toast.success("Book successfully added into wish list");
    }
    if (createWishError === true) {
      toast.error("Failed to added into wish list");
    }
    if (deleteWishSuccess === true) {
      toast.success("Book removed from wish list");
    }
    if (deleteWishError === true) {
      toast.error("Failed to remove from wish list");
    }
  }, [createWishSuccess, createWishError, deleteWishSuccess, deleteWishError]);

  //reading list functionality
  const { data: readingData } = useGetSingleReadingListsQuery(book?._id);

  const [
    createReadingList,
    { isLoading: createReadingLoading, isSuccess: createReadingSuccess },
  ] = useCreateReadingListMutation();

  const [
    deleteReadingList,
    { isLoading: deleteReadingLoading, isSuccess: deleteReadingSuccess },
  ] = useDeleteReadingListMutation();

  const handleAddToReadinglist = () => {
    if (user) {
      const readingListData = {
        bookId: book?._id,
        userEmail: user?.email,
      };

      createReadingList(readingListData);
    } else {
      toast.error("Please login first!");
    }
  };

  const handleRemoveFromReadingList = () => {
    deleteReadingList(book._id);
  };

  useEffect(() => {
    if (createReadingSuccess) {
      toast.success("Book successfully added into reading list");
    }
  }, [createReadingSuccess]);

  useEffect(() => {
    if (deleteReadingSuccess) {
      toast.success("Book removed from wish list");
    }
  }, [deleteReadingSuccess]);

  return (
    <div className="card bg-base-100 shadow-xl p-4 mx-4 my-8 cursor-pointer">
      <figure>
        <img
          className="w-full hover:scale-105 duration-200"
          src={book?.photoURL}
          alt="Book Image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl text-yellow-500">{book?.title}</h2>
        <p>Author: {book?.author}</p>
        <p>Genre: {book?.genre}</p>
        <p>Publication Year: {book?.publicationYear}</p>
        <p>Ratings: {book?.ratings}</p>

        <div className="card-actions flex items-center justify-center">
          {user && wishData?.data === null ? (
            <button
              onClick={handleAddToWishlist}
              className="rounded-full tooltip"
              data-tip="Add Wish"
            >
              {createWishLoading ? (
                <Loading />
              ) : (
                <HeartIcon className=" bg-slate-100 w-10 h-10 p-1 hover:bg-slate-200 rounded-full tooltip" />
              )}
            </button>
          ) : (
            <button
              onClick={handleRemoveFromWishList}
              className="rounded-full tooltip"
              data-tip="Delete Wish"
            >
              {deleteWishLoading ? (
                <Loading />
              ) : (
                <HeartIcon className=" bg-red-500 hover:bg-red-400 text-white w-10 h-10 p-1 rounded-full tooltip" />
              )}
            </button>
          )}

          {user && readingData?.data === null ? (
            <button
              onClick={handleAddToReadinglist}
              className="rounded-full tooltip"
              data-tip="Read Later"
            >
              {createReadingLoading ? (
                <Loading />
              ) : (
                <ClipboardDocumentListIcon className=" bg-slate-100 w-10 h-10 p-1 hover:bg-slate-200 rounded-full tooltip" />
              )}
            </button>
          ) : (
            <button
              onClick={handleRemoveFromReadingList}
              className="rounded-full tooltip"
              data-tip="Delete Read"
            >
              {deleteReadingLoading ? (
                <Loading />
              ) : (
                <ClipboardDocumentListIcon className=" bg-red-500 hover:bg-red-400 text-white w-10 h-10 p-1 rounded-full tooltip" />
              )}
            </button>
          )}
        </div>
        <Link to={`/book/${book?._id}`}>
          <span className="btn btn-xs btn-primary w-full">view details...</span>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
