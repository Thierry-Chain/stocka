import {
  Container,
  Text,
  Spinner,
  Flex,
  Switch,
  Box,
  HStack,
  Input,
  InputGroup,
  IconButton,
  InputLeftElement,
  Button,
  Link,
  Spacer,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Select,
  useToast,
} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons'
import Products from './Products'
import ProductSkeleton from './ProductSkeleton'
import CheckUp from './CheckUp'
import { useSelector } from 'react-redux'
import { useQuery, useMutation } from 'react-query'
import { useState } from 'react'
import {
  getLongTermRec,
  getShortTermRec,
  delSelectedRec,
} from 'Redux/stockActions'
import { calcTotal, numberSpacer, calcTotalSellingPrc } from 'constants/index'
import moment from 'moment'
import queryClient from 'index'

export default function Control(props) {
  const clientId = useSelector((state) => state.user.client.clientId)
  const [startKey, setStartKey] = useState(0)
  const [endKey, setEndKey] = useState(9)
  const [showLongRec, setShowLongRec] = useState(true)
  const [showShortRec, setShowShortRec] = useState(true)
  const [enableControl, setEnableControl] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [search, setSearch] = useState('')
  const [shortRecCont, setShortRecCont] = useState([])
  const [longRecCont, setLongRecCont] = useState([])
  const [starting, setStarting] = useState('')
  const [ending, setEnding] = useState('')
  const toast = useToast()
  const { data: shortRec } = useQuery(
    ['shortTermRecds', { clientId }],
    getShortTermRec
  )
  const { data: longRec } = useQuery(
    ['longTermRecds', { clientId }],
    getLongTermRec
  )
  const { mutateAsync, isLoading } = useMutation(delSelectedRec, {
    onSuccess: () => {
      queryClient.invalidateQueries('shortTermRecds')
      queryClient.invalidateQueries('longTermRecds')
      onClose2()
      props.history.push('/loggedIn/records')
    },
  })
  const shortOutput = shortRecCont ? calcTotalSellingPrc(shortRecCont) : 0
  const longOutput = longRecCont ? calcTotalSellingPrc(longRecCont) : 0
  const output =
    shortRec && longRec ? (
      numberSpacer(shortOutput + longOutput)
    ) : (
      <Spinner size="xs" />
    )
  const shortInput = shortRecCont ? calcTotal(shortRecCont) : 0
  const longInput = longRecCont ? calcTotal(longRecCont) : 0
  const input =
    shortRecCont && longRecCont ? (
      numberSpacer(shortInput + longInput)
    ) : (
      <Spinner size="xs" />
    )
  const totInput = shortInput + longInput
  const totOutput = shortOutput + longOutput
  const profitOrLoss = Math.round(totOutput - totInput)

  const toBeDisplayed =
    longRecCont &&
    shortRecCont &&
    (showShortRec ? shortRecCont.length : 0) +
      (showLongRec ? longRecCont.length : 0)
  const handleNext = () => {
    const next = toBeDisplayed - endKey >= 9 ? endKey + 9 : toBeDisplayed
    const prev = endKey !== next ? endKey : startKey
    setStartKey(prev)
    setEndKey(next)
    window.scroll(0, 0)
  }
  const handlePrev = () => {
    setStartKey(startKey - 9)
    setEndKey(startKey)
    window.scroll(0, 0)
  }
  const shortRecNum = shortRecCont ? shortRecCont.length : <Spinner size="xs" />
  const longRecNum = longRecCont ? longRecCont.length : <Spinner size="xs" />

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure()
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure()
  let thisYear = new Date()
  thisYear = thisYear.getFullYear()
  const clear = () => {
    setFrom('')
    setTo('')
    setMonth('')
    setYear('')
    setSearch('')
    //setShortRecCont([])
    //setLongRecCont([])
  }
  const showDateError = () => {
    toast({
      title: 'Select good range.',
      description: 'No records in this range',
      status: 'error',
      position: 'top',
      duration: 3000,
      isClosable: true,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (from && to && year && month && year) {
      let startDate = new Date()
      let endDate = new Date()
      startDate.setDate(from)
      startDate.setMonth(month - 1)
      startDate.setFullYear(year)
      endDate.setDate(to)
      endDate.setMonth(month - 1)
      endDate.setFullYear(year)
      setStarting(startDate)
      setEnding(endDate)
      const controlData = (arr) => {
        return arr.filter((rec) => {
          const myDate = new Date(rec.dateRecorded)

          return (
            myDate.getDate() >= startDate.getDate() &&
            myDate.getDate() <= endDate.getDate() &&
            myDate.getMonth() + 1 === startDate.getMonth() + 1 &&
            myDate.getFullYear() === startDate.getFullYear()
          )
        })
      }
      const shortRecControlled = controlData(shortRec)

      const longRecControlled = controlData(longRec)
      //continue
      /*
      shortRecControlled.length
        ? setShortRecCont(shortRecControlled)
        : showDateError()
        
      longRecControlled.length
        ? setLongRecCont(longRecControlled)
        : showDateError()
      */
      if (!longRecControlled.length && !shortRecControlled.length) {
        showDateError()
      }
      if (longRecControlled.length || shortRecControlled.length) {
        setShortRecCont(shortRecControlled)
        setLongRecCont(longRecControlled)
      }
      setEnableControl(true)
      clear()
      onClose1()
    } //else showDateError()
  }
  const deleteSelected = () => {
    const data = [
      ...longRecCont.map((dt) => dt.recordId),
      ...shortRecCont.map((dt) => dt.recordId),
    ]
    mutateAsync({ records: data, clientId })
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
        Stock control
      </Text>
      <Text h="2" my="1" bg="telegram.300" mx="auto" w="14%" />
      <Flex flexDir="column">
        {!enableControl ? (
          <>
            <Text fontWeight="normal" fontSize="large" color="blue.800">
              Firstly You must select the range you want to analyse and make
              control .
            </Text>
            <Text fontWeight="normal" fontSize="large" color="blue.800">
              Example of range :
              <Text as="span" mx="auto" fontWeight="hairline">
                From 5<sup>th</sup> Up to 20<sup>th</sup> July {thisYear}
              </Text>
            </Text>
          </>
        ) : null}
        <Button
          colorScheme="teal"
          mx="auto"
          onClick={() => {
            onOpen1()
            setEnableControl(false)
          }}
        >
          Start
        </Button>
        {enableControl ? (
          <Button
            onClick={onOpen2}
            my="2"
            as="span"
            colorScheme="red"
            mx="auto"
          >
            Delete Selected
          </Button>
        ) : null}
      </Flex>
      {enableControl ? (
        <>
          <Flex
            py="2"
            fontSize="md"
            fontWeight="semibold"
            color="blue.900"
            flexDir={['column', 'row']}
            justify="space-between"
          >
            <Flex flexDir="column" m="2">
              <Switch
                defaultIsChecked
                onChange={() => {
                  setStartKey(0)
                  setEndKey(9)
                  setShowLongRec(!showLongRec)
                }}
                colorScheme="green"
              >
                LongTermProduct({longRecNum})
              </Switch>
              <Switch
                onChange={() => {
                  setStartKey(0)
                  setEndKey(9)
                  setShowShortRec(!showShortRec)
                }}
                colorScheme="red"
                defaultIsChecked
              >
                ShortTermProduct({shortRecNum})
              </Switch>
            </Flex>
            <Box mx="auto">
              <Text as="div">All input : {input}</Text>
              <Text as="div">All output : {output}</Text>
              {profitOrLoss > 0 ? (
                <Text color="teal.700">
                  Profit: {numberSpacer(profitOrLoss)}
                </Text>
              ) : (
                <Text color="red">Loss : {numberSpacer(profitOrLoss)}</Text>
              )}
            </Box>
          </Flex>
          <HStack py="3">
            <Flex mx="auto" as="span">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <IconButton
                      px="2"
                      colorScheme="blue"
                      aria-label="Search database"
                      icon={<SearchIcon />}
                    />
                  }
                />
                <Input
                  mx="2"
                  variant="flushed"
                  size="md"
                  value={search}
                  onChange={(e) => {
                    setStartKey(0)
                    setEndKey(9)
                    setSearch(e.target.value)
                  }}
                  placeholder="Search by name"
                />
              </InputGroup>
            </Flex>
          </HStack>
          {shortRec && longRec ? (
            <Products
              shortProd={showShortRec ? shortRecCont : []}
              longProd={showLongRec ? longRecCont : []}
              showShortProd={showShortRec}
              showLongProd={showLongRec}
              startKey={startKey}
              endKey={endKey}
              searchKey={search}
              makeSearch={search ? true : false}
            />
          ) : (
            <ProductSkeleton />
          )}
          {shortRec && longRec ? (
            <Flex>
              <Link to="/loggedIn/stock/#firstTitle">
                <Button
                  bg="cyan.600"
                  mx="2"
                  my="3"
                  py="4"
                  color=""
                  size="sm"
                  disabled={startKey === 0 ? true : false}
                  onClick={handlePrev}
                >
                  <ArrowBackIcon mx="1" /> Prev
                </Button>
              </Link>
              <Spacer />
              <Link to="/loggedIn/stock/#firstTitle">
                <Button
                  bg="cyan.600"
                  mx="2"
                  my="3"
                  py="4"
                  color=""
                  size="sm"
                  onClick={handleNext}
                  disabled={endKey >= toBeDisplayed ? true : false}
                >
                  Next <ArrowForwardIcon mx="1" />
                </Button>
              </Link>
            </Flex>
          ) : null}
        </>
      ) : null}
      <Modal
        isCentered
        size="lg"
        isOpen={isOpen1}
        onClose={() => {
          clear()
          onClose1()
        }}
      >
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select range</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex my="2" flexDir={['column', 'row']}>
                <Input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  id="from"
                  placeholder="From"
                  isRequired
                />
                <Input
                  value={to}
                  isRequired
                  onChange={(e) => setTo(e.target.value)}
                  id="to"
                  placeholder="To"
                />

                <Select
                  onChange={(e) => {
                    setMonth(e.target.value)
                  }}
                  isRequired
                  placeholder="month"
                  value={month}
                >
                  <option value="1">Jan</option>
                  <option value="2">Feb</option>
                  <option value="3">Match</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">Jun</option>
                  <option value="7">July</option>
                  <option value="8">Augst</option>
                  <option value="9">Sept</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </Select>
                <Input
                  isRequired
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  id="year"
                  placeholder="Year"
                />
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                type="button"
                size="sm"
                colorScheme="teal"
                mr={3}
                onClick={onClose1}
              >
                Close
              </Button>
              <Button type="submit" size="sm" colorScheme="red">
                Continue
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <Modal isCentered size="sm" isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              To delete records from
              <Text fontWeight="semibold" as="span">
                {' '}
                {moment(starting).format('L')}{' '}
              </Text>{' '}
              to{' '}
              <Text fontWeight="semibold" as="span">
                {' '}
                {moment(ending).format('L')}{' '}
              </Text>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              type="button"
              size="sm"
              colorScheme="teal"
              mr={3}
              onClick={onClose2}
            >
              Close
            </Button>
            <Button onClick={deleteSelected} size="sm" colorScheme="red">
              {isLoading ? <Spinner size="xs" /> : 'Ok'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}
