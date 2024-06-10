"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const activeLink =
    "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 text-white md:text-blue-500";
  const regularLink =
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent";
  const pathname = usePathname();

  const [t, i18n] = useTranslation("global");

  const langStyles = {
    tr: [
      "cursor-pointer hover:bg-gray-700 text-white font-bold p-2 border-2 border-r rounded-l-2xl border-white",
      "cursor-pointer text-gray-900 bg-white font-bold p-2 border-2 border-r rounded-l-2xl border-white",
    ],
    en: [
      "cursor-pointer hover:bg-gray-700 text-white font-bold p-2 border-2 border-l rounded-r-2xl border-white",
      "cursor-pointer text-gray-900 bg-white font-bold p-2 border-2 border-l rounded-r-2xl border-white",
    ],
  };

  return (
    <nav className="border-gray-200 bg-gray-900">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={"/aybu.png"}
            className="h-8 w-8"
            alt="Aybu Logo"
            width={30}
            height={200}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            AYBU
          </span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="text-lg flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            <li>
              <a
                href="/regular"
                className={
                  pathname.startsWith("/regular") ? activeLink : regularLink
                }
              >
                {t("home.nav.all")}
              </a>
            </li>
            <li>
              <a
                href="/withnames"
                className={
                  pathname.startsWith("/withnames") ? activeLink : regularLink
                }
              >
                {t("home.nav.withNames")}
              </a>
            </li>
            <li>
              <a
                href="/professor"
                className={
                  pathname.startsWith("/professor") ? activeLink : regularLink
                }
              >
                {t("home.nav.professors")}
              </a>
            </li>
            <li>
              <a
                href="/classes"
                className={
                  pathname.startsWith("/classes") ? activeLink : regularLink
                }
              >
                {t("home.nav.classrooms")}
              </a>
            </li>
          </ul>
        </div>
        <div className="block">
          <input
            id="select-tr"
            type="radio"
            className="invisible"
            onClick={() => {
              i18n.changeLanguage("tr");
              localStorage.setItem("lang_code", "tr");
            }}
          />
          <label
            htmlFor="select-tr"
            className={langStyles["tr"][i18n.resolvedLanguage == "tr" ? 1 : 0]}
          >
            TR
          </label>
          <label
            htmlFor="select-en"
            className={langStyles["en"][i18n.resolvedLanguage == "en" ? 1 : 0]}
          >
            EN
          </label>
          <input
            id="select-en"
            type="radio"
            className="invisible"
            onClick={() => {
              i18n.changeLanguage("en");
              localStorage.setItem("lang_code", "en");
            }}
          />
        </div>
      </div>
    </nav>
  );
}
