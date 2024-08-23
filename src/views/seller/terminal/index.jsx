import {
  Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Td, Tr, useDisclosure, useColorModeValue, Text, Switch, InputGroup, InputRightElement, IconButton
} from "@chakra-ui/react";
import { terminal_get } from "contexts/api";
import { terminal_isActive } from "contexts/api";
import { terminal_update } from "contexts/api";
import { terminal_create } from "contexts/api";
import { globalPostFunction } from "contexts/logic-function/globalFunktion";
import { globalPutFunction } from "contexts/logic-function/globalFunktion";
import { globalGetFunction } from "contexts/logic-function/globalFunktion";
import { TerminalStory } from "contexts/state-management/terminal/terminalStory";
import { setConfig } from "contexts/token";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";

export default function SellerTerminal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setTerminalData, terminalData, isEdit, setIsEdit } = TerminalStory();
  const [createLoading, setCreateLoading] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // Setting input text color based on color mode
  const inputTextColor = useColorModeValue('gray.800', 'white');
  const bgColor = useColorModeValue('#422AFB', '#7551FF');
  const textColor = useColorModeValue('white', 'white');
  const hoverBgColor = useColorModeValue('blue.600', 'purple.600');

  useEffect(() => {
    setConfig()
    getFunction()
  }, [])

  const getFunction = () => {
    globalGetFunction({ url: `${terminal_get}`, setLoading: setCreateLoading, setData: setTerminalData });
  }

  // State to manage form values and validation
  const [formValues, setFormValues] = useState({
    name: "",
    account: "",
    filial_code: "",
    inn: "",
    password: "",
    phone: ""
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    account: "",
    filial_code: "",
    inn: "",
    password: "",
    phone: ""
  });

  const resetValue = () => {
    setFormValues({
      name: '',
      account: '',
      filial_code: '',
      inn: '',
      password: '',
      phone: ''
    });
    setFormErrors({
      name: '',
      account: '',
      filial_code: '',
      inn: '',
      password: '',
      phone: ''
    });
  };

  console.log(terminalData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Simple validation example
    const errors = {};
    if (name === "phone" && (!/^\+?\d*$/.test(value) || value.length !== 13)) {
      errors.phone = "Phone number must be exactly 13 characters long and only contain numbers or +.";
    } else if (name === "password" && value.length < 3) {
      errors.password = "Password must be at least 3 characters long.";
    } else if (value.trim() === '') {
      errors[name] = `${name} is required`;
    }
    setFormErrors({ ...formErrors, ...errors });
  };

  const handleSave = () => {
    const errors = {};
    Object.keys(formValues).forEach(key => {
      if (key === "phone" && (!/^\+?\d*$/.test(formValues[key]) || formValues[key].length !== 13)) {
        errors.phone = "Phone number must be exactly 13 characters long and only contain numbers or +.";
      } else if (key === "password" && formValues[key].length < 3) {
        errors.password = "Password must be at least 3 characters long.";
      } else if (formValues[key].trim() === '') {
        errors[key] = `${key} is required`;
      }
    });

    if (Object.keys(errors).length === 0) {
      console.log("Form Submitted", formValues);
      isEdit ? globalPutFunction({url: `${terminal_update}1`, putData: formValues, setLoading: setCreateLoading, getFunction: getFunction }) : globalPostFunction({url: `${terminal_create}`, postData: formValues, setLoading: setCreateLoading, getFunction: getFunction  })
      onClose();
      resetValue();
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <ComplexTable
          name="Terminal"
          buttonChild={
            <Button
              bg={bgColor}
              color={textColor}
              _hover={{ bg: hoverBgColor }}
              _active={{
                bg: hoverBgColor,
                transform: "scale(0.98)",
              }}
              onClick={() => {
                setIsEdit(false)
                onOpen()
              }}>Create terminal</Button>}
          thead={['Name', 'Inn', 'Account', 'Phone', 'Filial code', "Update", "Active"]}
        >
          {
            terminalData.length > 0 ? terminalData.map((item, i) =>
              <Tr>
                <Td>{item.name}</Td>
                <Td>{item.inn}</Td>
                <Td>{item.account}</Td>
                <Td>{item.phone}</Td>
                <Td>{item.filial_code}</Td>
                <Td>
                  <Box ms={3}>
                    <button onClick={() => {
                      setFormValues({
                        name: item.name,
                        account: item.account,
                        filial_code: item.filial_code,
                        inn: item.inn,
                        password: '',
                        phone: item.phone
                      })
                      setIsEdit(true)
                      onOpen()
                    }}>
                      <FaEdit size={23} />
                    </button>
                  </Box>
                </Td>
                <Td>
                  <Box disabled={item.status !== 0} onClick={() => {
                    globalPostFunction({url: `${terminal_isActive}${item.id}`, data: {}, setLoading: setCreateLoading, getFunction: getFunction})
                    console.log("switch");
                  }}>

                    <Switch disabled={item.status !== 0} isChecked={item.status === 0} colorScheme='teal' size='lg' />
                  </Box>
                </Td>
              </Tr>
            ) :
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td>Terminal not found</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
          }
        </ComplexTable>
      </SimpleGrid>
      <Modal
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
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={!!formErrors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                ref={initialRef}
                placeholder="Enter the terminal name"
                value={formValues.name}
                onChange={handleChange}
                color={inputTextColor}
              />
              {formErrors.name && <Text color="red.500" fontSize="sm">{formErrors.name}</Text>}
            </FormControl>
            <FormControl mt={4} isInvalid={!!formErrors.account}>
              <FormLabel>Account</FormLabel>
              <Input
                name="account"
                placeholder="Enter the terminal account"
                value={formValues.account}
                onChange={handleChange}
                color={inputTextColor}
              />
              {formErrors.account && <Text color="red.500" fontSize="sm">{formErrors.account}</Text>}
            </FormControl>
            <FormControl mt={4} isInvalid={!!formErrors.filial_code}>
              <FormLabel>Filial Code</FormLabel>
              <Input
                name="filial_code"
                placeholder="Enter the terminal filial code"
                value={formValues.filial_code}
                onChange={handleChange}
                color={inputTextColor}
              />
              {formErrors.filial_code && <Text color="red.500" fontSize="sm">{formErrors.filial_code}</Text>}
            </FormControl>
            <FormControl mt={4} isInvalid={!!formErrors.inn}>
              <FormLabel>Inn</FormLabel>
              <Input
                name="inn"
                placeholder="Enter the terminal inn"
                value={formValues.inn}
                onChange={handleChange}
                color={inputTextColor}
              />
              {formErrors.inn && <Text color="red.500" fontSize="sm">{formErrors.inn}</Text>}
            </FormControl>
            <FormControl mt={4} isInvalid={!!formErrors.phone}>
              <FormLabel>Phone number</FormLabel>
              <Input
                name="phone"
                placeholder="Enter the terminal phone number"
                value={formValues.phone}
                onChange={handleChange}
                color={inputTextColor}
              />
              {formErrors.phone && <Text color="red.500" fontSize="sm">{formErrors.phone}</Text>}
            </FormControl>
            <FormControl mt={4} isInvalid={!!formErrors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter the terminal password"
                  value={formValues.password}
                  onChange={handleChange}
                  color={inputTextColor}
                />
                <InputRightElement>
                  <IconButton
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    size="sm"
                    aria-label="Toggle Password Visibility"
                  />
                </InputRightElement>
              </InputGroup>
              {formErrors.password && <Text color="red.500" fontSize="sm">{formErrors.password}</Text>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={() => {
              onClose();
              resetValue();
            }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
