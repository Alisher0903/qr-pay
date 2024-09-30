import React, {useEffect, useState} from 'react';
import {Box, SimpleGrid, Td, Tr} from "@chakra-ui/react";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {globalGetFunction} from "../../../contexts/logic-function/globalFunktion";
import {user_terminal} from "../../../contexts/api";
import {Pagination} from "antd";
import {useTranslation} from 'react-i18next';


const UserTerminal = () => {
    const {t} = useTranslation()
    const [usersTerminal, setUsersTerminal] = useState(null)
    const [loading, setLoading] = useState(false)
    const [totalElement, setTotalElements] = useState(0)
    const [page, setPage] = useState(0)

    const thead = [t('tableTr'), t("firstName"), t("lastName"), t("terminalName"), t("phone"), t("email"), t("inn"), t('filial_code')]
    const getFunctionUsersTerm = async () => {
        await globalGetFunction({
            url: user_terminal,
            setData: setUsersTerminal,
            setLoading,
            setTotalElements,
            page
        })
    }

    useEffect(() => {
        getFunctionUsersTerm()
    }, []);

    useEffect(() => {
        getFunctionUsersTerm()
    }, [page]);

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid
                mb="20px"
                columns={{sm: 1}}
                spacing={{base: "20px", xl: "20px"}}
            >
                <ComplexTable
                    name={`${t("terminalUsers")} ${t("table")}`}
                    thead={thead}
                >
                    {loading ? <Tr>
                        <Td textAlign="center" colSpan={thead.length}>Loading...</Td>
                    </Tr> : usersTerminal ? usersTerminal?.object?.map((item, i) =>
                        <Tr key={i}>
                            <Td>{(page * 10) + i + 1}</Td>
                            <Td>{item.firstName ? item.firstName : '-'}</Td>
                            <Td>{item.lastName ? item.lastName : '-'}</Td>
                            <Td>{item.terminalName ? item.terminalName : '-'}</Td>
                            <Td>{item.phone ? item.phone : '-'}</Td>
                            <Td>{item.email ? item.email : '-'}</Td>
                            <Td>{item.inn ? item.inn : '-'}</Td>
                            <Td>{item.filialCode ? item.filialCode : '-'}</Td>
                        </Tr>
                    ) : <Tr><Td textAlign="center" colSpan={thead.length}>{t("request")} {t("notFound")}</Td></Tr>}
                </ComplexTable>
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    defaultCurrent={1}
                    total={totalElement}
                    onChange={page => setPage(page - 1)}
                />
            </SimpleGrid>
        </Box>
    );
};

export default UserTerminal;
