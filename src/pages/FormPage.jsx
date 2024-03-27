import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  Button,
  Input,
  Textarea,
  Select,
  useToast,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import "../App.css";
function FormPage() {
  const toast = useToast();

  const [partyList, setPartyList] = useState([]);
  useEffect(() => {
    async function fetchParties() {
      try {
        const response = await axios.get("http://localhost:8000/party");
        setPartyList(response.data.party);
      } catch (error) {
        console.error("Error fetching parties:", error);
      }
    }
    fetchParties();
  }, []);

  const [personList, setPersonList] = useState([]);

  useEffect(() => {
    async function fetchPersons() {
      try {
        const response = await axios.get("http://localhost:8000/person");
        setPersonList(response.data.person);
      } catch (error) {
        console.error("Error fetching persons:", error);
      }
    }
    fetchPersons();
  }, []);

  const [personData, setPersonData] = useState({
    name: "",
    gender: "",
    birthdate: "",
    nationality: "Indonesia",
    id_party: "",
    avatar: null,
  });

  const [partyData, setPartyData] = useState({
    name: "",
    abbreviation: "",
    leader: "",
    ideology: "",
    description: "",
    party: "",
  });

  const [prisonedData, setPrisonedData] = useState({
    id_person: "",
    date: "",
    duration: "",
    allegation: "",
    verdict: "",
    released: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handlePersonSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", personData.name);
      formData.append("gender", personData.gender);
      formData.append("birthdate", personData.birthdate);
      formData.append("nationality", personData.nationality);
      formData.append("id_party", personData.id_party);
      formData.append("avatar", personData.avatar);

      const response = await axios.post(
        "http://localhost:8000/person",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Person added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.log(response.data);
    } catch (error) {
      toast({
        title: "Error adding person",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.error("Error adding person:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePartySubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", partyData.name);
      formData.append("abbreviation", partyData.abbreviation);
      formData.append("leader", partyData.leader);
      formData.append("ideology", partyData.ideology);
      formData.append("description", partyData.description);
      formData.append("party", partyData.image);

      const response = await axios.post(
        "http://localhost:8000/party",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      toast({
        title: "Party added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error adding party",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.error("Error adding party:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrisonedSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/prison",
        prisonedData
      );
      console.log(response.data);
      toast({
        title: "Prisoner added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error adding prisoner",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.error("Error adding prisoned:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      //   w={"40%"}
      //   m={"auto"}
      //   mt={12}
    >
      <Tabs>
        <TabList>
          <Tab>Add Person</Tab>
          <Tab>Add Party</Tab>
          <Tab>Add Prisoned</Tab>
        </TabList>
        <TabPanels>
          {/* //---------------------------------------------------------------------- */}
          <TabPanel w={"100vh"}>
            <Input
              placeholder="Name"
              value={personData.name}
              onChange={(e) =>
                setPersonData({ ...personData, name: e.target.value })
              }
            />
            <Select
              placeholder="Gender"
              value={personData.gender}
              onChange={(e) =>
                setPersonData({ ...personData, gender: e.target.value })
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>

            <DatePicker
              selected={
                personData.birthdate ? new Date(personData.birthdate) : null
              }
              onChange={(date) =>
                setPersonData({
                  ...personData,
                  birthdate: date ? date.toISOString() : "",
                })
              }
              dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
              placeholderText="Birthdate"
            />
            <Input
              placeholder="Nationality"
              value={personData.nationality}
              onChange={(e) =>
                setPersonData({ ...personData, nationality: e.target.value })
              }
            />
            <Select
              placeholder="Select Party"
              value={personData.id_party}
              onChange={(e) =>
                setPersonData({ ...personData, id_party: e.target.value })
              }
            >
              {partyList.map((party) => (
                <option key={party.id} value={party.id}>
                  {party.name}
                </option>
              ))}
            </Select>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPersonData({ ...personData, avatar: e.target.files[0] })
              }
            />
            <Button
              colorScheme="facebook"
              isLoading={loading}
              onClick={handlePersonSubmit}
            >
              Add Person
            </Button>
          </TabPanel>
          {/* //--------------------------------------------------------------------- */}
          <TabPanel w={"100vh"}>
            <Input
              placeholder="Name"
              value={partyData.name}
              onChange={(e) =>
                setPartyData({ ...partyData, name: e.target.value })
              }
            />
            <Input
              placeholder="Abbreviation"
              value={partyData.abbreviation}
              onChange={(e) =>
                setPartyData({ ...partyData, abbreviation: e.target.value })
              }
            />
            <Input
              placeholder="Leader"
              value={partyData.leader}
              onChange={(e) =>
                setPartyData({ ...partyData, leader: e.target.value })
              }
            />
            <Input
              placeholder="Ideology"
              value={partyData.ideology}
              onChange={(e) =>
                setPartyData({ ...partyData, ideology: e.target.value })
              }
            />
            <Textarea
              placeholder="Description"
              value={partyData.description}
              onChange={(e) =>
                setPartyData({ ...partyData, description: e.target.value })
              }
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedImage = e.target.files[0];
                setPartyData({
                  ...partyData,
                  image: selectedImage ? selectedImage : null,
                });
              }}
            />

            <Button
              colorScheme="facebook"
              isLoading={loading}
              onClick={handlePartySubmit}
            >
              Add Party
            </Button>
          </TabPanel>
          {/* //-------------------------------------------------------------------------- */}
          <TabPanel w={"100vh"}>
            <Select
              placeholder="Select Person"
              value={prisonedData.id_person}
              onChange={(e) =>
                setPrisonedData({ ...prisonedData, id_person: e.target.value })
              }
            >
              {personList.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </Select>
            <Text>Prisoned Date:</Text>
            <DatePicker
              selected={prisonedData.date ? new Date(prisonedData.date) : null}
              onChange={(date) =>
                setPrisonedData({
                  ...prisonedData,
                  date: date ? date.toISOString() : "",
                })
              }
              dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
              placeholderText="Prisoned Date"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Text>Released:</Text>
            <DatePicker
              selected={
                prisonedData.released ? new Date(prisonedData.released) : null
              }
              onChange={(released) =>
                setPrisonedData({
                  ...prisonedData,
                  released: released ? released.toISOString() : "",
                })
              }
              dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
              placeholderText="Released Date"
            />
            {/* <Input
              placeholder="Duration"
              value={prisonedData.duration}
              onChange={(e) =>
                setPrisonedData({ ...prisonedData, duration: e.target.value })
              }
            /> */}
            <Input
              placeholder="Allegation"
              value={prisonedData.allegation}
              onChange={(e) =>
                setPrisonedData({ ...prisonedData, allegation: e.target.value })
              }
            />
            <Select
              placeholder="Verdict"
              value={prisonedData.verdict}
              onChange={(e) =>
                setPrisonedData({ ...prisonedData, verdict: e.target.value })
              }
            >
              <option value="1">Guilty</option>
              <option value="2">Not Guilty</option>
              <option value="3">Pending</option>
            </Select>
            {prisonedData.verdict === "1" && (
              <Input
                placeholder="Duration"
                value={prisonedData.duration}
                onChange={(e) =>
                  setPrisonedData({ ...prisonedData, duration: e.target.value })
                }
              />
            )}
            <Textarea
              placeholder="Notes"
              value={prisonedData.notes}
              onChange={(e) =>
                setPrisonedData({ ...prisonedData, notes: e.target.value })
              }
            />
            <Button
              colorScheme="facebook"
              isLoading={loading}
              onClick={handlePrisonedSubmit}
            >
              Add Prisoned
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default FormPage;
