"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import TableWithNames from "@/app/components/TableWithNames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useReactToPrint } from "react-to-print";

export default function Page() {
  const [csvContent, setCsvContent] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    pageStyle:
      ".page {margin-top:0 !important;gap: 0 !important;}table{margin-top: 32px;}@media print {@page { size: landscape; }}",
  });

  useEffect(() => {
    fetch((process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + "/" + id)
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
  if (!data) return <p>{id + " "}Not found</p>;

  return (
    <>
      <div
        className="w-full mx-auto max-w-fit flex flex-col gap-16 mt-8 page"
        ref={contentRef}
        id="body-withnames"
      >
        <TableWithNames data={csvContent} />
      </div>
      <FontAwesomeIcon
        icon={faFilePdf}
        transform="grow-25"
        onClick={handlePrint}
        className="absolute right-16 top-24"
      />
    </>
  );
}
