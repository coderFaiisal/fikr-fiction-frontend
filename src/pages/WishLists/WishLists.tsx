import Loading from "../../components/Loading";
import WishListCard from "../../components/WishListCard";
import { useGetAllWishListsQuery } from "../../redux/features/wishList/wishListApi";
import { IWishList } from "../../types/wishList.type";

const WishLists = () => {
  const { data, isLoading } = useGetAllWishListsQuery(undefined);
  console.log(data);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {data?.data?.length === 0 ? (
        <div className="my-12">
          <h1 className="text-2xl text-center text-red-500">
            No Book Found In Wish List!
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-4">
          {data?.data?.map((wishList: IWishList) => (
            <WishListCard
              key={wishList?._id}
              wishList={wishList}
            ></WishListCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishLists;
