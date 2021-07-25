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
  Textarea,
  Button,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {
  BellIcon,
  ExternalLinkIcon,
  CopyIcon,
  EmailIcon,
} from '@chakra-ui/icons'
import { useState } from 'react'
export default function Footer() {
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
  )
}
