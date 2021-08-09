import React from 'react'
import {
  List,
  ListItem,
  Alert,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  AlertIcon,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Portal,
  CloseButton,
  Text,
  Box,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { delNotify } from 'Redux/actions'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import moment from 'moment'
import queryClient from 'index'
function Notify({ notify }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const clientId = useSelector((state) => state.user.client.clientId)
  const { mutateAsync } = useMutation(delNotify, {
    onSuccess: () => {
      queryClient.invalidateQueries('getNotified')
    },
  })
  const btnRef = React.useRef()
  return (
    <Flex>
      <Button
        bg="blue.400"
        mx="auto"
        alignContent="baseline"
        ref={btnRef}
        onClick={onOpen}
      >
        <ViewIcon mr="2" /> Open
      </Button>

      <Portal>
        <Modal
          onClose={onClose}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          scrollBehavior="inside"
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bg="gray.100">Notifications</ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="gray.100">
              <Flex my="2" overflow="hidden">
                <List mx="auto" spacing={2}>
                  {notify.map((notification) => (
                    <ListItem
                      textAlign="left"
                      key={notify.indexOf(notification)}
                    >
                      <Alert
                        status="success"
                        variant="left-accent"
                        rounded="md"
                      >
                        <AlertIcon color="gray.700" />
                        <Flex flexDir="column">
                          <Text mr="2">{notification.message}</Text>
                          <Box>
                            <Box>
                              <Text as="span" fontWeight="semibold">
                                From
                              </Text>{' '}
                              {notification.source}
                            </Box>
                            <Box>
                              <Text as="span" fontWeight="semibold">
                                on
                              </Text>{' '}
                              {moment(notification.createdAt).format('L')}
                            </Box>{' '}
                          </Box>
                        </Flex>
                        {notification.source !== 'ADMIN' ? (
                          <CloseButton
                            onClick={() =>
                              mutateAsync({
                                clientId,
                                notificationId: notification.notificationId,
                              })
                            }
                            position="absolute"
                            right="8px"
                            top="8px"
                          />
                        ) : null}
                      </Alert>
                    </ListItem>
                  ))}
                </List>
              </Flex>
            </ModalBody>
            <ModalFooter bg="gray.100">
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Portal>
    </Flex>
  )
}
export default Notify
