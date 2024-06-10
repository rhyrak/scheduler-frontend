import Slot, { ISlotProps } from "./Slot";
import Table from "./Table";

export interface IDayProps {
  day: string;
  slots: Array<Array<ISlotProps>>;
  className?: string;
}

const Day: React.FC<IDayProps> = ({ day, slots, className }: IDayProps) => {
  const hours = [
    "9:30 - 10:20",
    "10:30 - 11:20",
    "11:30 - 12:20",
    "12:30 - 13:20",
    "13:30 - 14:20",
    "14:30 - 15:20",
    "15:30 - 16:20",
    "16:30 - 17:20",
  ];
  return (
    <>
      <tr className={"border border-black " + className}>
        <th rowSpan={9} colSpan={1} className="-rotate-90  border border-black">
          {day}
        </th>
        <td
          colSpan={2}
          className="text-sm border border-black text-center px-2 py-1"
        >
          8:30 - 9:20
        </td>
        <Slot
          classroom={slots[0][0].classroom}
          courseCode={slots[0][0].courseCode}
          rowSpan={slots[0][0].rowSpan}
        />
        <Slot
          classroom={slots[1][0].classroom}
          courseCode={slots[1][0].courseCode}
          rowSpan={slots[1][0].rowSpan}
        />
        <Slot
          classroom={slots[2][0].classroom}
          courseCode={slots[2][0].courseCode}
          rowSpan={slots[2][0].rowSpan}
        />
        <Slot
          classroom={slots[3][0].classroom}
          courseCode={slots[3][0].courseCode}
          rowSpan={slots[3][0].rowSpan}
        />
      </tr>
      {hours.map((x, i) => {
        return (
          <tr className={"" + className} key={i}>
            <td
              colSpan={2}
              className="text-sm border border-black text-center px-2 py-1"
            >
              {x}
            </td>
            <Slot
              classroom={slots[0][i + 1].classroom}
              courseCode={slots[0][i + 1].courseCode}
              rowSpan={slots[0][i + 1].rowSpan}
            />
            <Slot
              classroom={slots[1][i + 1].classroom}
              courseCode={slots[1][i + 1].courseCode}
              rowSpan={slots[1][i + 1].rowSpan}
            />
            <Slot
              classroom={slots[2][i + 1].classroom}
              courseCode={slots[2][i + 1].courseCode}
              rowSpan={slots[2][i + 1].rowSpan}
            />
            <Slot
              classroom={slots[3][i + 1].classroom}
              courseCode={slots[3][i + 1].courseCode}
              rowSpan={slots[3][i + 1].rowSpan}
            />
          </tr>
        );
      })}
    </>
  );
};

export default Day;
