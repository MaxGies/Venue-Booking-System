import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = axios
    .get('https://picsum.photos/v2/list')
    .then((res) => {
      return {
        status: res.status,
        data: res,
      };
    })
    .catch((error) => {
      return error.response;
    });
}
