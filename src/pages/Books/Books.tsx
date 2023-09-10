import BookCard from "../../components/BookCard";
import { useGetAllBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../types/book.type";

const Books = () => {
  const searchTerm = "";
  const genre = "";
  const publicationYear = "";

  const { data, isLoading } = useGetAllBooksQuery({
    searchTerm,
    genre,
    publicationYear,
  });

  return (
    <div>
      <div className="flex justify-center">
        <fieldset className="form-control w-96">
          <div className="relative">
            <input
              type="text"
              placeholder="Search book..."
              className="input input-bordered w-full pr-16"
            />
            <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </fieldset>
      </div>
      {isLoading ? (
        <div className="flex justify-center my-6">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {data?.data?.map((book: IBook) => (
            <BookCard key={book._id} book={book}></BookCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
