import React, { useState } from "react";
import { Busy } from "../../models";
import DaysDropdown from "../DaysDropdown";
import Dropdown from "../Dropdown";
import { Repository } from "@/app/repository";
import SearchDropdown from "../SearchDropdown";

const AddBusyForm = ({ handler }: { handler: Function }) => {
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
        placeholder="Lecturer"
        disabled
      />
      <SearchDropdown
        title="Select Lecturer"
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
        placeholder="Busy Day"
        disabled
      />
      <Dropdown
        title="Select Day"
        options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
        setSelected={(s: string) => {
          setBusy({ ...busy, Busy_Day: s });
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

export default AddBusyForm;
