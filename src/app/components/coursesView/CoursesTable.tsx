import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Course } from "../../models";
import {
  faArrowLeftRotate,
  faCheck,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function CoursesTable({
  headers,
  courses,
  setCourses,
}: {
  headers: string[];
  courses: Course[];
  setCourses: Function;
}) {
  const [edit, setEdit] = useState(-1);

  const remove = (i: number) => {
    courses.splice(i, 1);
    setCourses([...courses]);
  };
  const save = (i: number, c: Course) => {
    courses[i] = c;
    setCourses([...courses]);
  };

  return (
    <div className="relative overflow-x-auto">
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
          {courses.map((course, i) => {
            if (i == edit)
              return (
                <WriteRow
                  key={i}
                  course={course}
                  i={i}
                  edit={setEdit}
                  save={save}
                />
              );
            else
              return (
                <ReadRow
                  key={i}
                  course={course}
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
  course,
  edit,
  remove,
}: {
  i: number;
  course: Course;
  edit: Function;
  remove: Function;
}) {
  return (
    <tr className="bg-white hover:bg-slate-50 border-b" key={i}>
      <td className="px-6 py-4">{course.Section}</td>
      <td className="px-6 py-4">{course.Course_Code}</td>
      <td className="px-6 py-4">{course.Course_Name}</td>
      <td className="px-6 py-4">{course.Number_of_Students}</td>
      <td className="px-6 py-4">{course.Course_Environment}</td>
      <td className="px-6 py-4">{course["T+U"]}</td>
      <td className="px-6 py-4">{course.AKTS}</td>
      <td className="px-6 py-4">{course.Class}</td>
      <td className="px-6 py-4">{course.Depertmant}</td>
      <td className="px-6 py-4">{course.Lecturer}</td>
      <td className="px-6 py-4">{course.Department}</td>
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
  course,
  edit,
  save,
}: {
  i: number;
  course: Course;
  edit: Function;
  save: Function;
}) {
  const [c, setCourse] = useState<Course>({ ...course });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourse({ ...c, [name]: value });
  };

  return (
    <tr className="bg-slate-100 text-black border-b" key={i}>
      <td className="px-6 py-4">
        <input
          type="number"
          name="Section"
          value={c.Section}
          onChange={handleChange}
          className="bg-transparent w-8 underline focus:outline-none"
          autoFocus={true}
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="Course_Code"
          value={c.Course_Code}
          onChange={handleChange}
          className="bg-transparent w-20 underline focus:outline-none"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="Course_Name"
          value={c.Course_Name}
          onChange={handleChange}
          className="bg-transparent w-28 underline focus:outline-none"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="number"
          name="Number_of_Students"
          value={c.Number_of_Students}
          onChange={handleChange}
          className="bg-transparent w-12 underline focus:outline-none"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="Course_Environment"
          value={c.Course_Environment}
          onChange={handleChange}
          className="bg-transparent w-28 underline focus:outline-none"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="T+U"
          value={c["T+U"]}
          onChange={handleChange}
          className="bg-transparent w-8 underline focus:outline-none"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="number"
          name="AKTS"
          value={c.AKTS}
          onChange={handleChange}
          className="bg-transparent w-8 underline focus:outline-none"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="number"
          name="Class"
          value={c.Class}
          onChange={handleChange}
          className="bg-transparent w-8 underline focus:outline-none"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="Depertmant"
          value={c.Depertmant}
          onChange={handleChange}
          className="bg-transparent w-28 underline focus:outline-none"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="Lecturer"
          value={c.Lecturer}
          onChange={handleChange}
          className="bg-transparent w-28 underline focus:outline-none"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="Department"
          value={c.Department}
          onChange={handleChange}
          className="bg-transparent w-28 underline focus:outline-none"
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

export default CoursesTable;
