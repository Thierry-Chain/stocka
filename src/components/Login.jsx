import {
  Container,
  Text,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { login, clearErrors } from 'Redux/actions'
import { useMutation } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'

export default function Login(props) {
  const [Email, setEmail] = useState('')
  const [Passcode, setPasscode] = useState('')
  const UserError = useSelector((state) => state.user.error)
  const auth = useSelector((state) => state.user.auth)
  const { mutateAsync, status } = useMutation(login)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth) {
      props.history.push('/loggedIn')
    }
  }, [auth, props])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { email: Email, password: Passcode }
    await mutateAsync(data)
    // alert(`${Email} ${Passcode}`)
  }
  return (
    <Container h="100vh" zIndex="3">
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
      <Box
        // bgGradient="linear(to-t,#e0dbdb69,#e0dbdb23)"
        shadow="2xl"
        rounded="lg"
        color="blue.900"
        p="2"
        zIndex="3"
        pos="relative"
        id="cont"
      >
        <Box
          pos="absolute"
          h="10rem"
          w="10rem"
          rounded="50%"
          right="-4rem"
          zIndex="-3"
          bottom="-4rem"
          bgGradient="linear(to-l,#588ca280,#d5d1d126)"
        />
        {UserError ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{UserError}</AlertTitle>
          </Alert>
        ) : null}
        <form onSubmit={handleSubmit}>
          <Flex zIndex="3" flexDirection="column">
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
            <Link to="/reset">
              <Text _hover={{ textDecoration: 'underline' }} textAlign="center">
                <InfoOutlineIcon mx="2" />
                Forgot password click here
              </Text>
            </Link>
            <Button
              onClick={() => dispatch(clearErrors())}
              w="50%"
              mx="auto"
              bg="gray.400"
              type="submit"
              my="3"
            >
              {status === 'loading' ? (
                <Spinner color="cyan.900" size="md" />
              ) : (
                'Go'
              )}
            </Button>
          </Flex>
        </form>
      </Box>
    </Container>
  )
}
