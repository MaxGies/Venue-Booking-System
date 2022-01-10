import { useState, useEffect } from 'react';
import {
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';

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
          <Menu>
            <MenuButton as={Text} cursor="pointer" color="white">
              Room Timeline
            </MenuButton>
            <MenuList>
              <Link href="/bookings/A101">
                <a>
                  <MenuItem>Room A101</MenuItem>
                </a>
              </Link>
              <Link href="/bookings/A102">
                <a>
                  <MenuItem>Room A102</MenuItem>
                </a>
              </Link>
              <Link href="/bookings/Auditorium">
                <a>
                  <MenuItem>Room Auditorium</MenuItem>
                </a>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
