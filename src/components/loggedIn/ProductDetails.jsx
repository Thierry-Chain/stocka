import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import EditProduct from './EditProduct'
import moment from 'moment'
import { numberSpacer } from 'constants/index'
import { useState } from 'react'
function ProductDetails({ onClose, isOpen, product }) {
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure()
  const [selected, setSelected] = useState({})
  return (
    <Box>
      <Modal
        colorScheme="facebook"
        scrollBehavior="outside"
        onClose={onClose}
        isOpen={isOpen}
        col
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="gray.50">{product.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              fontWeight="semibold"
              color="blue.900"
              m="2"
              shadow="2xl"
              p="3"
            >
              <Text>Name :{product.name}</Text>
              <Text>Amount :{product.amount}</Text>
              <Text>Buying price :{numberSpacer(product.buyingPrice)}</Text>
              {product.recordId ? (
                <Text>Selling Price :{numberSpacer(product.sellingPrice)}</Text>
              ) : null}
              <Text>Entered :{moment(product.dateOfEntry).format('l')}</Text>
              {product.dateOfExpry ? (
                <Text>Expiry :{moment(product.dateOfExpry).format('l')}</Text>
              ) : null}
              {!product.recordId ? (
                <Text>Price per unit : {product.pricePerUnit}</Text>
              ) : null}

              {product.recordId ? (
                <Text>
                  Sold on :{moment(product.dateRecorded).format('l')}{' '}
                </Text>
              ) : null}
              {product.recordId ? (
                <Text>Type :{product.productType}</Text>
              ) : null}
              <Text>Description :{product.description}</Text>

              {!product.recordId ? (
                <Button
                  onClick={() => {
                    onOpen2()
                    setSelected(product)
                  }}
                  size="sm"
                  my="3"
                  colorScheme="blue"
                  variant="outline"
                >
                  <EditIcon /> Edit
                </Button>
              ) : null}
            </Box>
          </ModalBody>
          <ModalFooter bg="gray.50">
            <Button bg="gray.400" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <EditProduct
        product={selected}
        isOpen={isOpen2}
        onClose={onClose2}
        onCloseProductDetails={onClose}
      />
    </Box>
  )
}
export default ProductDetails
