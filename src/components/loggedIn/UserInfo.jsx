import {
  Container,
  Text,
  Box,
  Input,
  Button,
  Alert,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react'
import { SettingsIcon, WarningIcon } from '@chakra-ui/icons'
import CheckUp from './CheckUp'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { updateCredentials, updatePassword, delAccount } from 'Redux/actions'
import { useMutation } from 'react-query'
export default function UserInfo() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [code, setCode] = useState('')
  const [codeOld, setCodeOld] = useState('')
  const [codeNew, setCodeNew] = useState('')
  const [codeConfirm, setCodeConfirm] = useState('')
  const [passcode, setPasscode] = useState('')
  const { mutateAsync, isLoading: isLoading1 } = useMutation(updateCredentials)
  const { mutateAsync: editPasscode, isLoading: isLoading2 } = useMutation(
    updatePassword
  )
  const { mutateAsync: deleteAcc, isLoading: isLoading3 } = useMutation(
    delAccount
  )

  const oldUsername = useSelector((state) => state.user.client.username)
  const oldPhone = useSelector((state) => state.user.client.phone)
  const oldGender = useSelector((state) => state.user.client.gender)
  const oldEmail = useSelector((state) => state.user.client.email)
  const clientId = useSelector((state) => state.user.client.clientId)
  const error = useSelector((state) => state.user.error)
  const updateCredential = (e) => {
    e.preventDefault()
    const data = {
      clientId,
      username: name ? name : oldUsername,
      email: email ? email : oldEmail,
      phone: phone ? phone : oldPhone,
      gender: gender ? gender : oldGender,
      password: code,
    }

    mutateAsync(data)
  }
  const updateCode = (e) => {
    e.preventDefault()
    const data = {
      clientId,
      newPassword: codeNew,
      oldPassword: codeOld,
      confirmPassword: codeConfirm,
    }
    editPasscode(data)
  }
  const delMyAccount = (e) => {
    e.preventDefault()
    deleteAcc({ clientId, confirmPassword: passcode })
  }
  return (
    <Container minW="full" pl="0" pr="0">
      <CheckUp />
      <Text
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.300,blue.800)"
        bgClip="text"
        textAlign="center"
        p="2"
      >
        <SettingsIcon color="blue.800" /> All Settings
      </Text>
      <Text h="2" my="1" bg="telegram.300" mx="auto" w="14%" />
      <Box
        border="1px"
        borderColor="gray.300"
        my="3"
        shadow="lg"
        py="3"
        rounded="lg"
        id="simple"
      >
        <Container>
          <Text textAlign="center" fontWeight="semibold" color="blue.700">
            Update some user informations
          </Text>
          <form onSubmit={updateCredential}>
            {error ? (
              <Alert status="warning" variant="left-accent">
                <AlertIcon />
                {error}
              </Alert>
            ) : null}
            <Input
              borderColor="blackAlpha.300"
              defaultValue={oldUsername}
              onChange={(e) => setName(e.target.value)}
              my="1"
              placeholder="Enter username"
            />
            <Input
              defaultValue={oldPhone}
              borderColor="blackAlpha.300"
              onChange={(e) => setPhone(e.target.value)}
              my="1"
              placeholder="Enter Phone number"
            />
            <Input
              borderColor="blackAlpha.300"
              defaultValue={oldGender}
              onChange={(e) => setGender(e.target.value)}
              my="1"
              placeholder="Enter gender"
            />
            <Input
              borderColor="blackAlpha.300"
              defaultValue={oldEmail}
              onChange={(e) => setEmail(e.target.value)}
              my="1"
              placeholder="Enter Email"
            />
            <Input
              borderColor="blackAlpha.300"
              defaultValue={code}
              type="password"
              onChange={(e) => setCode(e.target.value)}
              my="1"
              placeholder="Enter password"
            />
            <Button colorScheme="teal" type="submit">
              {isLoading1 ? <Spinner size="xs" /> : 'Update'}
            </Button>
          </form>
        </Container>
      </Box>

      <Box
        border="1px"
        borderColor="gray.300"
        my="3"
        shadow="lg"
        py="3"
        rounded="lg"
        id="middle"
      >
        <Container>
          <form onSubmit={updateCode}>
            <Text textAlign="center" fontWeight="semibold" color="blue.700">
              Security(Update password)
            </Text>
            <Input
              borderColor="blackAlpha.300"
              type="password"
              value={codeOld}
              onChange={(e) => setCodeOld(e.target.value)}
              my="1"
              placeholder="Enter old password"
            />
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
              {isLoading2 ? <Spinner size="xs" /> : 'Save'}
            </Button>
          </form>
        </Container>
      </Box>

      <Box
        border="1px"
        borderColor="gray.300"
        my="3"
        shadow="lg"
        py="3"
        rounded="lg"
        id="advanced"
      >
        <form onSubmit={delMyAccount}>
          <Container>
            <Text textAlign="center" fontWeight="semibold" color="blue.700">
              <WarningIcon color="blue.700" /> Delete account{' '}
            </Text>
            <Text fontWeight="light" color="blue.7=600">
              This will delete all your data and it can not be undone
            </Text>
            <Input
              value={passcode}
              type="password"
              onChange={(e) => setPasscode(e.target.value)}
              my="1"
              placeholder="Enter  password"
            />
            <Button type="submit" colorScheme="red">
              {isLoading3 ? <Spinner size="xs" /> : 'Erase'}
            </Button>
          </Container>
        </form>
      </Box>
    </Container>
  )
}
