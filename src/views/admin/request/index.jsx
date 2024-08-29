import React, {useEffect, useState} from 'react';
import {Box, SimpleGrid, Td, Text, Tr} from "@chakra-ui/react";
import ComplexTable from "../dataTables/components/ComplexTable";
import {globalGetFunction} from "../../../contexts/logic-function/globalFunktion";
import {requestGetAdmin} from "../../../contexts/api";
import {Pagination} from "antd";
import {FaRegEdit} from "react-icons/fa";

const thead = ['T/r', 'Full name', 'Phone number', 'Filial code', 'Inn', 'Status', 'Action',]

const Request = () => {
    const [requestList, setRequestList] = useState(null)
    const [loading, setLoading] = useState(false)
    const [totalElement, setTotalElements] = useState(0)
    const [page, setPage] = useState(0)

    useEffect(() => {
        globalGetFunction({
            url: requestGetAdmin,
            setData: setRequestList,
            setLoading,
            setTotalElements,
            page
        })
    }, []);

    const bgGenerator = (status) => {
        if (status === 'WAIT') return ['yellow', 'Waiting']
        else if (status === 'CONFIRMED') return ['green', 'Confirmed']
        else if (status === 'CANCEL') return ['red', 'Canceled']
    }

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid
                mb="20px"
                columns={{sm: 1}}
                spacing={{base: "20px", xl: "20px"}}
            >
                <ComplexTable
                    name="Request table"
                    thead={thead}
                >
                    {loading ? <Tr>
                        <Td textAlign="center" colSpan={thead.length}>Loading...</Td>
                    </Tr> : requestList ? requestList?.object?.map((item, i) =>
                        <Tr key={i}>
                            <Td>{(page * 10) + i + 1}</Td>
                            <Td>{item.fullName}</Td>
                            <Td>{item.phone}</Td>
                            <Td>{item.filialCode}</Td>
                            <Td>{item.inn}</Td>
                            <Td alignSelf="flex-start">
                                <Text
                                    background={bgGenerator(item.status)[0]}
                                    color="white"
                                    px="15px"
                                    py="10px"
                                    fontWeight="700"
                                    borderRadius="10px"
                                    alignSelf="flex-start"
                                >{bgGenerator(item.status)[1]}</Text>
                            </Td>
                            <Td>
                                <FaRegEdit fontSize="18px" />
                            </Td>
                        </Tr>
                    ) : <Tr><Td textAlign="center" colSpan={thead.length}>Request not found</Td></Tr>
                    }
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

export default Request;
