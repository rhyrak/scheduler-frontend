"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./components/IconButton";
import ScheduleSelector from "./components/ScheduleSelector";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [t, i18n] = useTranslation("global");

  return (
    <main>
      <div className=" max-w-5xl mx-auto mt-16">
        <a href="/new_schedule">
          <IconButton
            text={t("button.newSchedule")}
            icon={faPlus}
            onClick={() => {}}
          />
        </a>
        <hr className="invisible my-4" />
        <ScheduleSelector
          api={process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string}
          hrefBase="/regular/"
        />
        <hr className="invisible my-4" />
      </div>
    </main>
  );
}
