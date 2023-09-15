import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../types/book.type";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import BookCard from "../../components/BookCard";
import Loading from "../../components/Loading";
import bg from "../../../public/bg_image.jpg";

const Home = () => {
  const { data, isLoading } = useGetAllBooksQuery({});

  return (
    <div>
      <div>
        <img className="w-full" src={bg} alt="background-image" />
      </div>
      <div className=" my-6 lg:my-16">
        <h1 className="uppercase text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          Top 10 recently added books
        </h1>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
