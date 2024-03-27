import React from "react";
import { Divider, Flex, Image, Text } from "@chakra-ui/react";

const CardThree = ({ data }) => {
  const {
    title,
    contentSnippet,
    publishedDate,
    portal,
    category,
    image,
    link,
    detailNews,
  } = data;

  return (
    <Flex
      onClick={() => window.open(link)}
      cursor={"pointer"}
      transition={"all 0.5s ease"}
      _hover={{
        bg: "gray.100",
        border: "0.5px solid black",
        borderRadius: "10px",
        padding: "18px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
        transition: "all 0.5s ease",
      }}
      align={"center"}
      flexDirection={"column"}
    >
      <Text mb={1} fontFamily="Georgia" fontSize={"14px"} textAlign={"justify"}>
        {detailNews}
      </Text>
      <Text
        mt={1}
        alignSelf={"flex-start"}
        fontSize={"12px"}
        fontFamily={"Georgia"}
      >
        Published: {publishedDate}
      </Text>
      <Text alignSelf={"flex-start"} fontSize={"12px"} fontFamily={"Georgia"}>
        Portal: {portal}
      </Text>
      <Text
        mb={2}
        alignSelf={"flex-start"}
        fontSize={"12px"}
        fontFamily={"Georgia"}
      >
        Category: {category}
      </Text>
      <Divider />
      <Text mt={1} fontFamily="Tinos" fontSize={"2xl"}>
        {title.toUpperCase()}
      </Text>
      <Divider mt={1} mb={2} />
      <Image
        w={"500px"}
        // h={"400px"}
        mb={4}
        src={image.large}
        // filter={"grayscale(100%)"}
      />
      <Text
        mb={2}
        fontWeight={"bold"}
        fontFamily="Georgia"
        fontSize={"14px"}
        textAlign={"justify"}
      >
        {contentSnippet}
      </Text>
    </Flex>
  );
};

export default CardThree;
