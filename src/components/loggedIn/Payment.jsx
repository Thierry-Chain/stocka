import { Container, Text } from '@chakra-ui/react';

export default function Payment() {
  return (
    <Container h="88vh" minW="full" pl="0" pr="0">
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
      <Text
        fontSize="larger"
        bgGradient="linear(to-l,gray.200,gray.400)"
        textAlign="center"
        py="16"
        fontWeight="bold"
        color="blackAlpha.700"
      >
        Sorry this service is under construction
      </Text>
    </Container>
  );
}
