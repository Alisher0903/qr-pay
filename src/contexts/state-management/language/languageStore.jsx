import create from "zustand";

export const LanguageStore = create((set) => ({
    languageData: localStorage.getItem("selectedLang") | "uz",
    setLanguageData: (data) => set({ languageData: data }),
    wordsWebData: null,
    setWordsWeb: (data) => set({ wordsWeb: data }),
    wordsListData: [
        {
            "id": 36,
            "key": "PANEL_CONTROL",
            "uz": "Boshqaruv paneli",
            "ru": "Панель управления",
            "description": "Boshqaruv panelidagi Bosh menu uchun"
        },
        {
            "id": 37,
            "key": "PANEL_SELLER",
            "uz": "Savdogar",
            "ru": "Торговец",
            "description": "Boshqaruv panelidagi Bosh menudagi Sotuvchi"
        },
        {
            "id": 38,
            "key": "PANEL_PAYMENT",
            "uz": "To'lov",
            "ru": "Оплата",
            "description": "Boshqaruv panelidagi Bosh menudagi To'lov"
        },
        {
            "id": 39,
            "key": "PANEL_TERMINAL",
            "uz": "Terminal",
            "ru": "Терминал",
            "description": "Boshqaruv panelidagi Bosh menudagi Terminal"
        },
        {
            "id": 40,
            "key": "PANEL_REQUEST",
            "uz": "So'rovlar",
            "ru": "Запросы",
            "description": "Boshqaruv panelidagi Bosh menudagi So'rovlar"
        },
        {
            "id": 72,
            "key": "DATE",
            "uz": "Sana",
            "ru": "Дата",
            "description": "Sana so'ralgan joyga ishlatilgan"
        },
        {
            "id": 73,
            "key": "ACTION",
            "uz": "Harakat",
            "ru": "Движение",
            "description": "Harakat tablelarda ishlatilgan"
        },
        {
            "id": 76,
            "key": "TARGET",
            "uz": "Maqsad",
            "ru": "Цель",
            "description": "Maqsad tabellarda ishlatilgan"
        },
        {
            "id": 69,
            "key": "BUTTON_NOT_ACTIVE",
            "uz": "Faol emas",
            "ru": "Не активен",
            "description": "Faol emas jadvallarda ishlatilgan"
        },
        {
            "id": 79,
            "key": "TERMINAL_TABLE_TITLE",
            "uz": "Terminal jadvali",
            "ru": "Терминальный стол",
            "description": "Terminal jadvalidagi title"
        },
        {
            "id": 57,
            "key": "SELLER_SEARCH_INN",
            "uz": "Inn raqam bo'yicha qidirish",
            "ru": "Поиск инн номеру",
            "description": "inn bo'yicha qidirish uchun ishlatilgan"
        },
        {
            "id": 59,
            "key": "SELLER_SEARCH_PHONE",
            "uz": "Telefon raqam bo'yicha qidirish",
            "ru": "Поиск по номеру телефона",
            "description": "Telefon raqam bo'yicha qidirish uchun ishlatilgan"
        },
        {
            "id": 60,
            "key": "SELLER_TABLE_TITLE",
            "uz": "Savdogar jadvali",
            "ru": "График работы торговца",
            "description": "Savdogar menudagi Savdogar jadvalida ishlatilgan"
        },
        {
            "id": 62,
            "key": "SURNAME",
            "uz": "Familiya",
            "ru": "Фамилия",
            "description": "Savdogar jadvalidagi Familiya"
        },
        {
            "id": 43,
            "key": "TRANSACTIONS",
            "uz": "Tranzaksiyalar",
            "ru": "Транзакции",
            "description": "Boshqaruv panelidagi Bosh menudagi Statistikada chiquvchi Tranzaksiyalarda ishlatilgan"
        },
        {
            "id": 44,
            "key": "TOTAL_BALANCE",
            "uz": "Umumiy balans",
            "ru": "Общий баланс",
            "description": "Boshqaruv panelidagi Bosh menudagi Statistikada chiquvchi Umumiy balansda ishlatilgan"
        },
        {
            "id": 45,
            "key": "CANCEL_TRANSACTIONS",
            "uz": "Bekor qilingan tranzaksiyalar",
            "ru": "Отмененные транзакции",
            "description": "Boshqaruv panelidagi Bosh menudagi Statistikada chiquvchi Bekor qilingan tranzaksiyalarda ishlatilgan"
        },
        {
            "id": 46,
            "key": "WAIT_REQUEST",
            "uz": "Kutilayotgan so'rovlar",
            "ru": "Ожидающие запросы",
            "description": "Boshqaruv panelidagi Bosh menudagi Statistikada chiquvchi Kutilayotgan so'rovlarda ishlatilgan"
        },
        {
            "id": 47,
            "key": "REQUEST_TABLE_TITLE",
            "uz": "So'rovlar jadvali",
            "ru": "Таблица запросов",
            "description": "Boshqaruv panelidagi Bosh menudagi So'rovlar jadvalida  ishlatilgan"
        },
        {
            "id": 48,
            "key": "FULL_NAME",
            "uz": "ISM FAMILIYA",
            "ru": "ИМЯ ФАМИЛИЯ",
            "description": "Ism va Familiya so'ralgan joyga ishlatilgan"
        },
        {
            "id": 49,
            "key": "PHONE_NUMBER",
            "uz": "TELEFON RAQAM",
            "ru": "НОМЕР ТЕЛЕФОНА",
            "description": "TELEFON RAQAM so'ralgan joyda ishlatilgan"
        },
        {
            "id": 50,
            "key": "FILIAL_CODE",
            "uz": "FILIAL KODI",
            "ru": "КОД ФИЛИАЛА",
            "description": "Boshqaruv panelidagi Bosh menudagi So'rovlar jadvalidagi FILIAL KODI da ishlatilgan"
        },
        {
            "id": 51,
            "key": "INN",
            "uz": "INN",
            "ru": "ИНН",
            "description": "INN so'ralgan joyga ishlatilgan"
        },
        {
            "id": 52,
            "key": "STATUS",
            "uz": "STATUS",
            "ru": "СТАТУС",
            "description": "Status so'ralgan joyga ishlatilgan"
        },
        {
            "id": 53,
            "key": "STATUS_WAIT",
            "uz": "Kutilayotgan",
            "ru": "Ожидал",
            "description": "Satus kutilyotgan joyda ishlatilgan"
        },
        {
            "id": 54,
            "key": "STATUS_CANCELED",
            "uz": "Bekor qilingan",
            "ru": "Отменено",
            "description": "Status Bekor qilinganlar joyiga ishlatilgan"
        },
        {
            "id": 55,
            "key": "STATUS_CONFIRMED",
            "uz": "Tasdiqlangan",
            "ru": "Подтвержденный",
            "description": "Status Tasdiqlangan joyiga ishlatilgan"
        },
        {
            "id": 70,
            "key": "PAYMENT_TABLE_TITLE",
            "uz": "To'lov jadvali",
            "ru": "График платежей",
            "description": "To'lov menudagi To'lov jadvalidagi title"
        },
        {
            "id": 71,
            "key": "PARTNER",
            "uz": "Hamkor",
            "ru": "Партнер",
            "description": "Hamkor so'ralgan joyga ishlatilgan"
        },
        {
            "id": 74,
            "key": "PAYMENT_CANCELLED",
            "uz": "To'lovni bekor qilish",
            "ru": "Отмена платежа",
            "description": "To'lov jadvalidagi To'lovni bekor qilishda ishlatilgan"
        },
        {
            "id": 64,
            "key": "EMAIL",
            "uz": "Email",
            "ru": "Электронная почта",
            "description": "Savdogar jadvalidagi Email"
        },
        {
            "id": 56,
            "key": "SELLER_SEARCH_FULL_NAME",
            "uz": "Ism familiya bo'yicha qidirish",
            "ru": "Поиск по имени",
            "description": "Ism familiya bo'yicha qidirish uchun ishlatilgan"
        },
        {
            "id": 68,
            "key": "BUTTON_ACTIVE",
            "uz": "Faol",
            "ru": "Активный",
            "description": "Faol jadvallarda ishlatilgan"
        },
        {
            "id": 58,
            "key": "SELLER_SEARCH_FILIAL_CODE",
            "uz": "Filial kod bo'yicha qidirish",
            "ru": "Поиск по коду филиала",
            "description": "Filial kod bo'yicha qidirish uchun ishlatilgan"
        },
        {
            "id": 67,
            "key": "ACTIVE",
            "uz": "Faolligi",
            "ru": "Активность",
            "description": "Faolligi jadvallarda ishlatilgan"
        },
        {
            "id": 81,
            "key": "CREATE_TERMINAL",
            "uz": "Terminal yaratish",
            "ru": "Создать терминал",
            "description": "Terminal yaratish Terminal jadvalda ishlatilgan"
        },
        {
            "id": 41,
            "key": "TERMINALS",
            "uz": "Terminallar",
            "ru": "Терминалы",
            "description": "Boshqaruv panelidagi Bosh menudagi Statistikada chiquvchi Terminallar sonida ishlatilgan"
        },
        {
            "id": 42,
            "key": "TERMINAL_USERS_COUNT",
            "uz": "Terminal foydalanuvchilar soni",
            "ru": "Количество пользователей терминала",
            "description": "Boshqaruv panelidagi Bosh menudagi Statistikada chiquvchi Terminal foydalanuvchilar sonida ishlatilgan"
        },
        {
            "id": 87,
            "key": "EDIT",
            "uz": "Tahrirlar",
            "ru": "Правки",
            "description": "Tahrirlar jadvallarda ishlatilgan"
        },
        {
            "id": 85,
            "key": "SERIAL_CODE",
            "uz": "Serial kod",
            "ru": "Серийный код",
            "description": "Serial kod jadvallarda ishlatilgan"
        },
        {
            "id": 83,
            "key": "ACCOUNT",
            "uz": "Hisob",
            "ru": "Счет",
            "description": "Hisob jadvalda ishlatilgan"
        },
        {
            "id": 82,
            "key": "NAME",
            "uz": "Ism",
            "ru": "Имя",
            "description": "Ism jadvalda ishlatilgan"
        },
        {
            "id": 114,
            "key": "PANEL_WORD",
            "uz": "So'z",
            "ru": "Word",
            "description": "Boshqaruv paneli so'z"
        }
    ],
    setWordsListData: (data) => set({ wordsListData: data }),
}))