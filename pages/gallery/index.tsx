import {useState,useEffect,Fragment} from 'react';
import axios from 'axios';
import { GalleryDataType } from '../../utils/types';

const GalleryPage = () => {
    const [galleryData, setGalleryData] = useState<GalleryDataType[]>([])

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
    }

    useEffect(()=>{
        const getGallery = async () => {
            const res = await getGalleryData();
            setGalleryData(res.data)
        }
        
        getGallery();
    },[])

    return (
        <>
        
        </>
    )
}

export default GalleryPage;