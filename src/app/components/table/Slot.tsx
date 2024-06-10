export interface ISlotProps {
  rowSpan: number;
  courseCode: string;
  classroom: string;
}

const Slot: React.FC<ISlotProps> = ({ rowSpan, courseCode, classroom }) => {
  if (rowSpan == 0) return <></>;
  return (
    <>
      <td
        colSpan={3}
        rowSpan={rowSpan}
        className="border border-black p-2 text-center min-w-48 max-w-56 whitespace-pre-line"
      >
        {courseCode}
      </td>
      <td
        colSpan={2}
        rowSpan={rowSpan}
        className="border border-black p-2 text-center min-w-24"
      >
        {classroom}
      </td>
    </>
  );
};

export default Slot;
