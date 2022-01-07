import type { NextApiRequest, NextApiResponse } from 'next';
import { bookingData } from '../../data/bookingData';
import { BookingDataType } from '../../utils/types';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookingDataType[]>
) {
  res.status(200).json(bookingData);
}
