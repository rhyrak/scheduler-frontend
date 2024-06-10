import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Busy } from "../../models";
import {
  faArrowLeftRotate,
  faCheck,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DaysDropdown from "../DaysDropdown";
import Dropdown from "../Dropdown";
import { Repository } from "@/app/repository";
import SearchDropdown from "../SearchDropdown";

function BusysTable({
  headers,
  busy,
  setBusy,
}: {
  headers: string[];
  busy: Busy[];
  setBusy: Function;
}) {
  const [edit, setEdit] = useState(-1);

  const remove = (i: number) => {
    busy.splice(i, 1);
    setBusy([...busy]);
  };
  const save = (i: number, c: Busy) => {
    busy[i] = c;
    setBusy([...busy]);
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
          {busy.map((b, i) => {
            if (i == edit)
              return (
                <WriteRow key={i} busy={b} i={i} edit={setEdit} save={save} />
              );
            else
              return (
                <ReadRow
                  key={i}
                  busy={b}
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
  busy,
  edit,
  remove,
}: {
  i: number;
  busy: Busy;
  edit: Function;
  remove: Function;
}) {
  return (
    <tr className="bg-white hover:bg-slate-50 border-b" key={i}>
      <td className="px-6 py-4">{busy.Lecturer}</td>
      <td className="px-6 py-4">{busy.Busy_Day}</td>

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
  busy,
  edit,
  save,
}: {
  i: number;
  busy: Busy;
  edit: Function;
  save: Function;
}) {
  const [c, setBusy] = useState<Busy>({ ...busy });

  return (
    <tr className="bg-slate-100 text-black border-b" key={i}>
      <td className="px-6 py-4">
        <SearchDropdown
          title={c.Lecturer}
          openTitle={c.Lecturer}
          options={Repository.GetProfessors()}
          setSelected={(sel: string) => {
            setBusy({ ...c, Lecturer: sel });
          }}
        />
      </td>
      <td className="px-6 py-4">
        <Dropdown
          title={c.Busy_Day}
          openTitle={c.Busy_Day}
          options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
          setSelected={(sel: string) => {
            setBusy({ ...c, Busy_Day: sel });
          }}
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

export default BusysTable;
