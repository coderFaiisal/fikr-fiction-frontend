import { Link } from "react-router-dom";
import { IReadingList } from "../types/readingList.type";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDeleteReadingListMutation } from "../redux/features/readingList/readingListApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";

type IProps = {
  readingList: IReadingList;
  isLoading: boolean;
};

const ReadingListCard = ({ readingList, isLoading }: IProps) => {
  console.log(readingList);
  const [
    deleteReadinglist,
    { isLoading: deleteReadingLoading, isSuccess: deleteReadingSuccess },
  ] = useDeleteReadingListMutation();

  const handleRemoveFromReadinglist = () => {
    deleteReadinglist(readingList?._id);
  };

  useEffect(() => {
    if (deleteReadingSuccess) {
      toast.success("Book removed from reading list");
    }
  }, [deleteReadingSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="card bg-base-100 shadow-xl p-4 mx-4 my-8 cursor-pointer">
      <figure>
        {deleteReadingLoading ? (
          <div className=" absolute -top-2 right-4 z-50">
            <Loading />
          </div>
        ) : (
          <XMarkIcon
            onClick={handleRemoveFromReadinglist}
            className="w-8 bg-white text-black rounded-full p-1 absolute top-4 right-4 z-50"
          />
        )}
        <img
          className="w-full h-56 hover:scale-105 duration-200"
          src={readingList?.bookId?.photoURL}
          alt="Book Image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl text-yellow-500">
          {readingList?.bookId?.title}
        </h2>
        <p>Author: {readingList?.bookId?.author}</p>
        <p>Genre: {readingList?.bookId?.genre}</p>

        <Link to={`/book/${readingList?.bookId?._id}`}>
          <span className="btn btn-xs btn-primary w-full">view details...</span>
        </Link>
      </div>
    </div>
  );
};

export default ReadingListCard;
