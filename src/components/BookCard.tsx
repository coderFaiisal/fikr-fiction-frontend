import { IBook } from "../types/book.type";
import { HeartIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

type IProps = {
  book: IBook;
};

const BookCard = ({ book }: IProps) => {
  return (
    <div className="card bg-base-100 shadow-xl p-4 mx-4 my-8 cursor-pointer">
      <figure>
        <img
          className="w-full hover:scale-105 duration-200"
          src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/e53af8191_202772.jpg"
          alt="Books"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl text-yellow-500">{book?.title}</h2>
        <p>Author: {book?.author}</p>
        <p>Genre: {book?.genre}</p>
        <p>Publication Year: {book?.publicationYear}</p>
        <p>Ratings: {book?.ratings}</p>

        <div className="card-actions flex items-center justify-center">
          <span
            className="hover:bg-slate-300 rounded-md tooltip"
            data-tip="Wish List"
          >
            <HeartIcon className=" w-8 h-8" />
          </span>
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
