import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
    Box,
    Button,
    // Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
// import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { sliceNumber } from "../../../contexts/allRequest";
import axios from "axios";
import {
    admin_notification_count,
    seller_notification_count,
    terminal_notification_count,
    user_login
} from "../../../contexts/api";
import { consoleClear, toastMessage } from "../../../contexts/toast-message";
import { useNavigate } from "react-router-dom";
import { userGetMe } from "contexts/logic-function/globalFunktion";
import { AppStore } from "contexts/state-management";
import { globalGetFunction } from "contexts/logic-function/globalFunktion";
import { NotificationStore } from "contexts/state-management/notification/notificationStore";
import { useTranslation } from "react-i18next";

const defVal = { phone: '', password: '' }

function SignIn() {
    const navigate = useNavigate()
    const { setCountData } = NotificationStore()
    const { setGetMeeData } = AppStore()
    const [auth, setAuth] = useState({ phone: '', password: '' });
    const [roles, setRoles] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const { t } = useTranslation()

    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    // const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    // const googleText = useColorModeValue("navy.700", "white");
    // const googleHover = useColorModeValue(
    //   { bg: "gray.200" },
    //   { bg: "whiteAlpha.300" }
    // );
    // const googleActive = useColorModeValue(
    //   { bg: "secondaryGray.300" },
    //   { bg: "whiteAlpha.200" }
    // );

    useEffect(() => {
        if (roles === 'ROLE_SUPER_ADMIN') {
            toast.success('You have successfully logged in')
            navigate('/admin/dashboard')
            sessionStorage.setItem('pathname', 'Dashboard')
            setAuth(defVal)
        } else if (roles === 'ROLE_SELLER') {
            toast.success('You have successfully logged in')
            navigate('/seller/dashboard')
            sessionStorage.setItem('pathname', 'Dashboard')
            setAuth(defVal)
        } else if (roles === 'ROLE_TERMINAL') {
            toast.success('You have successfully logged in')
            navigate('/terminal/payment')
            sessionStorage.setItem('pathname', 'Terminal dashboard')
            setAuth(defVal)
        }
    }, [roles]);

    const authLogin = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(user_login, {
                phone: `+998${auth.phone}`,
                password: auth.password
            })
            if (data?.error?.code) {
                setLoading(false)
                toastMessage(data.error.code)
            } else {
                setLoading(false)
                const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
                sessionStorage.setItem('tokenExpiry', expiryTime.toString());
                sessionStorage.setItem("token", data.data.token)
                sessionStorage.setItem("ROLE", data.data.role)
                setRoles(data.data.role)
                await userGetMe({ setData: setGetMeeData, token: data.data.token });
                await globalGetFunction({
                    url: data.data.role === "ROLE_TERMINAL" ? terminal_notification_count : data.data.role === "ROLE_SELLER" ? seller_notification_count : data.data.role === "ROLE_SUPER_ADMIN" ? admin_notification_count : "",
                    setData: setCountData, token: data.data.token
                })
            }
        } catch (err) {
            setLoading(false)
            // console.error(err);
            consoleClear()
        }
    }

    const handleClick = () => setShow(!show);

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
                        {t('signIn')}
                    </Heading>
                    <Text
                        mb='10px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        {t('signInDesc')}
                    </Text>
                </Box>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{ base: "100%", md: "500px" }}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{ base: "auto", lg: "unset" }}
                    me='auto'
                    mb={{ base: "20px", md: "auto" }}
                >
                    {/*<Button*/}
                    {/*  fontSize='sm'*/}
                    {/*  me='0px'*/}
                    {/*  mb='26px'*/}
                    {/*  py='15px'*/}
                    {/*  h='50px'*/}
                    {/*  borderRadius='16px'*/}
                    {/*  bg={googleBg}*/}
                    {/*  color={googleText}*/}
                    {/*  fontWeight='500'*/}
                    {/*  _hover={googleHover}*/}
                    {/*  _active={googleActive}*/}
                    {/*  _focus={googleActive}>*/}
                    {/*  <Icon as={FcGoogle} w='20px' h='20px' me='10px' />*/}
                    {/*  Sign in with Google*/}
                    {/*</Button>*/}
                    <Flex align='center' mb='30px'>
                        <HSeparator />
                        {/*<Text color='gray.400' mx='14px'>*/}
                        {/*    or*/}
                        {/*</Text>*/}
                        <HSeparator />
                    </Flex>
                    <FormControl>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            {t('enterYourPhoneNumber')}<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup display={"flex"} alignItems={"center"}>
                            <InputLeftElement mt={1}>
                                <Text
                                fontSize='sm'
                                fontWeight='500'>+998</Text>
                            </InputLeftElement>
                            <Input
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{ base: "0px", md: "0px" }}
                                type='number'
                                placeholder='-- --- -- --'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                value={auth.phone}
                                onKeyDown={checkKeyPress}
                                onChange={e => handleAuth('phone', e.target.value)}
                            />

                        </InputGroup>
                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            {t('password')}<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                isRequired={true}
                                fontSize='sm'
                                placeholder={t('passwordErrorHolder')}
                                mb='24px'
                                size='lg'
                                type={show ? "text" : "password"}
                                variant='auth'
                                onKeyDown={checkKeyPress}
                                value={auth.password}
                                onChange={e => handleAuth('password', e.target.value)}
                            />
                            <InputRightElement display='flex' alignItems='center' mt='4px'>
                                <Icon
                                    color={textColorSecondary}
                                    _hover={{ cursor: "pointer" }}
                                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                    onClick={handleClick}
                                />
                            </InputRightElement>
                        </InputGroup>
                        {/*<Flex justifyContent='space-between' align='center' mb='24px'>*/}
                        {/*  <FormControl display='flex' alignItems='center'>*/}
                        {/*    <Checkbox*/}
                        {/*      id='remember-login'*/}
                        {/*      colorScheme='brandScheme'*/}
                        {/*      me='10px'*/}
                        {/*    />*/}
                        {/*    <FormLabel*/}
                        {/*      htmlFor='remember-login'*/}
                        {/*      mb='0'*/}
                        {/*      fontWeight='normal'*/}
                        {/*      color={textColor}*/}
                        {/*      fontSize='sm'>*/}
                        {/*      Keep me logged in*/}
                        {/*    </FormLabel>*/}
                        {/*  </FormControl>*/}
                        {/*  <NavLink to='/auth/forgot-password'>*/}
                        {/*    <Text*/}
                        {/*      color={textColorBrand}*/}
                        {/*      fontSize='sm'*/}
                        {/*      w='124px'*/}
                        {/*      fontWeight='500'>*/}
                        {/*      Forgot password?*/}
                        {/*    </Text>*/}
                        {/*  </NavLink>*/}
                        {/*</Flex>*/}
                        <Button
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            w='100%'
                            h='50'
                            mb='24px'
                            type='submit'
                            onClick={async () => {
                                if (sliceNumber(auth.phone) && auth.password) await authLogin()
                                else toast.error(t('checkData'));
                            }}
                        >{loading ? t('loading') : t('signIn')}</Button>
                    </FormControl>
                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='start'
                        maxW='100%'
                        mt='0px'>
                        <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                        {t("notRegistered")}
                            <NavLink to='/auth/sign-up'>
                                <Text
                                    color={textColorBrand}
                                    as='span'
                                    ms='5px'
                                    fontWeight='500'>
                                   {t("leaveRequestFor")}
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default SignIn;
