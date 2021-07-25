import {
  Container,
  Text,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { useState } from 'react'
export default function Login() {
  const [Email, setEmail] = useState('')
  const [Passcode, setPasscode] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`${Email} ${Passcode}`)
  }
  return (
    <Container h="100vh">
      <Text
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.400,blue.900)"
        bgClip="text"
        textAlign="center"
        p="3"
      >
        Login stock
      </Text>
      <Box shadow="2xl" rounded="lg" color="blue.900" p="2">
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column">
            <FormControl mx="auto" p="3" id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                name="Email"
                border="2px"
                w="95%"
                type="email"
              />
            </FormControl>

            <FormControl mx="auto" p="3" id="passcode" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                value={Passcode}
                onChange={(e) => setPasscode(e.target.value)}
                name="Passcode"
                border="2px"
                w="95%"
                type="password"
              />
            </FormControl>
            <Link to="/signup">
              <Text _hover={{ textDecoration: 'underline' }} textAlign="center">
                <InfoOutlineIcon mx="2" />
                Not registered click here
              </Text>
            </Link>
            <Button w="50%" mx="auto" bg="gray.500" type="submit" my="3">
              Go
            </Button>
          </Flex>
        </form>
      </Box>
    </Container>
  )
}
