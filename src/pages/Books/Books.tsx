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
      <div className="grid grid-cols-3">
        {data.data.map((book: IBook) => (
          <div
            key={book?._id}
            className="card bg-base-100 shadow-xl p-4 mx-4 my-8"
          >
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

              <div className="card-actions flex">
                <button
                  className="btn btn-primary tooltip-primary tooltip"
                  data-tip="Wish List"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
                <button
                  className="btn btn-primary tooltip-primary tooltip"
                  data-tip="Read Later"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                </button>
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
