import React, { useState } from "react";
import { Split } from "../../models";
import { Repository } from "@/app/repository";
import SearchDropdown from "../SearchDropdown";
import Dropdown from "../Dropdown";

const AddSplitForm = ({ handler }: { handler: Function }) => {
  const [Split, setSplit] = useState<Split>({
    Department: "",
    Course_Code: "",
    Half_Duration: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handler(Split);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-8 space-y-2">
      <input
        type="text"
        name="Department"
        value={Split.Department}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder="Department"
        disabled
      />
      <SearchDropdown
        title="Select Department"
        options={Repository.GetDepartments()}
        setSelected={(s: string) => {
          setSplit({ ...Split, Department: s });
        }}
      />
      <input
        type="text"
        name="Course_Code"
        value={Split.Course_Code}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder="Course"
        disabled
      />
      <SearchDropdown
        title="Select Course"
        options={Repository.GetCourseCodes(Split.Department)}
        setSelected={(s: string) => {
          setSplit({ ...Split, Course_Code: s });
        }}
      />
      <input
        type="text"
        name="Half_Duration"
        value={Split.Half_Duration}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder="Select Duration"
        disabled
      />
      <Dropdown
        title="Duration"
        options={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
        setSelected={(s: string) => {
          setSplit({ ...Split, Half_Duration: Number.parseInt(s) });
        }}
      />

      <button
        type="submit"
        className="px-6 py-3 !mt-8 w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full"
      >
        Add
      </button>
    </form>
  );
};

export default AddSplitForm;
