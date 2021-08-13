import { useState } from 'react'
import {
  Container,
  Text,
  Input,
  Button,
  Spinner,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { WarningIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { useMutation } from 'react-query'
import { forgotPassword } from 'Redux/actions'
import { useSelector } from 'react-redux'
export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const { isLoading, mutateAsync } = useMutation(forgotPassword)
  const error = useSelector((state) => state.user.error)
  const handleForgot = (e) => {
    e.preventDefault()
    const data = {
      email,
    }
    mutateAsync(data)
  }
  return (
    <Container>
      <Text textAlign="center" fontWeight="semibold" color="blue.700">
        <WarningIcon color="blue.700" /> Forget password
      </Text>
      <Text textAlign="center" fontWeight="thin" color="blue.700">
        This will send link(valid for 2 hours) to your email and use to enter
        new password
      </Text>
      {error ? (
        <Alert status="warning" variant="left-accent">
          <AlertIcon />
          {error}
        </Alert>
      ) : null}
      <form onSubmit={handleForgot}>
        <Input
          isRequired
          value={email}
          borderColor="gray.500"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          my="1"
          placeholder="Enter  Email"
        />
        <Flex flexDir="column">
          <Button
            type="submit"
            my="2"
            _hover={{ textDecoration: 'underline' }}
            textAlign="center"
          >
            <InfoOutlineIcon mx="2" />I did n't receive link click here to
            Resend
          </Button>
          <Button mx="auto" type="submit" colorScheme="teal">
            {isLoading ? <Spinner size="xs" /> : 'Send'}
          </Button>
        </Flex>
      </form>
    </Container>
  )
}
