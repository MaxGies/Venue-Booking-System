import { useState, useEffect, Fragment } from 'react';
import { Flex, Box, Divider } from '@chakra-ui/react';

import NavBar from '../NavBar';

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Container;
