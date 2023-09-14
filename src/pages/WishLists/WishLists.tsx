import Loading from "../../components/Loading";
import WishListCard from "../../components/WishListCard";
import { useGetAllWishListsQuery } from "../../redux/features/wishList/wishListApi";
import { IWishList } from "../../types/wishList.type";

const WishLists = () => {
  const { data, isLoading } = useGetAllWishListsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-4">
      {data?.data?.map((wishList: IWishList) => (
        <WishListCard key={wishList?._id} wishList={wishList}></WishListCard>
      ))}
    </div>
  );
};

export default WishLists;
