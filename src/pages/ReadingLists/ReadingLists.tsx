import ReadingListCard from "../../components/ReadingListCard";
import { useGetAllReadingListsQuery } from "../../redux/features/readingList/readingListApi";
import { IReadingList } from "../../types/readingList.type";

const ReadingLists = () => {
  const { data, isLoading } = useGetAllReadingListsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div>
      {data?.data?.length === 0 ? (
        <div className="my-12">
          <h1 className="text-2xl text-center">
            No Book Found In Reading List!
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-4 ">
          {data?.data?.map((readingList: IReadingList) => (
            <ReadingListCard
              key={readingList?._id}
              isLoading={isLoading}
              readingList={readingList}
            ></ReadingListCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingLists;
