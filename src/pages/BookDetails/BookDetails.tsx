import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const location = useLocation();

  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading } = useGetSingleBookQuery(id);

  const [deleteBook, { isSuccess }] = useDeleteBookMutation();

  const handleDelete = () => {
    deleteBook(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book deleted successfully");
      navigate("/books");
    }
  }, [isSuccess, navigate]);

  if (isLoading) return <Loading />;

  return (
    <div className="px-10 xl:px-20 py-10">
      <div className="flex mx-auto items-center gap-12 pb-10  border-b border-gray-300">
        <div className="w-[30%]">
          <img className="w-full" src={data?.data?.photoURL} />
        </div>
        <div className="w-[70%] space-y-3">
          <h1 className="text-3xl font-semibold">{data?.data?.title}</h1>
          <p className="text-xl">Author: {data?.data?.author}</p>
          <p className="text-xl">Genre: {data?.data?.genre}</p>
          <p className="text-xl">
            Publication Year: {data?.data?.publicationYear}
          </p>
          <p className="text-xl">Rating: {data?.data?.ratings}</p>
          <div className="flex space-x-3 pt-2">
            {data?.data?.authorEmail === user?.email && (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/update-book/${id}`, {
                      state: { from: location },
                      replace: true,
                    })
                  }
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="w-[73px] btn bg-red-500 text-white"
                >
                  Delete
                </button>
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
