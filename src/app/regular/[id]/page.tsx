"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import RegularTable from "@/app/components/RegularTable";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { ResultRow } from "@/app/models";

export default function Page() {
  const [csvContent, setCsvContent] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);
  const { id } = useParams();
  const contentRef = useRef(null);
  const [jsonData, setJsonData] = useState<ResultRow[]>([]);
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    pageStyle:
      ".page {margin-top:0 !important;gap: 0 !important;}table{margin-top: 32px;}@media print {@page { size: landscape; }}",
  });

  const convertCsvToJson = (csv: string) => {
    Papa.parse(csv, {
      header: true,
      complete: (result) => {
        setJsonData(result.data as ResultRow[]);
      },
      error: (error: Error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };

  useEffect(() => {
    fetch("http://localhost:3001/schedule/" + id)
      .then((res) => res.json())
      .catch(() => {
        setLoading(false);
        setData(null);
      })
      .then((data) => {
        setData(data);
        setCsvContent(data["data"]);
        setLoading(false);
      })
      .catch(() => {});
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (!data)
    return (
      <h3 className="m-auto text-center mt-4 text-lg">
        Please wait while your schedule is being created. This process may take
        a few minutes.
      </h3>
    );

  const handleDownloadExcel = () => {
    convertCsvToJson(csvContent);

    if (jsonData == null) {
      console.log("jsonData null regular page.js file");
      return;
    }
    jsonData.sort((a: ResultRow, b: ResultRow) => {
      if (a.department !== b.department) {
        return a.department.localeCompare(b.department);
      } else if (a.grade !== b.grade) {
        return parseInt(a.grade) - parseInt(b.grade);
      } else if (a.day !== b.day) {
        return parseInt(a.day) - parseInt(b.day);
      } else {
        return parseInt(a.time) - parseInt(b.time);
      }
    });

    jsonData.forEach((element: ResultRow) => {
      element.day = days[parseInt(element.day)];
      let time = parseInt(element.time);
      let duration = parseInt(element.duration);

      let start = 8 + time / 60 + ":" + (30 + (time % 60));
      let end =
        8 + (time + duration) / 60 + ":" + (30 + ((time + duration) % 60) - 10);

      element.time = start + " - " + end;
    });

    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(data);
    const a = document.createElement("a");

    a.href = url;
    a.download = "schedule.xlsx";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div
        className="w-full mx-auto max-w-fit flex flex-col gap-16 mt-8 page"
        ref={contentRef}
        id="body-regular"
      >
        <RegularTable data={csvContent} />
      </div>
      <FontAwesomeIcon
        icon={faFilePdf}
        transform="grow-25"
        onClick={handlePrint}
        className="absolute right-16 top-24"
      />
      <FontAwesomeIcon
        icon={faFileExcel}
        transform="grow-25"
        className="absolute right-[72px] top-44"
        onClick={handleDownloadExcel}
      />
    </>
  );
}
