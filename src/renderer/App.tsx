/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Printer } from 'react-feather';

interface PrinterConnected {
  deviceAddress: number;
  deviceName: string;
  locationId: number;
  manufacturer: string;
  productId: number;
  serialNumber: string;
  vendorId: number;
}

const MainPage = () => {
  const [devicePrinter, setDevicesPrinter] =
    React.useState<PrinterConnected | null>(null);
  const [isServerOn, setIsServerOn] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.electronAPI.send('printer', 'hello');

    window.electronAPI.on('server-on', (data: any) => {
      console.log('server-on');
      setIsServerOn(data);
    });

    window.electronAPI.on('printer', (data: any) => {
      setDevicesPrinter(data);
    });
  }, []);

  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      maxW="32rem"
      m="auto"
      flexDir="column"
    >
      <Box
        d="flex"
        bg="gray.100"
        px={5}
        py={3}
        w="full"
        rounded="md"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box d="flex" alignItems="center">
          <Printer size={32} />
          <Text fontWeight="bold" ml={4}>
            {devicePrinter
              ? devicePrinter.deviceName
              : 'Tidak ada printer terhubung'}
          </Text>
        </Box>
        <Badge bg={devicePrinter ? 'blue.500' : 'red.500'} color="white">
          {devicePrinter ? 'Terhubung' : 'Terputus'}
        </Badge>
      </Box>
      <Text mt={5}>Server is {isServerOn ? 'Running' : 'Not Running'}</Text>
    </Flex>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
