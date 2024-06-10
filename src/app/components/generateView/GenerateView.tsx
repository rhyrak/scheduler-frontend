import { Repository } from "@/app/repository";
import Papa from "papaparse";
import { useState } from "react";

function GenerateView() {
  const courses = Repository.GetCourses();
  const busy = Repository.GetBusy();
  const classroom = Repository.GetClassrooms();
  const conflict = Repository.GetConflict();
  const split = Repository.GetSplit();
  const reserved = Repository.GetReserved();

  const [response, setResponse] = useState<Response | string>();

  return (
    <div className="w-full">
      <div className="w-full mt-12 mx-auto max-w-lg bg-white shadow-lg rounded-md p-6 relative">
        <div className="flex items-center pb-3 border-b text-black">
          <h3 className="text-xl font-bold flex-1">Generate Schedule</h3>
        </div>
        <div className="my-6">
          <p className="text-m">Number of courses: {courses.length}</p>
          <p className="text-m">Number of classrooms: {classroom.length}</p>
          <p className="text-m">Number of busy days: {busy.length}</p>
          <p className="text-m">
            Number of additional conflicting courses: {conflict.length}
          </p>
          <p className="text-m">
            Number of courses to be split: {split.length}
          </p>
          <p className="text-m">
            Number of reserved courses: {reserved.length}
          </p>
        </div>
        <div className="border-t flex justify-end pt-6 space-x-4">
          <button
            type="button"
            className="px-6 py-2 rounded-md w-full text-white text-m border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
            onClick={() => handleGenerate(setResponse)}
          >
            Generate
          </button>
        </div>
        {response !== undefined && typeof response == typeof new Response() && (
          <>
            <hr className="my-2 invisible" />
            <p>Server response status:{(response as Response).status}</p>
          </>
        )}
        {response !== undefined && typeof response === "string" && (
          <>
            <hr className="my-2 invisible" />
            <p>{response as String}</p>
          </>
        )}
      </div>
    </div>
  );
}

async function handleGenerate(setResponse: Function) {
  const formData = generateFormData();
  await fetch("http://localhost:3001/schedule", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      setResponse(res);
    })
    .catch((err) => {
      console.log("err", err);
      setResponse("Connection to Server Failed");
    });
}

function generateFormData() {
  const formData = new FormData();
  const courses = Repository.GetCourses();
  const busy = Repository.GetBusy();
  const classroom = Repository.GetClassrooms();
  const conflict = Repository.GetConflict();
  const split = Repository.GetSplit();
  const reserved = Repository.GetReserved();

  formAppendCSV(formData, "courses", courses);
  formAppendCSV(formData, "busy", busy);
  formAppendCSV(formData, "classrooms", classroom);
  formAppendCSV(formData, "conflicts", conflict);
  formAppendCSV(formData, "splits", split);
  formAppendCSV(formData, "reserved", reserved);

  return formData;
}

function formAppendCSV(formData: FormData, name: string, data: any[]) {
  formData.append(
    name,
    new Blob([unparse(data)], { type: "text/csv" }),
    name + ".csv"
  );
}

function unparse(data: any[]) {
  return Papa.unparse(data, {
    delimiter: ";",
    header: true,
  });
}

export default GenerateView;
