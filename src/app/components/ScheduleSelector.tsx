"use client";

import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, Fragment } from "react";
import Modal from "./Modal";
import { ScheduleMeta } from "../models";
import { useTranslation } from "react-i18next";

const ScheduleSelector = ({
  api,
  hrefBase,
}: {
  api: string;
  hrefBase: string;
}) => {
  const [t, i18n] = useTranslation("global");
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [schedules, setSchedules] = useState<ScheduleMeta[]>([]);
  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .catch(() => {})
      .then((data) => {
        setSchedules(data.schedules as ScheduleMeta[]);
        setLoading(false);
      })
      .catch(() => {});
  }, [api]);

  return (
    <div className="p-8 bg-slate-100 shadow-md rounded-2xl">
      <h2 className="font-bold text-xl text-center mb-4">Schedules</h2>
      <ul className="border border-slate-500">
        {loading ? (
          <li>{t("feedback.loading")}</li>
        ) : (
          <SchedulesTable
            headers={[
              t("selector.createdAt"),
              t("selector.status"),
              t("selector.summary"),
            ]}
            schedules={schedules}
            hrefBase={hrefBase}
            setModalState={setModalState}
            setModalText={setModalText}
          />
        )}
      </ul>
      {modalState && (
        <Modal
          isWide={true}
          close={() => {
            setModalState(false);
          }}
        >
          <div className="my-8">
            {modalText
              .trim()
              .split("\n")
              .map((para, i) => (
                <Fragment key={i}>
                  <p>{para}</p>
                  {para.length == 0 && <hr className="my-2" />}
                </Fragment>
              ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

function SchedulesTable({
  headers,
  schedules,
  hrefBase,
  setModalState,
  setModalText,
}: {
  headers: string[];
  schedules: ScheduleMeta[];
  hrefBase: string;
  setModalState: Function;
  setModalText: Function;
}) {
  return (
    <div className="relative overflow-x-auto max-h-[60svh]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 sticky top-0 scroll shadow-md uppercase bg-gray-50">
          <tr>
            {headers.map((h, i) => {
              let className = "px-6 py-3";
              if (i != 0) className += " text-center";
              return (
                <th scope="col" className={className} key={h}>
                  {h}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {schedules.map((s: ScheduleMeta, _) => (
            <ReadRow
              key={s.id}
              timestamp={s.id}
              status={s.status}
              hrefBase={hrefBase}
              setModalState={setModalState}
              setModalText={() => setModalText(s.report)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReadRow({
  timestamp,
  status,
  hrefBase,
  setModalState,
  setModalText,
}: {
  timestamp: string;
  status: string;
  hrefBase: string;
  setModalState: Function;
  setModalText: Function;
}) {
  return (
    <tr
      className="bg-white hover:bg-slate-50 border-b hover:cursor-pointer last:border-none"
      key={timestamp}
      onClick={() => {
        location.assign(hrefBase + timestamp);
      }}
    >
      <td className="px-6 py-4">{timeConverter(Number.parseInt(timestamp))}</td>
      <td className="px-6 py-4 text-center">{status}</td>
      <td className="pl-6 text-center">
        <FontAwesomeIcon
          icon={faCircleInfo}
          className="cursor-pointer pr-6 text-slate-500 text-lg hover:text-slate-900"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setModalState(true);
            setModalText(timestamp);
          }}
        />
      </td>
    </tr>
  );
}

function timeConverter(timestamp: number) {
  const a = new Date(timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time =
    (date < 10 ? "0" + date : date) +
    " " +
    month +
    " " +
    year +
    " " +
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (min < 10 ? "0" + min : min) +
    ":" +
    (sec < 10 ? "0" + sec : sec);
  return time;
}

export default ScheduleSelector;
