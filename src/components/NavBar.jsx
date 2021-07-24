import {
  Flex,
  Box,
  Text,
  Button,
  Spacer,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import { UnlockIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <Flex
      align="baseline"
      mx="auto"
      color="telegram.400"
      direction={["row", "row", "column"]}
    >
      <Flex my="2" ml="0.5" direction={["row", "column"]} py="1" mx="auto">
        <WrapItem display={["none", "inline"]}>
          <Avatar mt={[null, "-1.5", null]} src="#" />
        </WrapItem>
        <Text
          as="big"
          bgGradient="linear(to-l,teal.100,blue.800)"
          bgClip="text"
          lineHeight="3"
          letterSpacing="wide"
          display={["inline", "none", "inline"]}
          fontFamily="revert"
          fontWeight="bold"
          py="2"
          my="1"
        >
          STOCK
        </Text>
        <Box
          as="div"
          display={["none", "none", "inline"]}
          p="0.5"
          pb="0"
          my="3"
          h="0.5"
          bg="telegram.300"
        />
      </Flex>

      <Flex
        direction={["row", "row", "column"]}
        py="3"
        justifyContent="space-around"
        mx={[null, "auto", "auto"]}
        fontWeight="bold"
      >
        <Flex py="2" _hover={{ bg: "telegram.100", color: "#020201" }}>
          <NavLink className="link" to="/">
            {" "}
            <UnlockIcon mr="2" display={["inline", "none", "inline"]} />
            <Text display={["none", "inline", "inline"]}>Home</Text>
          </NavLink>
        </Flex>
        <Flex py="2" _hover={{ bg: "telegram.100", color: "#020201" }}>
          <NavLink className="link" to="/login">
            <UnlockIcon mr="2" display={["inline", "none", "inline"]} />
            <Text display={["none", "inline", "inline"]}>Login</Text>
          </NavLink>
        </Flex>
        <Flex py="2" _hover={{ bg: "telegram.100", color: "#020201" }}>
          <NavLink className="link" to="signup">
            {" "}
            <UnlockIcon mr="2" display={["inline", "none", "inline"]} />
            <Text display={["none", "inline", "inline"]}>SignUp</Text>
          </NavLink>
        </Flex>
        <Flex py="2" _hover={{ bg: "telegram.100", color: "#020201" }}>
          <NavLink className="link" to="about">
            {" "}
            <UnlockIcon mr="2" display={["inline", "none", "inline"]} />
            <Text display={["none", "inline", "inline"]}>About</Text>
          </NavLink>
        </Flex>
      </Flex>
      <Spacer />
      <Flex display={["none", "none", "inline"]} my={[null, "1", "2"]}>
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
        >
          <NavLink to="signup">Go Now</NavLink>
        </Button>
      </Flex>
    </Flex>
  );
}
