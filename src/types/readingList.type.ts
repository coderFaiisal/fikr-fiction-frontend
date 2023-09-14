import { IBook } from "./book.type";

export type IReadingList = {
  bookId: IBook;
  userEmail: string;
  _id: string;
  status: string;
};
