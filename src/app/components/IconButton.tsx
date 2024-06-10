import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

function IconButton({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: IconDefinition;
  onClick: MouseEventHandler<HTMLLabelElement>;
}) {
  return (
    <label
      onClick={onClick}
      className="flex flex-row flex-nowrap items-center bg-gray-800 hover:bg-gray-700 max-h-12 text-white text-base px-5 py-3 outline-none rounded cursor-pointer font-[sans-serif]"
    >
      <FontAwesomeIcon icon={icon} className="mr-2 w-4 h-4" />
      {text}
    </label>
  );
}

export default IconButton;
