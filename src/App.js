import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardOne from "./components/CardOne";
import CardTwo from "./components/CardTwo";
import CardThree from "./components/CardThree";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import getNews from "./api/getNews";

function App() {
  const [data, setData] = useState([]);
  const [shuffledData, setShuffledData] = useState([]);

  const fetchData = async () => {
    try {
      const news = await getNews();
      setData(news);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const shuffledArray = shuffleArray(data);
      setShuffledData(shuffledArray);
    }
  }, [data]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const renderRow = (rowIdx) => {
    const row = [];
    const startIndex = rowIdx * 3;
    for (let i = startIndex; i < startIndex + 3; i++) {
      const dataIndex = i % shuffledData.length;
      const item = shuffledData[dataIndex];
      if (dataIndex % 3 === 0) {
        row.push(
          <div key={item.id}>
            <CardOne data={item} />
          </div>
        );
      } else if (dataIndex % 3 === 1) {
        row.push(
          <div key={item.id}>
            <CardThree data={item} />
          </div>
        );
      } else {
        row.push(
          <div key={item.id}>
            <CardTwo data={item} />
          </div>
        );
      }
      if (i !== startIndex + 2 && i < shuffledData.length - 1) {
        row.push(
          <Divider
            key={`divider-${i}`}
            height={"100vh"}
            orientation="vertical"
            zIndex={888}
          />
        );
      }
    }
    return row;
  };

  const renderRows = () => {
    const numRows = Math.ceil(shuffledData.length / 3);
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        <div key={`row-${i}`}>
          <Flex key={i} gap={4}>
            {renderRow(i)}
          </Flex>
          {i !== numRows - 1 && (
            <Divider zIndex={2222} key={`divider-${i}`} mt={2} mb={2} />
          )}
        </div>
      );
    }
    return rows;
  };

  return (
    //bgImage={"white-paper-texture-background.jpg"}
    <Box bgImage={"white-paper-texture-background.jpg"} bgSize={"cover"} px={3}>
      <Navbar />
      {data?.length == 0 ? (
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <Text mt={20}>Please wait...</Text>
        </div>
      ) : (
        <>{renderRows()}</>
      )}
      {/* <>{renderRows()}</> */}
      {/* <Routes>
        <Route path="/" element={renderRows()} />
      </Routes> */}
    </Box>
  );
}

export default App;
