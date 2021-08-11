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
} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons'
import Products from './Products'
import { getShortTermProd, getLongTermProd } from 'Redux/actions'

import ProductSkeleton from './ProductSkeleton'
import CheckUp from './CheckUp'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { getLongTermRec, getShortTermRec } from 'Redux/stockActions'
import { calcTotal, numberSpacer } from 'constants/index'
export default function Records() {
  const clientId = useSelector((state) => state.user.client.clientId)
  const [startKey, setStartKey] = useState(0)
  const [endKey, setEndKey] = useState(9)
  const [showLongRec, setShowLongRec] = useState(true)
  const [showShortRec, setShowShortRec] = useState(true)
  const [search, setSearch] = useState('')
  const { data: shortRec } = useQuery(
    ['shortTermRecords', { clientId }],
    getShortTermRec
  )
  const { data: longRec } = useQuery(
    ['longTermRecords', { clientId }],
    getLongTermRec
  )
  const { data } = useQuery(['shortTermProd', { clientId }], getShortTermProd)
  const { data: data2 } = useQuery(
    ['longTermProd', { clientId }],
    getLongTermProd
  )
  const shortOutput = shortRec ? calcTotal(shortRec) : 0
  const longOutput = longRec ? calcTotal(longRec) : 0
  const output =
    shortRec && longRec ? (
      numberSpacer(shortOutput + longOutput)
    ) : (
      <Spinner size="xs" />
    )

  const shortInput = data ? calcTotal(data.ShortTermProducts) : 0
  const longInput = data2 ? calcTotal(data2.LongTermProducts) : 0
  const input =
    data && data2 ? numberSpacer(shortInput + longInput) : <Spinner size="xs" />
  const toBeDisplayed =
    longRec &&
    shortRec &&
    (showShortRec ? shortRec.length : 0) + (showLongRec ? longRec.length : 0)

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
  const shortRecNum = shortRec ? shortRec.length : <Spinner size="xs" />
  const longRecNum = longRec ? longRec.length : <Spinner size="xs" />
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
        Records
      </Text>
      <Text h="2" my="1" bg="telegram.300" mx="auto" w="14%" />
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
          shortProd={showShortRec ? shortRec : []}
          longProd={showLongRec ? longRec : []}
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
    </Container>
  )
}
