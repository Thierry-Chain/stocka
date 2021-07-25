import {
  Container,
  Text,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { useState } from 'react'
export default function SignUp() {
  const [Email, setEmail] = useState('')
  const [Passcode, setPasscode] = useState('')
  const [Passcode2, setPasscode2] = useState('')
  const [Phone, setPhone] = useState('')
  const [UserName, setUserName] = useState('')
  const [Gender, setGender] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`${Email} ${Passcode} ${Gender} ${UserName} ${Passcode2} ${Phone}`)
  }

  return (
    <Container h="full">
      <Text
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.400,blue.900)"
        bgClip="text"
        textAlign="center"
      >
        Signup stock
      </Text>
      <Box shadow="2xl" p="3" my="2" rounded="lg" color="blue.900">
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="column">
            <FormControl mx="auto" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                name="UserName"
                border="2px"
                w="95%"
                type="text"
              />
            </FormControl>
            <FormControl mx="auto" isRequired>
              <FormLabel>Gender</FormLabel>
              <Select
                onChange={(e) => setGender(e.target.value)}
                name="Gender"
                w="95%"
                placeholder="...."
                isRequired
              >
                <option value="m">Male</option>
                <option value="f">Female</option>
              </Select>
            </FormControl>
            <FormControl mx="auto" isRequired>
              <FormLabel>Phone number</FormLabel>
              <Input
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                name="Phone"
                border="2px"
                w="95%"
                type="tel"
              />
            </FormControl>
            <FormControl mx="auto" isRequired>
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

            <FormControl mx="auto" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                value={Passcode}
                onChange={(e) => setPasscode(e.target.value)}
                name="Passcode"
                placeholder="Enter password"
                border="2px"
                w="95%"
                type="password"
              />
            </FormControl>
            <FormControl mx="auto" isRequired>
              <FormLabel>confirm</FormLabel>
              <Input
                value={Passcode2}
                onChange={(e) => setPasscode2(e.target.value)}
                name="Passcode2"
                border="2px"
                w="95%"
                placeholder="Confirm password"
                type="password"
              />
            </FormControl>
            <Link to="/login">
              <Text
                py="1"
                _hover={{ textDecoration: 'underline' }}
                textAlign="center"
              >
                <InfoOutlineIcon mx="2" />
                Already registered click here
              </Text>
            </Link>
            <Button w="50%" mx="auto" bg="gray.500" type="submit">
              Register
            </Button>
          </Flex>
        </form>
      </Box>
    </Container>
  )
}
