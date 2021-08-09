import {
  Flex,
  Box,
  Text,
  Button,
  Spacer,
  WrapItem,
  Avatar,
} from '@chakra-ui/react'
import React from 'react'
import { UnlockIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from 'Redux/actions'
export default function NavBar() {
  const auth = useSelector((state) => state.user.auth)
  const dispatch = useDispatch()
  const loggedInOptions = (
    <React.Fragment>
      <Flex py="2" _hover={{ bg: 'telegram.100', color: '#020201' }}>
        <NavLink className="link" to="/loggedIn/pay">
          {' '}
          <UnlockIcon mr="2" display={['inline', 'none', 'inline']} />
          <Text display={['none', 'inline', 'inline']}>Payment</Text>
        </NavLink>
      </Flex>
    </React.Fragment>
  )
  return (
    <Flex
      align="baseline"
      mx="auto"
      color="telegram.400"
      direction={['row', 'row', 'column']}
    >
      <Flex my="2" ml="0.5" direction={['row', 'column']} py="1" mx="auto">
        <WrapItem display={['none', 'inline']}>
          <Avatar mt={[null, '-1.5', null]} src="#" />
        </WrapItem>
        <Text
          as="big"
          bgGradient="linear(to-l,teal.100,blue.800)"
          bgClip="text"
          lineHeight="3"
          letterSpacing="wide"
          display={['inline', 'none', 'inline']}
          fontFamily="revert"
          fontWeight="bold"
          py="2"
          my="1"
        >
          STOCK
        </Text>
        <Box
          as="div"
          display={['none', 'none', 'inline']}
          p="0.5"
          pb="0"
          my="3"
          h="0.5"
          bg="telegram.300"
        />
      </Flex>

      <Flex
        direction={['row', 'row', 'column']}
        py="3"
        justifyContent="space-around"
        mx={[null, 'auto', 'auto']}
        fontWeight="bold"
      >
        <Flex py="2" _hover={{ bg: 'telegram.100', color: '#020201' }}>
          <NavLink className="link" to={auth ? '/loggedIn' : '/'}>
            {' '}
            <UnlockIcon mr="2" display={['inline', 'none', 'inline']} />
            <Text display={['none', 'inline', 'inline']}>Home</Text>
          </NavLink>
        </Flex>
        <Flex py="2" _hover={{ bg: 'telegram.100', color: '#020201' }}>
          <NavLink className="link" to={auth ? '/loggedIn/stock' : '/login'}>
            <UnlockIcon mr="2" display={['inline', 'none', 'inline']} />
            <Text display={['none', 'inline', 'inline']}>
              {auth ? 'Stock' : 'Login'}
            </Text>
          </NavLink>
        </Flex>
        <Flex py="2" _hover={{ bg: 'telegram.100', color: '#020201' }}>
          <NavLink className="link" to={auth ? '/loggedIn/records' : 'signup'}>
            {' '}
            <UnlockIcon mr="2" display={['inline', 'none', 'inline']} />
            <Text display={['none', 'inline', 'inline']}>
              {auth ? 'Records' : 'SignUp'}
            </Text>
          </NavLink>
        </Flex>
        <Flex py="2" _hover={{ bg: 'telegram.100', color: '#020201' }}>
          <NavLink className="link" to={auth ? "/loggedIn/control" : 'about'}>
            {' '}
            <UnlockIcon mr="2" display={['inline', 'none', 'inline']} />
            <Text display={['none', 'inline', 'inline']}>
              {auth ? 'Control' : 'About'}
            </Text>
          </NavLink>
        </Flex>
        {auth ? loggedInOptions : null}
      </Flex>
      <Spacer />
      <Flex display={['none', 'none', 'inline']} my={[null, '1', '2']}>
        <NavLink to={auth ? '/' : '/signup'}>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={() => dispatch(logout())}
          >
            {auth ? 'Logout' : 'Go Now'}
          </Button>
        </NavLink>
      </Flex>
    </Flex>
  )
}
