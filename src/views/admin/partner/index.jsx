import React, {useRef, useState} from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalFooter,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";

import TableTopCreators from "views/admin/partner/components/TableTopCreators";
import Card from "components/card/Card.js";

import tableDataTopCreators from "views/admin/partner/variables/tableDataTopCreators.json";
import {tableColumnsTopCreators} from "views/admin/partner/variables/tableColumnsTopCreators";
import axios from "axios";
import {config} from "../../../contexts/token";
import {user_register} from "../../../contexts/api";
import {consoleClear, toastMessage} from "../../../contexts/toast-message";
import toast from "react-hot-toast";

export default function Partner() {
    const inputTextColor = useColorModeValue('gray.800', 'white');
    const {isOpen, onOpen, onClose} = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false)

    const merchantSave = async () => {
        setIsLoading(true)
        try {
            const {data} = await axios.post(user_register, formValues, config);
            if (data?.error?.code) {
                setIsLoading(false)
                toastMessage(data?.error?.code)
            }
            else {
                setIsLoading(false)
                toast.success('Merchant saved successfully')
                onClose();
                resetValue()
            }
        } catch (err) {
            setIsLoading(false)
            console.log(err)
            consoleClear()
        }
    }

    const resetValue = () => {
        setFormValues({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: ''
        });
        setFormErrors({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: ''
        });
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});

        // Simple validation example
        const errors = {};
        if (name === "phone" && (!/^\+?\d*$/.test(value) || value.length !== 13)) {
            errors.phone = "The phone number must start with +998 and contain 13 characters";
        } else if (name === "password" && value.length < 3) errors.password = "Password must be at least 3 characters long.";
        else if (value.trim() === '') errors[name] = `${name} is required`;
        setFormErrors({...formErrors, ...errors});
    };

    const handleSave = async () => {
        const errors = {};
        Object.keys(formValues).forEach(key => {
            if (key === "phone" && (!/^\+?\d*$/.test(formValues[key]) || formValues[key].length !== 13)) {
                errors.phone = "The phone number must start with +998 and contain 13 characters";
            } else if (key === "password" && formValues[key].length < 3) errors.password = "Password must be at least 3 characters long.";
            else if (formValues[key].trim() === '') errors[key] = `${key} is required`;
        });

        if (Object.keys(errors).length === 0) await merchantSave()
        else setFormErrors(errors);
    };

    return (
        <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
            {/* Main Fields */}
            <Grid
                // mb='20px'
                gridTemplateColumns={{xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr"}}
                gap={{base: "20px", xl: "20px"}}
                display={{base: "block", xl: "grid"}}>
                <Flex
                    flexDirection='column'
                    gridArea={{xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 2"}}>
                    <Card px='0px'>
                        <TableTopCreators
                            onOpen={onOpen}
                            tableData={tableDataTopCreators}
                            columnsData={tableColumnsTopCreators}
                        />
                    </Card>
                </Flex>
            </Grid>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={() => {
                    onClose()
                    resetValue()
                }}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create merchant</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl isInvalid={!!formErrors.firstName}>
                            <FormLabel>First name</FormLabel>
                            <Input
                                name="firstName"
                                ref={initialRef}
                                placeholder="Enter the firstname"
                                value={formValues.firstName}
                                onChange={handleChange}
                                color={inputTextColor}
                            />
                            {formErrors.firstName && <Text color="red.500" fontSize="sm">{formErrors.firstName}</Text>}
                        </FormControl>
                        <FormControl mt={4} isInvalid={!!formErrors.lastName}>
                            <FormLabel>Last name</FormLabel>
                            <Input
                                name="lastName"
                                placeholder="Enter the lastname"
                                value={formValues.lastName}
                                onChange={handleChange}
                                color={inputTextColor}
                            />
                            {formErrors.lastName && <Text color="red.500" fontSize="sm">{formErrors.lastName}</Text>}
                        </FormControl>
                        <FormControl mt={4} isInvalid={!!formErrors.phone}>
                            <FormLabel>Phone number</FormLabel>
                            <Input
                                name="phone"
                                placeholder="Enter the phone number"
                                value={formValues.phone}
                                onChange={handleChange}
                                color={inputTextColor}
                            />
                            {formErrors.phone && <Text color="red.500" fontSize="sm">{formErrors.phone}</Text>}
                        </FormControl>
                        <FormControl mt={4} isInvalid={!!formErrors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                name="email"
                                placeholder="Enter the email"
                                value={formValues.email}
                                onChange={handleChange}
                                color={inputTextColor}
                            />
                            {formErrors.email && <Text color="red.500" fontSize="sm">{formErrors.email}</Text>}
                        </FormControl>
                        <FormControl mt={4} isInvalid={!!formErrors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                name="password"
                                placeholder="Enter the password"
                                value={formValues.password}
                                onChange={handleChange}
                                color={inputTextColor}
                            />
                            {formErrors.password && <Text color="red.500" fontSize="sm">{formErrors.password}</Text>}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter display={"flex"} gap={"10px"}>
                        <Button colorScheme="red" onClick={() => {
                            onClose()
                            resetValue()
                        }}>Cancel</Button>
                        <Button colorScheme="blue" onClick={handleSave} disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Save'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
