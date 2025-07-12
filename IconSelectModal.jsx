import React, { useState } from "react";
import maleIcons from "../assets/icons/maleIcons";
import femaleIcons from "../assets/icons/femaleIcons";

export default function IconSelectModal({ isOpen, onClose, onSelect }) {
  const [gender, setGender] = useState("male");
  const icons = gender === "male" ? maleIcons : femaleIcons;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-center mb-4">アイコンを選択</h3>

        <div className="flex justify-center gap-4 mb-4">
          <button onClick={() => setGender("male")} className={`px-3 py-1 rounded ${gender === "male" ? "bg-blue-300" : "bg-gray-200"}`}>男性</button>
          <button onClick={() => setGender("female")} className={`px-3 py-1 rounded ${gender === "female" ? "bg-pink-300" : "bg-gray-200"}`}>女性</button>
        </div>

        <div style={{ width: "270px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}>
            {icons.map((icon, idx) => (
              <img
                key={idx}
                src={icon}
                alt="icon"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  display: "block",
                }}
                onClick={() => {
                  onSelect(icon);
                  onClose();
                }}
                draggable={false}
              />
            ))}
          </div>
        </div>

        <button onClick={onClose} className="block mt-6 mx-auto text-sm text-gray-600 underline">閉じる</button>
      </div>
    </div>
  );
}