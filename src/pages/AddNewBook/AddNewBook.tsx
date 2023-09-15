/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";
import { useCreateBookMutation } from "../../redux/features/book/bookApi";
import { useForm } from "react-hook-form";
import { IBook } from "../../types/book.type";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

const AddNewBook = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [createBook, { isLoading, isSuccess, error }] = useCreateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();

  const onSubmit = (data: IBook) => {
    const bookData = {
      ...data,
      authorEmail: user?.email,
      reviews: [],
    };

    createBook(bookData);
  };

  useEffect(() => {
    if (error) {
      toast.error((error as any)?.data.message);
    }
    if (isSuccess) {
      toast.success("Book added successfully");
      navigate("/books");
    }
  }, [isSuccess, error, navigate]);
  return (
    <div className="flex justify-center mx-auto">
      <div className="w-[80%] md:w-[60%] lg:w-[50%] my-6 md:my-10">
        <p className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-10">
          Add Book Information
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2 ">
            <div className="grid gap-2">
              <div>
                <p className="font-semibold">Book Title</p>
                <input
                  id="Title"
                  placeholder="Book Title"
                  type="text"
                  className="input input-sm input-bordered  w-full"
                  {...register("title", { required: "Title is required" })}
                />
                {errors?.title && <p>{errors?.title?.message}</p>}
              </div>

              <div>
                <p className="font-semibold">Author Name</p>
                <input
                  id="author"
                  placeholder="Author Name"
                  type="text"
                  className="input input-sm input-bordered  w-full"
                  {...register("author", {
                    required: "Author Name is required",
                  })}
                />
                {errors?.author && <p>{errors?.author?.message}</p>}
              </div>

              <div>
                <p className="font-semibold">Image</p>
                <input
                  id="photoURL"
                  placeholder="Image"
                  type="text"
                  className="input input-sm input-bordered  w-full"
                  {...register("photoURL", {
                    required: "Book image is required",
                  })}
                />
                {errors?.photoURL && <p>{errors?.photoURL?.message}</p>}
              </div>

              <div>
                <p className="font-semibold">Genre</p>
                <input
                  id="genre"
                  placeholder="Genre"
                  type="text"
                  className="input input-sm input-bordered  w-full"
                  {...register("genre", { required: "Genre is required" })}
                />
                {errors?.genre && <p>{errors?.genre?.message}</p>}
              </div>
              <div>
                <p className="font-semibold">Publication Year</p>
                <input
                  id="publicationYear"
                  placeholder="Publication Year"
                  type="text"
                  className="input input-sm input-bordered  w-full"
                  {...register("publicationYear", {
                    required: "Publication Year is required",
                  })}
                />
                {errors?.publicationYear && (
                  <p>{errors?.publicationYear?.message}</p>
                )}
              </div>

              <div>
                <p className="font-semibold">Ratings</p>
                <input
                  id="ratings"
                  placeholder="Ratings"
                  type="number"
                  className="input input-sm input-bordered  w-full"
                  {...register("ratings", {
                    required: "Rating is required",
                  })}
                />
                {errors?.ratings && <p>{errors?.ratings?.message}</p>}
              </div>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <button className="btn btn-sm btn-primary"> Add New Book </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBook;
