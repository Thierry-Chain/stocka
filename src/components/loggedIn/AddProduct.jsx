import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Textarea,
  RadioGroup,
  Stack,
  Radio,
  Select,
  InputGroup,
  Box,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  delError,
  setError,
  addLongProd,
  addShortProd,
} from 'Redux/stockActions'
import { useMutation } from 'react-query'
import queryClient from 'index'
function AddProduct({ isOpen, onClose }) {
  const clientId = useSelector((state) => state.user.client.clientId)
  const error = useSelector((state) => state.stock.error)

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [desc, setDesc] = useState('')
  const clear = () => {
    setName('')
    setAmount('')
    setDesc('')
    setBuyPrice('')
    dispatch(delError())
    setType('')
    setDate('')
    setYear('')
  }
  const { mutateAsync: createLongProd, isLoading: isAdding } = useMutation(
    addLongProd,
    {
      onSuccess: (dt) => {
        if (dt?.name) {
          queryClient.invalidateQueries('longTermProd')
          setType('')
          setDate('')
          setYear('')
          setName('')
          setAmount('')
          setDesc('')
          setBuyPrice('')
        }
      },
    }
  )
  const { mutateAsync: createShortProd, isLoading: isAdding1 } = useMutation(
    addShortProd,
    {
      onSuccess: (dt) => {
        if (dt?.name) {
          queryClient.invalidateQueries('shortTermProd')
          setType('')
          setDate('')
          setYear('')
          setName('')
          setAmount('')
          setDesc('')
          setBuyPrice('')
        }
      },
    }
  )
  const handleAddShortProd = () => {
    if (
      date &&
      year &&
      month &&
      name &&
      amount &&
      buyPrice &&
      type === 'short'
    ) {
      const dateOfExpry = new Date()
      dateOfExpry.setDate(date)
      dateOfExpry.setFullYear(year)
      dateOfExpry.setMonth(month - 1)

      const data = {
        clientId,
        buyingPrice: Number(buyPrice),
        name,
        amount: Number(amount),
        pricePerUnit: buyPrice / amount,
        description: desc,
        dateOfExpry,
      }
      createShortProd(data)
    } else dispatch(setError('Complete all'))
  }

  const handleAddLongProd = () => {
    if (name && amount && buyPrice && type === 'long') {
      const data = {
        clientId,
        buyingPrice: Number(buyPrice),
        name,
        amount: Number(amount),
        pricePerUnit: buyPrice / amount,
        description: desc,
      }
      createLongProd(data)
    } else dispatch(setError('Complete all'))
  }
  return (
    <>
      <Drawer
        isOpen={isOpen}
        size="sm"
        placement="right"
        onClose={() => {
          onClose()
          clear()
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{isAdding ? 'Adding ...' : 'Add product'}</DrawerHeader>

          <DrawerBody>
            {error ? (
              <Alert status="warning" variant="left-accent">
                <AlertIcon />
                {error}
              </Alert>
            ) : null}
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              my="1"
              placeholder="Enter name"
            />
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              my="1"
              placeholder="Enter amount"
            />
            <Input
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              my="1"
              placeholder="Enter buying price"
            />
            <RadioGroup my="2">
              <Stack spacing={4} direction="row">
                <Radio
                  onChange={() => setType('long')}
                  colorScheme="red"
                  isChecked={type === 'long' ? true : false}
                >
                  Long term
                </Radio>
                <Radio
                  onChange={() => setType('short')}
                  colorScheme="green"
                  isChecked={type === 'short' ? true : false}
                >
                  Short term
                </Radio>
              </Stack>
            </RadioGroup>

            {type === 'short' ? (
              <FormControl p="3" isRequired>
                <Box>
                  <FormLabel>Expry date</FormLabel>
                  <InputGroup my="2" size="sm">
                    <Input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      id="date"
                      placeholder="Date"
                    />
                    <Select
                      onChange={(e) => {
                        setMonth(e.target.value)
                      }}
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
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      id="year"
                      placeholder="Year"
                    />
                  </InputGroup>
                </Box>
              </FormControl>
            ) : null}
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Type descption on product"
            />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onClose()
                clear()
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={
                type === 'short' ? handleAddShortProd : handleAddLongProd
              }
              colorScheme="blue"
            >
              {isAdding || isAdding1 ? <Spinner size="xs" /> : 'Save'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
export default AddProduct
