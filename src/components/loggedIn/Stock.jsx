import {
  Container,
  Text,
  Flex,
  Box,
  InputLeftElement,
  Button,
  HStack,
  Input,
  InputGroup,
  IconButton,
  Spinner,
  Switch,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import {
  SearchIcon,
  AddIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
} from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { getShortTermProd, getLongTermProd } from 'Redux/actions'
import { useQuery } from 'react-query'
import { numberSpacer, calcTotal } from 'constants/index'
import { useSelector } from 'react-redux'
import Products from './Products'
import ProductSkeleton from './ProductSkeleton'
import { useState } from 'react'
import AddProduct from './AddProduct'
import CheckUp from './CheckUp'
export default function Stock() {
  const clientId = useSelector((state) => state.user.client.clientId)
  const { data: shortProd } = useQuery(
    ['shortTermProd', { clientId }],
    getShortTermProd,
    { notifyOnChangeProps: ['data', 'error'] }
  )
  const { data: longProd } = useQuery(
    ['longTermProd', { clientId }],
    getLongTermProd,
    { notifyOnChangeProps: ['data', 'error'] }
  )

  const shortProdNum = shortProd ? (
    shortProd.ShortTermProducts.length
  ) : (
    <Spinner size="xs" />
  )
  const longProdNum = longProd ? (
    longProd.LongTermProducts.length
  ) : (
    <Spinner size="xs" />
  )
  const shortInput = shortProd ? calcTotal(shortProd.ShortTermProducts) : 0
  const longInput = longProd ? calcTotal(longProd.LongTermProducts) : 0
  const input =
    shortProd && longProdNum ? (
      numberSpacer(shortInput + longInput)
    ) : shortInput === 0 && longInput === 0 ? (
      '0 Rwf'
    ) : (
      <Spinner size="xs" />
    )

  const [showLongProd, setShowLongProd] = useState(true)
  const [showShortProd, setShowShortProd] = useState(true)
  const toBeDisplayed =
    longProd &&
    shortProd &&
    (showShortProd ? shortProd.ShortTermProducts.length : 0) +
      (showLongProd ? longProd.LongTermProducts.length : 0)

  const [startKey, setStartKey] = useState(0)
  const [endKey, setEndKey] = useState(9)

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
  const [search, setSearch] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Container minW="full" pl="0" pr="0">
      <CheckUp />
      <Text
        id="firstTitle"
        fontWeight="bold"
        fontSize="larger"
        bgGradient="linear(to-l,blue.300,blue.800)"
        bgClip="text"
        textAlign="center"
        pt="2"
      >
        Product List
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
              setShowLongProd(!showLongProd)
            }}
            colorScheme="green"
          >
            LongTermProductRecord({longProdNum})
          </Switch>
          <Switch
            onChange={() => {
              setStartKey(0)
              setEndKey(9)
              setShowShortProd(!showShortProd)
            }}
            colorScheme="red"
            defaultIsChecked
          >
            ShortTermProductRecord({shortProdNum})
          </Switch>
        </Flex>
        <Box mx="auto">
          <Text as="div">All input : {input}</Text>
          <Button
            border="1px"
            bg="gray.300"
            borderColor="green.500"
            px="1"
            onClick={onOpen}
            size="sm"
            leftIcon={<AddIcon />}
          >
            Add Product{' '}
          </Button>
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

      {shortProd && longProd ? (
        <Products
          shortProd={showShortProd ? shortProd.ShortTermProducts : []}
          longProd={showLongProd ? longProd.LongTermProducts : []}
          showShortProd={showShortProd}
          showLongProd={showLongProd}
          startKey={startKey}
          endKey={endKey}
          searchKey={search}
          makeSearch={search ? true : false}
        />
      ) : (
        <ProductSkeleton />
      )}

      {shortProd && longProd ? (
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

      <AddProduct isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}
