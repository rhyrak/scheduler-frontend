import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Conflict } from "../../models";
import {
  faArrowLeftRotate,
  faCheck,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Repository } from "@/app/repository";
import SearchDropdown from "../SearchDropdown";

function ConflictsTable({
  headers,
  conflict,
  setConflict,
}: {
  headers: string[];
  conflict: Conflict[];
  setConflict: Function;
}) {
  const [edit, setEdit] = useState(-1);

  const remove = (i: number) => {
    conflict.splice(i, 1);
    setConflict([...conflict]);
  };
  const save = (i: number, c: Conflict) => {
    conflict[i] = c;
    setConflict([...conflict]);
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
          {conflict.map((c, i) => {
            if (i == edit)
              return (
                <WriteRow
                  key={i}
                  conflict={c}
                  i={i}
                  edit={setEdit}
                  save={save}
                />
              );
            else
              return (
                <ReadRow
                  key={i}
                  conflict={c}
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
  conflict,
  edit,
  remove,
}: {
  i: number;
  conflict: Conflict;
  edit: Function;
  remove: Function;
}) {
  return (
    <tr className="bg-white hover:bg-slate-50 border-b" key={i}>
      <td className="px-6 py-4">{conflict.Department1}</td>
      <td className="px-6 py-4">{conflict.Course_Code1}</td>
      <td className="px-6 py-4">{conflict.Department2}</td>
      <td className="px-6 py-4">{conflict.Course_Code2}</td>

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
  conflict,
  edit,
  save,
}: {
  i: number;
  conflict: Conflict;
  edit: Function;
  save: Function;
}) {
  const [c, setConflict] = useState<Conflict>({ ...conflict });

  return (
    <tr className="bg-slate-100 text-black border-b" key={i}>
      <td className="px-6 py-4">
        <SearchDropdown
          title={c.Department1}
          openTitle={c.Department1}
          options={Repository.GetDepartments()}
          setSelected={(sel: string) => {
            setConflict({ ...c, Department1: sel });
          }}
        />
      </td>
      <td className="px-6 py-4">
        <SearchDropdown
          title={c.Course_Code1}
          openTitle={c.Course_Code1}
          options={Repository.GetCourseCodes(c.Department1)}
          setSelected={(sel: string) => {
            setConflict({ ...c, Course_Code1: sel });
          }}
        />
      </td>
      <td className="px-6 py-4">
        <SearchDropdown
          title={c.Department2}
          openTitle={c.Department2}
          options={Repository.GetDepartments()}
          setSelected={(sel: string) => {
            setConflict({ ...c, Department2: sel });
          }}
        />
      </td>
      <td className="px-6 py-4">
        <SearchDropdown
          title={c.Course_Code2}
          openTitle={c.Course_Code2}
          options={Repository.GetCourseCodes(c.Department2)}
          setSelected={(sel: string) => {
            setConflict({ ...c, Course_Code2: sel });
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

export default ConflictsTable;
