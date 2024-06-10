import ScheduleSelector from "../components/ScheduleSelector";

export default function Regular() {
  return (
    <main>
      <div className="flex justify-around pt-16">
        <ScheduleSelector
          api={process.env.SERVER_ENDPOINT as string}
          hrefBase="/regular/"
        />
      </div>
    </main>
  );
}
