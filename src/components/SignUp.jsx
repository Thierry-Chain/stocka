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
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { signUp, clearErrors } from 'Redux/actions'
export default function SignUp(props) {
  const showRegToast = useSelector((state) => state.user.showRegToast)
  const userError = useSelector((state) => state.user.error)
  const auth = useSelector((state) => state.user.auth)

  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [passcode, setPasscode] = useState('')
  const [passcode2, setPasscode2] = useState('')
  const [phone, setPhone] = useState('')
  const [userName, setUserName] = useState('')
  const [gender, setGender] = useState('')
  const toast = useToast()
  const { isLoading, mutateAsync } = useMutation(signUp)
  const handleSubmit = (e) => {
    e.preventDefault()

    const vars = {
      username: userName,
      email,
      phone,
      password: passcode,
      confirmPassword: passcode2,
      role: 'USER',
      gender,
    }
    mutateAsync(vars)
  }

  useEffect(() => {
    if (showRegToast) {
      toast({
        title: 'Account created.',
        description: "We've created your account for you so log in",
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
      props.history.push('/login')
    }
  }, [showRegToast, toast, props, auth])
  useEffect(() => {
    if (userError)
      toast({
        title: 'Account not created.',
        description: userError,
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
  }, [userError, toast])
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
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                name="userName"
                border="2px"
                w="95%"
                type="text"
              />
            </FormControl>
            <FormControl mx="auto" isRequired>
              <FormLabel>Gender</FormLabel>
              <Select
                onChange={(e) => setGender(e.target.value)}
                name="gender"
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                name="phone"
                border="2px"
                w="95%"
                type="tel"
              />
            </FormControl>
            <FormControl mx="auto" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                border="2px"
                w="95%"
                type="email"
              />
            </FormControl>

            <FormControl mx="auto" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                name="passcode"
                placeholder="Enter password"
                border="2px"
                w="95%"
                type="password"
              />
            </FormControl>
            <FormControl mx="auto" isRequired>
              <FormLabel>confirm</FormLabel>
              <Input
                value={passcode2}
                onChange={(e) => setPasscode2(e.target.value)}
                name="passcode2"
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
            <Button
              onClick={() => dispatch(clearErrors())}
              w="50%"
              mx="auto"
              bg="gray.500"
              type="submit"
            >
              {isLoading ? <Spinner color="cyan.900" size="md" /> : 'Register'}
            </Button>
          </Flex>
        </form>
      </Box>
    </Container>
  )
}
