import {
  Box,
  Button,
  Flex,
  Icon,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMemo } from "react";

import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import { get_month_statistic } from "contexts/api";
import { globalGetFunction } from "contexts/logic-function/globalFunktion";
import { DashboardStore } from "contexts/state-management/dashboard/dashboardStore";
import React, { useEffect } from "react";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
import { setConfig } from "contexts/token";
import { useTranslation } from "react-i18next";

export default function TotalSpent(props) {
  const {
    YearData,
    MonthData = [], // Default to an empty array if MonthData is null
    setMonthData,
  } = DashboardStore();

  const { ...rest } = props;
  const { t } = useTranslation()
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  useEffect(() => {
    setConfig()
    getMonth(0);
  }, []);

  const getMonth = (year) => {
    globalGetFunction({
      url: `${get_month_statistic}?year=${year}`,
      setData: setMonthData,
    });
  };

  // Create line chart data

  const lineChartDataTotalSpent = useMemo(() => {
    return [
      {
        name: t("monthlyStatistic"),
        data: MonthData ? MonthData.map((item) => item.paymentCount) : [],
      },
    ];
  }, [MonthData]);
  

  // Check if MonthData is populated for rendering
  const hasData = MonthData?.length > 0;

  const lineChartOptionsTotalSpent = useMemo(() => ({
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
    },
    colors: ["#4318FF", "#39B8FF"],
    markers: {
      size: 0,
      colors: "white",
      strokeColors: "#7551FF",
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      type: "line",
    },
    xaxis: {
      type: "numeric",
      categories: MonthData ? MonthData.map((item) => item.monthName?.slice(0, 3)) : [],
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
      column: {
        color: ["#7551FF", "#39B8FF"],
        opacity: 0.5,
      },
    },
    color: ["#7551FF", "#39B8FF"],
  }), [MonthData]);
  

  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
      {...rest}
    >
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
        <Flex align="center" w="100%">
          <Stack spacing={3}>
            <Select
              onChange={(e) => {
                getMonth(e.target.value); // Log the selected value
              }}
              variant="filled"
            >
              {YearData &&
                YearData.length > 0 &&
                YearData.map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ) // Added key prop for each option
                )}
            </Select>
          </Stack>
          <Button
            ms="auto"
            align="center"
            justifyContent="center"
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w="37px"
            h="37px"
            lineHeight="100%"
            borderRadius="10px"
            {...rest}
          >
            <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
          </Button>
        </Flex>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Box minH="310px" minW="100%" mt="auto">
          {hasData ? (
            <LineChart
              chartData={lineChartDataTotalSpent}
              chartOptions={lineChartOptionsTotalSpent}
            />
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              minH="310px"
            >
              <p>{`${t("statistic")} ${t("notFound")}`}</p> {/* Placeholder for no data */}
            </Box>
          )}
        </Box>
      </Flex>
    </Card>
  );
}
