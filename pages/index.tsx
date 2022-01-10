import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Text, Flex } from '@chakra-ui/react';

import Container from '../components/Layouts/Container';

const Home: NextPage = () => {
  return (
    <Container>
      <Flex w="100%" justifyContent="center">
        <Text fontSize="32px" mt="80px">
          Please Select menu in Navigation Bar
        </Text>
      </Flex>
    </Container>
  );
};

export default Home;
