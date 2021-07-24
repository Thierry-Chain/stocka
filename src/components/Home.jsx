import {
  Box,
  Text,
  VStack,
  Flex,
  Container,
  SimpleGrid,
  Image,
  Link as ChakraLink,
  Divider,
  FormControl,
  Textarea,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  BellIcon,
  QuestionIcon,
  AddIcon,
  InfoIcon,
  ExternalLinkIcon,
  CopyIcon,
  EmailIcon,
} from '@chakra-ui/icons'
import crossImage from 'assets/responsive.jpg'
import stock1 from 'assets/stock1.jpg'
import stock2 from 'assets/stock2.jpg'

export default function Home() {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [message, setMessage] = useState('')
  const date = new Date()
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(email + userName + message)
  }
  const year = date.getFullYear()
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
          and is has cross support in devices{' '}
        </Text>
      </Box>
      <Box m="0" p="0" minW="full">
        <Image src={crossImage} />
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
          <Image src={stock1} mx="auto" rounded="lg" />
          <Image src={stock2} mx="auto" rounded="lg" />
        </SimpleGrid>
      </Flex>
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
      <Box as="footer" bg="#020202e8" h="auto" py="4">
        <Text
          fontWeight="bold"
          fontSize="larger"
          bgGradient="linear(to-l,blue.300,blue.600)"
          bgClip="text"
          textAlign="center"
          p="3"
        >
          Stock management system
        </Text>
        <SimpleGrid columns={[1, 2]}>
          <Flex
            flexDirection="column"
            fontSize="md"
            fontWeight="semibold"
            lineHeight="2"
            color="blue.400"
            border="honeydew"
            borderRight="2px"
          >
            <Text mx="auto" textAlign="center">
              Send Feedback/Advice
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <Flex flexDir="column">
                  <Input
                    my="2"
                    onChange={(e) => {
                      setUserName(e.target.value)
                    }}
                    value={userName}
                    mx="auto"
                    w="80%"
                    placeholder="Type name"
                  />
                  <Input
                    my="2"
                    as="input"
                    w="80%"
                    mx="auto"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    type="email"
                    placeholder="Type email"
                  />

                  <Textarea
                    my="2"
                    w="95%"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                    }}
                    mx="auto"
                    placeholder="Type your message here"
                  />
                  <Button
                    my="2"
                    w={['null', '60%']}
                    mx="auto"
                    type="submit"
                    variant="outline"
                    colorScheme="cyan"
                    leftIcon={<EmailIcon />}
                  >
                    Send
                  </Button>
                </Flex>
              </FormControl>
            </form>
          </Flex>
          <Flex
            flexDir="column"
            fontSize="md"
            fontWeight="semibold"
            lineHeight="2"
            color="blue.300"
          >
            <ChakraLink my="3" href="/about" isExternal>
              <Text textAlign="center">
                <ExternalLinkIcon mx="2" />
                Terms and conditions
              </Text>
            </ChakraLink>
            <Box h="1" w="50%" py="1" mx="auto" />
            <Flex justifyContent="space-between">
              <VStack ml="auto" mr="2">
                <Link to="/login">
                  <BellIcon />
                  Login
                </Link>
                <Link to="/signup">
                  <BellIcon />
                  Signup
                </Link>
                <Link to="/about">
                  <BellIcon />
                  About
                </Link>
              </VStack>
              <Divider orientation="vertical" p="2" />

              <VStack mr="auto" ml="2">
                <ChakraLink href="/github" isExternal>
                  <BellIcon />
                  Github
                </ChakraLink>
                <ChakraLink href="/email" isExternal>
                  <BellIcon />
                  Email
                </ChakraLink>
                <ChakraLink href="/twitter" isExternal>
                  <BellIcon />
                  Twitter
                </ChakraLink>
              </VStack>
            </Flex>

            <Text my="4" textAlign="center">
              <CopyIcon />
              Copyright from 2021-{year}
            </Text>
          </Flex>
        </SimpleGrid>
      </Box>
    </Container>
  )
}
