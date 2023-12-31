export type IBook = {
  _id: string;
  title: string;
  author: string;
  authorEmail: string;
  genre: string;
  publicationYear: string;
  ratings: string;
  photoURL?: string;
  reviews?: string[];
  createdAt: string;
  updatedAt: string;
};
