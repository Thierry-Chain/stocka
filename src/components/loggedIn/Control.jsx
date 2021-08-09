import { Container, Text } from '@chakra-ui/react'
import CheckUp from './CheckUp'

export default function Control() {
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
    </Container>
  )
}
