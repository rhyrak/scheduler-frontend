import { BaseSyntheticEvent, useEffect, useState } from "react";
import AddSplitForm from "./AddSplitForm";
import { Split } from "../../models";
import SplitTable from "./SplitTable";
import UploadButton from "../UploadButton";
import IconButton from "../IconButton";
import Modal from "../Modal";
import { Repository } from "../../repository";
import Papa from "papaparse";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function SplitView() {
  const [t, i18n] = useTranslation("global");
  const headers: string[] = [
    t("split.headers.department"),
    t("split.headers.course"),
    t("split.headers.duration"),
    t("split.headers.actions"),
  ];

  const [modalState, setModalState] = useState(false);
  const [split, _setSplit] = useState<Split[]>([]);
  useEffect(() => {
    _setSplit(Repository.GetSplit());
  }, []);

  const setSplit = (s: Split[]) => {
    Repository.SetSplit(s);
    _setSplit(s);
  };

  return (
    <div>
      <div className="flex flex-row space-x-4 pl-4 mb-4 justify-start">
        <UploadButton handler={readFile} />
        <IconButton
          text="Add Split Day"
          icon={faPlus}
          onClick={() => setModalState(true)}
        />
      </div>
      {modalState && (
        <Modal close={() => setModalState(false)}>
          <AddSplitForm
            handler={(s: Split) => {
              setSplit([s, ...split]);
              setModalState(false);
            }}
          />
        </Modal>
      )}

      <div className="mx-auto max-w-5xl border shadow-md mb-16 border-slate-100">
        <SplitTable headers={headers} split={split} setSplit={setSplit} />
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
      const expectedHeader = "Department;Course_Code;Half_Duration";
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

      Repository.SetSplit(result.data as Split[]);
      location.reload();
    },
    error: (err) => {
      alert("File upload failed:\n" + err);
    },
  });
}

export default SplitView;
