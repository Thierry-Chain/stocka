import {
  Link as ChakraLink,
  Box,
  Text,
  SimpleGrid,
  Flex,
  FormControl,
  Input,
  VStack,
  Divider,
  Icon,
  Textarea,
  Button,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ExternalLinkIcon, EmailIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  AiFillGithub,
  AiOutlineLogin,
  AiOutlineAppstoreAdd,
  AiOutlineUsergroupAdd,
  AiOutlineHistory,
  AiFillTags,
  AiOutlineMail,
  AiFillCopyrightCircle,
  AiOutlineMoneyCollect,
  AiOutlineTwitter,
} from 'react-icons/ai'
export default function Footer() {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [message, setMessage] = useState('')
  const auth = useSelector((state) => state.user.auth)
  const date = new Date()
  const cleanFormValues = () => {
    // setSending(false)
    setUserName('')
    setEmail('')
    setMessage('')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // started implementation of send feed back feature

    const rawData = JSON.stringify({
      to: ['irambonat0@gmail.com'],
      from_email: email,
      from_username: userName,
      subject: 'message from stocka',
      text: message,
      clientName: 'stocka app',
    })
    const hostedAt = `${process.env.REACT_APP_SEND_FEEDBACK_URL}/send-mail`
    fetch(hostedAt, {
      method: 'POST',
      body: rawData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert('Message sent')
        cleanFormValues()
      })
      .catch((e) => {
        alert('Network error !')
        window.location.reload()
      })
  }
  const year = date.getFullYear()
  return (
    <Box as="footer" bg="#020202e8" h="auto" py="4">
      <Text
        display={['none', 'block']}
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
          <Text ml="5" textAlign="left">
            Send Feedback/Advice
          </Text>
          <form onSubmit={handleSubmit}>
            <Flex flexDir="column" justifyContent="center" pl="2">
              <FormControl w="85%" ml="1.5" isRequired>
                <Input
                  my="2"
                  onChange={(e) => {
                    setUserName(e.target.value)
                  }}
                  value={userName}
                  placeholder="Type name"
                />
              </FormControl>
              <FormControl ml="1.5" w="85%" isRequired>
                <Input
                  my="2"
                  as="input"
                  mx="auto"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  type="email"
                  placeholder="Type email"
                />
              </FormControl>
              <FormControl ml="1.5" w="90%" isRequired>
                <Textarea
                  my="2"
                  w="95%"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                  }}
                  mx="auto"
                  placeholder="Type your message here"
                />{' '}
              </FormControl>
              <Button
                my="2"
                w={['90%', '60%']}
                ml="1.5"
                type="submit"
                variant="outline"
                colorScheme="cyan"
                leftIcon={<EmailIcon />}
              >
                Send
              </Button>
            </Flex>
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
              <Link to={auth ? '/loggedIn/stock' : '/login'}>
                <Icon
                  mb="-1"
                  mx="1"
                  fontWeight="extrabold"
                  fontSize="xl"
                  as={auth ? AiOutlineAppstoreAdd : AiOutlineLogin}
                />
                {auth ? 'My stock' : 'Login'}
              </Link>
              <Link to={auth ? '/loggedIn/records' : '/signup'}>
                <Icon
                  mb="-1"
                  mx="1"
                  fontWeight="extrabold"
                  fontSize="xl"
                  as={auth ? AiOutlineHistory : AiOutlineUsergroupAdd}
                />
                {auth ? 'Records' : 'Signup'}
              </Link>
              <Link to={auth ? '/loggedIn/pay' : '/about'}>
                <Icon
                  mb="-1"
                  mx="1"
                  fontWeight="extrabold"
                  fontSize="xl"
                  as={auth ? AiOutlineMoneyCollect : AiFillTags}
                />
                {auth ? 'Payment' : 'About'}
              </Link>
            </VStack>
            <Divider orientation="vertical" p="2" />

            <VStack mr="auto" ml="2">
              <ChakraLink href="https://github.com/Thierry-Chain" isExternal>
                <Icon
                  mb="-1"
                  mx="1"
                  fontWeight="extrabold"
                  fontSize="xl"
                  as={AiFillGithub}
                />
                Github
              </ChakraLink>
              <ChakraLink href="/email" isExternal>
                <Icon
                  mb="-1"
                  mx="1"
                  fontWeight="extrabold"
                  fontSize="xl"
                  as={AiOutlineMail}
                />
                Email
              </ChakraLink>
              <ChakraLink href="https://twitter/Thierry-Chain" isExternal>
                <Icon
                  fontWeight="extrabold"
                  fontSize="xl"
                  as={AiOutlineTwitter}
                  mb="-1"
                  mx="1"
                />
                Twitter
              </ChakraLink>
            </VStack>
          </Flex>

          <Text my="4" textAlign="center">
            <Icon
              fontWeight="extrabold"
              fontSize="xl"
              as={AiFillCopyrightCircle}
              mb="-1"
              mx="1"
            />
            Copyright from 2021-{year}
          </Text>
        </Flex>
      </SimpleGrid>
      <Box
        display={['none', 'block']}
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.200,blue.500)"
        bgClip="text"
        textAlign="center"
        p="3"
      >
        <Text>Call / Whatsapp for support</Text> (+250784405833)
      </Box>
    </Box>
  )
}
