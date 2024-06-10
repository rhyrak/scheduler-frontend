import { BaseSyntheticEvent, useEffect, useState } from "react";
import AddConflictForm from "./AddConflictForm";
import { Conflict } from "../../models";
import ConflictTable from "./ConflictTable";
import UploadButton from "../UploadButton";
import IconButton from "../IconButton";
import Modal from "../Modal";
import { Repository } from "../../repository";
import Papa from "papaparse";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function ConflictView() {
  const [t, i18n] = useTranslation("global");
  const headers: string[] = [
    t("conflict.headers.firstDepartment"),
    t("conflict.headers.secondDepartment"),
    t("conflict.headers.firstCourse"),
    t("conflict.headers.secondCourse"),
    t("conflict.headers.actions"),
  ];

  const [modalState, setModalState] = useState(false);
  const [Conflict, _setConflict] = useState<Conflict[]>([]);
  useEffect(() => {
    _setConflict(Repository.GetConflict());
  }, []);

  const setConflict = (c: Conflict[]) => {
    Repository.SetConflict(c);
    _setConflict(c);
  };

  return (
    <div>
      <div className="flex flex-row space-x-4 pl-4 mb-4 justify-start">
        <UploadButton handler={readFile} />
        <IconButton
          text={t("button.addConflict")}
          icon={faPlus}
          onClick={() => setModalState(true)}
        />
      </div>
      {modalState && (
        <Modal close={() => setModalState(false)}>
          <AddConflictForm
            handler={(b: Conflict) => {
              setConflict([b, ...Conflict]);
              setModalState(false);
            }}
          />
        </Modal>
      )}

      <div className="mx-auto max-w-7xl border shadow-md mb-16 border-slate-100">
        <ConflictTable
          headers={headers}
          conflict={Conflict}
          setConflict={setConflict}
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
        "Department1;Course_Code1;Department2;Course_Code2";
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

      Repository.SetConflict(result.data as Conflict[]);
      location.reload();
    },
    error: (err) => {
      alert("File upload failed:\n" + err);
    },
  });
}

export default ConflictView;
