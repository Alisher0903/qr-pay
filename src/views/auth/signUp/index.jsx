import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";
import toast from "react-hot-toast";
import { sliceNumber } from "../../../contexts/allRequest";
import axios from "axios";
import {
    user_request
} from "../../../contexts/api";
import { consoleClear, toastMessage } from "../../../contexts/toast-message";
import { useTranslation } from "react-i18next";


function SignUp() {
    const [auth, setAuth] = useState({
        fullName: "",
        phone: "",
        filialCode: "",
        inn: ""
    });
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { t } = useTranslation()

    const [loading, setLoading] = useState(false);
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");


    const authLogin = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(user_request, {
                fullName: auth.fullName,
                phone: `+998${auth.phone}`,
                filialCode: auth.filialCode,
                inn: auth.inn,
            })
            if (data?.error?.code) {
                setLoading(false)
                toastMessage(data.error.code)
            } else {
                setLoading(false)
                setAuth({
                    fullName: "",
                    phone: "",
                    filialCode: "",
                    inn: ""
                })
                onOpen()
            }
        } catch (err) {
            setLoading(false)
            consoleClear()
        }
    }

    const handleAuth = (name, val) => {
        setAuth({
            ...auth, [name]: val
        })
    }

    function checkKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector('button[type="submit"]').click();
        }
    }

    return (
        <DefaultAuth illustrationBackground={illustration} image={illustration}>
            <Flex
                maxW={{ base: "100%", md: "max-content" }}
                w='100%'
                mx={{ base: "auto", lg: "0px" }}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{ base: "30px", md: "60px" }}
                px={{ base: "25px", md: "0px" }}
                mt={{ base: "40px", md: "14vh" }}
                flexDirection='column'>
                <Box me='auto'>
                    <Heading color={textColor} fontSize='36px' mb='10px'>
                        {t("leaveRequest")}
                    </Heading>
                    <Text
                        mb='10px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        {t("adminVerifed")}
                    </Text>
                </Box>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{ base: "100%", md: "700px" }}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{ base: "auto", lg: "unset" }}
                    me='auto'
                    mb={{ base: "20px", md: "auto" }}
                >

                    <FormControl>
                        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: "repeat(2, 1fr)" }} gap={{ base: 0, md: 6 }}>
                            <GridItem>
                                <FormLabel
                                    ms='4px'
                                    fontSize='sm'
                                    fontWeight='500'
                                    color={textColor}
                                    display='flex'>
                                    {t("fullName")}<Text color={brandStars}>*</Text>
                                </FormLabel>

                                <Input
                                    isRequired={true}
                                    fontSize='sm'
                                    placeholder={t("enterFullName")}
                                    mb='24px'
                                    size='lg'
                                    onKeyDown={checkKeyPress}
                                    value={auth.fullName}
                                    onChange={e => handleAuth('fullName', e.target.value)}
                                />
                            </GridItem>
                            <GridItem>
                                <FormLabel
                                    display='flex'
                                    ms='4px'
                                    fontSize='sm'
                                    fontWeight='500'
                                    color={textColor}
                                    mb='8px'>
                                    {t("phone")}<Text color={brandStars}>*</Text>
                                </FormLabel>
                                <InputGroup display={"flex"} alignItems={"center"}>
                                    <InputLeftElement mt={1}>
                                        <Text
                                            fontSize='sm'
                                            fontWeight='500'>+998</Text>
                                    </InputLeftElement>
                                    <Input
                                        isRequired={true}
                                        // variant='auth'
                                        fontSize='sm'
                                        ms={{ base: "0px", md: "0px" }}
                                        type='number'
                                        placeholder=' -- --- -- --'
                                        mb='24px'
                                        fontWeight='500'
                                        size='lg'
                                        value={auth.phone}
                                        onKeyDown={checkKeyPress}
                                        onChange={e => handleAuth('phone', e.target.value)}
                                    />
                                </InputGroup>
                            </GridItem>
                            <GridItem>
                                <FormLabel
                                    display='flex'
                                    ms='4px'
                                    fontSize='sm'
                                    fontWeight='500'
                                    color={textColor}
                                    mb='8px'>
                                    {t("filial_code")}<Text color={brandStars}>*</Text>
                                </FormLabel>
                                <Input
                                    isRequired={true}
                                    fontSize='sm'
                                    ms={{ base: "0px", md: "0px" }}
                                    placeholder={t("enterYourFilialCode")}
                                    mb='24px'
                                    fontWeight='500'
                                    size='lg'
                                    value={auth.filialCode}
                                    onKeyDown={checkKeyPress}
                                    onChange={e => handleAuth('filialCode', e.target.value)}
                                />
                            </GridItem>
                            <GridItem><FormLabel
                                display='flex'
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                mb='8px'>
                                {t("inn")}<Text color={brandStars}>*</Text>
                            </FormLabel>
                                <Input
                                    isRequired={true}
                                    fontSize='sm'
                                    ms={{ base: "0px", md: "0px" }}
                                    placeholder={t("enterTheTermenalInn")}
                                    mb='24px'
                                    fontWeight='500'
                                    size='lg'
                                    value={auth.inn}
                                    onKeyDown={checkKeyPress}
                                    onChange={e => handleAuth('inn', e.target.value)}
                                /></GridItem>

                        </Grid>
                        <Flex
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='start'
                            maxW='100%'
                            mt='0px'>
                            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                            {t("iHaveAccount")}
                                <NavLink to='/auth/sign-in'>
                                    <Text
                                        color={textColorBrand}
                                        as='span'
                                        ms='5px'
                                        fontWeight='500'>
                                        {t("logIn")}
                                    </Text>
                                </NavLink>
                            </Text>
                        </Flex>
                        <Flex width={"100%"} mt={3} justifyContent={{ base: "start", md: "end" }}>
                            <Button
                                fontSize='sm'
                                variant='brand'
                                fontWeight='500'
                                w='30%'
                                h='50'
                                mb='24px'
                                type='submit'
                                onClick={async () => {
                                    if (sliceNumber(auth.phone) && auth.fullName.trim() !== '' && auth.inn.trim() !== '' && auth.filialCode.trim() !== '') await authLogin()
                                    else toast.error('Please enter your information correctly.');
                                }}
                            >{loading ? `${t("loading")}...` : t("send")}</Button>
                        </Flex>
                    </FormControl>
                </Flex>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody fontSize={22} fontWeight={"800"} textAlign={"center"}>
                        Your request has been successfully received. Our administrators will contact you soon!
                    </ModalBody>

                    <ModalFooter display={"flex"} justifyContent={"center"}>
                        <Button px="40px" colorScheme='blue' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </DefaultAuth>
    );
}

export default SignUp;
