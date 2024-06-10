import ScheduleSelector from "../components/ScheduleSelector";

export default function Classes() {
  return (
    <main>
      <div className="flex justify-around pt-16">
        <ScheduleSelector
          api={process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string}
          hrefBase="/classes/"
        />
      </div>
    </main>
  );
}
