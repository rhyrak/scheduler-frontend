import React, { useState } from "react";
import { Course } from "../../models";
import { useTranslation } from "react-i18next";

const AddCourseForm = ({ handler }: { handler: Function }) => {
  const [t, i18n] = useTranslation("global");
  const [course, setCourse] = useState<Course>({
    Section: 1,
    Course_Code: "",
    Course_Name: "",
    Number_of_Students: 0,
    Course_Environment: "",
    "T+U": "",
    AKTS: 0,
    Class: 0,
    Depertmant: "",
    Lecturer: "",
    Department: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handler(course);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-8 space-y-2">
      <InputWithLabel label="Section">
        <input
          type="number"
          name="Section"
          value={course.Section}
          onChange={handleChange}
          placeholder={t("course.section")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label={t("course.code")}>
        <input
          type="text"
          name="Course_Code"
          value={course.Course_Code}
          onChange={handleChange}
          placeholder={t("course.code")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label={t("course.name")}>
        <input
          type="text"
          name="Course_Name"
          value={course.Course_Name}
          onChange={handleChange}
          placeholder={t("course.name")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label={t("course.numStudents")}>
        <input
          type="number"
          name="Number_of_Students"
          value={course.Number_of_Students}
          onChange={handleChange}
          placeholder={t("course.numStudents")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label={t("course.environment")}>
        <input
          type="text"
          name="Course_Environment"
          value={course.Course_Environment}
          onChange={handleChange}
          placeholder={t("course.environment")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label="T+U">
        <input
          type="text"
          name="TplusU"
          value={course["T+U"]}
          onChange={handleChange}
          placeholder="T+U"
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label="AKTS">
        <input
          type="number"
          name="AKTS"
          value={course.AKTS}
          onChange={handleChange}
          placeholder="AKTS"
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label={t("course.class")}>
        <input
          type="number"
          name="Class"
          value={course.Class}
          onChange={handleChange}
          placeholder={t("course.class")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label={t("course.department")}>
        <input
          type="text"
          name="Depertmant"
          value={course.Depertmant}
          onChange={handleChange}
          placeholder={t("course.department")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label={t("course.lecturer")}>
        <input
          type="text"
          name="Lecturer"
          value={course.Lecturer}
          onChange={handleChange}
          placeholder={t("course.lecturer")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label={t("course.departmentCode")}>
        <input
          type="text"
          name="Department"
          value={course.Department}
          onChange={handleChange}
          placeholder={t("course.departmentCode")}
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
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

export default AddCourseForm;
