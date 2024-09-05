import {
    Box,
    Icon,
    SimpleGrid,
    useColorModeValue,
} from "@chakra-ui/react";
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
    MdAttachMoney,
    MdBarChart,
    MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import {
    columnsDataCheck,
    columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function Dashboard() {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid
                columns={{base: 1, md: 2, lg: 3, "2xl": 6}}
                gap='20px'
                mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor}/>
                            }
                        />
                    }
                    name='Terminals'
                    value='125'
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor}/>
                            }
                        />
                    }
                    name='Merchants'
                    value='79'
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor}/>
                            }
                        />
                    }
                    name='Transactions'
                    value='1750+'
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor}/>
                            }
                        />
                    }
                    name='Total balance'
                    value='$50,000'
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor}/>
                            }
                        />
                    }
                    name='Canceled transactions'
                    value='20'
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor}/>
                            }
                        />
                    }
                    name='Requests on wait'
                    value='200'
                />
            </SimpleGrid>

            <SimpleGrid columns={{base: 1, md: 1, xl: 1}} mb='20px'>
                <TotalSpent/>
            </SimpleGrid>
            <SimpleGrid columns={{base: 1, md: 1, xl: 1}} gap='20px' mb='20px'>
                <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck}/>
                {/*<SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap='20px'>*/}
                {/*    <DailyTraffic/>*/}
                {/*    <PieCard/>*/}
                {/*</SimpleGrid>*/}
            </SimpleGrid>
            <SimpleGrid columns={{base: 1, md: 1, lg: 4}} gap="20px" mb="20px">
                <Box gridColumn={{lg: "span 3"}}>
                    <ComplexTable
                        columnsData={columnsDataComplex}
                        tableData={tableDataComplex}
                    />
                </Box>
                <SimpleGrid columns={{base: 1}}>
                    <Box display={{base: "none", lg: "block"}}>
                        <MiniCalendar h="100%" minW="100%" selectRange={false}/>
                    </Box>
                </SimpleGrid>
            </SimpleGrid>
        </Box>
    );
}
