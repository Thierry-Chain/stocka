import {
  Box,
  Text,
  VStack,
  Flex,
  Container,
  SimpleGrid,
  Image,
  Alert,
  AlertIcon,
  Heading,
  Button,
} from '@chakra-ui/react';
import {
  BellIcon,
  QuestionIcon,
  AddIcon,
  InfoIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import crossImage from 'assets/responsive.jpg';
import stock1 from 'assets/stock1.jpg';
import stock2 from 'assets/stock2.jpg';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container minW="full" pl="0" pr="0">
      <Flex flexDir="column">
        <Heading
          fontWeight="bold"
          bgGradient="linear(to-l,blue.400,blue.900)"
          bgClip="text"
          textAlign="center"
          px="3"
          pt="10"
          size="xl"
        >
          Stock Management System
        </Heading>
        <Box
          opacity="0.6"
          color="blue.900"
          rounded="xl"
          shadow="xl"
          m="4"
          py="6"
        >
          <Text
            textAlign="center"
            fontSize={['sm']}
            fontWeight="semibold"
            lineHeight="2"
          >
            <BellIcon color="blue.500" mx="2" fontSize="3xl" />
            Hey , We helps you to manage your stock in smart way and we help you
            business to grow rapidly also at cross platforms .{' '}
          </Text>
        </Box>
      </Flex>
      <Flex p="2" flexDir="column">
        <Box
          bg="#e4e3e3"
          border="2px"
          h="120px"
          rounded="xl"
          shadow="xl"
          m="4"
          p="3"
          opacity="0.9"
          borderColor="gray.300"
          color="blue.900"
          w={['90%', '60%']}
        >
          <Text mt="4" fontSize={['sm', 'lg']} fontWeight="semibold">
            <b>Join us for free</b> , More users have started to enjoy our
            services <b>click</b> get started .
          </Text>
        </Box>
        <Link to="/login">
          <Button
            bg="#3983c4"
            color="white"
            size={['md']}
            px="1.5"
            mx="4"
            w={['40%', '25%']}
            my="2"
            py="6"
            _hover={{ color: 'white', bg: '#47a9da' }}
            fontSize="larger"
          >
            <ViewIcon mx="2" fontSize="3xl" />
            Get started
          </Button>
        </Link>
      </Flex>
      <Box m="0" p="0" minW="full">
        <Image
          opacity="0.75"
          h="inherit"
          minW="full"
          w="inherit"
          src={crossImage}
        />
      </Box>
      <Flex flexDir="column">
        <Box h="70vh" my="auto" py="auto">
          <Heading
            textAlign="center"
            size="lg"
            fontWeight="extrabold"
            lineHeight="3"
            color="blue.700"
            m="4"
            py="16"
            mx="auto"
          >
            <QuestionIcon color="pink.400" mx="2" fontSize="3xl" /> Who uses
            this application :
          </Heading>
          <VStack
            fontSize="md"
            fontWeight="semibold"
            lineHeight="2"
            color="blue.600"
            mx="auto"
            px="3"
            shadow="xl"
            width={[null, '50%']}
            bg="#9e9b9b34"
            rounded="md"
            bgGradient="linear(to-t,#cdcccd,#fffdfde0)"
            opacity="0.8"
          >
            <Box mx="auto" my="2">
              <Text p="3">
                <AddIcon color="blue.700" mx="2" fontSize="md" /> Every
                wholesale
              </Text>
              <Text p="3">
                <AddIcon color="blue.700" mx="2" fontSize="md" /> Every Retail
                saler
              </Text>
              <Text p="3">
                <AddIcon color="blue.700" mx="2" fontSize="md" /> Every
                Accountant
              </Text>
            </Box>
          </VStack>
        </Box>
        <Heading
          textAlign="center"
          size="lg"
          py="16"
          fontWeight="extrabold"
          lineHeight="3"
          color="blue.700"
          m="4"
          mx="auto"
        >
          <InfoIcon color="pink.400" mx="2" fontSize="3xl" /> Some of stocks we
          manage :
        </Heading>

        <SimpleGrid py={['0.5', '2']} columns={[1, 2]} spacing={[1, 3]}>
          <Image
            w={['80vw', null]}
            h={['25vh', 'auto']}
            src={stock1}
            mx="auto"
            rounded="lg"
          />

          <Image
            w={['80vw', null]}
            h={['25vh', 'auto']}
            src={stock2}
            mx="auto"
            rounded="lg"
          />
        </SimpleGrid>
      </Flex>
      <Box>
        <Heading
          textAlign="center"
          size="lg"
          py="12"
          fontWeight="extrabold"
          lineHeight="3"
          color="blue.700"
          m="4"
          mx="auto"
        >
          <InfoIcon color="pink.400" mx="2" fontSize="3xl" /> What legends said
          :
        </Heading>

        <SimpleGrid
          mx="2"
          fontWeight="semibold"
          fontSize="large"
          py="2"
          gap="6"
          columns={[1, 2]}
        >
          <Alert
            py="3"
            h="30vh"
            roundedRight="2xl"
            my="5"
            shadow="lg"
            bg="#9e9b9b34"
            variant="left-accent"
            flexDir="column"
            justifyContent="center"
          >
            <Flex>
              <AlertIcon my="auto" />
              “One of the great responsibilities that I have is to manage my
              assets wisely, so that they create value.”
            </Flex>
            <Text opacity="0.5" p="1">
              {' '}
              By Alice Walton
            </Text>
          </Alert>
          <Alert
            py="3"
            h="30vh"
            roundedRight="2xl"
            my="5"
            shadow="lg"
            bg="#9e9b9b34"
            variant="left-accent"
            flexDir="column"
            justifyContent="center"
          >
            <Flex>
              <AlertIcon my="auto" />
              “Know what you own, and know why you own it.”
            </Flex>
            <Text opacity="0.5" p="1">
              {' '}
              By Peter Lynch
            </Text>
          </Alert>
          <Alert
            py="3"
            h="30vh"
            roundedRight="2xl"
            my="5"
            shadow="lg"
            bg="#9e9b9b34"
            variant="left-accent"
            flexDir="column"
            justifyContent="center"
          >
            <Flex>
              <AlertIcon my="auto" />
              “Observe your information and make right decision.”
            </Flex>
            <Text opacity="0.5" p="1">
              {' '}
              By Peter Lynch
            </Text>
          </Alert>
        </SimpleGrid>
      </Box>
      <Heading
        fontWeight="bold"
        size="lg"
        py="12"
        bgGradient="linear(to-l,cyan.400,blue.900)"
        bgClip="text"
        textShadow="dark-lg"
        textAlign="center"
        p="3"
      >
        <BellIcon color="blue.900" mx="2" fontSize="3xl" /> Terms and services
      </Heading>
      <Footer />
    </Container>
  );
}
