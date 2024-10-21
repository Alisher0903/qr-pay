// src/pages/PrivacyTermsPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Text,
  useColorModeValue,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Grid,
  FormLabel,
  Input,
  ModalFooter,
} from '@chakra-ui/react';
import WebWords from './web';
import { LanguageStore } from 'contexts/state-management/language/languageStore';
import { globalGetFunction } from 'contexts/logic-function/globalFunktion';
import { words_get } from 'contexts/api';
import { globalPostFunction } from 'contexts/logic-function/globalFunktion';
import { words_post } from 'contexts/api';
import toast from 'react-hot-toast';

const WordsPage = () => {
  const [wordsWebData, setWordsWeb] = useState(null)
  const [status, setStatus] = useState("WEB")
  const [loading, setLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputTextColor = useColorModeValue('gray.800', 'white');
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const initialValue = {
    key: "",
    tavsif: "",
    uz: "",
    ru: "",
  }

  const [formValues, setFormValues] = useState(initialValue);
  // const [terminalNewUsers, setTerminalNewUsers] = useState([terminalNewUsersInitial]);

  const [formErrors, setFormErrors] = useState(initialValue);

  const bgColor = useColorModeValue('#422AFB', '#7551FF');
  const textColor = useColorModeValue('white', 'white');
  const hoverBgColor = useColorModeValue('blue.600', 'purple.600');

  useEffect(() => {
    globalGetFunction({
      url: `${words_get}${status}`,
      setData: setWordsWeb,
      setLoading: setLoading,
    })
  }, []);

  useEffect(() => {
    globalGetFunction({
      url: `${words_get}${status}`,
      setData: setWordsWeb,
      setLoading: setLoading,
    })
  }, [status]);

  const resetValue = () => {
    setFormValues(initialValue);
    setFormErrors(initialValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    const errors = {};
    if (value.trim() === '') errors[name] = `${name} ni kiritish talab qilinadi.`;
    else errors[name] = ""
    setFormErrors({ ...formErrors, ...errors });
  };

  const handleSave = () => {
    const errors = {};
    Object.keys(formValues).forEach(key => {
      if (formValues[key].trim() === '') errors[key] = `${key} ni kiritish talab qilinadi`;
    });
    if (Object.keys(errors).length === 0) {
      globalPostFunction({
        url: `${words_post}${status}`, postData: {
          id: 1,
          key: formValues.key,
          uz: formValues.uz,
          ru: formValues.ru,
          description: formValues.tavsif
        },
        getFunction: globalGetFunction({
          url: `${words_get}${status}`,
          setData: setWordsWeb,
          setLoading: setLoading
        })
      })
      onClose();
      resetValue();
    } else setFormErrors(errors);
  }

  return (
    <Container maxW="container.xl" pt={20}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={10} mt={15}>
        <Heading as="h1" size="xl">
          Words
        </Heading>
        <Button
          bg={bgColor}
          color={textColor}
          _hover={{ bg: hoverBgColor }}
          _active={{
            bg: hoverBgColor,
            transform: "scale(0.98)",
          }}
          onClick={() => {
            if (status === "BOT") {
              toast.error("Siz botga so'z qo'sha olmaysiz.")
            } else {
              onOpen()
            }
          }}>
          Add word
        </Button>
      </Box>

      <Tabs variant="line" colorScheme="teal">
        <TabList display={"flex"} justifyContent={"center"} >
          <Tab onClick={() => {
            setWordsWeb(null)
            setStatus("WEB")
          }} color="#422AFB" fontWeight={"800"} fontSize={20}>Web</Tab>
          <Tab onClick={() => {
            setWordsWeb(null)
            setStatus("BOT")
          }} color="#422AFB" fontWeight={"800"} fontSize={20}>Bot</Tab>
          <Tab onClick={() => {
            setWordsWeb(null)
            setStatus("MOBILE")
          }} color="#422AFB" fontWeight={"800"} fontSize={20}>Mobile</Tab>
        </TabList>

        <TabPanels justifyContent={"center"}>
          <TabPanel>
            {loading ? <Box><Text textAlign={"center"}>Loading...</Text></Box>
              : wordsWebData && wordsWebData.length > 0 ? wordsWebData.map((word, i) =>
                <WebWords getFunction={() => {
                  globalGetFunction({
                    url: `${words_get}${status}`,
                    setData: setWordsWeb,
                    setLoading: setLoading,
                  })
                }} key={i} item={word} />
              ) : <Box><Text textAlign={"center"}>Malumot topilmadi</Text></Box>}
          </TabPanel>
          <TabPanel>
            {loading ? <Box><Text textAlign={"center"}>Loading...</Text></Box>
              : wordsWebData && wordsWebData.length > 0 ? wordsWebData.map((word, i) =>
                <WebWords getFunction={() => {
                  globalGetFunction({
                    url: `${words_get}${status}`,
                    setData: setWordsWeb,
                    setLoading: setLoading,
                  })
                }} key={i} item={word} />
              ) : <Box><Text textAlign={"center"}>Malumot topilmadi</Text></Box>}
          </TabPanel>
          <TabPanel>
            {loading ? <Box><Text textAlign={"center"}>Loading...</Text></Box>
              : wordsWebData && wordsWebData.length > 0 ? wordsWebData.map((word, i) =>
                <WebWords getFunction={() => {
                  globalGetFunction({
                    url: `${words_get}${status}`,
                    setData: setWordsWeb,
                    setLoading: setLoading,
                  })
                }} key={i} item={word} />
              ) : <Box><Text textAlign={"center"}>Malumot topilmadi</Text></Box>}
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal
        size={"3xl"}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetValue();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Add word"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Grid templateColumns='repeat(2, 1fr)' gap={6} px={5}>
              <FormControl mt={4} isInvalid={!!formErrors.key}>
                <FormLabel>Kalit</FormLabel>
                <Input
                  name="key"
                  ref={initialRef}
                  placeholder={"Kalitni kiriting"}
                  value={formValues.key}
                  onChange={handleChange}
                  color={inputTextColor}
                />
                {formErrors.key && <Text color="red.500" fontSize="sm">{formErrors.key}</Text>}
              </FormControl>
              <FormControl mt={4} isInvalid={!!formErrors.tavsif}>
                <FormLabel>Tavsif</FormLabel>
                <Input
                  name="tavsif"
                  placeholder={"Tavsifni kiriting"}
                  value={formValues.tavsif}
                  onChange={handleChange}
                  color={inputTextColor}
                />
                {formErrors.tavsif && <Text color="red.500" fontSize="sm">{formErrors.tavsif}</Text>}
              </FormControl>
              <FormControl mt={4} isInvalid={!!formErrors.uz}>
                <FormLabel>Uz</FormLabel>
                <Input
                  name="uz"
                  placeholder={"O'zbek tilida kiriting"}
                  value={formValues.uz}
                  onChange={handleChange}
                  color={inputTextColor}
                />
                {formErrors.uz &&
                  <Text color="red.500" fontSize="sm">{formErrors.uz}</Text>}
              </FormControl>
              <FormControl mt={4} isInvalid={!!formErrors.ru}>
                <FormLabel>Ru</FormLabel>
                <Input
                  name="ru"
                  placeholder={"Rus tilida kiriting"}
                  value={formValues.ru}
                  onChange={handleChange}
                  color={inputTextColor}
                />
                {formErrors.ru && <Text color="red.500" fontSize="sm">{formErrors.ru}</Text>}
              </FormControl>

            </Grid>
          </ModalBody>
          <ModalFooter display={"flex"} gap={"10px"}>
            <Button
              colorScheme="red" onClick={() => {
                onClose();
                resetValue();
              }}>Bekor qilish</Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Saqlash
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default WordsPage;
