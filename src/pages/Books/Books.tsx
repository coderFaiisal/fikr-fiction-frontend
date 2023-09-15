/* eslint-disable @typescript-eslint/no-explicit-any */
import BookCard from "../../components/BookCard";
import Loading from "../../components/Loading";
import { useGetAllBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../types/book.type";
import { useState } from "react";

const filtersData = [
  {
    title: "Genre",
    options: [
      "Computer Science",
      "Fiction",
      "Epic",
      "Fantasy",
      "Science Fiction",
      "Novels",
      "Historical",
    ],
  },
  {
    title: "Publication Year",
    options: ["2023", "2018", "2011", "2005"],
  },
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [publicationYear, setPublicationYear] = useState<string>("");

  const { data, isLoading } = useGetAllBooksQuery({
    searchTerm,
    genre,
    publicationYear,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="grid md:grid-cols-12">
      <div className="md:col-span-3 p-6 self-start sticky top-[84px] md:min-h-[calc(100vh-100px)]">
        <form onClick={(e) => e.preventDefault()} className="form-control w-68">
          <input
            onChange={handleSearch}
            type="text"
            placeholder={`Search...`}
            className="input input-bordered w-full pr-16"
          />
        </form>

        <div className="mt-6">
          <h1 className="text-xl uppercase">Filters</h1>
          <div className="mt-3 space-y-2 cursor-pointer">
            {filtersData.map((filterOptions) => (
              <details key={filterOptions.title} className="dropdown flex">
                <summary className="btn btn-sm">{filterOptions.title}</summary>
                <ul className="p-2 menu bg-base-100 max-h-[calc(100vh-229px)] overflow-auto scrollbar-none">
                  {filterOptions.options.map((option) => (
                    <li key={option}>
                      <label className="flex items-center">
                        <input
                          checked={
                            (filterOptions.title === "Genre" &&
                              genre === option) ||
                            (filterOptions.title === "Publication Year" &&
                              publicationYear === option)
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              filterOptions.title === "Genre"
                                ? setGenre(option)
                                : setPublicationYear(option);
                            } else {
                              filterOptions.title === "Genre"
                                ? setGenre("")
                                : setPublicationYear("");
                            }
                          }}
                          type="checkbox"
                          className="h-4 w-4 border border-gray-500 rounded text-violet-500 focus:ring-transparent cursor-pointer"
                        />
                        <span className="text-sm text-slate-600 font-medium ml-2">
                          {option}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </div>

      {data?.data.length === 0 ? (
        <p className="md:col-span-9 text-xl lg:text-2xl  my-16 lg:my-32 font-semibold text-center">
          No books are founded!
        </p>
      ) : (
        <div className="md:col-span-9">
          {isLoading ? (
            <Loading />
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
