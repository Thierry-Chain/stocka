import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { addProductToRecords, delError } from 'Redux/stockActions'
import { useSelector, useDispatch } from 'react-redux'
import queryClient from 'index'
function AddToRecords({ isOpen, onClose, product, clientId }) {
  const [amount, setAmount] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const { mutateAsync, isLoading } = useMutation(addProductToRecords, {
    onSuccess: (dt) => {
      if (dt) {
        queryClient.invalidateQueries('longTermProd')
        queryClient.invalidateQueries('shortTermProd')
        onClose()
        setAmount('')
        setSellingPrice('')
        dispatch(delError())
      }
    },
  })
  const error = useSelector((state) => state.stock.error)
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      clientId,
      name: product.name,
      productType: product.dateOfExpry ? 'Short-term' : 'Long-term',
      amount: Number(amount),
      sellingPrice: Number(sellingPrice),
    }
    mutateAsync(data)
  }
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={() => {
          onClose()
          setAmount('')
          setSellingPrice('')
          dispatch(delError())
        }}
      >
        <DrawerOverlay />
        <form onSubmit={handleSubmit}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              Enter {product ? product.name : null} sold{' '}
            </DrawerHeader>
            <DrawerBody>
              {error ? (
                <Alert status="warning" variant="left-accent">
                  <AlertIcon />
                  {error}
                </Alert>
              ) : null}
              <Input
                my="2"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                }}
                placeholder="Type number sold"
              />
              <Input
                value={sellingPrice}
                onChange={(e) => {
                  setSellingPrice(e.target.value)
                }}
                placeholder="Total selling price"
              />
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue">
                {isLoading ? <Spinner size="xs" /> : 'Record'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  )
}
export default AddToRecords
