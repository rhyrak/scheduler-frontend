import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Reserved } from "../../models";
import {
  faArrowLeftRotate,
  faCheck,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Repository } from "@/app/repository";
import SearchDropdown from "../SearchDropdown";
import Dropdown from "../Dropdown";

function ReservedTable({
  headers,
  reserved,
  setReserved,
}: {
  headers: string[];
  reserved: Reserved[];
  setReserved: Function;
}) {
  const [edit, setEdit] = useState(-1);

  const remove = (i: number) => {
    reserved.splice(i, 1);
    setReserved([...reserved]);
  };
  const save = (i: number, c: Reserved) => {
    reserved[i] = c;
    setReserved([...reserved]);
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
          {reserved.map((r, i) => {
            if (i == edit)
              return (
                <WriteRow
                  key={i}
                  reserved={r}
                  i={i}
                  edit={setEdit}
                  save={save}
                />
              );
            else
              return (
                <ReadRow
                  key={i}
                  reserved={r}
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
  reserved,
  edit,
  remove,
}: {
  i: number;
  reserved: Reserved;
  edit: Function;
  remove: Function;
}) {
  return (
    <tr className="bg-white hover:bg-slate-50 border-b" key={i}>
      <td className="px-6 py-4">{reserved.Department}</td>
      <td className="px-6 py-4">{reserved.Course_Code}</td>
      <td className="px-6 py-4">{reserved.Day}</td>
      <td className="px-6 py-4">{reserved.Starting_Time}</td>

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
  reserved,
  edit,
  save,
}: {
  i: number;
  reserved: Reserved;
  edit: Function;
  save: Function;
}) {
  const [r, setReserved] = useState<Reserved>({ ...reserved });

  return (
    <tr className="bg-slate-100 text-black border-b" key={i}>
      <td className="px-6 py-4">
        <SearchDropdown
          title={r.Department}
          openTitle={r.Department}
          options={Repository.GetDepartments()}
          setSelected={(sel: string) => {
            setReserved({ ...r, Department: sel });
          }}
        />
      </td>
      <td className="px-6 py-4">
        <SearchDropdown
          title={r.Course_Code}
          openTitle={r.Course_Code}
          options={Repository.GetCourseCodes(r.Department)}
          setSelected={(sel: string) => {
            setReserved({ ...r, Course_Code: sel });
          }}
        />
      </td>
      <td className="px-6 py-4">
        <Dropdown
          title={r.Day}
          openTitle={r.Day + ""}
          options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
          setSelected={(sel: string) => {
            setReserved({ ...r, Day: sel });
          }}
        />
      </td>
      <td className="px-6 py-4">
        <Dropdown
          title={r.Starting_Time}
          openTitle={r.Starting_Time}
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
            setReserved({ ...r, Starting_Time: s });
          }}
        />
      </td>
      <td className="pl-6 py-4 flex flex-row justify-start space-x-4">
        <FontAwesomeIcon
          icon={faCheck}
          className="cursor-pointer text-slate-500 hover:text-slate-900"
          onClick={() => {
            save(i, { ...r });
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

export default ReservedTable;
