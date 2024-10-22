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
    Grid,
    Flex,
    GridItem
} from "@chakra-ui/react";
import {Pagination, Popover} from "antd";
import {seller_order_get} from "contexts/api";
import {admin_notification_count} from "contexts/api";
import {order_cancel} from "contexts/api";
import {terminal_order_get} from "contexts/api";
import {admin_order_get} from "contexts/api";
import {seller_notification_count} from "contexts/api";
import {terminal_notification_count} from "contexts/api";
import {order_create} from "contexts/api";
import {globalPostFunction} from "contexts/logic-function/globalFunktion";
import {globalGetFunction} from "contexts/logic-function/globalFunktion";
import {NotificationStore} from "contexts/state-management/notification/notificationStore";
import {PaymentStore} from "contexts/state-management/payment/paymentStore";
import {setConfig} from "contexts/token";
import {QRCodeSVG} from "qrcode.react";
import React, {useEffect, useState} from "react";
import {FaEye} from "react-icons/fa";
import {RiRefund2Line} from "react-icons/ri";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import moment from "moment";
import {useTranslation} from "react-i18next";
import { order_get_by_id } from "contexts/api";

export default function SellerOrder() {
    const {
        setPaymentData, paymentData, setPage,
        totalPage,
        page,
        setTotalPages,
        modalOpen
    } = PaymentStore();
    const {t} = useTranslation()
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {isOpen: isCancelModal, onOpen: openCancelModal, onClose: closeCancelModal} = useDisclosure();
    const {setCountData, setLoading} = NotificationStore()
    const [detailData, setDetailData] = useState({})
    const [postData, setPostData] = useState(null)
    const [createLoading, setCreateLoading] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    // Setting input text color based on color mode
    const role = sessionStorage.getItem("ROLE");
    const inputTextColor = useColorModeValue('gray.800', 'white');
    const bgColor = useColorModeValue('#422AFB', '#7551FF');
    const textColor = useColorModeValue('white', 'white');
    const navbarIcon = useColorModeValue("#1B255A", "white");
    const hoverBgColor = useColorModeValue('blue.600', 'purple.600');
    const thead = [t('tableTr'), t("partner"), t("extId"), t("purpose"), t("chequeAmount"), t("rate"), t("date"), t("action"), t("refund"), t("status"),]

    useEffect(() => {
        setConfig()
        getFunction()
        
    }, [])

    useEffect(() => {
        if (modalOpen) {
            openModal()
        }
    }, [modalOpen])

    const openModal = async () => {
        await setIsCreate(true)
        await onOpen()
    }

    console.log("isCreate eeeeeeeeeeeeeeeeeeeeeeeeeee",isCreate);
    



    useEffect(() => {
        globalGetFunction({
            url: role === "ROLE_TERMINAL" ? terminal_order_get : role === "ROLE_SELLER" ? seller_order_get : role === "ROLE_SUPER_ADMIN" ? admin_order_get : "",
            setLoading: setCreateLoading,
            setData: setPaymentData,
            setTotalElements: setTotalPages,
            page: page,
        });
    }, [page])

    useEffect(() => {
        if (postData) {
            globalGetFunction({
                url: `${order_get_by_id}${postData.id}`,
                setData: setDetailData
            })
            setIsCreate(false)
            resetValue();
        }
    }, [postData])

    const getFunction = () => {
        globalGetFunction({
            url: role === "ROLE_TERMINAL" ? terminal_order_get : role === "ROLE_SELLER" ? seller_order_get : role === "ROLE_SUPER_ADMIN" ? admin_order_get : "",
            setLoading: setCreateLoading,
            setData: setPaymentData,
            setTotalElements: setTotalPages
        });
        globalGetFunction({
            url: role === "ROLE_TERMINAL" ? terminal_notification_count : role === "ROLE_SELLER" ? seller_notification_count : role === "ROLE_SUPER_ADMIN" ? admin_notification_count : "",
            setData: setCountData
        })
    }

    // State to manage form values and validation
    const [formValues, setFormValues] = useState({
        amount: "",
    });

    const [formErrors, setFormErrors] = useState({
        amount: "",
    });

    const resetValue = () => {
        setFormValues({
            amount: "",
        });
        setFormErrors({
            amount: "",
        });
    };

    const onChange = (page) => setPage(page - 1)

    const bgGenerator = (status) => {
        if (status === 'WAIT') return ['orange', t("wait")];
        else if (status === 'COMPLETED') return ['green', t("confirmed")];
        else if (status === 'CANCEL') return ['red', t("canceled")];
        else return ['gray', t("unknown")]; // Default case
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
        const errors = {};
        if (value.trim() === '') {
            errors[name] = `${t(name)}${t("error")}`;
        } else {
            errors[name] = ""
        }
        setFormErrors({...formErrors, ...errors});
        // Simple validation example
    };

    const handleSave = () => {
        const errors = {};
        Object.keys(formValues).forEach(key => {
            if (formValues[key].trim() === '') {
                errors[key] = `${t(key)}${t("error")}`;
            }
        });
        if (Object.keys(errors).length === 0) {
            globalPostFunction({
                url: `${order_create}`, postData: {
                    amount: +formValues.amount
                }, setLoading: setCreateLoading, getFunction: getFunction,
                setData: setPostData
            })
            
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid
                mb="20px"
                columns={{sm: 1}}
                spacing={{base: "20px", xl: "20px"}}
            >
                <ComplexTable
                    name={`${t("payment")} ${t("table")}`}
                    buttonChild={
                        role !== "ROLE_SUPER_ADMIN" && <Button
                            bg={bgColor}
                            color={textColor}
                            _hover={{bg: hoverBgColor}}
                            _active={{
                                bg: hoverBgColor,
                                transform: "scale(0.98)",
                            }}
                            onClick={() => {
                                setIsCreate(true)
                                onOpen()
                            }}>{t("createPayment")}</Button>}
                    thead={thead}
                >
                    {createLoading ? <Tr>
                        <Td textAlign="center" colSpan={thead.length}>{t("loading")}...</Td>
                    </Tr> : 
                    (paymentData && paymentData?.object) ?
                        paymentData.object.map((item, i) =>
                            <Tr key={i}>
                                <Td>{(page * 10) + i + 1}</Td>
                                <Td>{item.partner ? item.partner : "-"}</Td>
                                <Td>{item.ext_id ? item.ext_id : "-"}</Td>
                                <Td>{item.purpose ? item.purpose.length > 25 ? <>
                                    <Popover
                                        title={item.purpose}
                                        overlayStyle={{width: '30%'}}
                                    >
                                        {`${item.purpose.slice(0, 25)}...`}
                                    </Popover>
                                </> : item.purpose : "-"}</Td>
                                {/* <Td>{item.qrAmount ? `${item.qrAmount} RUB` : "-"}</Td> */}
                                <Td>{item.chequeAmount ? `${item.chequeAmount} UZS` : "-"}</Td>
                                <Td>{item.rate ? item.rate : "-"}</Td>
                                <Td>{item.updated_at ? moment(item.updated_at.slice(0, 10)).format('DD.MM.YYYY') : "-"}</Td>
                                <Td>
                                    <Box ms={3}>
                                        <button onClick={() => {
                                            setIsCreate(false)
                                            setDetailData(item)
                                            onOpen()
                                        }}>
                                            <Popover title={t("viewMore")} overlayStyle={{textAlign: 'center'}}>
                                                <FaEye color={navbarIcon} size={23}/>
                                            </Popover>
                                        </button>
                                    </Box>
                                </Td>
                                <Td>
                                    <Box ms={15}>
                                        <button onClick={() => {
                                            setDetailData(item)
                                            openCancelModal()
                                        }}>
                                            <Popover title={t("refund")} overlayStyle={{textAlign: 'center'}}>
                                                <RiRefund2Line color={"red"} size={23}/>
                                            </Popover>
                                        </button>
                                    </Box>
                                </Td>
                                <Td alignSelf="flex-start">
                                        <Text
                                           background={"#ECEFF8"}
                                            color={bgGenerator(item.status)[0]}
                                            py="10px"
                                            fontWeight="700"
                                            borderRadius="10px"
                                            textAlign={'center'}
                                            width={'130px'}
                                        >{item?.status ? bgGenerator(item?.status)[1] : ""}</Text>
                                    </Td>
                            </Tr>
                        ) :
                        <Tr>
                            <Td textAlign={"center"} colSpan={6}>{t("payment")}{t("notFound")}</Td>
                        </Tr>
                    }
                </ComplexTable>
            </SimpleGrid>
            {(paymentData && paymentData?.object) &&
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    defaultCurrent={1}
                    total={totalPage}
                    onChange={onChange}
                />
            }
            <Modal
                size={isCreate ? "lg" : "3xl"}
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
                    <ModalHeader>{isCreate ? t("createPayment") : ""}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        {isCreate ?
                            <>
                                <FormControl mt={4} isInvalid={!!formErrors.amount}>
                                    <FormLabel>{t("amount")}</FormLabel>
                                    <Input
                                        type="number"
                                        name="amount"
                                        placeholder={t("enterTheAmount")}
                                        value={formValues.amount}
                                        onChange={handleChange}
                                        color={inputTextColor}
                                    />
                                    {formErrors.amount &&
                                        <Text color="red.500" fontSize="sm">{formErrors.amount}</Text>}
                                </FormControl>

                            </>
                            :
                            <Grid overflow={"hidden"}
                                  templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}} gap={6} px={5}>
                                <Flex width={"100%"} flexDirection={{base: "column", md: "row"}}
                                      justifyContent={"space-between"} pe={5}>
                                    <Text fontSize={"17px"} fontWeight={"700"}>{t("extId")}: </Text>
                                    <Text
                                        fontSize={"17px"}>{detailData?.ext_id || detailData?.ext_id === 0 ? detailData.ext_id : "-"}</Text>
                                </Flex>
                                
                                <Flex width={"100%"} flexDirection={{base: "column", md: "row"}}
                                      justifyContent={"space-between"} pe={5}>
                                    <Text fontSize={"17px"} fontWeight={"700"}>{t("partner")}: </Text>
                                    <Text
                                        fontSize={"17px"}>{detailData?.partner || detailData?.partner === 0 ? detailData.partner : "-"}</Text>
                                </Flex>
                                {/* <Flex width={"100%"} flexDirection={{base: "column", md: "row"}}
                                      justifyContent={"space-between"} pe={5}>
                                    <Text fontSize={"17px"} fontWeight={"700"}>{t("localQRId")}:</Text>
                                    <Text
                                        fontSize={"17px"}>{detailData.local_qrc_id || detailData.local_qrc_id === 0 ? detailData.local_qrc_id : "-"}</Text>
                                </Flex> */}
                                <GridItem colSpan={{base: 1, md: 2}} display={"flex"}
                                          flexDirection={{base: "column", md: "row"}}
                                          justifyContent={"space-between"} pe={5}>
                                    <Text fontSize={"17px"} fontWeight={"700"}>{t("purpose")}: </Text>
                                    <Text width={"70%"}
                                          fontSize={"17px"}>{detailData?.purpose || detailData?.purpose === 0 ? detailData.purpose : "-"}</Text>
                                </GridItem>
                                {/* <GridItem colSpan={{base: 1, md: 2}} flexDirection={{base: "column", md: "row"}}
                                          display={"flex"} justifyContent={"space-between"} pe={5}>
                                    <Text fontSize={"17px"} fontWeight={"700"}>{t("QRId")}:</Text>
                                    <Text width={'70%'}
                                          fontSize={"17px"}>{detailData.qrc_id || detailData.qrc_id === 0 ? detailData.qrc_id : "-"}</Text>
                                </GridItem> */}
                                <Flex width={"100%"} flexDirection={{base: "column", md: "row"}}
                                      justifyContent={"space-between"} pe={5}>
                                    <Text fontSize={"17px"} fontWeight={"700"}>{t("QRAmount")}:</Text>
                                    <Text
                                        fontSize={"17px"}>{detailData?.qrAmount || detailData?.qrAmount === 0 ? `${detailData.qrAmount} RUB` : "-"}</Text>
                                </Flex>
                                <Flex width={"100%"} flexDirection={{base: "column", md: "row"}}
                                      justifyContent={"space-between"} pe={5}>
                                    <Text fontSize={"17px"} fontWeight={"700"}>{t("chequeAmount")}:</Text>
                                    <Text
                                        fontSize={"17px"}>{detailData?.chequeAmount || detailData?.chequeAmount === 0 ? `${detailData.chequeAmount} UZS` : "-"}</Text>
                                </Flex>
                                <Flex width={"100%"} flexDirection={{base: "column", md: "row"}}
                                      justifyContent={"space-between"} pe={5}>
                                    <Text fontSize={"17px"} fontWeight={"700"}>{t("rate")}:</Text>
                                    <Text
                                        fontSize={"17px"}>{detailData?.rate || detailData?.rate === 0 ? detailData.rate : "-"}</Text>
                                </Flex>
                                <Flex width={"100%"} flexDirection={{base: "column", md: "row"}}
                                      justifyContent={"space-between"} pe={5}>
                                    <Text fontSize={"17px"} fontWeight={"700"}>{t("status")}:</Text>
                                    <Text
                                        fontSize={"17px"}>{detailData?.status || detailData?.status === 0 ? detailData.status : "-"}</Text>
                                </Flex>
                                <Flex width={"100%"} flexDirection={{base: "column", md: "row"}}
                                      justifyContent={"space-between"} pe={5}>
                                    <Text fontSize={"17px"} fontWeight={"700"}>{t("date")}:</Text>
                                    <Text fontSize={"17px"}>
                                        {detailData?.cheque_created_at || detailData?.cheque_created_at === 0 ? `${detailData?.cheque_created_at.slice(0, 10)} ${detailData?.cheque_created_at.slice(11, 16)}` : "-"}
                                    </Text>
                                </Flex>
                                <GridItem width={"100%"} colSpan={{base: 1, md: 2}} display={"flex"}
                                          justifyContent={"center"}>
                                    <QRCodeSVG
                                        value={detailData?.url ? detailData?.url : "https://qr.nspk.ru/"}
                                        renderAs="canvas"
                                    />
                                </GridItem>
                            </Grid>
                        }
                    </ModalBody>

                    <ModalFooter display={"flex"} gap={"10px"}>
                        {
                            isCreate &&
                            <>
                                <Button colorScheme="red" onClick={() => {
                                    onClose();
                                    resetValue();
                                }}>{t("cancel")}</Button>
                                <Button colorScheme="blue" onClick={handleSave}>
                                    {t("save")}
                                </Button>
                            </>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isCancelModal} onClose={closeCancelModal}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{t("cancel")} {t("payment")}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {t("cancelModal")}
                    </ModalBody>

                    <ModalFooter display={"flex"} gap={"10px"}>
                        <Button colorScheme="red" mr={3} onClick={closeCancelModal}>
                            {t("close")}
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                globalPostFunction({
                                    url: `${order_cancel}?ext_id=${detailData && detailData.ext_id ? detailData.ext_id : 0}`,
                                    postData: {},
                                    getFunction: () => {
                                        getFunction()
                                        closeCancelModal()
                                    }
                                })
                            }}>{t("continue")}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
