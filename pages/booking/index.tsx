import {useState,useEffect,Fragment} from 'react';
import { Text } from '@chakra-ui/react'
import { BookingDataType } from '../../utils/types';

const BookingPage = () => {
    const [booking , setBooking] = useState<BookingDataType[]>([]);

    useEffect(()=>{
        const fetchBooking = async () => {
            const response = await fetch('/api/bookingData')
            const data = await response.json()
            setBooking(data)
        }

        fetchBooking();
    },[])
    

    return (
        <>
        <Text fontSize='50px'> HI </Text>
        {booking.map((x)=>{return (
            <Fragment key={x.id}>
            <Text>{x.id}</Text>
            <Text>{x.roomId}</Text>
            <Text>{x.startTime}</Text>
            <Text>{x.endTime}</Text>
            <Text>{x.title}</Text>
            </Fragment>
        )})}
        </>
    )
}

export default BookingPage;