import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex, Text, Box } from '@chakra-ui/react';
import moment from 'moment';

import { BookingDataType } from '../../utils/types';

const RoomIdPage = () => {
  const [bookedData, setBookedData] = useState<BookingDataType[]>([]);
  const [roomAppintmentsData, setRoomAppointmentsData] = useState<
    BookingDataType[]
  >([]);
  const [appointmentOneDate, setAppointmentOneDate] = useState<
    BookingDataType[]
  >([]);
  const router = useRouter();
  const { roomId } = router.query;

  const fetchBooking = async () => {
    const response = await fetch('/api/bookingData');
    const data = await response.json();
    setBookedData(data);
  };

  const findRoomAppointments = () => {
    const roomAppointments = bookedData
      .filter((data) => data.roomId === roomId)
      .filter(
        (data) =>
          new Date().getTime() <= new Date(Date.parse(data.startTime)).getTime()
      )
      .sort(
        (a, b) =>
          new Date(Date.parse(a.startTime)).getTime() -
          new Date(Date.parse(b.startTime)).getTime()
      );

    const roomAppointmentsInOneDay = roomAppointments
      .filter(
        (data) =>
          moment(Date.parse(roomAppointments[0].startTime)) <=
            moment(Date.parse(data.startTime)) ||
          moment(Date.parse(roomAppointments[0].startTime)).add(1, 'days') <=
            moment(Date.parse(data.startTime))
      )
      .sort(
        (a, b) =>
          new Date(Date.parse(a.startTime)).getTime() -
          new Date(Date.parse(b.startTime)).getTime()
      );

    setAppointmentOneDate(roomAppointmentsInOneDay);
    setRoomAppointmentsData(roomAppointments);
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  useEffect(() => {
    findRoomAppointments();
  }, [bookedData]);

  return (
    <Flex w="100%">
      <Flex w="40%" bgColor="#46529D" direction="column" minH="100vh">
        <Flex justifyContent="flex-end" w="100%">
          <Flex w="80%" bgColor="#2EBAEE" pt="42px" pl="48px" pb="12px">
            <Text fontSize="54px" fontWeight="700" color="white">
              {roomId}
            </Text>
          </Flex>
        </Flex>
        <Flex w="100%" pl="20%" direction="column">
          <Text mt="124px" color="white">
            Upcoming
          </Text>
          <Text
            fontWeight="300"
            fontSize="64px"
            color="white"
            opacity="0.5"
            mt="58px"
          >
            {appointmentOneDate.length >= 1
              ? moment(
                  new Date(Date.parse(appointmentOneDate[0]?.startTime))
                ).format('dddd')
              : 'No Data'}
          </Text>
          <Text
            fontWeight="300"
            fontSize="64px"
            color="white"
            lineHeight="64px"
            pb="90px"
          >
            {appointmentOneDate.length >= 1
              ? moment(
                  new Date(Date.parse(appointmentOneDate[0]?.startTime))
                ).format('DD MMM')
              : 'No Data'}
          </Text>

          {appointmentOneDate.length >= 1
            ? appointmentOneDate.map((data) => (
                <Flex direction="column" mb="32px" key={data.startTime}>
                  <Text
                    fontSize="16px"
                    fontWeight="400"
                    color="white"
                    opacity="0.5"
                  >{`${moment(new Date(Date.parse(data.startTime))).format(
                    'HH:mm'
                  )} - ${moment(new Date(Date.parse(data.endTime))).format(
                    'HH:mm'
                  )}`}</Text>
                  <Text color="white" fontSize="20px" fontWeight="400">
                    {data.title}
                  </Text>
                </Flex>
              ))
            : 'No Data'}
        </Flex>
      </Flex>
      <Flex w="60%" direction="column">
        <Flex w="100%" bgColor="#EFEEEC" h="135px" alignItems="flex-end">
          <Flex direction="column" ml="64px" gridGap="24px" alignItems="center">
            <Text fontSize="24px">WHOLE TIMELINE</Text>
            <Box bgColor="#707FDD" h="4px" w="52px" />
          </Flex>
        </Flex>

        {roomAppintmentsData.length >= 1 ? (
          roomAppintmentsData.map((data) => (
            <Flex
              w="auto"
              bgColor="white"
              mt="64px"
              direction="column"
              alignItems="center"
            >
              <Flex
                w="80%"
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
            </Flex>
          ))
        ) : (
          <Flex
            w="auto"
            bgColor="white"
            mt="64px"
            direction="column"
            alignItems="center"
          >
            <Flex
              w="80%"
              p="16px"
              gridGap="12px"
              border="1px"
              borderRadius="12px"
              borderColor="grayScale.300"
              direction="column"
            >
              <Text whiteSpace="pre-line">{`NO DATA`}</Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default RoomIdPage;
