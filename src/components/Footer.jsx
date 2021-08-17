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
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(email + userName + message)
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
          <Text mx="auto" textAlign="center">
            Send Feedback/Advice
          </Text>
          <form onSubmit={handleSubmit}>
            <Flex flexDir="column">
              <FormControl w="80%" mx="auto" isRequired>
                <Input
                  my="2"
                  onChange={(e) => {
                    setUserName(e.target.value)
                  }}
                  value={userName}
                  mx="auto"
                  placeholder="Type name"
                />
              </FormControl>
              <FormControl mx="auto" w="80%" isRequired>
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
              <FormControl mx="auto" w="95%" isRequired>
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
                  fontWeight="extrabold"
                  fontSize="xl"
                  as={auth ? AiOutlineAppstoreAdd : AiOutlineLogin}
                />
                {auth ? 'My stock' : 'Login'}
              </Link>
              <Link to={auth ? '/loggedIn/records' : '/signup'}>
                <Icon
                  fontWeight="extrabold"
                  fontSize="xl"
                  as={auth ? AiOutlineHistory : AiOutlineUsergroupAdd}
                />
                {auth ? 'Records' : 'Signup'}
              </Link>
              <Link to={auth ? '/loggedIn/pay' : '/about'}>
                <Icon
                  fontWeight="extrabold"
                  fontSize="xl"
                  as={auth ? AiOutlineMoneyCollect : AiFillTags}
                />
                {auth ? 'Payment' : 'About'}
              </Link>
            </VStack>
            <Divider orientation="vertical" p="2" />

            <VStack mr="auto" ml="2">
              <ChakraLink href="/github" isExternal>
                <Icon fontWeight="extrabold" fontSize="xl" as={AiFillGithub} />
                Github
              </ChakraLink>
              <ChakraLink href="/email" isExternal>
                <Icon fontWeight="extrabold" fontSize="xl" as={AiOutlineMail} />
                Email
              </ChakraLink>
              <ChakraLink href="/twitter" isExternal>
                <Icon
                  fontWeight="extrabold"
                  fontSize="xl"
                  as={AiOutlineTwitter}
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
            />
            Copyright from 2021-{year}
          </Text>
        </Flex>
      </SimpleGrid>
      <Text
        display={['none', 'block']}
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.300,blue.600)"
        bgClip="text"
        textAlign="center"
        p="3"
      >
        Call for support (+250784405833)
      </Text>
    </Box>
  )
}
