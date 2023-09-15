import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../../redux/features/book/bookApi";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import BookReview from "../../components/BookReview";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading } = useGetSingleBookQuery(id);

  const [deleteBook, { isSuccess, isError }] = useDeleteBookMutation();

  const handleDelete = () => {
    deleteBook(id);
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to delete book");
    }
    if (isSuccess) {
      toast.success("Book deleted successfully");
      navigate("/books");
    }
  }, [isSuccess, isError, navigate]);

  if (isLoading) return <Loading />;

  return (
    <div className="px-10 xl:px-20 py-10">
      <div className="flex mx-auto items-center gap-12 pb-10  border-b border-gray-300">
        <div className="w-[50%] lg:w-[30%]">
          <img className="w-full" src={data?.data?.photoURL} />
        </div>
        <div className="w-[70%] space-y-3">
          <h1 className="text-2xl md:text-3xl font-semibold">
            {data?.data?.title}
          </h1>
          <p className="text-md md:text-xl">Author: {data?.data?.author}</p>
          <p className="text-md md:text-xl">Genre: {data?.data?.genre}</p>
          <p className=" text-md md:text-xl">
            Publication Year: {data?.data?.publicationYear}
          </p>
          <p className="text-md md:text-xl">Rating: {data?.data?.ratings}</p>
          <div className="flex space-x-3 pt-2">
            {data?.data?.authorEmail === user?.email && (
              <>
                <Link to={`/update-book/${id}`}>
                  <button className="btn btn-xs md:btn-sm btn-primary">
                    Edit
                  </button>
                </Link>

                {/* delete modal button */}
                <label
                  className="btn btn-xs md:btn-sm bg-red-500 text-white "
                  htmlFor="modalForm"
                >
                  Delete
                </label>

                {/* delete modal form */}
                <input
                  type="checkbox"
                  id="modalForm"
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-400">
                      Are You Sure?
                    </h3>
                    <p className="py-4">This Book Will Delete Permanently!</p>
                    <div className="flex justify-end gap-4">
                      <label htmlFor="modalForm" className="btn btn-sm">
                        Close
                      </label>
                      <label
                        onClick={handleDelete}
                        htmlFor="modalForm"
                        className="btn btn-sm bg-red-500 text-white"
                      >
                        Delete
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <BookReview id={id!} reviews={data?.data?.reviews}></BookReview>
    </div>
  );
};

export default BookDetails;
