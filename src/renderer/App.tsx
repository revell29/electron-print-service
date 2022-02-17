/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Badge, Box, Flex, Text, Image } from '@chakra-ui/react';
import * as React from 'react';
import { Printer } from 'react-feather';
import icon from '../../assets/pos-print.png';

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

  React.useEffect(() => {
    window.electronAPI.send('printer', 'hello');

    window.electronAPI.on('server-on', () => {
      console.log('server-on');
    });

    window.electronAPI.on('printer', (data: any) => {
      setDevicesPrinter(data);
      console.log('printer', data);
    });
  }, []);

  return (
    <Flex
      h="100vh"
      justifyContent="center"
      maxW="32rem"
      m="auto"
      flexDir="column"
    >
      <Image
        src={icon}
        alt="logo"
        mb="5rem"
        w="18rem"
        alignSelf="center"
        d="inline-block"
      />
      <Box
        d="flex"
        bg="gray.100"
        px={5}
        py={3}
        w="full"
        rounded="md"
        roundedBottom={0}
        alignItems="center"
        justifyContent="space-between"
        boxShadow="sm"
      >
        <Box d="flex" alignItems="center">
          <Printer size={32} />
          <Text fontWeight="bold" ml={4}>
            {devicePrinter
              ? devicePrinter.deviceName
              : 'Tidak ada printer terhubung'}
          </Text>
        </Box>
        <Badge colorScheme={devicePrinter ? 'serial' : 'red'}>
          {devicePrinter ? 'Terhubung' : 'Terputus'}
        </Badge>
      </Box>
      {devicePrinter && (
        <Box
          px={5}
          py={3}
          textAlign="left"
          bg="#fafafa"
          fontSize="xs"
          boxShadow="sm"
          roundedBottom="md"
        >
          <Flex justifyContent="space-between">
            <Text>Serice Port </Text>
            <Text>4444</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>ProductID </Text>
            <Text>{devicePrinter?.productId}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>vendorId </Text>
            <Text>{devicePrinter?.vendorId}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>Manufacture </Text>
            <Text>{devicePrinter?.manufacturer}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>Serial Number</Text>
            <Text>{devicePrinter?.serialNumber}</Text>
          </Flex>
        </Box>
      )}
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
