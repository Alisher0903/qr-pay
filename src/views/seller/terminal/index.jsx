// Chakra imports
import { 
  Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Td, Tr, useDisclosure, useColorModeValue, Text, 
  Progress,
  Switch
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";

export default function SellerTerminal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // Setting input text color based on color mode
  const inputTextColor = useColorModeValue('gray.800', 'white');

  // State to manage form values and validation
  const [formValues, setFormValues] = useState({
    name: '',
    account: '',
    filialCode: '',
    inn: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    account: '',
    filialCode: '',
    inn: ''
  });

  const resetValue = () => {
    setFormValues({
      name: '',
      account: '',
      filialCode: '',
      inn: '',
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Simple validation example
    if (value.trim() === '') {
      setFormErrors({ ...formErrors, [name]: `${name} is required` });
    } else {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleSave = () => {
    // You can add more validation logic here
    const errors = {};
    Object.keys(formValues).forEach(key => {
      if (formValues[key].trim() === '') {
        errors[key] = `${key} is required`;
      }
    });

    if (Object.keys(errors).length === 0) {
      console.log("Form Submitted", formValues);
      onClose();
      resetValue()
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
          name="Table" 
          buttonChild={<Button onClick={onOpen}>Create terminal</Button>} 
          thead={['Name', 'Inn', 'Account', 'Filial code', "Update", "Active"]}
        >
          <Tr>
            <Td>John Doe</Td>
            <Td>Approved</Td>
            <Td>2024-08-21</Td>
            <Td>2024-08-21</Td>
            <Td>
              <Box ms={3}>
                <button onClick={onOpen}>
                  <FaEdit size={23} />
                </button>
              </Box>
            </Td>
            <Td>
              <Box>
              <Switch colorScheme='teal' size='lg' />
              </Box>
            </Td>
          </Tr>
        </ComplexTable>
      </SimpleGrid>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          onClose()
          resetValue()
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
            <FormControl mt={4} isInvalid={!!formErrors.filialCode}>
              <FormLabel>Filial Code</FormLabel>
              <Input
                name="filialCode"
                placeholder="Enter the terminal filial code"
                value={formValues.filialCode}
                onChange={handleChange}
                color={inputTextColor}
              />
              {formErrors.filialCode && <Text color="red.500" fontSize="sm">{formErrors.filialCode}</Text>}
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={() => {
              onClose()
              resetValue()
            }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
