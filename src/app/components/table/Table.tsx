import { Children } from "react";
import Day, { IDayProps } from "./Day";

type header = {
  colSpan: number;
  header: string;
};

export interface ITableProps {
  caption: null | string;
  children: JSX.Element | JSX.Element[];
  headers: Array<header>;
}

const Table: React.FC<ITableProps> = ({
  caption,
  children,
  headers,
}: ITableProps) => {
  return (
    <table className="border border-black">
      <caption className="border border-black font-bold text-2xl">
        {caption}
      </caption>
      <thead>
        <tr className="border border-black">
          {headers.map((h, i) => (
            <th colSpan={h.colSpan} key={i} className="border border-black">
              {h.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="border border-black">{children}</tbody>
    </table>
  );
};

export default Table;
