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
} from '@chakra-ui/react'
import { BellIcon, QuestionIcon, AddIcon, InfoIcon } from '@chakra-ui/icons'
import crossImage from 'assets/responsive.jpg'
import stock1 from 'assets/stock1.jpg'
import stock2 from 'assets/stock2.jpg'
import Footer from './Footer'

export default function Home() {
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
      <Box color="blue.900" rounded="xl" shadow="xl" m="4" p="3">
        <Text
          textAlign="center"
          fontSize="md"
          fontWeight="semibold"
          lineHeight="2"
        >
          <BellIcon color="blue.500" mx="2" fontSize="3xl" />
          Hey , welcome we helps you to manage your stock of goods in smart way
          and it has cross support in devices{' '}
        </Text>
      </Box>
      <Box m="0" p="0" minW="full">
        <Image h="inherit" minW="full" w="inherit" src={crossImage} />
      </Box>
      <Flex flexDir="column">
        <Text
          textAlign="center"
          fontSize="md"
          fontWeight="extrabold"
          lineHeight="3"
          color="blue.700"
          m="4"
          p="2"
          mx="auto"
        >
          <QuestionIcon color="pink.400" mx="2" fontSize="3xl" /> Who uses this
          application :
        </Text>
        <VStack
          fontSize="md"
          fontWeight="semibold"
          lineHeight="2"
          color="blue.600"
          mx="auto"
          px="3"
          shadow="2xl"
          width={[null, '50%']}
          bg="#9e9b9b34"
          rounded="md"
        >
          <Box mx="auto" my="2">
            <Text>
              <AddIcon color="blue.700" mx="2" fontSize="md" /> Every wholesale
            </Text>
            <Text>
              <AddIcon color="blue.700" mx="2" fontSize="md" /> Every Retail
              saler
            </Text>
            <Text>
              <AddIcon color="blue.700" mx="2" fontSize="md" /> Every Accountant
            </Text>
          </Box>
        </VStack>
        <Text
          textAlign="center"
          fontSize="md"
          fontWeight="extrabold"
          lineHeight="3"
          color="blue.700"
          m="4"
          p="2"
          mx="auto"
        >
          <InfoIcon color="pink.400" mx="2" fontSize="3xl" /> Some of stocks we
          manage :
        </Text>

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
        <Text
          textAlign="center"
          fontSize="md"
          fontWeight="extrabold"
          lineHeight="3"
          color="blue.700"
          m="4"
          p="2"
          mx="auto"
        >
          <InfoIcon color="pink.400" mx="2" fontSize="3xl" /> What legends said
          :
        </Text>

        <Box mx="2" fontWeight="semibold" fontSize="large">
          <Alert my="5" shadow="lg" bg="#9e9b9b34" variant="left-accent">
            <AlertIcon />
            “One of the great responsibilities that I have is to manage my
            assets wisely, so that they create value.” By Alice Walton
          </Alert>

          <Alert my="5" shadow="lg" bg="#9e9b9b34" variant="left-accent">
            <AlertIcon /> “Know what you own, and know why you own it.” By Peter
            Lynch
          </Alert>
          <Alert my="5" shadow="lg" bg="#9e9b9b34" variant="left-accent">
            <AlertIcon /> “Observe your information and make right decision.” By
            Peter Lynch
          </Alert>
        </Box>
      </Box>
      <Text
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,cyan.400,blue.900)"
        bgClip="text"
        textShadow="dark-lg"
        textAlign="center"
        p="3"
      >
        <BellIcon color="blue.900" mx="2" fontSize="3xl" /> Terms and services
      </Text>
      <Footer />
    </Container>
  )
}
