export type TImageResponse = {
  limit: number;
  message: string;
  offset: number;
  photos: {
    description: string;
    id: 1;
    title: string;
    url: string;
    user: number;
  }[];
  success: boolean;
  total_photos: number;
};
