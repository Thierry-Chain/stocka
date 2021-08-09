import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Flex,
  Text,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Spacer,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Spinner,
  AccordionIcon,
  Badge,
} from '@chakra-ui/react'

import {
  SettingsIcon,
  InfoOutlineIcon,
  BellIcon,
  InfoIcon,
} from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import Footer from 'components/Footer'
import { useDispatch } from 'react-redux'
import { getShortTermProd, getLongTermProd } from 'Redux/actions'
import { getLongTermRec, getShortTermRec } from 'Redux/stockActions'
import { useQuery } from 'react-query'
import Notify from './Notify'
import { logout, getPayStatus, getNotified } from 'Redux/actions'
import { numberSpacer, calcTotal } from 'constants/index'
import moment from 'moment'
import CheckUp from './CheckUp'
export default function HomeLoggedIn(props) {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.user.auth)
  const userName = useSelector((state) => state.user.client.username)
  const clientId = useSelector((state) => state.user.client.clientId)
  const { data } = useQuery(['shortTermProd', { clientId }], getShortTermProd)
  const { data: data2 } = useQuery(
    ['longTermProd', { clientId }],
    getLongTermProd
  )
  const { data: data3 } = useQuery(
    ['longTermRec', { clientId }],
    getLongTermRec
  )
  const { data: data4 } = useQuery(
    ['shortTermRec', { clientId }],
    getShortTermRec
  )
  const allProducts =
    data && data2 ? (
      data.ShortTermProducts.length + data2.LongTermProducts.length
    ) : (
      <Spinner size="xs" />
    )

  const shortInput = data ? calcTotal(data.ShortTermProducts) : 0
  const longInput = data2 ? calcTotal(data2.LongTermProducts) : 0
  const input =
    data && data2 ? numberSpacer(shortInput + longInput) : <Spinner size="xs" />
  const { data: payState } = useQuery(
    ['getPayStatus', { clientId }],
    getPayStatus
  )
  const shortOutput = data4 ? calcTotal(data4) : 0
  const longOutput = data3 ? calcTotal(data3) : 0

  const output =
    data3 && data4 ? shortOutput + longOutput : <Spinner size="xs" />

  const endOfPremium = payState ? (
    moment(payState.expryDate).format('L')
  ) : (
    <Spinner size="xs" />
  )
  const refund = payState ? payState.refund : null

  const { data: notify } = useQuery(['getNotified', { clientId }], getNotified)

  useEffect(() => {
    if (!auth) {
      props.history.push('/')
    }
  }, [props, auth])
  return (
    <Container minW="full" pl="0" pr="0">
      <CheckUp />
      <Flex p={['0', '1']} shadow="lg">
        <Flex
          fontWeight="bold"
          fontSize="large"
          bgGradient="linear(to-l,blue.500,blue.800)"
          bgClip="text"
          textAlign="center"
        >
          <Text display={['none', 'inline']}>Hello </Text>
          <Text ml={[null, '2']}>{userName}</Text>
        </Flex>
        <Spacer />
        <Box>
          <Menu w="100%">
            <MenuButton
              mx="4"
              bg="telegram.200"
              as={Button}
              rightIcon={<SettingsIcon />}
            >
              <Text display={['none', 'inline']}>Settings</Text>
            </MenuButton>
            <MenuList>
              <MenuItem>User Info</MenuItem>
              <MenuItem>Delete Records</MenuItem>
              <MenuItem>Delete Notifications</MenuItem>
              <MenuItem>Delete Products</MenuItem>
              <Link to="/loggedIn#tips">
                <MenuItem>Help</MenuItem>
              </Link>
              <Link to="/">
                <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <Box
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.500,telegram.700)"
        bgClip="text"
        textAlign="center"
        py="3"
      >
        <Text>
          <InfoIcon color="blue.500" mx="2" fontSize="3xl" /> Status Report
        </Text>
        <Text h="2" my="1" bg="telegram.300" mx="auto" w="14%" />
      </Box>

      <Box w="90%" mx="auto" color="blue.900" rounded="md" shadow="2xl" py="2">
        <Box textAlign="center" py="1">
          All products:{' '}
          <Text as="span" lineHeight="tall" fontWeight="bolder">
            {allProducts}
          </Text>
        </Box>
        <Box textAlign="center" py="1">
          Input:
          <Text as="span" lineHeight="tall" fontWeight="bolder">
            {input}
          </Text>
        </Box>

        <Box textAlign="center" py="1">
          Output :{' '}
          <Text as="span" lineHeight="tall" fontWeight="bolder">
            {numberSpacer(output)}
          </Text>
        </Box>
        <Box textAlign="center" py="1">
          Refund :{' '}
          <Text
            as="span"
            lineHeight="tall"
            fontWeight="bolder"
          >{`${refund} Rwf`}</Text>
        </Box>
        <Box textAlign="center" py="1">
          End of premium:{endOfPremium}
        </Box>
      </Box>

      <Box
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.500,telegram.700)"
        bgClip="text"
        textAlign="center"
        py="2"
      >
        <Text py="2">
          <BellIcon color="blue.400" mx="2" fontSize="3xl" /> Notifications
          <Badge
            ml="1"
            color="white"
            rounded="2xl"
            fontSize="0.8em"
            mt="-4"
            bg="rgb(153, 8, 8)"
          >
            {notify ? notify.length : null}
          </Badge>
        </Text>
      </Box>

      {notify?.length ? <Notify notify={notify} /> : null}

      <Flex id="tips" my="2" flexDir="column">
        <Text
          fontWeight="bold"
          fontSize="larger"
          bgGradient="linear(to-l,blue.500,telegram.700)"
          bgClip="text"
          textAlign="center"
          mx="auto"
          py="3"
        >
          <InfoOutlineIcon color="blue.500" mx="2" fontSize="3xl" />
          Tips
        </Text>
        <Accordion
          allowToggle
          color="blue.900"
          w="90%"
          mx="auto"
          bg="gray.300"
          rounded
        >
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" fontWeight="bold" textAlign="center">
                  how to make control
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel bg="gray.50" pb={4}>
              how to start
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" fontWeight="bold" textAlign="center">
                  What is Input
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel bg="gray.50" pb={4}>
              Input is all the money that you have invested or the total cost of
              products that are in stock but not already bought. and they are
              totaled to make input. and you may use this to make the control .
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" fontWeight="bold" textAlign="center">
                  What is Output
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel bg="gray.50" pb={4}>
              Output is the total money from all products that are sold(bought)
              and recorded from the stock and you may use this to make control .
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" fontWeight="bold" textAlign="center">
                  What is refund:
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel bg="gray.50" pb={4}>
              Refund is the money that have to be returned to the user this
              happens when you pay amount larger than expected amount and when
              you have refund on next payment period you must firstly remove it
              then after pay the remaining amount .
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" fontWeight="bold" textAlign="center">
                  What about Profit/Loss
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel bg="gray.50" pb={4}>
              Profit/loss this shows how much money you have earned or lost in a
              certain period of time.Hiw this is calculated ? By making the
              difference between{' '}
              <Text as="span" fontWeight="bold">
                Input{' '}
              </Text>{' '}
              and{' '}
              <Text as="span" fontWeight="bold">
                output
              </Text>
              .
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>

      <Footer />
    </Container>
  )
}
