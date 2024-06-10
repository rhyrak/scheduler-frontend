import { BaseSyntheticEvent, useEffect, useState } from "react";
import AddReservedForm from "./AddReservationForm";
import { Reserved } from "../../models";
import UploadButton from "../UploadButton";
import IconButton from "../IconButton";
import Modal from "../Modal";
import { Repository } from "../../repository";
import Papa from "papaparse";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ReservedTable from "./ReservedTable";

function ReserveView() {
  const headers: string[] = [
    "Department",
    "Course",
    "Day",
    "Starting Time",
    "Actions",
  ];

  const [modalState, setModalState] = useState(false);
  const [reserved, _setReserved] = useState<Reserved[]>([]);
  useEffect(() => {
    _setReserved(Repository.GetReserved());
  }, []);

  const setReserved = (s: Reserved[]) => {
    Repository.SetReserved(s);
    _setReserved(s);
  };

  return (
    <div>
      <div className="flex flex-row space-x-4 pl-4 mb-4 justify-start">
        <UploadButton handler={readFile} />
        <IconButton
          text="Add Reserved Day"
          icon={faPlus}
          onClick={() => setModalState(true)}
        />
      </div>
      {modalState && (
        <Modal close={() => setModalState(false)}>
          <AddReservedForm
            handler={(s: Reserved) => {
              setReserved([s, ...reserved]);
              setModalState(false);
            }}
          />
        </Modal>
      )}

      <div className="mx-auto max-w-7xl border shadow-md mb-16 border-slate-100">
        <ReservedTable
          headers={headers}
          reserved={reserved}
          setReserved={setReserved}
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
      const expectedHeader = "Department;Course_Code;Day;Starting_Time";
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

      Repository.SetReserved(result.data as Reserved[]);
      location.reload();
    },
    error: (err) => {
      alert("File upload failed:\n" + err);
    },
  });
}

export default ReserveView;
