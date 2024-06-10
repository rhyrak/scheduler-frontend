import React, { useState } from "react";
import { Conflict } from "../../models";
import { Repository } from "@/app/repository";
import SearchDropdown from "../SearchDropdown";
import { useTranslation } from "react-i18next";

const AddConflictForm = ({ handler }: { handler: Function }) => {
  const [t, i18n] = useTranslation("global");
  const [conflict, setConflict] = useState<Conflict>({
    Department1: "",
    Course_Code1: "",
    Department2: "",
    Course_Code2: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handler(conflict);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-8 space-y-2">
      <input
        type="text"
        name="Department1"
        value={conflict.Department1}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder={t("conflict.firstDepartment")}
        disabled
      />
      <SearchDropdown
        title={t("conflict.selectFirstDepartment")}
        openTitle={t("conflict.selectFirstDepartment")}
        options={Repository.GetDepartments()}
        setSelected={(s: string) => {
          setConflict({ ...conflict, Department1: s });
        }}
      />
      <input
        type="text"
        name="Course_Code1"
        value={conflict.Course_Code1}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder={t("conflict.firstCourse")}
        disabled
      />
      <SearchDropdown
        title={t("conflict.selectFirstCourse")}
        openTitle={t("conflict.selectFirstCourse")}
        options={Repository.GetCourseCodes(conflict.Department1)}
        setSelected={(s: string) => {
          setConflict({ ...conflict, Course_Code1: s });
        }}
      />
      <input
        type="text"
        name="Department2"
        value={conflict.Department2}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder={t("conflict.secondDepartment")}
        disabled
      />
      <SearchDropdown
        title={t("conflict.selectSecondDepartment")}
        openTitle={t("conflict.selectSecondDepartment")}
        options={Repository.GetDepartments()}
        setSelected={(s: string) => {
          setConflict({ ...conflict, Department2: s });
        }}
      />
      <input
        type="text"
        name="Course_Code2"
        value={conflict.Course_Code2}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder={t("conflict.secondCourse")}
        disabled
      />
      <SearchDropdown
        title={t("conflict.selectSecondCourse")}
        openTitle={t("conflict.selectSecondCourse")}
        options={Repository.GetCourseCodes(conflict.Department2)}
        setSelected={(s: string) => {
          setConflict({ ...conflict, Course_Code2: s });
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

export default AddConflictForm;
