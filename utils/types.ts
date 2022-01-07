export interface BookingDataType {
  id: number;
  roomId: string;
  startTime: string;
  endTime: string;
  title: string;
}

export interface GalleryDataType {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
