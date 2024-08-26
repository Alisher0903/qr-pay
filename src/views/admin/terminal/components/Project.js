// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import { delete_notification } from "contexts/api";
import { isRead_notification } from "contexts/api";
import { globalPostFunction } from "contexts/logic-function/globalFunktion";
import React, { useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
// Assets
import { MdDelete, MdEdit } from "react-icons/md";

export default function Project(props) {
  const { item, image, getFunction, ...rest } = props;
  const [loading, setLoading] = useState(false);
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const navbarIcon = useColorModeValue("#1B255A", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");

  return (
    <Card bg={bg} {...rest} p="14px">
      <Flex
        align="center"
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={{ base: "column", md: "row" }}
      >
        <Flex>
          <Image h="80px" w="80px" src={image} borderRadius="8px" me="20px" />
          <Box mt={{ base: "10px", md: "0" }}>
            <Text
              color={textColorPrimary}
              fontWeight="500"
              fontSize="md"
              mb="4px"
            >
              {item.title ? item.title : "Message for you!"}
            </Text>
            <Text
              fontWeight="500"
              color={textColorSecondary}
              fontSize="sm"
              me="4px"
            >
              Date • {item.createdAt.slice(0, 10)}
              <Link
                fontWeight="500"
                color={brandColor}
                fontSize="sm"
                ms={"7px"}
              >
                {item.createdAt.slice(11, 16)}
              </Link>
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Button
            onClick={() =>
              globalPostFunction({
                url: isRead_notification,
                postData: { ids: [item.id] },
                setLoading: setLoading,
                getFunction: getFunction,
              })
            }
            hidden={item.isRead}
            variant="no-hover"
            bg="transparent"
          >
            <IoCheckmarkSharp color={navbarIcon} size={23} />
          </Button>
          <Button
            onClick={() =>
              globalPostFunction({
                url: delete_notification,
                postData: { ids: [item.id] },
                setLoading: setLoading,
                getFunction: getFunction,
              })
            }
            variant="no-hover"
            bg="transparent"
          >
            <MdDelete color={navbarIcon} size={23} />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
