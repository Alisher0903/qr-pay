import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Td,
    Tr,
    useDisclosure,
    useColorModeValue,
    Text,
    Switch,
    InputGroup,
    InputRightElement,
    IconButton,
    Grid,
    Flex
} from "@chakra-ui/react";
import {Pagination} from "antd";
import {terminal_create, terminal_update, terminal_isActive, terminal_get} from "contexts/api";
import {globalPostFunction, globalPutFunction, globalGetFunction} from "contexts/logic-function/globalFunktion";
import {TerminalStore} from "contexts/state-management/terminal/terminalStory";
import {setConfig} from "contexts/token";
import React, {useEffect, useState} from "react";
import {FaEdit, FaEye, FaEyeSlash, FaMinus, FaPlus} from "react-icons/fa";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";

export default function SellerTerminal() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {
        setTerminalData, terminalData, isEdit, setIsEdit, setPage,
        totalPage,
        page,
        setTotalPages,
    } = TerminalStore();
    const [createLoading, setCreateLoading] = useState(false);
    const [detailData, setdetailData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    // Setting input text color based on color mode
    const inputTextColor = useColorModeValue('gray.800', 'white');
    const navbarIcon = useColorModeValue("#1B255A", "white");
    const bgColor = useColorModeValue('#422AFB', '#7551FF');
    const textColor = useColorModeValue('white', 'white');
    const hoverBgColor = useColorModeValue('blue.600', 'purple.600');

    useEffect(() => {
        setConfig()
        getFunction()
    }, [])

    useEffect(() => {
        globalGetFunction({
            url: `${terminal_get}`,
            setLoading: setCreateLoading,
            setData: setTerminalData,
            setTotalElements: setTotalPages,
            page: page,
        });
    }, [page])

    const getFunction = () => {
        globalGetFunction({
            url: `${terminal_get}`,
            setLoading: setCreateLoading,
            setData: setTerminalData,
            setTotalElements: setTotalPages
        });
    }

    const initialValue = {
        name: "",
        account: "",
        filialCode: "",
        inn: "",
        password: "",
        phone: "",
        phones: ['']
    }

    // State to manage form values and validation
    const [formValues, setFormValues] = useState(initialValue);

    const [formErrors, setFormErrors] = useState(initialValue);

    const resetValue = () => {
        setFormValues(initialValue);
        setFormErrors(initialValue);
    };

    const handleChange = (e, index) => {
        const {name, value} = e.target;
        if (isEdit && name === "phones") {
            const updatedPhones = [...formValues.phones];
            updatedPhones[index] = value;
            setFormValues({...formValues, phones: updatedPhones});

            // Simple validation example for phone numbers
            const errors = {};
            updatedPhones.forEach((phone) => {
                if (!/^\+?\d*$/.test(phone) || phone.length !== 13) {
                    errors.phones = [...(errors.phones || []), "Phone number must be exactly 13 characters long and only contain numbers."];
                }
            });
            setFormErrors({...formErrors, ...errors});
        } else {
            // Handle changes for other inputs
            setFormValues({...formValues, [name]: value});

            // Simple validation example
            const errors = {};
            if (!isEdit && name === "phone" && (!/^\+?\d*$/.test(value) || value.length !== 13)) {
                errors.phone = "Phone number must be exactly 13 characters long and only contain numbers.";
            } else if (!isEdit && name === "password" && value.length < 4) {
                errors.password = "Password must be at least 4 characters long.";
            } else if (value.trim() === '') {
                errors[name] = `${name} is required`;
            }
            setFormErrors({...formErrors, ...errors});
        }
    };


    const itemRender = (_, type, originalElement) => {
        if (type === 'page') {
            return (
                <a
                    className="shadow-none dark:bg-[#9c0a36] dark:text-white border dark:border-[#9c0a36] border-black rounded no-underline">
                    {originalElement}
                </a>
            );
        }
        return originalElement;
    };

    const onChange = (page) => setPage(page - 1);

    const handleAddPhone = () => {
        setFormValues((prev) => ({
            ...prev,
            phones: [...prev.phones, ""]
        }));
        setFormErrors((prev) => ({
            ...prev,
            phones: [...(prev.phones || []), ""]
        }));
    };

    const handleRemovePhone = (index) => {
        const updatedPhones = formValues.phones.filter((_, i) => i !== index);
        setFormValues({...formValues, phones: updatedPhones});
        const updatedErrors = (formErrors.phones || []).filter((_, i) => i !== index);
        setFormErrors({...formErrors, phones: updatedErrors});
    };


    const handleSave = () => {
        const errors = {};
        if (isEdit === true) {
            Object.keys(formValues).filter((item) => item !== "password" || item !== "phone"
            ).forEach(key => {
                if (key === "phones") {
                    formValues.phones.forEach((phone) => {
                        if (!/^\+?\d*$/.test(phone) || phone.length !== 13) {
                            errors.phones = [...(errors.phones || []), "Phone number must be exactly 13 characters long and only contain numbers."];
                        }
                    });
                } else if (formValues[key].trim() === '') {
                    errors[key] = `${key} is required`;
                }
            });

            if (Object.keys(errors).length === 0 || Object.keys(errors).filter((item) => item === "password")) {
                globalPutFunction({
                    url: `${terminal_update}${detailData && detailData.id ? detailData.id : 0}`, putData: {
                        name: formValues.name,
                        account: formValues.account,
                        filialCode: formValues.filialCode,
                        inn: formValues.inn,
                        phones: formValues.phones
                    }, setLoading: setCreateLoading, getFunction: getFunction
                })
                onClose();
                resetValue();
            } else {
                setFormErrors(errors);
            }
        } else {
            Object.keys(formValues).filter((item) => item !== "phones"
            ).forEach(key => {
                if (key === "phone" && (!/^\+?\d*$/.test(formValues[key]) || formValues[key].length !== 13)) {
                    errors.phone = "Phone number must be exactly 13 characters long and only contain numbers.";
                } else if (key === "password" && formValues[key].length < 4) {
                    errors.password = "Password must be at least 4 characters long.";
                } else if (formValues[key].trim() === '') {
                    errors[key] = `${key} is required`;
                }
            });
            if (Object.keys(errors).length === 0) {
                globalPostFunction({
                    url: `${terminal_create}`, postData: {
                        name: formValues.name,
                        account: formValues.account,
                        filialCode: formValues.filialCode,
                        inn: formValues.inn,
                        phone: formValues.phone,
                        password: formValues.password
                    }, setLoading: setCreateLoading, getFunction: getFunction
                })
                onClose();
                resetValue();
            } else {
                setFormErrors(errors);
            }
        }
    }

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid
                mb="20px"
                columns={{sm: 1}}
                spacing={{base: "20px", xl: "20px"}}
            >
                <ComplexTable
                    name="Terminal"
                    buttonChild={
                        <Button
                            bg={bgColor}
                            color={textColor}
                            _hover={{bg: hoverBgColor}}
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
                    {Array.isArray(terminalData.object) && terminalData.object.length > 0 ? terminalData.object.map((item, i) =>
                                <Tr key={i}>
                                    <Td>{item.name}</Td>
                                    <Td>{item.inn}</Td>
                                    <Td>{item.account}</Td>
                                    <Td>{item.user.phone}</Td>
                                    <Td>{item.filial_code}</Td>
                                    <Td>
                                        <Box ms={3}>
                                            <button onClick={() => {
                                                setFormValues({
                                                    name: item.name,
                                                    account: item.account,
                                                    filialCode: item.filial_code,
                                                    inn: item.inn,
                                                    password: '',
                                                    phone: item.user.phone,
                                                    phones: item.phones
                                                })
                                                setdetailData(item)
                                                setIsEdit(true)
                                                onOpen()
                                            }}>
                                                <FaEdit color={navbarIcon} size={23}/>
                                            </button>
                                        </Box>
                                    </Td>
                                    <Td>
                                        <Box disabled={item.status !== 0} onClick={() => {
                                            globalPostFunction({
                                                url: `${terminal_isActive}${item.id}`,
                                                data: {},
                                                setLoading: setCreateLoading,
                                                getFunction: getFunction
                                            })
                                        }}>
                                            <Switch disabled={item.status !== 0} isChecked={item.status === 0}
                                                    colorScheme='teal' size='lg'/>
                                        </Box>
                                    </Td>
                                </Tr>
                            ) :
                            <Tr>
                                <Td textAlign={"center"} colSpan={7}>Terminal not found</Td>
                            </Tr>
                    }
                </ComplexTable>
                {
                    Array.isArray(terminalData.object) && terminalData.object.length > 0 &&
                    <Pagination
                        showSizeChanger={false}
                        responsive={true}
                        defaultCurrent={1}
                        total={totalPage}
                        onChange={onChange}
                        rootClassName={`mt-10 mb-5 ms-5`}
                        itemRender={itemRender}
                    />
                }
            </SimpleGrid>
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
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create terminal</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Grid templateColumns='repeat(2, 1fr)' gap={6} px={5}>

                            <FormControl mt={4} isInvalid={!!formErrors.name}>
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
                                {formErrors.filialCode &&
                                    <Text color="red.500" fontSize="sm">{formErrors.filialCode}</Text>}
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
                            {
                                isEdit ?
                                    <FormControl mt={4} isInvalid={formErrors.phones && formErrors.phones.length > 0}>
                                        <Flex justifyContent={"space-between"} alignItems={"center"}>
                                            <FormLabel>Phone Numbers</FormLabel>
                                            {formValues.phones.length < 5 && (
                                                <Button mt={2} onClick={handleAddPhone} p={0} mb={4} bg={"transparent"}>
                                                    <FaPlus/>
                                                </Button>
                                            )}
                                        </Flex>
                                        {formValues.phones.length > 0 && formValues.phones.map((phone, index) => (
                                            <InputGroup key={index} mb={3}>
                                                <Input
                                                    placeholder={`Phone number ${index + 1}`}
                                                    name="phones"
                                                    value={phone}
                                                    onChange={(e) => handleChange(e, index)}
                                                    color={inputTextColor}
                                                />
                                                {index > 0 && (
                                                    <InputRightElement>
                                                        <IconButton
                                                            size="sm"
                                                            onClick={() => handleRemovePhone(index)}
                                                            icon={<FaMinus/>}
                                                        />
                                                    </InputRightElement>
                                                )}
                                            </InputGroup>
                                        ))}
                                        {formErrors.phones && formErrors.phones.length > 0 &&
                                            <Text color="red.500">Phone number must be exactly 13 characters long and
                                                only contain numbers.</Text>}

                                    </FormControl>
                                    :
                                    <FormControl mt={4} isInvalid={!!formErrors.phone}>
                                        <FormLabel>Phone number</FormLabel>
                                        <Input
                                            name="phone"
                                            placeholder="Enter the terminal phone number"
                                            value={formValues.phone}
                                            onChange={handleChange}
                                            color={inputTextColor}
                                        />
                                        {formErrors.phone &&
                                            <Text color="red.500" fontSize="sm">{formErrors.phone}</Text>}
                                    </FormControl>
                            }
                            {
                                !isEdit &&
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
                                                icon={showPassword ? <FaEyeSlash/> : <FaEye/>}
                                                onClick={() => setShowPassword(!showPassword)}
                                                variant="ghost"
                                                size="sm"
                                                aria-label="Toggle Password Visibility"
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    {formErrors.password &&
                                        <Text color="red.500" fontSize="sm">{formErrors.password}</Text>}
                                </FormControl>
                            }
                        </Grid>
                    </ModalBody>
                    <ModalFooter display={"flex"} gap={"10px"}>
                        <Button
                            colorScheme="red" onClick={() => {
                            onClose();
                            resetValue();
                        }}>Cancel</Button>
                        <Button colorScheme="blue" onClick={handleSave}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
