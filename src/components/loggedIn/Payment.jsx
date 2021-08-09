import { Container, Text } from '@chakra-ui/react'


export default function Payment() {
  return <Container h="88vh" minW="full" pl="0" pr="0">
    <Text
      fontWeight="bold"
      fontSize="larger"
      bgGradient="linear(to-l,blue.300,blue.800)"
      bgClip="text"
      textAlign="center"
      p="2"
    >
      Payment
      </Text>
    <Text fontSize="larger"
      bgGradient="linear(to-l,blue.200,blue.700)" textAlign="center">Sorry this service is under construction</Text>
  </Container>
}
