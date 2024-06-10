import React, { useState } from "react";
import { Busy } from "../../models";
import Dropdown from "../Dropdown";
import { Repository } from "@/app/repository";
import SearchDropdown from "../SearchDropdown";
import { useTranslation } from "react-i18next";

const AddBusyForm = ({ handler }: { handler: Function }) => {
  const [t, i18n] = useTranslation("global");
  const [busy, setBusy] = useState<Busy>({
    Busy_Day: "",
    Lecturer: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handler(busy);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-8 space-y-2">
      <input
        type="text"
        name="Lecturer"
        value={busy.Lecturer}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder={t("busy.lecturer")}
        disabled
      />
      <SearchDropdown
        title={t("busy.selectLecturer")}
        openTitle={t("busy.selectLecturer")}
        options={Repository.GetProfessors()}
        setSelected={(s: string) => {
          setBusy({ ...busy, Lecturer: s });
        }}
      />
      <input
        type="text"
        name="Busy_Day"
        value={busy.Busy_Day}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder={t("busy.busyDay")}
        disabled
      />
      <Dropdown
        title={t("busy.selectDay")}
        openTitle={t("busy.selectDay")}
        options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
        setSelected={(s: string) => {
          setBusy({ ...busy, Busy_Day: s });
        }}
      />
      <button
        type="submit"
        className="px-6 py-3 !mt-8 w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full"
      >
        {t("button.add")}
      </button>
    </form>
  );
};

export default AddBusyForm;
