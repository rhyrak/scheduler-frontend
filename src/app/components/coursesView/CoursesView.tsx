import { BaseSyntheticEvent, useEffect, useState } from "react";
import AddCourseForm from "./AddCourseForm";
import { Course } from "../../models";
import CoursesTable from "./CoursesTable";
import UploadButton from "../UploadButton";
import IconButton from "../IconButton";
import Modal from "../Modal";
import { Repository } from "../../repository";
import Papa from "papaparse";
import { faCross, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function CoursesView() {
  const headers: string[] = [
    "Section",
    "Course Code",
    "Course Name",
    "Number of Students",
    "Course Environment",
    "T+U",
    "AKTS",
    "Class",
    "Department",
    "Lecturer",
    "Department Code",
    "Actions",
  ];

  const [modalState, setModalState] = useState(false);
  const [courses, _setCourses] = useState<Course[]>([]);
  useEffect(() => {
    _setCourses(Repository.GetCourses());
  }, []);

  const setCourses = (c: Course[]) => {
    Repository.SetCourses(c);
    _setCourses(c);
  };

  return (
    <div>
      <div className="flex flex-row mb-4 justify-between">
        <div className="flex flex-row space-x-4 pl-4">
          <UploadButton handler={readFile} />
          <IconButton
            text="Add Course"
            icon={faPlus}
            onClick={() => setModalState(true)}
          />
        </div>
        <div className="pr-4">
          <IconButton
            text="Clear Table"
            icon={faTrash}
            onClick={() => {
              Repository.SetCourses([]);
              location.reload();
            }}
          />
        </div>
      </div>
      {modalState && (
        <Modal close={() => setModalState(false)}>
          <AddCourseForm
            handler={(course: Course) => {
              setCourses([course, ...courses]);
              setModalState(false);
            }}
          />
        </Modal>
      )}
      <CoursesTable
        headers={headers}
        courses={courses}
        setCourses={setCourses}
      />
    </div>
  );
}

function readFile(e: BaseSyntheticEvent) {
  const fileList = e.target.files;
  if (!fileList || fileList.length < 1) return;

  Papa.parse(e.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      const expectedHeader =
        "Section;Course_Code;Course_Name;Number_of_Students;Course_Environment;T+U;AKTS;Class;Depertmant;Lecturer;Department";
      const uploadedHeader = result.meta.fields?.join(";");
      if (uploadedHeader != expectedHeader) {
        alert(
          "Invalid csv format! Upload a csv file containing a header in the following format:\n" +
            expectedHeader +
            "\n\n" +
            "Uploaded file's header is:\n" +
            uploadedHeader
        );
      }

      Repository.SetCourses(result.data as Course[]);
      location.reload();
    },
    error: (err) => {
      alert("File upload failed:\n" + err);
    },
  });
}

export default CoursesView;
