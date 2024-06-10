"use client";
import React from "react";
import Table from "./table/Table";
import { ISlotProps } from "./table/Slot";
import Day from "./table/Day";

export interface ITableWithNamesProps {
  data: string;
}

type Course = {
  course_code: string;
  day: number;
  time: number;
  duration: number;
  classroom: string;
  grade: number;
  department: string;
  course_name: string;
  lecturer: string;
};

const TableWithNames: React.FC<ITableWithNamesProps> = ({ data }) => {
  const records: Array<Course> = [];
  data.split("\n").forEach((c) => {
    const rec = c.split(",");
    records.push({
      course_code: rec[0],
      day: Number(rec[1]),
      time: Number(rec[2]),
      duration: Number(rec[3]),
      classroom: rec[4],
      grade: Number(rec[5]),
      department: rec[6],
      course_name: rec[7],
      lecturer: rec[8],
    });
  });

  const headers = [
    { colSpan: 3, header: "" },
    { colSpan: 5, header: "1st Year" },
    { colSpan: 5, header: "2nd Year" },
    { colSpan: 5, header: "3rd Year" },
    { colSpan: 5, header: "4th Year" },
  ];

  const departmentNames: string[] = [];
  const allData: Map<string, Array<Array<Array<ISlotProps>>>> = new Map<
    string,
    Array<Array<Array<ISlotProps>>>
  >();
  // alldata["department"][day][grade][slot]
  records.forEach((r) => {
    if (r.course_code == "course_code" || r.course_code == "") return;
    if (!allData.has(r.department)) {
      departmentNames.push(r.department);
      const data: Array<Array<Array<ISlotProps>>> = [];
      for (let day = 0; day < 5; day++) {
        data.push(new Array<Array<ISlotProps>>());
        for (let grade = 0; grade < 4; grade++) {
          data.at(day)!.push(new Array<ISlotProps>());
          for (let slot = 0; slot < 9; slot++) {
            data
              .at(day)!
              .at(grade)!
              .push({ classroom: "", courseCode: "", rowSpan: 1 });
          }
        }
      }
      allData.set(r.department, data);
    }
    try {
      allData.get(r.department)![r.day][r.grade - 1][r.time / 60].classroom =
        r.classroom;
      allData.get(r.department)![r.day][r.grade - 1][r.time / 60].courseCode =
        r.course_code + "\n" + r.lecturer;
      allData.get(r.department)![r.day][r.grade - 1][r.time / 60].rowSpan =
        r.duration / 60;
    } catch (e) {}

    for (let i = 1; i < r.duration / 60; i++)
      allData.get(r.department)![r.day][r.grade - 1][
        r.time / 60 + i
      ].rowSpan = 0;
  });

  departmentNames.sort();

  return (
    <div>
      {departmentNames.map((d, key) => {
        return (
          <>
            <Table caption={d} headers={headers} key={key}>
              <Day
                className="bg-green-50"
                day="Monday"
                slots={allData.get(d)?.at(0)!}
              />
              <Day
                className=" bg-purple-50"
                day="Tuesday"
                slots={allData.get(d)?.at(1)!}
              />
              <Day
                className=" bg-yellow-50"
                day="Wednesday"
                slots={allData.get(d)?.at(2)!}
              />
              <Day
                className=" bg-blue-50"
                day="Thursday"
                slots={allData.get(d)?.at(3)!}
              />
              <Day
                className=" bg-red-50"
                day="Friday"
                slots={allData.get(d)?.at(4)!}
              />
            </Table>
            <br />
            <br />
            <div className="page-break"></div>
          </>
        );
      })}
    </div>
  );
};

export default TableWithNames;
