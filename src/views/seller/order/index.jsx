import {
  Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Td, Tr, useDisclosure, useColorModeValue, Text, Switch, InputGroup, InputRightElement, IconButton
} from "@chakra-ui/react";
import { seller_order_get } from "contexts/api";
import { admin_notification_count } from "contexts/api";
import { seller_notification_count } from "contexts/api";
import { terminal_notification_count } from "contexts/api";
import { order_create } from "contexts/api";
import { globalPostFunction } from "contexts/logic-function/globalFunktion";
import { globalGetFunction } from "contexts/logic-function/globalFunktion";
import { NotificationStore } from "contexts/state-management/notification/notificationStore";
import { PaymentStore } from "contexts/state-management/payment/paymentStore";
import { setConfig } from "contexts/token";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";

export default function SellerOrder() {
  const { setPaymentData, paymentData } = PaymentStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {setCountData, countData, loading, setLoading} = NotificationStore()
  const [createLoading, setCreateLoading] = useState();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // Setting input text color based on color mode
  const role = localStorage.getItem("ROLE");
  const inputTextColor = useColorModeValue('gray.800', 'white');
  const bgColor = useColorModeValue('#422AFB', '#7551FF');
  const textColor = useColorModeValue('white', 'white');
  const hoverBgColor = useColorModeValue('blue.600', 'purple.600');

  useEffect(() => {
    setConfig()
    getFunction()
  }, [])

  const getFunction = () => {
    globalGetFunction({ url: `${seller_order_get}`, setLoading: setCreateLoading, setData: setPaymentData });
    globalGetFunction({url: role === "ROLE_TERMINAL" ? terminal_notification_count : role === "ROLE_SELLER" ? seller_notification_count : role === "ROLE_SUPER_ADMIN" ? admin_notification_count : "", setData: setCountData, setLoading: setLoading})
  }

  // State to manage form values and validation
  const [formValues, setFormValues] = useState({
    extId: 0,
    amount: 0,
    purposeCode: "",
    terminalId: 0,
    redirectUrl: ""
  });

  const [formErrors, setFormErrors] = useState({
    extId: "",
    amount: "",
    purposeCode: "",
    terminalId: "",
    redirectUrl: ""
  });

  const resetValue = () => {
    setFormValues({
      extId: 0,
      amount: 0,
      purposeCode: "",
      terminalId: 0,
      redirectUrl: ""
    });
    setFormErrors({
      extId: "",
      amount: "",
      purposeCode: "",
      terminalId: "",
      redirectUrl: ""
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // Simple validation example
  };

  const handleSave = () => {
    const errors = {};
    if (Object.keys(errors).length === 0) {
      globalPostFunction({ url: `${order_create}`, postData: formValues, setLoading: setCreateLoading, getFunction: getFunction })
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
          name="Order"
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
                onOpen()
              }}>Create order</Button>}
          thead={['External id', 'Purpose Code', 'Amount', 'Terminal Id', 'Redirect Url', "Action", "Active"]}
        >
          {
            paymentData.object ? paymentData.object.map((item, i) =>
              <Tr>
                <Td>{item.ext_id}</Td>
                <Td>{item.purposeCode}</Td>
                <Td>{item.chequeAmount}</Td>
                <Td>{item.terminalId}</Td>
                <Td>{item.redirectUrl}</Td>
                <Td>
                  <Box ms={3}>
                    <button onClick={() => {
                      setFormValues({
                        extId: +item.extId,
                        purposeCode: item.purposeCode,
                        amount: +item.amount,
                        terminalId: +item.terminalId,
                        redirectUrl: item.redirectUrl
                      })
                      onOpen()
                    }}>
                      <FaEye size={23} />
                    </button>
                  </Box>
                </Td>
                <Td>
                  <Box disabled={item.status !== 0} onClick={() => {
                    // globalPostFunction({ url: `${terminal_isActive}${item.id}`, data: {}, setLoading: setCreateLoading, getFunction: getFunction })
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
                <Td>Order not found</Td>
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
            <FormControl isInvalid={!!formErrors.extId}>
              <FormLabel>External id</FormLabel>
              <Input
              type="number"
                name="extId"
                ref={initialRef}
                placeholder="Enter the external id"
                value={formValues.extId}
                onChange={handleChange}
                color={inputTextColor}
              />
              {formErrors.extId && <Text color="red.500" fontSize="sm">{formErrors.extId}</Text>}
            </FormControl>
            <FormControl mt={4} isInvalid={!!formErrors.amount}>
              <FormLabel>Amount</FormLabel>
              <Input
              type="number"
                name="amount"
                placeholder="Enter the amount"
                value={formValues.amount}
                onChange={handleChange}
                color={inputTextColor}
              />
              {formErrors.amount && <Text color="red.500" fontSize="sm">{formErrors.amount}</Text>}
            </FormControl>
            <FormControl mt={4} isInvalid={!!formErrors.purposeCode}>
              <FormLabel>Purpose Code</FormLabel>
              <Input
                name="purposeCode"
                placeholder="Enter the filial code"
                value={formValues.purposeCode}
                onChange={handleChange}
                color={inputTextColor}
              />
              {formErrors.purposeCode && <Text color="red.500" fontSize="sm">{formErrors.purposeCode}</Text>}
            </FormControl>
            <FormControl mt={4} isInvalid={!!formErrors.terminalId}>
              <FormLabel>Terminal Id</FormLabel>
              <Input
              type="number"
                name="terminalId"
                placeholder="Enter the terminalId"
                value={formValues.terminalId}
                onChange={handleChange}
                color={inputTextColor}
              />
              {formErrors.terminalId && <Text color="red.500" fontSize="sm">{formErrors.terminalId}</Text>}
            </FormControl>
            <FormControl mt={4} isInvalid={!!formErrors.redirectUrl}>
              <FormLabel>Redirect Url</FormLabel>
              <Input
                name="redirectUrl"
                placeholder="Enter the redirectUrl"
                value={formValues.redirectUrl}
                onChange={handleChange}
                color={inputTextColor}
              />
              {formErrors.redirectUrl && <Text color="red.500" fontSize="sm">{formErrors.redirectUrl}</Text>}
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
