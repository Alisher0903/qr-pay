import {
    Box,
    Icon,
    SimpleGrid,
    Td,
    Text,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { get_payment_statistic_forSeller, get_admin_request_web, get_seller_statistic, get_year, get_admin_statistic } from "contexts/api";
import { globalGetFunction } from "contexts/logic-function/globalFunktion";
import { DashboardStore } from "contexts/state-management/dashboard/dashboardStore";
import { setConfig } from "contexts/token";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BsCalculator } from "react-icons/bs";
import { FaUsers, FaRegMoneyBillAlt } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { PiUserListDuotone } from "react-icons/pi";
import { MdAttachMoney } from "react-icons/md";
import TotalSpent from "views/admin/default/components/TotalSpent";
import ComplexTable from "../dataTables/components/ComplexTable";

export default function Dashboard() {
    const {
        setStatisticData,
        statisticData,
        setStatisticLoading,
        setYearData,
        WebRequestData,
        setWebRequestloading,
        WebRequestloading,
        setWebRequestData,
        PaymentData,
        setPaymentData,
        setMonthData
    } = DashboardStore();

    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const { t } = useTranslation();

    const thead = [t('tableTr'), t("fullName"), t("phone"), t("filial_code"), t("inn"), t("status")];
    const theadPayment = [t('tableTr'), t("partner"), t("date"), t("amount"), t("status")];

    const role = sessionStorage.getItem("ROLE");

    const getStatistcs = () => {
        globalGetFunction({
            url: role === "ROLE_SUPER_ADMIN" ? get_admin_statistic : role === "ROLE_SELLER" ? get_seller_statistic : "",
            setLoading: setStatisticLoading,
            setData: setStatisticData,
        });
        globalGetFunction({
            url: get_year,
            setData: setYearData,
        });
        if (role === "ROLE_SUPER_ADMIN") {
            globalGetFunction({
                url: get_admin_request_web,
                setLoading: setWebRequestloading,
                setData: setWebRequestData,
            });
        } else if (role === "ROLE_SELLER") {
            globalGetFunction({
                url: get_payment_statistic_forSeller,
                setLoading: setWebRequestloading,
                setData: setPaymentData,
            });
        }
    };

    useEffect(() => {
        setConfig();
        getStatistcs();
    }, []);

    const bgGenerator = (status) => {
        if (status === 'WAIT') return ['yellow', t("wait")];
        else if (status === 'COMPLETED') return ['green', t("confirmed")];
        else if (status === 'CANCEL') return ['red', t("canceled")];
        else return ['gray', t("unknown")]; // Default case
    };

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
                gap='20px'
                mb='20px'
            >
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={BsCalculator} color={brandColor} />
                            }
                        />
                    }
                    name={`${t("terminals")}`}
                    value={statisticData?.terminalCount || "0"}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={FaUsers} color={brandColor} />
                            }
                        />
                    }
                    name={`${t("terminalUserCount")}`}
                    value={statisticData?.userCount || "0"}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={FaMoneyBillTransfer} color={brandColor} />
                            }
                        />
                    }
                    name={`${t("transactions")}`}
                    value={statisticData?.transactionCountWaitOrCompleted || "0"}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                            }
                        />
                    }
                    name={`${t("totalBalance")}`}
                    value={`${statisticData?.paymentTotalBalance ? statisticData.paymentTotalBalance.toFixed(2) : "0"} UZS`}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={FaRegMoneyBillAlt} color={brandColor} />
                            }
                        />
                    }
                    name={`${t("canceledTransactions")}`}
                    value={statisticData?.transactionCountCancel || "0"}
                />
                {role === "ROLE_SUPER_ADMIN" && (
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={PiUserListDuotone} color={brandColor} />
                                }
                            />
                        }
                        name={`${t("requestOnWait")}`}
                        value={statisticData?.requestWaitCount || "0"}
                    />
                )}
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} mb='20px'>
                <TotalSpent />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 1, lg: 4 }} gap="20px" mb="20px">
                <Box gridColumn={{ lg: "span 3" }}>
                    {role === "ROLE_SUPER_ADMIN" ? (
                        <ComplexTable
                            name={`${t("request")} ${t("table")}`}
                            thead={thead}
                        >
                            {WebRequestloading ? (
                                <Tr>
                                    <Td textAlign="center" colSpan={thead.length}>Loading...</Td>
                                </Tr>
                            ) : WebRequestData && WebRequestData.length > 0 ? (
                                WebRequestData.map((item, i) => (
                                    <Tr key={i}>
                                        <Td>{i + 1}</Td>
                                        <Td>{item.fullName || "-"}</Td>
                                        <Td>{item.phone || "-"}</Td>
                                        <Td>{item.filialCode || "-"}</Td>
                                        <Td>{item.inn || "-"}</Td>
                                        <Td alignSelf="flex-start">
                                            <Text
                                                background={bgGenerator(item.status)[0]}
                                                color="white"
                                                py="10px"
                                                fontWeight="700"
                                                borderRadius="10px"
                                                textAlign={'center'}
                                                width={'130px'}
                                            >
                                                {bgGenerator(item.status)[1]}
                                            </Text>
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td textAlign="center" colSpan={thead.length}>{t("request")} {t("notFound")}</Td>
                                </Tr>
                            )}
                        </ComplexTable>
                    ) : (
                        <ComplexTable
                            name={`${t("payment")} ${t("table")}`}
                            thead={theadPayment}
                        >
                            {WebRequestloading ? (
                                <Tr>
                                    <Td textAlign="center" colSpan={theadPayment.length}>Loading...</Td>
                                </Tr>
                            ) : PaymentData && PaymentData.length > 0 ? (
                                PaymentData.map((item, i) => (
                                    <Tr key={i}>
                                        <Td>{i + 1}</Td>
                                        <Td>{item.partner}</Td>
                                        <Td>{item.date}</Td>
                                        <Td>{`${item.amount ? item.amount.toFixed(2) : "0"} UZS`}</Td>
                                        <Td alignSelf="flex-start">
                                            <Text
                                                background={bgGenerator(item.status)[0]}
                                                color="white"
                                                py="10px"
                                                fontWeight="700"
                                                borderRadius="10px"
                                                textAlign={'center'}
                                                width={'130px'}
                                            >
                                                {bgGenerator(item.status)[1]}
                                            </Text>
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td textAlign="center" colSpan={theadPayment.length}>{t("payment")} {t("notFound")}</Td>
                                </Tr>
                            )}
                        </ComplexTable>
                    )}
                </Box>
                <SimpleGrid columns={{ base: 1 }}>
                    <Box display={{ base: "none", lg: "block" }}>
                        <MiniCalendar h="100%" minW="100%" selectRange={false} />
                    </Box>
                </SimpleGrid>
            </SimpleGrid>
        </Box>
    );
}
