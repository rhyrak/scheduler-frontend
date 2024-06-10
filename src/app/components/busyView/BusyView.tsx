import { BaseSyntheticEvent, useEffect, useState } from "react";
import AddBusyForm from "./AddBusyForm";
import { Busy } from "../../models";
import BusyTable from "./BusyTable";
import UploadButton from "../UploadButton";
import IconButton from "../IconButton";
import Modal from "../Modal";
import { Repository } from "../../repository";
import Papa from "papaparse";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function BusyView() {
  const headers: string[] = ["Lecturer", "Busy Day", "Actions"];

  const [modalState, setModalState] = useState(false);
  const [busy, _setBusy] = useState<Busy[]>([]);
  useEffect(() => {
    _setBusy(Repository.GetBusy());
  }, []);

  const setBusy = (c: Busy[]) => {
    Repository.SetBusy(c);
    _setBusy(c);
  };

  return (
    <div>
      <div className="flex flex-row space-x-4 pl-4 mb-4 justify-start">
        <UploadButton handler={readFile} />
        <IconButton
          text="Add Busy Day"
          icon={faPlus}
          onClick={() => setModalState(true)}
        />
      </div>
      {modalState && (
        <Modal close={() => setModalState(false)}>
          <AddBusyForm
            handler={(b: Busy) => {
              setBusy([b, ...busy]);
              setModalState(false);
            }}
          />
        </Modal>
      )}
      <div className="mx-auto max-w-5xl border shadow-md mb-16 border-slate-100">
        <BusyTable headers={headers} busy={busy} setBusy={setBusy} />
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
      const expectedHeader = "Lecturer;Busy_Day";
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

      Repository.SetBusy(result.data as Busy[]);
      location.reload();
    },
    error: (err) => {
      alert("File upload failed:\n" + err);
    },
  });
}

export default BusyView;
