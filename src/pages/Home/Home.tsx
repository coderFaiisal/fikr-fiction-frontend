import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../types/book.type";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import BookCard from "../../components/BookCard";

const Home = () => {
  const { data, isLoading } = useGetAllBooksQuery({});

  return (
    <div>
      <div>
        <img
          className="w-full"
          src="https://wafilife-media.wafilife.com/uploads/2023/03/boi_suggetion-mobile-1.jpg"
          alt=""
        />
      </div>
      <div className="my-16">
        <h1 className="uppercase text-5xl font-bold text-center">
          Top 10 recently added books
        </h1>

        {isLoading ? (
          <div className="flex justify-center my-6">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-4">
            {[...data.data]
              ?.sort(
                (a: IBook, b: IBook) =>
                  parseFloat(b.ratings) - parseFloat(a.ratings)
              )
              .slice(0, 10)
              .map((book: IBook) => (
                <BookCard key={book._id} book={book}></BookCard>
              ))}
          </div>
        )}

        <div className="flex justify-center">
          <Link to="/books">
            <button className="flex gap-2 items-center btn btn-wide btn-primary">
              See All Books
              <ArrowSmallRightIcon className="w-6" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
