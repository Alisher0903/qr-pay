// Chakra imports
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { delete_notification } from 'contexts/api';
import { isRead_notification } from 'contexts/api';
import { globalPostFunction } from 'contexts/logic-function/globalFunktion';
import React, { useState } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
// Assets
import { MdDelete, MdDoneAll, MdEdit } from 'react-icons/md';
import { MdNotificationsActive } from 'react-icons/md';
import { MdNotifications } from 'react-icons/md';

export default function Project(props) {
  const { item, image, getFunction, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const navbarIcon = useColorModeValue('#1B255A', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const textColor = useColorModeValue('black', 'white');
  // const bg = useColorModeValue('#e4e5f1', 'navy.700');
  return (
    <Accordion
      border={item.isRead ? '1px solid #f8f8f8' : '1px solid #00c675'}
      outline={'none'}
      allowToggle
      // border={item.isRead || '1px solid green'}
      borderRadius={item.isRead ? '20px' : '20px'}
      overflow={'hidden'}
      mb={'20px'}
    >
      <AccordionItem>
        <AccordionButton>
          {item.isRead ? (
            <MdNotifications size={30} color="#686868" />
          ) : (
            <MdNotificationsActive size={30} />
          )}
          <Box
            flex="1"
            p={'10px'}
            color={item.isRead ? '#686868' : textColor}
            textAlign="left"
          >
            {item.title ? item.title : 'Message for you!'}
          </Box>
          <AccordionIcon />
          <Button
            onClick={() =>
              globalPostFunction({
                url: delete_notification,
                postData: { ids: [item.id] },
                setLoading: setLoading,
                getFunction: getFunction,
              })
            }
            color={item.isRead ? '#686868' : textColor}
            variant="no-hover"
            bg="transparent"
          >
            <MdDelete color={item.isRead ? '#686868' : navbarIcon} size={23} />
          </Button>
          <Button
            onClick={() =>
              globalPostFunction({
                url: isRead_notification,
                postData: { ids: [item.id] },
                setLoading: setLoading,
                getFunction: getFunction,
              })
            }
            // hidden={item.isRead}
            variant="no-hover"
            bg="transparent"
          >
            {item.isRead ? (
              <MdDoneAll
                color={item.isRead ? '#686868' : navbarIcon}
                size={23}
              />
            ) : (
              <IoCheckmarkSharp color={navbarIcon} size={23} />
            )}
          </Button>
        </AccordionButton>
        <AccordionPanel pb={4}>
          {/* <Card {...rest} p="14px"> */}
          <Flex
            align="center"
            justifyContent={'space-between'}
            alignItems={'center'}
            direction={{ base: 'column', md: 'row' }}
          >
            <Flex alignItems={'center'} p={'20px'}>
              {/* <Image h="60px" w="60px" src={image} borderRadius="8px" me="20px" /> */}
              <Box mt={{ base: '10px', md: '0' }}>
                <Text
                  color={textColorPrimary}
                  fontWeight="500"
                  fontSize="md"
                  mb="4px"
                >
                  {item.title ? item.title : 'Message for you!'}
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
                    ms={'7px'}
                  >
                    {item.createdAt.slice(11, 16)}
                  </Link>
                </Text>
              </Box>
            </Flex>
          </Flex>
          {/* </Card> */}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
