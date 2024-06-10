import { useState } from "react";
import { useTranslation } from "react-i18next";

function SearchDropdown({
  title,
  openTitle,
  options,
  setSelected,
}: {
  title: string;
  openTitle?: string;
  options: string[];
  setSelected: Function;
}) {
  const [t, i18n] = useTranslation("global");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="relative font-[sans-serif]">
      <button
        type="button"
        className="px-5 py-2.5 rounded text-white text-sm font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
        onClick={() => setOpen(!open)}
      >
        {!open ? title : openTitle || "Confirm"}
      </button>

      {open && (
        <ul className="absolute shadow-lg bg-white py-2 px-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto">
          <li className="mb-2">
            <input
              placeholder={t("feedback.search")}
              className="px-4 py-2.5 w-full rounded text-[#333] text-sm border-none outline-blue-600 bg-blue-50 focus:bg-transparent"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </li>
          {options.map((op) => {
            return (
              op.toLowerCase().includes(search.toLowerCase()) && (
                <li
                  className="py-2.5 px-4 hover:bg-blue-50 rounded text-black text-sm cursor-pointer"
                  key={op}
                  onClick={() => {
                    setSelected(op);
                    setOpen(false);
                  }}
                >
                  {op}
                </li>
              )
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchDropdown;
