import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Split } from "../../models";
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

function SplitsTable({
  headers,
  split,
  setSplit,
}: {
  headers: string[];
  split: Split[];
  setSplit: Function;
}) {
  const [edit, setEdit] = useState(-1);

  const remove = (i: number) => {
    split.splice(i, 1);
    setSplit([...split]);
  };
  const save = (i: number, c: Split) => {
    split[i] = c;
    setSplit([...split]);
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
          {split.map((s, i) => {
            if (i == edit)
              return (
                <WriteRow key={i} split={s} i={i} edit={setEdit} save={save} />
              );
            else
              return (
                <ReadRow
                  key={i}
                  split={s}
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
  split,
  edit,
  remove,
}: {
  i: number;
  split: Split;
  edit: Function;
  remove: Function;
}) {
  return (
    <tr className="bg-white hover:bg-slate-50 border-b" key={i}>
      <td className="px-6 py-4">{split.Department}</td>
      <td className="px-6 py-4">{split.Course_Code}</td>
      <td className="px-6 py-4">{split.Half_Duration}</td>

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
  split,
  edit,
  save,
}: {
  i: number;
  split: Split;
  edit: Function;
  save: Function;
}) {
  const [s, setSplit] = useState<Split>({ ...split });

  return (
    <tr className="bg-slate-100 text-black border-b" key={i}>
      <td className="px-6 py-4">
        <SearchDropdown
          title={s.Department}
          openTitle={s.Department}
          options={Repository.GetDepartments()}
          setSelected={(sel: string) => {
            setSplit({ ...s, Department: sel });
          }}
        />
      </td>
      <td className="px-6 py-4">
        <SearchDropdown
          title={s.Course_Code}
          openTitle={s.Course_Code}
          options={Repository.GetCourseCodes(s.Department)}
          setSelected={(sel: string) => {
            setSplit({ ...s, Course_Code: sel });
          }}
        />
      </td>
      <td className="px-6 py-4">
        <Dropdown
          title={s.Half_Duration + ""}
          openTitle={s.Half_Duration + ""}
          options={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          setSelected={(sel: string) => {
            setSplit({ ...s, Half_Duration: Number.parseInt(sel) });
          }}
        />
      </td>
      <td className="pl-6 py-4 flex flex-row justify-start space-x-4">
        <FontAwesomeIcon
          icon={faCheck}
          className="cursor-pointer text-slate-500 hover:text-slate-900"
          onClick={() => {
            save(i, { ...s });
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

export default SplitsTable;
