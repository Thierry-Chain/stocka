import {
  Flex,
  Box,
  Text,
  Button,
  Spacer,
  WrapItem,
  Avatar,
  Icon,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'Redux/actions';
import {
  AiTwotoneHome,
  AiOutlineLogin,
  AiOutlineAppstoreAdd,
  AiOutlineUsergroupAdd,
  AiOutlineHistory,
  AiFillTags,
  AiOutlineBarChart,
  AiOutlineMoneyCollect,
  AiOutlineLogout,
} from 'react-icons/ai';
import logo from 'assets/logo.jpg';
export default function NavBar() {
  const auth = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();
  const loggedInOptions = (
    <React.Fragment>
      <Flex p="2" _hover={{ bg: 'telegram.50', color: '#020201' }}>
        <NavLink className="link" to="/loggedIn/pay">
          {' '}
          <Icon
            fontWeight="extrabold"
            fontSize="xl"
            as={AiOutlineMoneyCollect}
            mr="2"
            display={['inline', 'none', 'inline']}
          />
          <Text display={['none', 'inline', 'inline']}>Payment</Text>
        </NavLink>
      </Flex>
    </React.Fragment>
  );
  return (
    <Flex
      align="baseline"
      mx="auto"
      color="telegram.400"
      flexDir={['row', 'row', 'column']}
      pt={[null, '3', null]}
    >
      <Flex my="2" justifyContent="center" flexDir={['row']} ml="0.5">
        <WrapItem px="2" display={['none', 'inline']}>
          <Avatar mt={[null, '-3', null]} src={logo} />
        </WrapItem>
        <Heading
          as="big"
          bgGradient="linear(to-l,teal.100,blue.800)"
          bgClip="text"
          lineHeight="6"
          letterSpacing="wide"
          display={['inline', 'none', 'inline']}
          fontFamily="revert"
          fontWeight={['bold', 'extrabold']}
          py="2"
          size={['sm', 'sm', 'xl']}
          my="1"
          mt={[null, '-3', null]}
          px="4"
        >
          STOCKA
        </Heading>
        <Box
          as="div"
          display={['none', 'none', 'none']}
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
        <Flex
          px={['2', '4']}
          py="2"
          _hover={{ bg: 'telegram.50', color: '#020201' }}
        >
          <NavLink className="link" to={auth ? '/loggedIn' : '/'}>
            {' '}
            <Icon
              fontWeight="extrabold"
              fontSize="xl"
              as={AiTwotoneHome}
              mr="2"
              display={['inline', 'none', 'inline']}
            />
            <Text display={['none', 'inline', 'inline']}>Home</Text>
          </NavLink>
        </Flex>
        <Flex
          px={['2', '4']}
          py="2"
          _hover={{ bg: 'telegram.50', color: '#020201' }}
        >
          <NavLink className="link" to={auth ? '/loggedIn/stock' : '/login'}>
            <Icon
              fontWeight="extrabold"
              fontSize="xl"
              as={!auth ? AiOutlineLogin : AiOutlineAppstoreAdd}
              mr="2"
              display={['inline', 'none', 'inline']}
            />
            <Text display={['none', 'inline', 'inline']}>
              {auth ? 'Inventory' : 'Login'}
            </Text>
          </NavLink>
        </Flex>
        <Flex
          px={['2', '4']}
          py="2"
          _hover={{ bg: 'telegram.50', color: '#020201' }}
        >
          <NavLink className="link" to={auth ? '/loggedIn/records' : 'signup'}>
            {' '}
            <Icon
              fontWeight="extrabold"
              fontSize="xl"
              as={!auth ? AiOutlineUsergroupAdd : AiOutlineHistory}
              mr="2"
              display={['inline', 'none', 'inline']}
            />
            <Text display={['none', 'inline', 'inline']}>
              {auth ? 'Records' : 'SignUp'}
            </Text>
          </NavLink>
        </Flex>
        <Flex
          px={['2', '4']}
          py="2"
          _hover={{ bg: 'telegram.50', color: '#020201' }}
        >
          <NavLink className="link" to={auth ? '/loggedIn/control' : 'about'}>
            {' '}
            <Icon
              fontWeight="extrabold"
              fontSize="xl"
              as={!auth ? AiFillTags : AiOutlineBarChart}
              mr="2"
              display={['inline', 'none', 'inline']}
            />
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
            rightIcon={<AiOutlineLogout fontWeight="bold" />}
            colorScheme="teal"
            variant="outline"
            onClick={() => dispatch(logout())}
          >
            {auth ? 'Logout' : 'Go Now'}
          </Button>
        </NavLink>
      </Flex>
    </Flex>
  );
}
