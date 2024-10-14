// src/components/TermsAndConditions.jsx
import React from 'react';
import { Box, Heading, Text, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const TermsAndConditions = () => {
  return (
    <Box p={5}>
      <Heading as="h2" size="xl" mb={4}>
        Shartlar (T&C)
      </Heading>
      <Text mb={2}><strong>Oxirgi yangilangan:</strong> 14/10/2024</Text>
      
      <List spacing={3} mt={4}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <strong>1. Umumiy ma'lumot</strong>
          <Text>
            Ushbu hujjat SBP QRPay ilovasidan foydalanishni boshqaradi. Bizning ilovamizdan foydalanish orqali foydalanuvchilar quyidagi shartlar va shartlarga rozilik bildiradilar.
          </Text>
        </ListItem>

        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <strong>2. Foydalanish bo'yicha ko'rsatmalar</strong>
          <Text>
            Sotuvchilar QR kodlarini faqat o'z xizmatlari yoki mahsulotlari bilan bog'liq qonuniy tranzaktsiyalar uchun yaratish uchun javobgardir. Uzrli sabablarsiz QR kodlarini yaratish qat'iyan man etiladi.
            Foydalanuvchilar barcha toʻlov tranzaksiyalari toʻgʻri bajarilishini taʼminlashi kerak va har qanday xatoliklar darhol xabar qilinishi kerak.
          </Text>
        </ListItem>

        {/* Add other terms similarly */}
        
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <strong>8. Amaldagi qonun</strong>
          <Text>
            Ushbu Shartlar va shartlar O'zbekistan qonunlari bilan tartibga solinadi, uning qonun hujjatlari ziddiyatidan qat'i nazar.
          </Text>
        </ListItem>
      </List>
    </Box>
  );
};

export default TermsAndConditions;
