import React, { useState } from "react";
import { Reserved } from "../../models";
import { Repository } from "@/app/repository";
import SearchDropdown from "../SearchDropdown";
import Dropdown from "../Dropdown";

const AddReservedForm = ({ handler }: { handler: Function }) => {
  const [reserved, setReserved] = useState<Reserved>({
    Department: "",
    Course_Code: "",
    Day: "",
    Starting_Time: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handler(reserved);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-8 space-y-2">
      <input
        type="text"
        name="Department"
        value={reserved.Department}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder="Department"
        disabled
      />
      <SearchDropdown
        title="Select Department"
        options={Repository.GetDepartments()}
        setSelected={(s: string) => {
          setReserved({ ...reserved, Department: s });
        }}
      />
      <input
        type="text"
        name="Course_Code"
        value={reserved.Course_Code}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder="Course"
        disabled
      />
      <SearchDropdown
        title="Select Course"
        options={Repository.GetCourseCodes(reserved.Department)}
        setSelected={(s: string) => {
          setReserved({ ...reserved, Course_Code: s });
        }}
      />
      <input
        type="text"
        name="Day"
        value={reserved.Day}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder="Select Day"
        disabled
      />
      <Dropdown
        title="Day"
        options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
        setSelected={(s: string) => {
          setReserved({ ...reserved, Day: s });
        }}
      />
      <input
        type="text"
        name="Starting_Time"
        value={reserved.Starting_Time}
        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
        placeholder="Select Starting Time"
        disabled
      />
      <Dropdown
        title="Starting Time"
        options={[
          "08:30",
          "09:30",
          "10:30",
          "11:30",
          "12:30",
          "13:30",
          "14:30",
          "15:30",
          "16:30",
        ]}
        setSelected={(s: string) => {
          setReserved({ ...reserved, Starting_Time: s });
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

export default AddReservedForm;
