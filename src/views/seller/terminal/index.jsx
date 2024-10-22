import {
    Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, SimpleGrid, Td, Tr, useDisclosure, useColorModeValue, Text, Switch, InputGroup,
    InputRightElement, IconButton, Grid, Flex,
    InputLeftElement,
    GridItem
} from "@chakra-ui/react";
import {debounce} from 'lodash';
import {Pagination} from "antd";
import {terminal_create, terminal_update, terminal_isActive, terminal_get} from "contexts/api";
import {globalPostFunction, globalPutFunction, globalGetFunction} from "contexts/logic-function/globalFunktion";
import {TerminalStore} from "contexts/state-management/terminal/terminalStory";
import {setConfig} from "contexts/token";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {FaEdit, FaEye, FaEyeSlash, FaMinus, FaPlus} from "react-icons/fa";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";

export default function SellerTerminal() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {t} = useTranslation()
    const {
        setTerminalData, terminalData, isEdit, setIsEdit, setPage,
        totalPage,
        page,
        setTotalPages,
    } = TerminalStore();
    const [createLoading, setCreateLoading] = useState(false);
    const [detailData, setdetailData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [terminalSerialCodeInitial, setTerminalSerialCodeInitial] = useState(null);
    const [terminalSerialCode, setTerminalSerialCode] = useState(null);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const role = sessionStorage.getItem('ROLE')

    const inputTextColor = useColorModeValue('gray.800', 'white');
    const navbarIcon = useColorModeValue("#1B255A", "white");
    const bgColor = useColorModeValue('#422AFB', '#7551FF');
    const textColor = useColorModeValue('white', 'white');
    const hoverBgColor = useColorModeValue('blue.600', 'purple.600');
    const thead = [t('tableTr'), t("name"), t("inn"), t("account"),"Serial code", t("phone"), t("filial_code"), t("update"), t("active")]

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
        // phones: ['']
    }

    // const terminalNewUsersInitial = {
    //     phone: '',
    //     password: ''
    // }

    const [formValues, setFormValues] = useState(initialValue);
    // const [terminalNewUsers, setTerminalNewUsers] = useState([terminalNewUsersInitial]);

    const [formErrors, setFormErrors] = useState(initialValue);

    // const isEmptyNewUsers = terminalNewUsers?.every(
    //     (user) => !user.phone && !user.password
    //   );

    const resetValue = () => {
        setFormValues(initialValue);
        setFormErrors(initialValue);
        // setTerminalNewUsers([terminalNewUsersInitial])
        setTerminalSerialCodeInitial(null)
        setTerminalSerialCode(null)
    };

    const handleChange = (e, index) => {
        const {name, value} = e.target;
        // if (isEdit && name === "phones") {
            // const updatedPhones = [...formValues.phones];
            // updatedPhones[index] = value;
            // setFormValues({...formValues, phones: updatedPhones});

            // const errors = {};
            // updatedPhones.forEach((phone) => {
            //     if (!/^\+?\d*$/.test(phone) || phone.length !== 9) {
            //         errors.phones = [...(errors.phones || []), t("phoneError")];
            //     } else errors.phones = [""]
            // });
            // setFormErrors({...formErrors, ...errors});
        // } else {
            setFormValues({...formValues, [name]: value});

            const errors = {};
            if (!isEdit && name === "phone" && (!/^\+?\d*$/.test(value) || value.length !== 9)) {
                errors.phone = t("phoneError");
            } else if (!isEdit && name === "password" && value.length < 4) errors.password = t("passwordError");
            else if (value.trim() === '') errors[name] = `${t(name)}${t("error")}`;
            else errors[name] = ""
            setFormErrors({...formErrors, ...errors});
        // }
    };

    const onChange = (page) => setPage(page - 1);

    const debouncedPostFunction = debounce((item) => {
        globalPostFunction({
            url: `${terminal_isActive}${item.id}`,
            data: {},
            setLoading: setCreateLoading,
            getFunction: getFunction
        });
    }, 300);


    const handleSave = () => {
        const errors = {};
        if (isEdit === true) {
            // Object.keys(formValues).filter((item) => item !== "password" || item !== "phone"
            // ).forEach(key => {
                // if (key === "phones") {
                    // formValues.phones.forEach((phone) => {
                    //     if (!/^\+?\d*$/.test(phone) || phone.length !== 49) {
                    //         errors.phones = [...(errors.phones || []), t("phoneError")];
                    //     }
                    // });
                // } else if (formValues[key].trim() === '') errors[key] = `${t(key)}${t("error")}`;
            // });

            if (Object.keys(errors).length === 0 || Object.keys(errors).filter((item) => item === "password")) {
                globalPutFunction({
                    url: `${terminal_update}${detailData && detailData.id ? detailData.id : 0}`, putData: {
                        name: formValues?.name,
                        account: formValues?.account,
                        filialCode: formValues?.filialCode,
                        inn: formValues?.inn,
                        terminalSerialCode: checkValueSerialCode(),
                        // terminalNewUsers: isEmptyNewUsers ? null : terminalNewUsers.map((item) => ({
                        //     phone: `+998${item.phone}`,
                        //     password: item.password
                        // })),
                    }, setLoading: setCreateLoading, getFunction: getFunction
                })
                onClose();
                resetValue();
            } else setFormErrors(errors);
        } else {
            Object.keys(formValues).filter((item) => item !== "phones"
            ).forEach(key => {
                if (key === "phone" && (!/^\+?\d*$/.test(formValues[key]) || formValues[key].length !== 9)) {
                    errors.phone = t("phoneError");
                } else if (key === "password" && formValues[key].length < 4) errors.password = t("passwordError");
                else if (formValues[key].trim() === '') errors[key] = `${t(key)}${t("error")}`;
            });
            if (Object.keys(errors).length === 0) {
                globalPostFunction({
                    url: `${terminal_create}`, postData: {
                        name: formValues?.name,
                        account: formValues?.account,
                        filialCode: formValues?.filialCode,
                        inn: formValues?.inn,
                        phone: `+998${formValues?.phone}`,
                        password: formValues?.password,
                        terminalSerialCode: terminalSerialCode ? terminalSerialCode : null
                    }, setLoading: setCreateLoading, getFunction: getFunction
                })
                onClose();
                resetValue();
            } else setFormErrors(errors);
        }
    }

    const checkValueSerialCode = () => {
        if (terminalSerialCodeInitial && terminalSerialCode) return terminalSerialCode
        else if (terminalSerialCodeInitial && !terminalSerialCode) return terminalSerialCodeInitial
        else if (!terminalSerialCodeInitial && !terminalSerialCode) return null
    }

    // const handleAddPhoneNumber = () => {
    //     setTerminalNewUsers([...terminalNewUsers, {...terminalNewUsersInitial}]);
    // };

    // Function to handle removing a phone/password field
    // const handleRemovePhoneNumber = (index) => {
    //     const updatedList = terminalNewUsers.filter((_, i) => i !== index);
    //     setTerminalNewUsers(updatedList);
    // };

    // Function to handle changes in phone field
    // const handleList = (name, value, index) => {
    //     const updatedUsers = [...terminalNewUsers];
    //     updatedUsers[index][name] = value;
    //     setTerminalNewUsers(updatedUsers);
    // };

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid
                mb="20px"
                columns={{sm: 1}}
                spacing={{base: "20px", xl: "20px"}}
            >
                <ComplexTable
                    name={`${t("terminal")} ${t("table")}`}
                    buttonChild={role === 'ROLE_SUPER_ADMIN' ? <Button
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
                        }}>
                        {t("createTerminal")}
                    </Button> : <></>
                    }
                    thead={thead}
                >
                    {createLoading ? <Tr>
                            <Td textAlign="center" colSpan={thead.length}>{t("loading")}...</Td>
                        </Tr> :
                        terminalData && terminalData?.object ?
                            terminalData?.object.map((item, i) =>
                                <Tr key={i}>
                                    <Td>{(page * 10) + i + 1}</Td>
                                    <Td>{item?.name ? item?.name : "-"}</Td>
                                    <Td>{item?.inn ? item?.inn : "-"}</Td>
                                    <Td>{item?.account ? item?.account : "-"}</Td>
                                    <Td>{item?.terminalSerialCode ? item?.terminalSerialCode : "-"}</Td>
                                    <Td width={'350px'}>{item?.user?.phone ? `+998 (${item?.user?.phone.slice(4, 6)}) ${item?.user?.phone.slice(6, 9)} ${item?.user?.phone.slice(9, 11)} ${item?.user?.phone.slice(11)}` : '-'}</Td>
                                    <Td>{item?.filial_code ? item?.filial_code : "-"}</Td>
                                    <Td>
                                        <Box ms={3}>
                                            <button onClick={() => {
                                                setFormValues({
                                                    name: item?.name,
                                                    account: item?.account,
                                                    filialCode: item?.filial_code,
                                                    inn: item?.inn,
                                                    password: '',
                                                    phone: item?.user?.phone,
                                                    phones: item?.phones
                                                })
                                                setTerminalSerialCode(item.terminalSerialCode)
                                                setTerminalSerialCodeInitial(item.terminalSerialCode)
                                                setdetailData(item)
                                                setIsEdit(true)
                                                onOpen()
                                            }}>
                                                <FaEdit color={navbarIcon} size={23}/>
                                            </button>
                                        </Box>
                                    </Td>
                                    <Td>
                                        <Box onClick={() => {
                                            if (item.status === 0) {
                                                debouncedPostFunction(item);
                                            }
                                        }}>
                                            <Switch
                                                disabled={item.status !== 0}
                                                isChecked={item.status === 0}
                                                colorScheme='teal' size='lg'
                                            />
                                        </Box>
                                    </Td>
                                </Tr>
                            ) :
                            <Tr>
                                <Td textAlign={"center"} colSpan={thead.length}>{t("terminal")} {t("notFound")}</Td>
                            </Tr>
                    }
                </ComplexTable>
                {/*{Array.isArray(terminalData.object) && terminalData.object.length > 0 &&*/}
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    defaultCurrent={1}
                    total={totalPage}
                    onChange={onChange}
                />
                {/*}*/}
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
                    <ModalHeader>{isEdit ? t('editTerminal') : t("createTerminal")}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Grid templateColumns='repeat(2, 1fr)' gap={6} px={5}>
                            <FormControl mt={4} isInvalid={!!formErrors.name}>
                                <FormLabel>{t("name")}</FormLabel>
                                <Input
                                    name="name"
                                    ref={initialRef}
                                    placeholder={t("enterTheTermenalName")}
                                    value={formValues.name}
                                    onChange={handleChange}
                                    color={inputTextColor}
                                />
                                {formErrors.name && <Text color="red.500" fontSize="sm">{formErrors.name}</Text>}
                            </FormControl>
                            <FormControl mt={4} isInvalid={!!formErrors.account}>
                                <FormLabel>{t("account")}</FormLabel>
                                <Input
                                    name="account"
                                    placeholder={t("enterTheTermenalAccount")}
                                    value={formValues.account}
                                    onChange={handleChange}
                                    color={inputTextColor}
                                />
                                {formErrors.account && <Text color="red.500" fontSize="sm">{formErrors.account}</Text>}
                            </FormControl>
                            <FormControl mt={4} isInvalid={!!formErrors.filialCode}>
                                <FormLabel>{t("filial_code")}</FormLabel>
                                <Input
                                    name="filialCode"
                                    placeholder={t("enterTheTermenalFilialCode")}
                                    value={formValues.filialCode}
                                    onChange={handleChange}
                                    color={inputTextColor}
                                />
                                {formErrors.filialCode &&
                                    <Text color="red.500" fontSize="sm">{formErrors.filialCode}</Text>}
                            </FormControl>
                            <FormControl mt={4} isInvalid={!!formErrors.inn}>
                                <FormLabel>{t("inn")}</FormLabel>
                                <Input
                                    name="inn"
                                    placeholder={t("enterTheTermenalInn")}
                                    value={formValues.inn}
                                    onChange={handleChange}
                                    color={inputTextColor}
                                />
                                {formErrors.inn && <Text color="red.500" fontSize="sm">{formErrors.inn}</Text>}
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>{t("terminalSerialCode")} ({t('optional')})</FormLabel>
                                <Input
                                    name="terminalSerialCode"
                                    placeholder={t("terminalSerialCode")}
                                    value={terminalSerialCode}
                                    onChange={e => setTerminalSerialCode(e.target.value)}
                                    color={inputTextColor}
                                />
                            </FormControl>
                            {
                            // isEdit ?
                            //     <GridItem colSpan={2}>
                            //         <FormControl mt={4}>
                            //             <Flex justifyContent={"space-between"} alignItems={"center"}>
                            //                 <FormLabel>{t('phone')}</FormLabel>
                            //                 <Button mt={2} onClick={handleAddPhoneNumber} p={0} mb={4}
                            //                         bg={"transparent"}>
                            //                     <FaPlus/>
                            //                 </Button>
                            //             </Flex>
                            //             {terminalNewUsers && terminalNewUsers.map((user, index) => (
                            //                 <InputGroup gap={5} key={index} mb={3}>
                            //                     <InputLeftElement>
                            //                         <Text mx={4}>+998</Text>
                            //                     </InputLeftElement>
                            //                     <Input
                            //                         placeholder={`${t('phone')} ${index + 1}`}
                            //                         name="phones"
                            //                         value={user.phone}
                            //                         onChange={(e) => handleList('phone', e.target.value, index)}
                            //                         color={inputTextColor}
                            //                         type={`number`}
                            //                     />
                            //                     <Input
                            //                         placeholder={`${t('password')} ${index + 1}`}
                            //                         name="password"
                            //                         value={user.password}
                            //                         onChange={(e) => handleList('password', e.target.value, index)}
                            //                         color={inputTextColor}
                            //                     />
                            //                     {index > 0 && (
                            //                         <InputRightElement>
                            //                             <IconButton
                            //                                 size="sm"
                            //                                 onClick={() => handleRemovePhoneNumber(index)}
                            //                                 icon={<FaMinus/>}
                            //                                 aria-label="Remove"
                            //                             />
                            //                         </InputRightElement>
                            //                     )}
                            //                 </InputGroup>
                            //             ))}
                            //         </FormControl>
                            //     </GridItem>
                            //     :
                            !isEdit &&
                                <FormControl mt={4} isInvalid={!!formErrors.phone}>
                                    <FormLabel>{t("phone")}</FormLabel>
                                    <InputGroup display={"flex"} alignItems={"center"}>
                                        <InputLeftElement>
                                            <Text
                                                fontSize='sm'
                                                fontWeight='500'>+998</Text>
                                        </InputLeftElement>
                                        <Input
                                            name="phone"
                                            placeholder={t("enterTheTermenalPhoneNumber")}
                                            value={formValues.phone}
                                            onChange={handleChange}
                                            color={inputTextColor}
                                        />
                                    </InputGroup>

                                    {formErrors.phone &&
                                        <Text color="red.500" fontSize="sm">{formErrors.phone}</Text>}
                                </FormControl>
                            }
                            {
                                !isEdit &&
                                <FormControl mt={4} isInvalid={!!formErrors.password}>
                                    <FormLabel>{t("password")}</FormLabel>
                                    <InputGroup>
                                        <Input
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder={t("enterTheTermenalPassword")}
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
                        }}>{t("cancel")}</Button>
                        <Button colorScheme="blue" onClick={handleSave}>
                            {t("save")}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
