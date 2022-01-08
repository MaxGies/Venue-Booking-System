import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Text } from '@chakra-ui/react';

import Container from '../components/Layouts/Container';

const Home: NextPage = () => {
  return (
    <Container>
      <Text> HI </Text>
    </Container>
  );
};

export default Home;
