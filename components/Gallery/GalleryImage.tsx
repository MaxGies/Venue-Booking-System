import { useState, useEffect } from 'react';
import axios from 'axios';

import classes from './GalleryImage.module.css';
import { GalleryDataType } from '../../utils/types';

const GalleryImage = () => {
  const [galleryData, setGalleryData] = useState<GalleryDataType[]>([]);

  const getGalleryData = async () => {
    const response = axios
      .get('https://picsum.photos/v2/list')
      .then((res) => {
        return {
          status: res.status,
          data: res.data,
        };
      })
      .catch((error) => {
        return error.response;
      });

    return response;
  };

  useEffect(() => {
    const getGallery = async () => {
      const res = await getGalleryData();
      setGalleryData(res.data);
    };

    getGallery();
  }, []);

  return (
    <div className={classes.root}>
      {galleryData.map((image: GalleryDataType) => (
        <img
          key={image.id}
          src={image.download_url}
          alt={image.author}
          className={classes.image}
        />
      ))}
    </div>
  );
};

export default GalleryImage;
