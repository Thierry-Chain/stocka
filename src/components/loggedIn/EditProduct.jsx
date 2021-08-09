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
  Textarea,
  FormControl,
  Select,
  InputGroup,
  Box,
  FormLabel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
} from '@chakra-ui/react'
import { useState } from 'react'
import { editLongTermProd, editShortTermProd } from 'Redux/stockActions'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import queryClient from 'index'
function EditProduct({ onClose, isOpen, product, onCloseProductDetails }) {
  const clientId = useSelector((state) => state.user.client.clientId)
  const [name, setMyName] = useState('')
  const [amount, setAmount] = useState('')
  const [buyPrice, setBuyPrice] = useState('')
  const [desc, setDesc] = useState('')

  //console.log(product, name, amount, buyPrice, desc)

  const [date, setDate] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const { mutateAsync: editLongProd, isLoading: isLoading1 } = useMutation(
    editLongTermProd,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('longTermProd')
        onClose()
        onCloseProductDetails()
        setDate('')
        setYear('')
        setMonth('')
      },
    }
  )
  const { mutateAsync: editShortProd, isLoading: isLoading2 } = useMutation(
    editShortTermProd,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('shortTermProd')
        onClose()
        onCloseProductDetails()
        setDate('')
        setYear('')
        setMonth('')
      },
    }
  )

  const handleEdit = () => {
    if (product.dateOfExpry) {
      //this is for short term product
      const dateOfExpry = new Date()
      dateOfExpry.setDate(date)
      dateOfExpry.setFullYear(year)
      dateOfExpry.setMonth(month - 1)
      const data = {
        clientId,
        buyingPrice: Number(buyPrice) || product.buyingPrice,
        name: name || product.name,
        amount: Number(amount) || product.amount,
        pricePerUnit: buyPrice / amount || product.pricePerUnit,
        description: desc || product.description,
        productId: product.productId,
        dateOfExpry: date && year && month ? dateOfExpry : product.dateOfExpry,
      }

      editShortProd(data)
    } else {
      //this is for long term product
      const data = {
        clientId,
        buyingPrice: Number(buyPrice) || product.buyingPrice,
        name: name || product.name,
        amount: Number(amount) || product.amount,
        pricePerUnit: buyPrice / amount || product.pricePerUnit,
        description: desc || product.description,
        productId: product.productId,
      }
      editLongProd(data)
    }
  }
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={() => {
          onClose()
          setDate('')
          setYear('')
          setMonth('')
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit {product.name}</DrawerHeader>

          <DrawerBody>
            <Input
              onChange={(e) => setMyName(e.target.value)}
              my="1"
              defaultValue={product.name}
              placeholder="Enter name"
            />
            <Input
              defaultValue={product.amount}
              onChange={(e) => setAmount(e.target.value)}
              my="1"
              placeholder="Enter amount"
            />
            <Input
              onChange={(e) => setBuyPrice(e.target.value)}
              my="1"
              defaultValue={product.buyingPrice}
              placeholder="Enter buying price"
            />

            <Textarea
              defaultValue={product.description}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Type descption on product"
            />
            {product.dateOfExpry ? (
              <Accordion allowMultiple mt="2">
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      bg="gray.100"
                      _expanded={{ bg: 'tomato', color: 'white' }}
                    >
                      <Box flex="1" textAlign="left">
                        Add new expiry date
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <FormControl p="3" isRequired>
                      <Box>
                        <FormLabel>Expry date</FormLabel>
                        <InputGroup my="2" size="sm">
                          <Input
                            defaultValue={date}
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
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ) : null}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleEdit} colorScheme="blue">
              {isLoading1 || isLoading2 ? <Spinner size="xs" /> : 'Save'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
export default EditProduct
