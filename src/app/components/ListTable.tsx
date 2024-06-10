import React from "react";
import ListComponent from "./ListComponent";
import { useTranslation } from "react-i18next";

interface Props {
  header: string;
  listItems: string[];
  which: string;
}

export default function ListTable({ header, listItems, which }: Props) {
  const [t, i18n] = useTranslation("global");

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mb-2">{header}</h2>
      <table className="w-full bg-white border border-gray-800">
        <thead className="bg-gray-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-white">
              {t("professor.department")}
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              {which === "professor"
                ? t("professor.room")
                : which === "class"
                ? t("professor.prof")
                : ""}
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              {t("professor.name")}
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              {t("professor.day")}
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              {t("professor.time")}
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {listItems.map((element, index) => {
            if (element != "")
              return (
                <ListComponent
                  listItems={element.split(",")}
                  which={which}
                  key={index}
                />
              );
          })}
        </tbody>
      </table>
    </div>
  );
}
