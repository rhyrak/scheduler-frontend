interface Props {
  listItems: string[];
  which: string;
}

function ListComponent({ listItems, which }: Props) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  function calculateTime() {
    let time = parseInt(listItems[2]);
    let duration = parseInt(listItems[3]);

    let start = 8 + time / 60 + ":" + (30 + (time % 60));
    let end =
      8 + (time + duration) / 60 + ":" + (30 + ((time + duration) % 60) - 10);

    return start + " - " + end;
  }

  return (
    <tr className="even:bg-blue-50">
      <td className="p-4 text-sm text-black">{listItems[6]}</td>
      <td className="p-4 text-sm text-black">
        {which === "professor"
          ? listItems[4]
          : which === "class"
          ? listItems[8]
          : ""}
      </td>
      <td className="p-4 text-sm text-black">{listItems[0]}</td>
      <td className="p-4 text-sm text-black">{days[parseInt(listItems[1])]}</td>
      <td className="p-4 text-sm text-black">{calculateTime()}</td>
    </tr>
  );
}

export default ListComponent;
