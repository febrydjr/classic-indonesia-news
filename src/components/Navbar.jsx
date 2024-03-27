import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <>
      <Box mb={4}>
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
