import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Navbar = (data) => {
  const length = data.length;
  return (
    <>
      <Box
        pos={length == 0 ? "fixed" : "relative"}
        top="0"
        left="50%"
        transform="translateX(-50%)"
        zIndex="999"
        w="100%"
        textAlign="center"
        mb={8}
      >
        <Text align={"center"} fontSize={"7xl"} fontFamily="UnifrakturMaguntia">
          Classic Indonesia
        </Text>
        <Text align={"center"} fontSize={"l"} fontFamily={"Tinos"}>
          Bringing back the classic way of reading news
        </Text>
      </Box>
    </>
  );
};

export default Navbar;
