import React, { useState } from "react";
import maleIcons from "../assets/icons/maleIcons";
import femaleIcons from "../assets/icons/femaleIcons";

export default function IconSelector({ selected, onSelect, initialTab = "male" }) {
  const [tab, setTab] = useState(initialTab);
  const icons = tab === "male" ? maleIcons : femaleIcons;

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold mb-2">アイコンを選択</h2>

      <div className="mb-4 flex justify-center gap-4">
        <button
          className={`px-3 py-1 rounded ${tab === "male" ? "bg-blue-300" : "bg-gray-200"}`}
          onClick={() => setTab("male")}
        >
          男性
        </button>
        <button
          className={`px-3 py-1 rounded ${tab === "female" ? "bg-pink-300" : "bg-gray-200"}`}
          onClick={() => setTab("female")}
        >
          女性
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 justify-items-center max-w-[320px] mx-auto">
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt={`icon-${index}`}
            className={`w-20 h-20 object-contain rounded-full border-2 cursor-pointer 
              ${selected === icon ? "border-blue-500" : "border-transparent"}`}
            onClick={() => onSelect(icon)}
          />
        ))}
      </div>
    </div>
  );
}