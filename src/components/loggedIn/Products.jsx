import {
  Box,
  Alert,
  AlertIcon,
  SimpleGrid,
  Flex,
  Text,
  Button,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Spinner,
} from '@chakra-ui/react'
import { UnlockIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { numberSpacer } from 'constants/index'
import ProductDetails from './ProductDetails'
import { useState } from 'react'
import moment from 'moment'
import AddToRecords from './AddToRecords'
import { delLongTermProd, delShortTermProd } from 'Redux/stockActions'
import { useMutation } from 'react-query'
import queryClient from 'index'
import { useSelector } from 'react-redux'
export default function Products({
  endKey,
  startKey,
  longProd,
  shortProd,
  showLongProd,
  showShortProd,
  searchKey,
  makeSearch,
}) {
  searchKey = searchKey.trim()
  const filtered = [...shortProd, ...longProd].filter((data) => {
    return data.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
  })
  const allProducts = makeSearch ? filtered : [...shortProd, ...longProd]

  //active products are products that are in range selected in pagination
  const activeProducts = [...allProducts].slice(startKey, endKey)
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const [product, setProduct] = useState({})
  const [sellingPrice, setSellingPrice] = useState('')

  const productsBody = activeProducts.map((product) => {
    return (
      <Flex
        fontSize="md"
        fontWeight="semibold"
        color="blue.900"
        flexDir="column"
        shadow="dark-lg"
        px="1"
        py="2"
        rounded="md"
        _hover={{ shadow: 'outline' }}
        key={product.productId || product.recordId}
      >
        <Text color="telegram.600">Name :{product.name} </Text>
        <Text>Amount :{`${product.amount} pcs`} </Text>
        <Text>Buying Price :{numberSpacer(product.buyingPrice)} </Text>
        {product.recordId ? (
          <Text>Selling Price :{numberSpacer(product.sellingPrice)}</Text>
        ) : null}

        {product.recordId ? (
          <Text>Sold on :{moment(product.dateRecorded).format('L')} </Text>
        ) : null}
        {!product.recordId ? (
          <Text>Entered on :{moment(product.dateOfEntry).format('L')} </Text>
        ) : null}

        {product.dateOfExpry ? (
          <Text>Expry on :{moment(product.dateOfExpry).format('L')} </Text>
        ) : null}

        {!product.recordId ? (
          <Flex>
            <Button
              size="sm"
              onClick={() => {
                onOpen2()
                setProduct(product)
              }}
              colorScheme="blue"
              variant="outline"
            >
              <EditIcon /> Track
            </Button>
            <Spacer />

            <Button
              onClick={() => {
                onOpen1()
                setProduct(product)
              }}
              size="sm"
              colorScheme="red"
              variant="outline"
            >
              <DeleteIcon /> Del
            </Button>
            <Spacer />
            <Button
              onClick={() => {
                onOpen()
                setProduct(product)
              }}
              size="sm"
              colorScheme="teal"
              variant="outline"
            >
              <UnlockIcon /> More
            </Button>
          </Flex>
        ) : (
          <Flex>
            <Button
              onClick={() => {
                onOpen()
                setProduct(product)
              }}
              size="sm"
              colorScheme="teal"
              variant="outline"
              mx="auto"
            >
              <UnlockIcon /> More
            </Button>
          </Flex>
        )}
      </Flex>
    )
  })
  const { mutateAsync: delShortProd, isLoading: isLoading1 } = useMutation(
    delShortTermProd,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('shortTermProd')
        onClose1()
        setSellingPrice('')
      },
    }
  )
  const { mutateAsync: delLongtProd, isLoading: isLoading2 } = useMutation(
    delLongTermProd,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('longTermProd')
        onClose1()
        setSellingPrice('')
      },
    }
  )
  const clientId = useSelector((state) => state.user.client.clientId)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (product.dateOfExpry) {
      //short term product
      const data = {
        clientId,
        productId: product.productId,
        sellingPrice: Number(sellingPrice),
      }
      delShortProd(data)
    } else {
      //long term product
      const data = {
        clientId,
        productId: product.productId,
        sellingPrice: Number(sellingPrice),
      }
      delLongtProd(data)
    }
  }
  return (
    <Box ml="2" mr="2">
      <SimpleGrid ml="2" mr="2" columns={[1, 2, 3]} spacing={5}>
        {allProducts.length ? productsBody : null}
      </SimpleGrid>
      <Modal
        isCentered
        size="sm"
        isOpen={isOpen1}
        onClose={() => {
          onClose1()
          setSellingPrice('')
        }}
      >
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure to delete{' '}
              <Text as="span" fontWeight="bold">
                {product.name}
              </Text>
              <Flex my="2">
                <Input
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  placeholder="Enter selling price"
                  isRequired
                  w={['98%', '80%']}
                  mx="auto"
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
              <Button
                onClick={() => setProduct(product)}
                type="submit"
                size="sm"
                colorScheme="red"
              >
                {isLoading1 || isLoading2 ? <Spinner size="xs" /> : 'Ok'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      <ProductDetails product={product} onClose={onClose} isOpen={isOpen} />
      <AddToRecords isOpen={isOpen2} onClose={onClose2} product={product} />
      {!allProducts.length ? (
        <Box h={['47vh', '47vh', 'auto']}>
          <Alert status="info" my="5" rounded variant="left-accent">
            <AlertIcon />
            No product available
          </Alert>
        </Box>
      ) : null}
    </Box>
  )
}
