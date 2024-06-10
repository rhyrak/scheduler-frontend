import React, { useState } from "react";
import { Classroom } from "../../models";
import DaysDropdown from "../DaysDropdown";
import { useTranslation } from "react-i18next";

const AddClassroomForm = ({ handler }: { handler: Function }) => {
  const [t, i18n] = useTranslation("global");
  const [classroom, setClassroom] = useState<Classroom>({
    floor_number: 0,
    classroom_id: "",
    capacity: 0,
    available_days: "",
  });
  const [days, _setDays] = useState<string[]>([]);
  const setDays = (selected: string[]) => {
    const sorted = [];
    if (selected.includes("Monday")) sorted.push("Monday");
    if (selected.includes("Tuesday")) sorted.push("Tuesday");
    if (selected.includes("Wednesday")) sorted.push("Wednesday");
    if (selected.includes("Thursday")) sorted.push("Thursday");
    if (selected.includes("Friday")) sorted.push("Friday");
    _setDays(sorted);
    setClassroom({ ...classroom, available_days: sorted.join("-") });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClassroom({ ...classroom, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handler(classroom);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-8 space-y-2">
      <InputWithLabel label={t("classrooms.floor")}>
        <input
          type="number"
          name="floor_number"
          value={classroom.floor_number}
          onChange={handleChange}
          placeholder={t("classrooms.floor")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label={t("classrooms.code")}>
        <input
          type="text"
          name="classroom_id"
          value={classroom.classroom_id}
          onChange={handleChange}
          placeholder={t("classrooms.code")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label={t("classrooms.capacity")}>
        <input
          type="number"
          name="capacity"
          value={classroom.capacity}
          onChange={handleChange}
          placeholder={t("classrooms.capacity")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <input
        type="text"
        name="available_days"
        value={days.join(", ")}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder={t("classrooms.availableDays")}
        disabled
      />
      <DaysDropdown
        title={t("classrooms.selectAvailableDays")}
        days={days}
        setDays={setDays}
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

function InputWithLabel({
  label,
  children,
}: {
  label: string;
  children: JSX.Element;
}) {
  return (
    <div className="relative">
      <label className="text-[13px] bg-white text-[#333] absolute px-2 top-[-10px] left-[18px]">
        {label}
      </label>
      {children}
    </div>
  );
}

export default AddClassroomForm;
