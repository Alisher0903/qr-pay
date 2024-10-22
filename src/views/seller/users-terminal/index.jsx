import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    SimpleGrid,
    Td,
    Text,
    Tr,
    useColorModeValue,
    useDisclosure,
    InputLeftElement,
} from "@chakra-ui/react";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import { globaldeleteFunction, globalGetFunction, globalPostFunction } from "../../../contexts/logic-function/globalFunktion";
import { user_terminal, terminals_api, terminal_get, terminal_get_list, user_terminal_add, user_terminal_delete } from "../../../contexts/api"; // Assuming terminals_api is the endpoint for terminals
import { Pagination } from "antd";
import { useTranslation } from 'react-i18next';
import { MdDeleteForever } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { TerminalStore } from 'contexts/state-management/terminal/terminalStory';

const UserTerminal = () => {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isDelete,
        onOpen: openDelete,
        onClose: closeDelete
    } = useDisclosure();

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const [usersTerminal, setUsersTerminal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalElement, setTotalElements] = useState(0);
    const [page, setPage] = useState(0);
    const [id, setId] = useState("");
    const { terminalData, setTerminalData } = TerminalStore()

    const [formValues, setFormValues] = useState({
        terminalId: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const inputTextColor = useColorModeValue('gray.800', 'white');
    const navbarIcon = useColorModeValue("#1B255A", "white");
    const bgColor = useColorModeValue('#422AFB', '#7551FF');
    const hoverBgColor = useColorModeValue('blue.600', 'purple.600');
    const textColor = useColorModeValue('white', 'white');

    const thead = [
        t('tableTr'),
        t("firstName"),
        t("lastName"),
        t("terminalName"),
        t("phone"),
        t("email"),
        t("inn"),
        t('filial_code'),
        t("actions"),
    ];

    const getFunctionUsersTerm = async () => {
        await globalGetFunction({
            url: user_terminal,
            setData: setUsersTerminal,
            setLoading,
            setTotalElements,
            page
        });
        await globalGetFunction({
            url: terminal_get_list,
            setData: setTerminalData,
            setTotalElements,
            page
        });
    };

    useEffect(() => {
        getFunctionUsersTerm();
    }, []);

    useEffect(() => {
        getFunctionUsersTerm();
    }, [page]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetValue = () => {
        setFormValues({
            terminalId: '',
            firstName: '',
            lastName: '',
            phone: '',
            password: ''
        });
        setFormErrors({});
    };

    const validate = () => {
        const errors = {};
        if (!formValues.terminalId) errors.terminalId = `${t("terminalId")}${t("error")}`;
        if (!formValues.firstName.trim("")) errors.firstName = `${t("firstName")}${t("error")}`;
        if (!formValues.lastName.trim("")) errors.lastName = `${t("lastName")}${t("error")}`;
        if (!formValues.phone.trim("")) {
            errors.phone = `${t("phone")}${t("error")}`;
        } else if (!/^\+?\d*$/.test(formValues.phone) || formValues.phone.length !== 9) {
            errors.phone = t("phoneError");
        }
        if (!formValues.password.trim("")) errors.password = `${t("password")}${t("error")}`;
        else if (formValues.password.length < 5) {
            errors.password = t("passwordErrorHolder");
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        if (validate()) {
            const data = {
                terminalId: parseInt(formValues.terminalId, 10),
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                phone: `+998${formValues.phone}`,
                password: formValues.password
            };

            globalPostFunction({
                url: user_terminal_add,
                postData: data,
                setLoading,
                getFunction: getFunctionUsersTerm
            });
            // Here you can add your API call to save the data
            onClose();
            resetValue();
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
                                onOpen();
                            }}
                        >
                            {t("createUser")}
                        </Button>
                    }
                    name={`${t("terminalUsers")} ${t("table")}`}
                    thead={thead}
                >
                    {loading ? (
                        <Tr>
                            <Td textAlign="center" colSpan={thead.length}>
                                {t("loading")}...
                            </Td>
                        </Tr>
                    ) : usersTerminal ? (
                        usersTerminal.object.map((item, i) => (
                            <Tr key={i}>
                                <Td>{page * 10 + i + 1}</Td>
                                <Td>{item.firstName || '-'}</Td>
                                <Td>{item.lastName || '-'}</Td>
                                <Td>{item.terminalName || '-'}</Td>
                                <Td>{item.phone ? `+998 (${item.phone.slice(4, 6)}) ${item.phone.slice(6, 9)} ${item.phone.slice(9, 11)} ${item.phone.slice(11)}` : '-'}</Td>
                                <Td>{item.email || '-'}</Td>
                                <Td>{item.inn || '-'}</Td>
                                <Td>{item.filialCode || '-'}</Td>
                                <Td>
                                    <Box ms={3}>
                                        <IconButton
                                            icon={<MdDeleteForever size={25} />}
                                            color={navbarIcon}
                                            variant="ghost"
                                            onClick={() => {
                                                setId(item.id)
                                                openDelete();
                                                // You might want to set the selected user for deletion here
                                            }}
                                            aria-label={t("delete")}
                                        />
                                    </Box>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td textAlign="center" colSpan={thead.length}>
                                {t("request")} {t("notFound")}
                            </Td>
                        </Tr>
                    )}
                </ComplexTable>
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    current={page + 1}
                    total={totalElement}
                    onChange={page => setPage(page - 1)}
                />
            </SimpleGrid>

            {/* Create/Edit Modal */}
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
                    <ModalHeader>{t("createUser")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Grid templateColumns='repeat(2, 1fr)' gap={6} px={5}>
                            {/* Terminal Selection */}
                            <FormControl mt={4} isInvalid={!!formErrors.terminalId} isRequired>
                                <FormLabel>{t("terminal")}</FormLabel>
                                <Select
                                    name="terminalId"
                                    //   placeholder={t("selectTerminal")}
                                    //   _placeholder={"thh"}
                                    value={formValues.terminalId}
                                    onChange={handleChange}
                                    ref={initialRef}
                                    color={inputTextColor}
                                >
                                    <option selected disabled value={""}>
                                        {t("selectTerminal")}
                                    </option>
                                    {terminalData && terminalData.length > 0 ? (
                                        terminalData?.map(term => (
                                            <option key={term.id} value={term.id}>
                                                {term.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>{t("terminal")}{t("notFound")}</option>
                                    )}
                                </Select>
                                {formErrors.terminalId && (
                                    <Text color="red.500" fontSize="sm">{formErrors.terminalId}</Text>
                                )}
                            </FormControl>

                            {/* First Name */}
                            <FormControl mt={4} isInvalid={!!formErrors.firstName} isRequired>
                                <FormLabel>{t("firstName")}</FormLabel>
                                <Input
                                    name="firstName"
                                    placeholder={t("enterYourFirstName")}
                                    value={formValues.firstName}
                                    onChange={handleChange}
                                    color={inputTextColor}
                                />
                                {formErrors.firstName && (
                                    <Text color="red.500" fontSize="sm">{formErrors.firstName}</Text>
                                )}
                            </FormControl>

                            {/* Last Name */}
                            <FormControl mt={4} isInvalid={!!formErrors.lastName} isRequired>
                                <FormLabel>{t("lastName")}</FormLabel>
                                <Input
                                    name="lastName"
                                    placeholder={t("enterYourLastName")}
                                    value={formValues.lastName}
                                    onChange={handleChange}
                                    color={inputTextColor}
                                />
                                {formErrors.lastName && (
                                    <Text color="red.500" fontSize="sm">{formErrors.lastName}</Text>
                                )}
                            </FormControl>

                            {/* Phone */}
                            <FormControl mt={4} isInvalid={!!formErrors.phone} isRequired>
                                <FormLabel>{t("phone")}</FormLabel>
                                <InputGroup>
                                    <InputLeftElement>
                                        <Text fontSize='sm' fontWeight='500'>+998</Text>
                                    </InputLeftElement>
                                    <Input
                                        name="phone"
                                        placeholder={t("enterYourPhoneNumber")}
                                        value={formValues.phone}
                                        onChange={handleChange}
                                        color={inputTextColor}
                                        type="tel"
                                    />
                                </InputGroup>
                                {formErrors.phone && (
                                    <Text color="red.500" fontSize="sm">{formErrors.phone}</Text>
                                )}
                            </FormControl>

                            {/* Password */}
                            <FormControl mt={4} isInvalid={!!formErrors.password} isRequired>
                                <FormLabel>{t("password")}</FormLabel>
                                <InputGroup>
                                    <Input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder={t("enterYourPassword")}
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
                                            aria-label={t("togglePasswordVisibility")}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                {formErrors.password && (
                                    <Text color="red.500" fontSize="sm">{formErrors.password}</Text>
                                )}
                            </FormControl>
                        </Grid>
                    </ModalBody>
                    <ModalFooter display={"flex"} gap={"10px"}>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                onClose();
                                resetValue();
                            }}
                        >
                            {t("cancel")}
                        </Button>
                        <Button colorScheme="blue" onClick={handleSave}>
                            {t("save")}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isDelete}
                onClose={() => {
                    closeDelete();
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t("createTerminalUser")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        Siz haqiqatdan ham bu terminal foydalanuvchisini o'chirasizmi?
                    </ModalBody>
                    <ModalFooter display={"flex"} gap={"10px"}>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                closeDelete();
                            }}
                        >
                            {t("close")}
                        </Button>
                        <Button colorScheme="blue" onClick={() => {
                            globaldeleteFunction({
                                url: `${user_terminal_delete}?userId=${id}`,
                                setLoading,
                                getFunction: getFunctionUsersTerm
                            })
                            closeDelete()
                        }}>
                            {t("continue")}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* Delete Confirmation Modal */}
            {/* You can implement the delete confirmation modal similarly */}
        </Box>
    );
};

export default UserTerminal;
