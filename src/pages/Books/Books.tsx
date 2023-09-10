import BookCard from "../../components/BookCard";
import { useGetAllBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../types/book.type";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

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
    <div className="grid grid-cols-12">
      <div className="col-span-3 p-6 self-start sticky top-[84px] h-[calc(100vh-100px)]">
        <fieldset className="form-control w-72">
          <div className="relative">
            <input
              type="text"
              placeholder="Search book..."
              className="input input-bordered w-full pr-16"
            />
            <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
              <MagnifyingGlassIcon className="w-5" />
            </button>
          </div>
        </fieldset>
      </div>

      {data?.data.length === 0 ? (
        <p className="col-span-9 text-2xl my-32 font-semibold text-center">
          There is no book. Please add new book
        </p>
      ) : (
        <div className="col-span-9">
          {isLoading ? (
            <div className="flex justify-center my-6">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {data?.data?.map((book: IBook) => (
                <BookCard key={book._id} book={book}></BookCard>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Books;
