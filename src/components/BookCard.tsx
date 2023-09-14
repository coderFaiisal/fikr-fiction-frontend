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

type IProps = {
  book: IBook;
};

const BookCard = ({ book }: IProps) => {
  const { user } = useAppSelector((state) => state.user);

  const { data } = useGetSingleWishListsQuery(book._id);

  const [
    createWishList,
    { isLoading: createWishLoading, isSuccess: createWishSuccess },
  ] = useCreateWishListMutation();
  const [
    deleteWishlist,
    { isLoading: deleteWishLoading, isSuccess: deleteWishSuccess },
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

  const handleRemoveFromWishlist = () => {
    deleteWishlist(book._id);
  };

  useEffect(() => {
    if (createWishSuccess) {
      toast.success("Book successfully added into wish list");
    }
  }, [createWishSuccess]);

  useEffect(() => {
    if (deleteWishSuccess) {
      toast.success("Book removed from wish list");
    }
  }, [deleteWishSuccess]);

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
          {user && data?.data === null ? (
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
              onClick={handleRemoveFromWishlist}
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

          <span
            className="hover:bg-slate-300 rounded-md tooltip"
            data-tip="Read Later"
          >
            <ClipboardDocumentListIcon className="w-8 h-8" />
          </span>
        </div>
        <Link to={`/book/${book?._id}`}>
          <span className="btn btn-xs btn-primary w-full">view details...</span>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;


// const readingListSchema = new Schema<IReadingList>({
//   userEmail: { type: String, required: true },
//   bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
//   status: {
//     type: String,
//     enum: ['reading', 'read soon', 'finished'],
//     required: true,
//   },
// });
