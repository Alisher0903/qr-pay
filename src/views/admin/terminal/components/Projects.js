// Chakra imports
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Pagination } from "antd";
// Assets
import Project1 from "assets/img/profile/notification.png";
// Custom components
import Card from "components/card/Card.js";
import {
  seller_notification_count,
  terminal_notification,
  delete_notification,
  isRead_notification,
  admin_notification_count,
  terminal_notification_count,
  admin_notification,
  seller_notification,
} from "contexts/api";
import { globalPostFunction } from "contexts/logic-function/globalFunktion";
import { globalGetFunction } from "contexts/logic-function/globalFunktion";
import { NotificationStore } from "contexts/state-management/notification/notificationStore";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdDeleteSweep } from "react-icons/md";
import Project from "views/admin/terminal/components/Project";

export default function Projects() {
  const {
    setNotificationData,
    notificationData,
    loading,
    setLoading,
    setCountData,
    setPage,
    totalPage,
    page,
    setTotalPages,
  } = NotificationStore();

  const [selectedIds, setSelectedIds] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const navbarIcon = useColorModeValue("#1B255A", "white");
  const role = localStorage.getItem("ROLE");
  const bg = useColorModeValue("white", "navy.700");

  const { t } = useTranslation();

  useEffect(() => {
    getFunction();
  }, []);

  useEffect(() => {
    globalGetFunction({
      url:
        role === "ROLE_TERMINAL"
          ? terminal_notification
          : role === "ROLE_SELLER"
          ? seller_notification
          : role === "ROLE_SUPER_ADMIN"
          ? admin_notification
          : "",
      setData: setNotificationData,
      setLoading: setLoading,
      setTotalElements: setTotalPages,
      page: page,
    });
  }, [page]);

  const getFunction = async () => {
    await globalGetFunction({
      url:
        role === "ROLE_TERMINAL"
          ? terminal_notification
          : role === "ROLE_SELLER"
          ? seller_notification
          : role === "ROLE_SUPER_ADMIN"
          ? admin_notification
          : "",
      setData: setNotificationData,
      setLoading: setLoading,
      setTotalElements: setTotalPages,
    });

    await globalGetFunction({
      url:
        role === "ROLE_TERMINAL"
          ? terminal_notification_count
          : role === "ROLE_SELLER"
          ? seller_notification_count
          : role === "ROLE_SUPER_ADMIN"
          ? admin_notification_count
          : "",
      setData: setCountData,
      setLoading: setLoading,
    });
  };

  const handleSelectIsReadIds = async () => {
    if (notificationData.object) {
      // isRead false bo'lgan elementlarning id larini olish
      const ids = await notificationData.object
        .filter((item) => !item.isRead) // isRead false bo'lganlarni filtrlash
        .map((item) => item.id); // ularning id larini olish

      globalPostFunction({
        url: isRead_notification,
        postData: ids.length > 0 ? { ids: ids } : { ids: [] },
        setLoading: setLoading,
        getFunction: getFunction,
      });
    }
  };

  const handleSelectAllIds = () => {
    if (notificationData.object) {
      const ids = notificationData.object.map((item) => item.id);
      setSelectedIds(ids);
    }
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "page") {
      return (
        <a className="shadow-none dark:bg-[#9c0a36] dark:text-white border dark:border-[#9c0a36] border-black rounded no-underline">
          {originalElement}
        </a>
      );
    }
    return originalElement;
  };

  const onChange = (page, size) => setPage(page - 1);

  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <>
      <Card mb={{ base: "0px", "2xl": "20px" }}>
        <Flex
          w={{ sm: "100%", md: "auto" }}
          mb={"10px"}
          alignItems="center"
          flexDirection="row"
          justifyContent={"space-between"}
        >
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mt="10px"
            mb="4px"
          >
            {t("allNotification")}
          </Text>
          <Flex
            w={{ sm: "100%", md: "auto" }}
            alignItems="center"
            flexDirection="row"
          >
            <Button
              variant="no-hover"
              bg="transparent"
              onClick={async () => {
                await handleSelectIsReadIds();
              }}
            >
              <IoCheckmarkDoneSharp color={navbarIcon} size={23} />
            </Button>
            <Button
              onClick={() => {
                onOpen();
                handleSelectAllIds();
              }}
              variant="no-hover"
              bg="transparent"
            >
              <MdDeleteSweep color={navbarIcon} size={23} />
            </Button>
          </Flex>
        </Flex>
        {Array.isArray(notificationData.object) &&
        notificationData.object.length > 0 ? (
          notificationData.object.map((item) => (
            <Project
              key={item.id} // item.id ni key sifatida ishlating
              boxShadow={cardShadow}
              mb="20px"
              item={item}
              image={Project1}
              getFunction={getFunction}
            />
          ))
        ) : (
          <Card bg={bg} p="14px">
            <Flex width={"100%"} justifyContent={"center"}>
              <Text
                color={textColorPrimary}
                fontWeight="500"
                fontSize="md"
                mb="4px"
              >
                {t("notification")} {t("notFound")}
              </Text>
            </Flex>
          </Card>
        )}
        {Array.isArray(notificationData.object) &&
        notificationData.object.length > 0 ? (
          <Pagination
            showSizeChanger={false}
            responsive={true}
            defaultCurrent={1}
            total={totalPage}
            onChange={onChange}
            rootClassName={`mt-10 mb-5 ms-5`}
            itemRender={itemRender}
          />
        ) : (
          ""
        )}
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("deleteNotification")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{t("notificationDelete")}</ModalBody>

          <ModalFooter display={"flex"} gap={"10px"}>
            <Button colorScheme="red" onClick={onClose}>
              {t("close")}
            </Button>
            <Button
              colorScheme="blue"
              onClick={async () => {
                await globalPostFunction({
                  url: delete_notification,
                  postData:
                    selectedIds.length > 0 ? { ids: selectedIds } : { ids: [] },
                  setLoading: setLoading,
                  getFunction: () => {
                    globalGetFunction({
                      url:
                        role === "ROLE_TERMINAL"
                          ? terminal_notification
                          : role === "ROLE_SELLER"
                          ? seller_notification
                          : role === "ROLE_SUPER_ADMIN"
                          ? admin_notification
                          : "",
                      setData: setNotificationData,
                      setLoading: setLoading,
                    });
                    onClose();
                  },
                });
              }}
            >
              {t("continue")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
