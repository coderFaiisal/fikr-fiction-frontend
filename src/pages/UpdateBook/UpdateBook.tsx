/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../../redux/features/book/bookApi";
import { useForm } from "react-hook-form";
import { IBook } from "../../types/book.type";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetSingleBookQuery(id);

  const [UpdateBook, { isLoading, isSuccess, error }] = useUpdateBookMutation();

  const { register, handleSubmit } = useForm<IBook>();

  const onSubmit = (data: IBook) => {
    const updatedData = {
      id,
      data,
    };

    UpdateBook(updatedData);
  };

  useEffect(() => {
    if (error) {
      toast.error((error as any)?.data.message);
    }
    if (isSuccess) {
      toast.success("Book updated successfully");
      navigate("/books");
    }
  }, [isSuccess, error, navigate]);

  return (
    <div className="flex justify-center mx-auto">
      <div className="w-[80%] md:w-[60%] lg:w-[50%] my-6 md:my-10">
        <p className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-10">
          Update Book Information
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-2">
              <div>
                <p className="font-semibold">Book Title</p>
                <input
                  id="Title"
                  placeholder="Book Title"
                  defaultValue={data?.data?.title}
                  type="text"
                  className="input input-sm input-bordered  w-full"
                  {...register("title")}
                />
              </div>

              <div>
                <p className="font-semibold">Author Name</p>
                <input
                  id="author"
                  placeholder="Author Name"
                  type="text"
                  defaultValue={data?.data?.author}
                  className="input input-sm input-bordered  w-full"
                  {...register("author")}
                />
              </div>

              <div>
                <p className="font-semibold">Image</p>
                <input
                  id="photoURL"
                  placeholder="Image"
                  type="text"
                  defaultValue={data?.data?.photoURL}
                  className="input input-sm input-bordered  w-full"
                  {...register("photoURL")}
                />
              </div>

              <div>
                <p className="font-semibold">Genre</p>
                <input
                  id="genre"
                  placeholder="Genre"
                  type="text"
                  defaultValue={data?.data?.genre}
                  className="input input-sm input-bordered  w-full"
                  {...register("genre")}
                />
              </div>
              <div>
                <p className="font-semibold">Publication Year</p>
                <input
                  id="publicationYear"
                  placeholder="Publication Year"
                  type="text"
                  defaultValue={data?.data?.publicationYear}
                  className="input input-sm input-bordered  w-full"
                  {...register("publicationYear")}
                />
              </div>

              <div>
                <p className="font-semibold">Ratings</p>
                <input
                  id="ratings"
                  placeholder="Ratings"
                  type="number"
                  defaultValue={data?.data?.ratings}
                  className="input input-sm input-bordered  w-full"
                  {...register("ratings")}
                />
              </div>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <button className="btn btn-sm btn-primary">Update</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
