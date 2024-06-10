"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ListTable from "@/app/components/ListTable";
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

  const professors = new Map<string, string>();
  csvContent.split("\n").map((val) => {
    let items = val.split(",");
    const profName = items[8];
    val = items.join(",");
    if (profName == "lecturer") return;
    if (!professors.has(profName)) {
      professors.set(profName, "");
    }
    professors.set(profName, professors.get(profName) + val + "\n");
  });

  const values: string[] = [];
  const keys: string[] = [];
  const sortedProfessors = new Map(
    Array.from(professors.entries()).sort((a, b) => {
      const propA = a[0] != null ? a[0] : "";
      const propB = b[0] != null ? b[0] : "";
      return propA.localeCompare(propB);
    })
  );

  sortedProfessors.forEach((data, prof) => {
    if (data && prof) {
      keys.push(prof);
      values.push(data);
    }
  });
  return (
    <div className="w-full flex">
      <div className="w-9/12 max-w-7xl mx-auto" ref={contentRef}>
        {keys.map((element, index) => {
          return (
            <>
              <br />
              <ListTable
                header={element}
                listItems={values[index].split("\n")}
                which="professor"
                key={index}
              />
              <div className="page-break"></div>
            </>
          );
        })}
      </div>
      <FontAwesomeIcon
        icon={faFilePdf}
        transform="grow-25"
        onClick={handlePrint}
        className="sticky right-16 top-24"
      />
    </div>
  );
}
