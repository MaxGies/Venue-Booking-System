import type { NextApiRequest, NextApiResponse } from 'next';
import { bookingData } from '../../data/bookingData';
import { BookingDataType } from '../../utils/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookingDataType[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(bookingData);
    const date = new Date(Date.parse(bookingData[0].startTime));
  } else if (req.method === 'POST') {
    const bookingDetails: BookingDataType = req.body;
    const newBooking: BookingDataType = {
      id: bookingData[bookingData.length - 1].id + 1,
      roomId: bookingDetails.roomId,
      startTime: bookingDetails.startTime,
      endTime: bookingDetails.endTime,
      title: bookingDetails.title,
    };

    bookingData.push(newBooking);
    res.status(201).json([newBooking]);
  }
}
