import {
  Container,
  Text,
  Box,
  Heading,
  SimpleGrid,
  Image,
  Link,
  Badge,
} from '@chakra-ui/react'
import { BellIcon, InfoOutlineIcon, InfoIcon, AddIcon } from '@chakra-ui/icons'
import library from 'assets/large.jpg'
import other from 'assets/onother.jpg'
import Footer from './Footer'
export default function About() {
  return (
    <Container minW="full" pl="0" pr="0">
      <Text
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.300,blue.800)"
        bgClip="text"
        textAlign="center"
        p="3"
      >
        Stock Management System
      </Text>

      <Box color="blue.900" rounded="xl" shadow="xl" m="3" p="2">
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

      <Box mx="auto" shadow="2xl" border w={['94%', '80%']} my="3" py="5">
        <Text
          textAlign="center"
          fontSize="md"
          fontWeight="semibold"
          lineHeight="2"
          my="2"
          py="1"
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
          <AddIcon color="blue.700" mx="2" fontSize="md" /> Helps in deciosion
          making
        </Text>
      </Box>
      <Text
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.300,blue.800)"
        bgClip="text"
        textAlign="center"
        p="3"
        mt="1"
      >
        <InfoOutlineIcon color="pink.400" mx="2" />
        Other Applications <Badge bg="pink.400">Best</Badge>:
      </Text>
      <SimpleGrid
        hm={['auto', '21vh']}
        overflow="auto"
        columns={['2', '3', '3']}
        spacing={['1', '10']}
      >
        <Box shadow="2xl" rounded="xl" h={['27vh', '19vh']} m="2">
          <Link isExternal href="https://smart-library-rw.herokuapp.com">
            <Image w="95%" h="100%" mx="auto" src={library} />
          </Link>
        </Box>

        <Box shadow="2xl" rounded="xl" h={['27vh', '19vh']} m="2">
          <Link isExternal href="https://lit-ravine-7205.herokuapp.com">
            <Image w="95%" h="100%" mx="auto" src={library} />
          </Link>
        </Box>
        <Box shadow="2xl" rounded="xl" h={['27vh', '19vh']} m="2">
          <Link isExternal href="#">
            <Image w="95%" h="100%" mx="auto" src={other} />
          </Link>
        </Box>
      </SimpleGrid>

      <Box
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.300,blue.800)"
        bgClip="text"
        textAlign="center"
        p="3"
        my="3"
      >
        Developed by <Heading>StackFielders Team</Heading>
      </Box>
      <Footer />
    </Container>
  )
}
