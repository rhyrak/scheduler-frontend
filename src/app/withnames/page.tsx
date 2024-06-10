import ScheduleSelector from "../components/ScheduleSelector";

export default function WithNames() {
  return (
    <main>
      <div className="flex justify-around pt-16">
        <ScheduleSelector
          api={process.env.SERVER_ENDPOINT as string}
          hrefBase="/withnames/"
        />
      </div>
    </main>
  );
}
