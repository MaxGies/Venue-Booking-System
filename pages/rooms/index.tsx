import { useState, useEffect } from 'react';
import { Button, Flex, Text, Select, Collapse } from '@chakra-ui/react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import Container from '../../components/Layouts/Container';
import { BookingDataType } from '../../utils/types';

const RoomPage = () => {
  const [bookedData, setBookedData] = useState<BookingDataType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('A101');
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [isOpenStartDate, setIsOpenStartDate] = useState<boolean>(false);
  const [isOpenEndDate, setIsOpenEndDate] = useState<boolean>(false);
  const [isSubmitEject, setIsSubmitEject] = useState<boolean>(false);
  const [bookedRoom, setBookedRoom] = useState<BookingDataType[]>([]);
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const fetchBooking = async () => {
    const response = await fetch('/api/bookingData');
    const data = await response.json();
    setBookedData(data);
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const checkAvailability = (
    roomId: string,
    startTime: Date | null | undefined,
    endTime: Date | null | undefined
  ) => {
    if (
      startTime === null ||
      endTime === null ||
      startTime === undefined ||
      endTime === undefined
    ) {
      setIsSubmitEject(true);
      return;
    } else {
      const bookedManageData = bookedData
        .filter((data) => data.roomId === roomId)
        .filter((data) => {
          const startDateData = new Date(Date.parse(data.startTime));
          const endDateData = new Date(Date.parse(data.endTime));
          const bookingStartDate = new Date(startTime);
          const bookingEndDate = new Date(endTime);
          return (
            (bookingStartDate > startDateData &&
              bookingEndDate > endDateData &&
              bookingStartDate < endDateData) ||
            (bookingStartDate < startDateData &&
              bookingEndDate < endDateData &&
              bookingEndDate > startDateData) ||
            (bookingStartDate < startDateData &&
              bookingEndDate > endDateData) ||
            (bookingStartDate > startDateData &&
              bookingEndDate < endDateData) ||
            bookingStartDate.getTime() === startDateData.getTime() ||
            bookingEndDate.getTime() === endDateData.getTime()
          );
        })
        .sort(
          (a, b) =>
            new Date(Date.parse(a.startTime)).getTime() -
            new Date(Date.parse(b.startTime)).getTime()
        );
      setIsToggle(false);
      setBookedRoom(bookedManageData);
    }
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
    setIsSubmitEject(false);
  }, [startDate, endDate]);

  return (
    <Container>
      <Flex bgColor="#d8dbed" px="4%" pt="48px" pb="36px" mb="32px">
        <Text fontSize="48px" fontWeight="bold">
          About Room
        </Text>
      </Flex>
      <Flex justifyContent="center" mt="48px">
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

          <Button
            colorScheme={isSubmitEject ? 'red' : 'blue'}
            mt="32px"
            borderRadius="50px"
            onClick={() => checkAvailability(selectedRoom, startDate, endDate)}
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
      </Flex>
      <Flex justifyContent="center" mt="48px">
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
          <Flex
            cursor={bookedRoom.length >= 1 ? 'pointer' : 'default'}
            justifyContent="space-between"
            onClick={() => bookedRoom.length >= 1 && setIsToggle(!isToggle)}
          >
            <Text fontWeight="bold">{`Room ${
              bookedRoom.length >= 1 ? 'has Booked' : 'is Avaliable'
            }`}</Text>
            {bookedRoom.length >= 1 &&
              (isToggle ? (
                <ChevronUpIcon boxSize="24px" color="primary.100" />
              ) : (
                <ChevronDownIcon boxSize="24px" color="primary.100" />
              ))}
          </Flex>
          <Collapse in={isToggle}>
            <Flex gridGap="16px" direction="column">
              {bookedRoom.map((data) => (
                <Flex
                  key={data.startTime}
                  p="16px"
                  gridGap="12px"
                  border="1px"
                  borderRadius="12px"
                  borderColor="grayScale.300"
                  direction="column"
                >
                  <Text whiteSpace="pre-line">
                    {`Room ID : ${data.roomId}
                    Title : ${data.title}
                    Start Time : ${data.startTime}
                    End Time : ${data.endTime}`}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Collapse>
        </Flex>
      </Flex>
    </Container>
  );
};

export default RoomPage;
