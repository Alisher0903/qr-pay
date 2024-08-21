import React from "react";

// Chakra imports
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex direction='column'>
      {/*<HorizonLogo h='26px' w='175px' my='32px' color={logoColor} />*/}
        <Box ms={`30px`} mb={`10px`} fontWeight={`900`} fontSize={`25px`}>Bank Integration</Box>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
