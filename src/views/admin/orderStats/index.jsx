import {
    Box,
    SimpleGrid,
    Td,
    Tr,
    Text,
} from "@chakra-ui/react";
import {Pagination} from "antd";
import {globalGetFunction} from "contexts/logic-function/globalFunktion";
import {PaymentStore} from "contexts/state-management/payment/paymentStore";
import {setConfig} from "contexts/token";
import React, {useEffect, useState} from "react";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import moment from "moment";
import {useTranslation} from "react-i18next";
import { order_stats } from "contexts/api";

export default function OrderStats() {
    const {
        setPaymentData, paymentData, setPage,
        totalPage,
        page,
        setTotalPages,
    } = PaymentStore();
    const {t} = useTranslation()
    const [createLoading, setCreateLoading] = useState(false);

    // Setting input text color based on color mode
    const thead = ["T/r",t('merchant'), t("terminalName"), t("amount"), t("filial_code"), t("rate"), t("createDate"), t("paymentDate"), t("status"),]

    useEffect(() => {
        setConfig()
        getFunction()
    }, [])

    useEffect(() => {
        globalGetFunction({
            url: order_stats,
            setLoading: setCreateLoading,
            setData: setPaymentData,
            setTotalElements: setTotalPages,
            page: page,
        });
    }, [page])

    const getFunction = () => {
        globalGetFunction({
            url: order_stats,
            setLoading: setCreateLoading,
            setData: setPaymentData,
            setTotalElements: setTotalPages
        });
    }

    // State to manage form values and validation
    const onChange = (page) => setPage(page - 1)

    const bgGenerator = (status) => {
        if (status === 'WAIT') return ['orange', t("wait")];
        else if (status === 'COMPLETED') return ['green', t("confirmed")];
        else if (status === 'CANCEL') return ['red', t("canceled")];
        else return ['gray', t("unknown")]; // Default case
    };

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid
                mb="20px"
                columns={{sm: 1}}
                spacing={{base: "20px", xl: "20px"}}
            >
                <ComplexTable
                    name={`${t("paymentStats")} ${t("table")}`}
                    thead={thead}
                >
                    {createLoading ? <Tr>
                        <Td textAlign="center" colSpan={thead.length}>{t("loading")}...</Td>
                    </Tr> : 
                    (paymentData && paymentData?.object) ?
                        paymentData.object.map((item, i) =>
                            <Tr key={i}>
                                <Td>{(page * 10) + i + 1}</Td>
                                <Td>{item.merchant ? item.merchant : "-"}</Td>
                                <Td>{item.terminalName ? item.terminalName : "-"}</Td>
                                <Td>{item.amount ? `${item.amount.toLocaleString('uz-UZ', {minimumFractionDigits: 2, maximumFractionDigits: 2})} UZS` : "-"}</Td>
                                <Td>{item.filial_code ? item.filial_code : "-"}</Td>
                                <Td>{item.rate ? item.rate : "-"}</Td>
                                <Td>{item.createdAt ? moment(item.createdAt.slice(0, 10)).format('DD.MM.YYYY') : "-"}</Td>
                                <Td>{item.createdAt ? moment(item.paymentDate.slice(0, 10)).format('DD.MM.YYYY') : "-"}</Td>
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
                            <Td textAlign={"center"} colSpan={6}>{t("paymentStats")}{t("notFound")}</Td>
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
        </Box>
    );
}
