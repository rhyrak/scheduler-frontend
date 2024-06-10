import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Classroom } from "../../models";
import {
  faArrowLeftRotate,
  faCheck,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DaysDropdown from "../DaysDropdown";
import { useTranslation } from "react-i18next";

function ClassroomsTable({
  headers,
  classrooms,
  setClassrooms,
}: {
  headers: string[];
  classrooms: Classroom[];
  setClassrooms: Function;
}) {
  const [edit, setEdit] = useState(-1);

  const remove = (i: number) => {
    classrooms.splice(i, 1);
    setClassrooms([...classrooms]);
  };
  const save = (i: number, c: Classroom) => {
    classrooms[i] = c;
    setClassrooms([...classrooms]);
  };

  return (
    <div className="relative overflow-x-auto min-h-screen">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headers.map((h) => {
              return (
                <th scope="col" className="px-6 py-3" key={h}>
                  {h}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom, i) => {
            if (i == edit)
              return (
                <WriteRow
                  key={i}
                  Classroom={classroom}
                  i={i}
                  edit={setEdit}
                  save={save}
                />
              );
            else
              return (
                <ReadRow
                  key={i}
                  Classroom={classroom}
                  i={i}
                  edit={setEdit}
                  remove={remove}
                />
              );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ReadRow({
  i,
  Classroom,
  edit,
  remove,
}: {
  i: number;
  Classroom: Classroom;
  edit: Function;
  remove: Function;
}) {
  return (
    <tr className="bg-white hover:bg-slate-50 border-b" key={i}>
      <td className="px-6 py-4">{Classroom.floor_number}</td>
      <td className="px-6 py-4">{Classroom.classroom_id}</td>
      <td className="px-6 py-4">{Classroom.capacity}</td>
      <td className="px-6 py-4">
        {Classroom.available_days.split("-").join(", ")}
      </td>
      <td className="pl-6 py-4 flex flex-row justify-start space-x-4">
        <FontAwesomeIcon
          icon={faPencil}
          className="cursor-pointer text-slate-500 hover:text-slate-900"
          onClick={() => edit(i)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer text-slate-500 hover:text-slate-900"
          onClick={() => remove(i)}
        />
      </td>
    </tr>
  );
}

function WriteRow({
  i,
  Classroom,
  edit,
  save,
}: {
  i: number;
  Classroom: Classroom;
  edit: Function;
  save: Function;
}) {
  const [t, i18n] = useTranslation("global");
  const [c, setClassroom] = useState<Classroom>({ ...Classroom });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setClassroom({ ...c, [name]: value });
  };
  const [days, _setDays] = useState<string[]>(c.available_days.split("-"));
  const setDays = (selected: string[]) => {
    const sorted = [];
    if (selected.includes("Monday")) sorted.push("Monday");
    if (selected.includes("Tuesday")) sorted.push("Tuesday");
    if (selected.includes("Wednesday")) sorted.push("Wednesday");
    if (selected.includes("Thursday")) sorted.push("Thursday");
    if (selected.includes("Friday")) sorted.push("Friday");
    _setDays(sorted);
    setClassroom({ ...c, available_days: sorted.join("-") });
  };

  return (
    <tr className="bg-slate-100 text-black border-b" key={i}>
      <td className="px-6 py-4">
        <input
          type="number"
          name="floor_number"
          value={c.floor_number}
          onChange={handleChange}
          className="bg-transparent w-8 underline focus:outline-none"
          autoFocus={true}
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="classroom_id"
          value={c.classroom_id}
          onChange={handleChange}
          className="bg-transparent w-20 underline focus:outline-none"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="number"
          name="capacity"
          value={c.capacity}
          onChange={handleChange}
          className="bg-transparent w-20 underline focus:outline-none"
        />
      </td>
      <td className="px-6 py-4">
        <DaysDropdown
          title={t("classrooms.selectAvailableDays")}
          days={days}
          setDays={setDays}
        />
      </td>
      <td className="pl-6 py-4 flex flex-row justify-start space-x-4">
        <FontAwesomeIcon
          icon={faCheck}
          className="cursor-pointer text-slate-500 hover:text-slate-900"
          onClick={() => {
            save(i, { ...c });
            edit(-1);
          }}
        />
        <FontAwesomeIcon
          icon={faArrowLeftRotate}
          className="cursor-pointer text-slate-500 hover:text-slate-900"
          onClick={() => edit(-1)}
        />
      </td>
    </tr>
  );
}

export default ClassroomsTable;
