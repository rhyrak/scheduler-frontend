import { BaseSyntheticEvent, useEffect, useState } from "react";
import AddClassroomForm from "./AddClassroomForm";
import { Classroom } from "../../models";
import ClassroomsTable from "./ClassroomsTable";
import UploadButton from "../UploadButton";
import IconButton from "../IconButton";
import Modal from "../Modal";
import { Repository } from "../../repository";
import Papa from "papaparse";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function ClassroomsView() {
  // floor_number	classroom_id	capacity	available_days

  const headers: string[] = [
    "Floor",
    "Classroom ID",
    "Capacity",
    "Available Days",
    "Actions",
  ];

  const [modalState, setModalState] = useState(false);
  const [classrooms, _setClassrooms] = useState<Classroom[]>([]);
  useEffect(() => {
    _setClassrooms(Repository.GetClassrooms());
  }, []);

  const setClassrooms = (c: Classroom[]) => {
    Repository.SetClassrooms(c);
    _setClassrooms(c);
  };

  return (
    <div>
      <div className="flex flex-row space-x-4 pl-4 mb-4 justify-start">
        <UploadButton handler={readFile} />
        <IconButton
          text="Add Classroom"
          icon={faPlus}
          onClick={() => setModalState(true)}
        />
      </div>
      {modalState && (
        <Modal close={() => setModalState(false)}>
          <AddClassroomForm
            handler={(Classroom: Classroom) => {
              setClassrooms([Classroom, ...classrooms]);
              setModalState(false);
            }}
          />
        </Modal>
      )}
      <div className="mx-auto max-w-7xl border shadow-md mb-16 border-slate-100">
        <ClassroomsTable
          headers={headers}
          classrooms={classrooms}
          setClassrooms={setClassrooms}
        />
      </div>
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
        "floor_number;classroom_id;capacity;available_days";
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

      Repository.SetClassrooms(result.data as Classroom[]);
      location.reload();
    },
    error: (err) => {
      alert("File upload failed:\n" + err);
    },
  });
}

export default ClassroomsView;
