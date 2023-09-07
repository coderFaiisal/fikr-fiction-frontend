import { useGetAllBooksQuery } from "../../redux/features/book/bookApi";

const Home = () => {
  const { data } = useGetAllBooksQuery(undefined);

  console.log(data);

  return (
    <div>
      <img
        className="w-full"
        src="https://wafilife-media.wafilife.com/uploads/2023/03/boi_suggetion-mobile-1.jpg"
        alt=""
      />
    </div>
  );
};

export default Home;
