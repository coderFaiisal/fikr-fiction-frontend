/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import toast from "react-hot-toast";
import { useAddReviewMutation } from "../redux/features/book/bookApi";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import avatar from "../../public/profile.jpg";
import Loading from "./Loading";

interface IProps {
  id: string;
  reviews: { _id: string; userName: string; review: string }[];
}

export default function BookReview({ id, reviews }: IProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);

  const [addReview, { isSuccess, isLoading }] = useAddReviewMutation();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (user) {
      const reviewData = {
        id,
        data: {
          userName: user?.name,
          review: inputValue,
        },
      };
      addReview(reviewData);
      setInputValue("");
    } else {
      toast.success("Please login first");
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review added successfully");
    }
  }, [isSuccess]);

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <textarea
          className="textarea textarea-bordered w-full"
          onChange={handleChange}
          value={inputValue}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <button type="submit" className="rounded-full text-[25px]">
            <PaperAirplaneIcon className=" -rotate-45 bg-purple-500 text-white w-12 rounded-full p-2" />
          </button>
        )}
      </form>
      <div className="mt-10">
        {reviews?.map((review) => (
          <div key={review?._id} className="flex gap-3 items-center mb-5">
            <div className="w-12 h-12 ">
              <img src={avatar} alt="avatar" className="rounded-full" />
            </div>
            <div>
              <p className="font-semibold">{review?.userName}</p>
              <p>{review?.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
