import {
  Container,
  Text,
  Box,
  Heading,
  SimpleGrid,
  Image,
  Link,
  VStack,
} from '@chakra-ui/react';
import { InfoOutlineIcon, InfoIcon, AddIcon } from '@chakra-ui/icons';
import library from 'assets/large.jpg';
import other from 'assets/onother.jpg';
import Footer from './Footer';
export default function About() {
  return (
    <Container minW="full" pl="0" pr="0">
      <VStack h="40vh" justifyContent="space-around">
        <Box>
          <Heading
            fontWeight="bold"
            bgGradient="linear(to-l,blue.300,blue.800)"
            bgClip="text"
            textAlign="center"
            p="3"
            size="xl"
          >
            Stock Management System
          </Heading>
          <Text opacity="0.6" w="55%" py="5" mx="auto" fontWeight="semibold">
            We helps you to manage your stock in smart way and we help you
            business to grow rapidly also at cross platforms{' '}
          </Text>
        </Box>
        {/*
          <Box color="blue.900" rounded="xl" shadow="md" m="3" p="2">
          <Text
            textAlign="center"
            fontSize="md"
            fontWeight="semibold"
            lineHeight="2"
          >
            <BellIcon color="blue.700" mx="2" fontSize="3xl" />
            Thanks for visiting stock management system
          </Text>
          </Box>
          */}
      </VStack>

      <Heading
        fontWeight="bold"
        size="lg"
        bgGradient="linear(to-l,blue.300,blue.800)"
        bgClip="text"
        textAlign="center"
        p="6"
        mt="2"
      >
        <InfoOutlineIcon color="pink.400" mx="2" />
        Recent Works
      </Heading>

      <Box pb="4rem">
        <SimpleGrid columns={['1', '2', '3']} spacing={['1', '5']}>
          <Link
            mx="auto"
            isExternal
            href="https://smart-library-rw.herokuapp.com"
          >
            <Image h="250px" src={library} />
          </Link>
          <Link mx="auto" isExternal href="https://stflibrary.herokuapp.com">
            <Image h="250px" src={library} />
          </Link>
          <Link px="auto" href="https://github.com/thierry-Chain" isExternal>
            <Image px="auto" h="250px" src={other} />
          </Link>
        </SimpleGrid>
      </Box>
      <Box
        position="relative"
        mx="auto"
        shadow="2xl"
        border
        w={['94%', '80%']}
        py="12"
        my="6"
        px="4"
      >
        <Text
          textAlign="center"
          fontSize="md"
          fontWeight="semibold"
          lineHeight="2"
          my="2"
          py="1"
          opacity="0.8"
        >
          <InfoIcon color="blue.700" mx="2" fontSize="3xl" />
          Benefits of stock management system
        </Text>
        <Text textAlign="left">
          <AddIcon color="blue.700" mx="2" fontSize="md" />
          Helps to know profit/loss
        </Text>
        <Text textAlign="left">
          <AddIcon color="blue.700" mx="2" fontSize="md" /> Helps to make stock
          control in a period
        </Text>
        <Text textAlign="left">
          <AddIcon color="blue.700" mx="2" fontSize="md" /> Shows current state
          of stock
        </Text>
        <Text textAlign="left">
          <AddIcon color="blue.700" mx="2" fontSize="md" />
          Accessible every where
        </Text>
        <Text textAlign="left">
          <AddIcon color="blue.700" mx="2" fontSize="md" /> Helps in decision
          making
        </Text>
        <Box
          pos="absolute"
          h="10rem"
          w="10rem"
          rounded="50%"
          right="-4rem"
          bottom="-4rem"
          bgGradient="linear(to-l,#588ca24a,#26202000)"
        />
      </Box>

      <Box
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.300,blue.800)"
        bgClip="text"
        textAlign="center"
        p="3"
        my="12"
      >
        <Text opacity="0.5">Developed by </Text>
        <Link
          _hover={{ fontWeight: 'bolder', color: 'twitter.900' }}
          href="https://github.com/thierry-Chain"
        >
          <Heading>StackFielders Team</Heading>
        </Link>
      </Box>
      <Footer />
    </Container>
  );
}
