import { useState, useEffect } from 'react';
import {
  Text,
  Flex,
  Box,
  Icon,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Portal,
  IconButton,
} from '@chakra-ui/react';
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
              <Text fontSize="xl" color="white">
                Gallery
              </Text>
            </a>
          </Link>
          <Link href="/bookings">
            <a>
              <Text fontSize="xl" color="white">
                Booking System
              </Text>
            </a>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
