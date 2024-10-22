import {Box, SimpleGrid, Tr, Td, Select} from "@chakra-ui/react";
import ComplexTable from "../dataTables/components/ComplexTable";
import {Pagination, Input} from "antd";
import {TerminalStore} from "../../../contexts/state-management/terminal/terminalStory";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {globalGetFunction} from "../../../contexts/logic-function/globalFunktion";
import {user_merchant} from "../../../contexts/api";
import { updateUserStatus } from "contexts/logic-function";

export default function Partner() {
    const {t} = useTranslation()
    const {page, setPage, totalPage, setTotalPages} = TerminalStore()
    const [merchantData, setMerchantData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [fullName, setFullName] = useState('')
    const [inn, setInn] = useState('')
    const [filialCode, setFilialCode] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        getMerchant()
    }, []);

    useEffect(() => {
        getMerchant()
    }, [page, fullName, inn, filialCode, phone]);

    const bgGenerator = (status) => {
        if (status === 'ACTIVE') return ['green', t("Active")]
        else if (status === 'INACTIVE') return ['red', t("inActive")]
        else return ['gray', t("unknown")]; // Default case
    }

    const getTestUrl = () => {
        const queryParams = [
            fullName ? `fullName=${fullName}` : '',
            inn ? `inn=${inn}` : '',
            filialCode ? `filialCode=${filialCode}` : '',
            phone ? `phone=${phone}` : ''
        ].filter(Boolean).join('&');

        return `${user_merchant}?${queryParams ? `${queryParams}&` : ''}page=${page}&size=10`;
    }
    const getMerchant = async () => {
        await globalGetFunction({
            url: getTestUrl(),
            setLoading,
            setTotalElements: setTotalPages,
            setData: setMerchantData,
        })
    }

    return (
        <Box pt={{base: "130px", md: "80px", xl: "90px"}}>
            <SimpleGrid
                mb="20px"
                columns={{sm: 1}}
                spacing={{base: "20px", xl: "20px"}}
            >
                <Box
                    display="grid"
                    gridTemplateColumns={{base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)"}}
                    gap={5}
                >
                    <Input
                        style={{padding: '10px'}}
                        placeholder={`${t('fullName')} ${t('search_by')}`}
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        allowClear
                    />
                    <Input
                        style={{padding: '10px'}}
                        placeholder={`${t('inn')} ${t('search_by')}`}
                        value={inn}
                        onChange={e => setInn(e.target.value)}
                        allowClear
                    />
                    <Input
                        style={{padding: '10px'}}
                        placeholder={`${t('filial_code')} ${t('search_by')}`}
                        value={filialCode}
                        onChange={e => setFilialCode(e.target.value)}
                        allowClear
                    />
                    <Input
                        style={{padding: '10px'}}
                        placeholder={`${t('phone')} ${t('search_by')}`}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        allowClear
                    />
                </Box>
                <ComplexTable
                    name={`${t("merchant")} ${t("table")}`}
                    thead={[t('tableTr'), t("name"), t('lastName'), t("phone"), t('email'), t("inn"), t("filial_code"),  t("active")]}
                >
                    {loading ? <Tr>
                        <Td textAlign={"center"} colSpan={8}>{t("loading")}...</Td>
                    </Tr> : merchantData && merchantData?.object ?
                        merchantData?.object.map((item, i) =>
                            <Tr key={i}>
                                <Td>{(page * 10) + i + 1}</Td>
                                <Td>{item.firstName ? item.firstName : '-'}</Td>
                                <Td>{item.lastName ? item.lastName : '-'}</Td>
                                <Td>{item.phone ? `+998 (${item.phone.slice(4, 6)}) ${item.phone.slice(6, 9)} ${item.phone.slice(9, 11)} ${item.phone.slice(11)}` : '-'}</Td>
                                <Td>{item.email ? item.email : '-'}</Td>
                                <Td>{item.inn ? item.inn : '-'}</Td>
                                <Td>{item.filial_code ? item.filial_code : '-'}</Td>
                                <Td>
                                <Select
                                    onChange={async (e) => {
                                        
                                        await updateUserStatus({
                                            userId: item.id,
                                            status: e.target.value,
                                            getFunction: getMerchant
                                        })
                                    }}
                                    width={'150px'}
                                    value={item.status}
                                >
                                    <option value='ACTIVE'>{bgGenerator('ACTIVE')[1]}</option>
                                    <option value='INACTIVE'>{bgGenerator('INACTIVE')[1]}</option>
                                </Select>
                            </Td>
                            </Tr>
                        ) : <Tr>
                            <Td textAlign={"center"} colSpan={7}>{t("merchant")} {t("notFound")}</Td>
                        </Tr>
                    }
                </ComplexTable>
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    defaultCurrent={1}
                    total={totalPage}
                    onChange={page => setPage(page - 1)}
                />
            </SimpleGrid>
        </Box>
    );
}
