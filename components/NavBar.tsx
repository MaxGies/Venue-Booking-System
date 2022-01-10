import { useState, useEffect } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavBar = () => {
  return (
    <Flex h="68px" alignItems="center" bgColor="#46529D" px="4%">
      <Flex justifyContent="space-between" w="100%">
        <Link href="/">
          <a>
            <Text fontSize="xl" color="white">
              Venue Booking System
            </Text>
          </a>
        </Link>
        <Flex gridGap="32px">
          <Link href="/gallery">
            <a>
              <Text fontSize="m" color="white">
                Gallery
              </Text>
            </a>
          </Link>
          <Link href="/rooms">
            <a>
              <Text fontSize="m" color="white">
                About Room
              </Text>
            </a>
          </Link>
          <Link href="/bookings">
            <a>
              <Text fontSize="m" color="white">
                Booking Room
              </Text>
            </a>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
