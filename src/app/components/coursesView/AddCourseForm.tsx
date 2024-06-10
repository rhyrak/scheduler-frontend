import React, { useState } from "react";
import { Course } from "../../models";

const AddCourseForm = ({ handler }: { handler: Function }) => {
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
          placeholder="Section"
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label="Course Code">
        <input
          type="text"
          name="Course_Code"
          value={course.Course_Code}
          onChange={handleChange}
          placeholder="Course Code"
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label="Course Name">
        <input
          type="text"
          name="Course_Name"
          value={course.Course_Name}
          onChange={handleChange}
          placeholder="Course Name"
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label="Number of Students">
        <input
          type="number"
          name="Number_of_Students"
          value={course.Number_of_Students}
          onChange={handleChange}
          placeholder="Number of Students"
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label="Course Environment">
        <input
          type="text"
          name="Course_Environment"
          value={course.Course_Environment}
          onChange={handleChange}
          placeholder="Course Environment"
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
      <InputWithLabel label="Class">
        <input
          type="number"
          name="Class"
          value={course.Class}
          onChange={handleChange}
          placeholder="Class"
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label="Department">
        <input
          type="text"
          name="Depertmant"
          value={course.Depertmant}
          onChange={handleChange}
          placeholder="Department"
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label="Lecturer">
        <input
          type="text"
          name="Lecturer"
          value={course.Lecturer}
          onChange={handleChange}
          placeholder="Lecturer"
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <hr className="invisible" />
      <InputWithLabel label="Department Code">
        <input
          type="text"
          name="Department"
          value={course.Department}
          onChange={handleChange}
          placeholder="Department Code"
          className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
          required
        />
      </InputWithLabel>
      <button
        type="submit"
        className="px-6 py-3 !mt-8 w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full"
      >
        Add
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
