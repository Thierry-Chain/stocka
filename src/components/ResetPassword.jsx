import { useState } from 'react'
import {
  Container,
  Box,
  Text,
  Input,
  Button,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { resetPassword } from 'Redux/actions'
import { useSelector } from 'react-redux'
export default function ResetPassword(props) {
  const token = props.match.params.token
  const error = useSelector((state) => state.user.error)

  const [codeNew, setCodeNew] = useState('')
  const [codeConfirm, setCodeConfirm] = useState('')
  const { mutateAsync, isLoading } = useMutation(resetPassword, {
    onSuccess: (dt) => {
      if (dt) {
        setTimeout(() => {
          props.history.push('/vip')
        }, 2500)
      }
    },
  })
  const resetOldPassword = (e) => {
    e.preventDefault()
    const data = {
      token,
      newPassword: codeNew,
      confirmPassword: codeConfirm,
    }

    mutateAsync(data)
  }
  return (
    <Container>
      <Box id="middle">
        <Container>
          <form onSubmit={resetOldPassword}>
            <Text textAlign="center" fontWeight="semibold" color="blue.700">
              Enter new password
            </Text>
            {error ? (
              <Alert status="warning" variant="left-accent">
                <AlertIcon />
                {error}
              </Alert>
            ) : null}
            <Input
              borderColor="blackAlpha.300"
              type="password"
              value={codeNew}
              onChange={(e) => setCodeNew(e.target.value)}
              my="1"
              placeholder="Enter new password"
            />
            <Input
              borderColor="blackAlpha.300"
              type="password"
              value={codeConfirm}
              onChange={(e) => setCodeConfirm(e.target.value)}
              my="1"
              placeholder="Confirm password"
            />
            <Button type="submit" colorScheme="teal">
              {isLoading ? <Spinner size="xs" /> : 'Save'}
            </Button>
          </form>
        </Container>
      </Box>
    </Container>
  )
}
