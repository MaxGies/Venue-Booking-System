import { Text, Flex } from '@chakra-ui/react';

import Container from '../../components/Layouts/Container';
import BookingForm from '../../components/Booking/BookingForm';

const BookingPage = () => {
  return (
    <Container>
      <Flex bgColor="#d8dbed" px="4%" pt="48px" pb="36px" mb="32px">
        <Text fontSize="48px" fontWeight="bold">
          Booking Room
        </Text>
      </Flex>
      <Flex justifyContent="center" mt="48px">
        <BookingForm />
      </Flex>
    </Container>
  );
};

export default BookingPage;
