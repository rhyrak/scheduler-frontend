"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./components/IconButton";
import ScheduleSelector from "./components/ScheduleSelector";

export default function Home() {
  return (
    <main>
      <div className=" max-w-5xl mx-auto mt-16">
        <a href="/new_schedule">
          <IconButton text="New Schedule" icon={faPlus} onClick={() => {}} />
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
