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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <fieldset className="form-control w-80">
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
      

      <div className="grid grid-cols-3 gap-5">
        {data.data.map((book: IBook) => (
          <div key={book?._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/e53af8191_202772.jpg"
                alt="Books"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book?.title}</h2>
              <p>Author: {book?.author}</p>
              <p>Genre: {book?.genre}</p>
              <p>Publication Year: {book?.publicationYear}</p>

              <div className="card-actions flex">
                <button className="btn btn-primary justify-start">
                  Love
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
                <button className="btn btn-primary">Read</button>
                <button className="btn btn-primary justify-end">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
