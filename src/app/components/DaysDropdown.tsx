import { useState } from "react";

function DaysDropdown({
  title,
  days,
  setDays,
}: {
  title: string;
  days: string[];
  setDays: Function;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative font-[sans-serif]">
      <button
        type="button"
        className="px-5 py-2.5 rounded text-white text-sm font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
        onClick={() => setOpen(!open)}
      >
        {!open ? title : "Confirm"}
      </button>

      {open && (
        <ul className="absolute shadow-lg bg-white py-2 px-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => {
            return (
              <li
                className="py-2.5 px-4 hover:bg-blue-50 rounded text-black text-sm cursor-pointer"
                key={d}
                onClick={() => {
                  const checked = days.includes(d);
                  if (!checked) {
                    setDays([...days, d]);
                  } else {
                    const filtered = [...days].filter((day) => day != d);
                    console.log(filtered);
                    setDays([...filtered]);
                  }
                }}
              >
                <div className="flex items-center">
                  <input
                    id={d}
                    disabled
                    type="checkbox"
                    className="hidden peer"
                    checked={days.includes(d)}
                  />
                  <label
                    htmlFor={d}
                    className="relative mr-3 flex items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-600 border rounded overflow-hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full fill-white"
                      viewBox="0 0 520 520"
                    >
                      <path
                        d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                        data-name="7-Check"
                        data-original="#000000"
                      />
                    </svg>
                  </label>
                  {d}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DaysDropdown;
