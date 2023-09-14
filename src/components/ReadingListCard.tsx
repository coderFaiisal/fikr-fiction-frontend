import { Link } from "react-router-dom";
import { IReadingList } from "../types/readingList.type";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  useDeleteReadingListMutation,
  useUpdateReadingListMutation,
} from "../redux/features/readingList/readingListApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";

type IProps = {
  readingList: IReadingList;
  isLoading: boolean;
};

const ReadingListCard = ({ readingList, isLoading }: IProps) => {
  const [
    deleteReadinglist,
    {
      isLoading: deleteReadingLoading,
      isSuccess: deleteReadingSuccess,
      isError: deleteReadingError,
    },
  ] = useDeleteReadingListMutation();

  const [
    updateReadingStatus,
    { data, isLoading: updateStatusLoading, isError: updateStatusError },
  ] = useUpdateReadingListMutation();

  const handleRemoveFromReadinglist = () => {
    deleteReadinglist(readingList?.bookId?._id);
  };

  const handleItemClick = (value: string) => {
    const updatedData = {
      id: readingList?._id,
      data: {
        status: value,
      },
    };

    updateReadingStatus(updatedData);
  };

  useEffect(() => {
    if (deleteReadingSuccess === true) {
      toast.success("Book removed from reading list");
    }
    if (deleteReadingError === true) {
      toast.error("Failed to removed book!");
    }
    if (updateStatusError === true) {
      toast.error("Failed to update book status!");
    }
  }, [deleteReadingSuccess, deleteReadingError, updateStatusError]);

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
            className="w-8 bg-white text-black rounded-full p-1 absolute top-4 right-4 z-10"
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

        {updateStatusLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : null}

        <ul className="steps steps-vertical">
          <li
            onClick={() => handleItemClick("read soon")}
            data-content="✓"
            className={`step ${
              data?.data?.status === "read soon" ||
              readingList?.status === "read soon"
                ? "step-success"
                : ""
            }`}
          >
            Read Soon
          </li>
          <li
            onClick={() => handleItemClick("reading")}
            data-content="✓"
            className={`step ${
              data?.data?.status === "reading" ||
              readingList?.status === "reading"
                ? "step-success"
                : ""
            }`}
          >
            Reading
          </li>
          <li
            onClick={() => handleItemClick("finished")}
            data-content="✓"
            className={`step ${
              data?.data?.status === "finished" ||
              readingList?.status === "finished"
                ? "step-success"
                : ""
            }`}
          >
            Finished
          </li>
        </ul>

        <Link to={`/book/${readingList?.bookId?._id}`}>
          <span className="btn btn-xs btn-primary w-full">view details...</span>
        </Link>
      </div>
    </div>
  );
};

export default ReadingListCard;
