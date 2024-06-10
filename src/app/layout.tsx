"use client";

import "./globals.css";
import Navbar from "./components/Navbar";
import global_en from "./translation/global_en.json";
import global_tr from "./translation/global_tr.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import React, { useEffect } from "react";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    tr: {
      global: global_tr,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lang = localStorage.getItem("lang_code");
    if (lang == "en" || lang == "tr") i18next.changeLanguage(lang);
  });
  return (
    <html>
      <head>
        <title>AYBU Course Scheduler</title>
      </head>
      <body>
        <I18nextProvider i18n={i18next}>
          <Navbar />
          {children}
        </I18nextProvider>
      </body>
    </html>
  );
}
