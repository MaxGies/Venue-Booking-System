import { useState, useEffect } from 'react';
import { Input, Button, Flex, Text, Select, useToast } from '@chakra-ui/react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { BookingDataType } from '../../utils/types';

const BookingForm = () => {
  const [bookedData, setBookedData] = useState<BookingDataType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('A101');
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [isOpenStartDate, setIsOpenStartDate] = useState<boolean>(false);
  const [isOpenEndDate, setIsOpenEndDate] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>('');
  const [isSubmitEject, setIsSubmitEject] = useState<boolean>(false);
  const toast = useToast();

  const fetchBooking = async () => {
    const response = await fetch('/api/bookingData');
    const data = await response.json();
    setBookedData(data);
  };

  //Call Booked Data
  useEffect(() => {
    fetchBooking();
  }, []);

  const successToast = () => {
    toast({
      title: 'Booked created.',
      description: 'Room Avaliable',
      status: 'success',
      duration: 6000,
      isClosable: true,
    });
  };

  const errorToast = () => {
    toast({
      title: 'Room NOT AVALIABLE.',
      status: 'error',
      duration: 6000,
      isClosable: true,
    });
  };

  const isPassBookingConditions: boolean[] = bookedData
    .filter((data) => data.roomId === selectedRoom)
    .map((data) => {
      if (
        startDate !== null &&
        endDate !== null &&
        startDate !== undefined &&
        endDate !== undefined
      ) {
        const startDateData = new Date(Date.parse(data.startTime));
        const endDateData = new Date(Date.parse(data.endTime));
        const bookingStartDate = new Date(startDate);
        const bookingEndDate = new Date(endDate);
        if (
          (bookingStartDate > startDateData &&
            bookingEndDate > endDateData &&
            bookingStartDate < endDateData) ||
          (bookingStartDate < startDateData &&
            bookingEndDate < endDateData &&
            bookingEndDate > startDateData) ||
          (bookingStartDate < startDateData && bookingEndDate > endDateData) ||
          (bookingStartDate > startDateData && bookingEndDate < endDateData) ||
          bookingStartDate.getTime() === startDateData.getTime() ||
          bookingEndDate.getTime() === endDateData.getTime() ||
          bookingStartDate.getTime() === bookingEndDate.getTime() ||
          bookingStartDate.getTime() > bookingEndDate.getTime()
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });

  const isPassBookingCondition: boolean = isPassBookingConditions.every(
    (result) => result === true
  );

  const submitBooking = async () => {
    if (inputTitle === '' || startDate === null || endDate === null) {
      setIsSubmitEject(true);
      errorToast();
      return;
    }
    if (!isPassBookingCondition) {
      console.warn('ERROR TIME CONDITION');
      errorToast();
      return;
    }
    const response = await fetch('/api/bookingData', {
      method: 'POST',
      body: JSON.stringify({
        roomId: selectedRoom,
        startTime: moment(startDate).format('yyyy-MM-DD HH:mm:ss'),
        endTime: moment(endDate).format('yyyy-MM-DD HH:mm:ss'),
        title: inputTitle,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    successToast();
    fetchBooking();
  };

  const handleClickStartDate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpenStartDate(!isOpenStartDate);
  };

  const handleClickEndDate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpenEndDate(!isOpenEndDate);
  };

  useEffect(() => {
    if (
      inputTitle !== '' &&
      startDate !== null &&
      endDate !== null &&
      startDate !== endDate
    ) {
      setIsSubmitEject(false);
    }
  }, [inputTitle, startDate, endDate]);

  return (
    <Flex
      w="80%"
      p="32px"
      direction="column"
      border="1px"
      borderColor="#2EBAEE"
      bgColor="white"
      borderRadius="16px"
      gridGap="16px"
    >
      <Flex direction="column" w="100%">
        <Text p="6px" fontSize="16px" fontWeight="600">
          Select Room
        </Text>
        <Select
          bgColor="white"
          value={selectedRoom}
          onChange={(event) => setSelectedRoom(event.target.value)}
        >
          <option value="A101">Room A101</option>
          <option value="A102">Room A102</option>
          <option value="Auditorium">Auditorium</option>
        </Select>
      </Flex>

      <Flex direction="column" w="100%">
        <Text p="6px" fontSize="16px" fontWeight="600">
          Start Date
        </Text>
        <Button
          px="16px"
          py="8px"
          bgColor="white"
          border="1px"
          borderRadius="8px"
          borderColor="#ECECEC"
          onClick={handleClickStartDate}
          _hover={{ bgColor: '#f7f7f7' }}
          _focus={{ boxShadow: '0' }}
        >
          {startDate
            ? moment(startDate).format('MMMM DD, yyyy HH:mm A')
            : 'Enter Start Date Time'}
        </Button>
        {isOpenStartDate && (
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setIsOpenStartDate(!isOpenStartDate);
            }}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            inline
          />
        )}
      </Flex>

      <Flex direction="column" w="100%">
        <Text p="6px" fontSize="16px" fontWeight="600">
          End Date
        </Text>
        <Button
          px="16px"
          py="8px"
          bgColor="white"
          border="1px"
          borderRadius="8px"
          borderColor="#ECECEC"
          onClick={handleClickEndDate}
          _hover={{ bgColor: '#f7f7f7' }}
          _focus={{ boxShadow: '0' }}
        >
          {endDate
            ? moment(endDate).format('MMMM DD, yyyy HH:mm A')
            : 'Enter End Date Time'}
        </Button>
        {isOpenEndDate && (
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
              setIsOpenEndDate(!isOpenEndDate);
            }}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            inline
          />
        )}
      </Flex>

      <Flex direction="column" w="100%">
        <Text p="6px" fontSize="16px" fontWeight="600">
          Input Title
        </Text>
        <Input
          placeholder="Enter Title"
          bgColor="white"
          value={inputTitle}
          onChange={(event) => setInputTitle(event.target.value)}
        />
      </Flex>

      <Button
        colorScheme={isSubmitEject ? 'red' : 'blue'}
        mt="32px"
        borderRadius="50px"
        onClick={submitBooking}
        _focus={{ boxShadow: '0' }}
      >
        BOOKING
      </Button>

      {isSubmitEject && (
        <Text color="#FA4D56" fontWeight="bold">
          * Please enter information.
        </Text>
      )}
    </Flex>
  );
};

export default BookingForm;
