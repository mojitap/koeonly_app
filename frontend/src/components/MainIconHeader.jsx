// src/components/MainIconHeader.jsx
import React from "react";

export default function MainIconHeader() {
  return (
    <header className="w-full flex justify-center items-center py-4 bg-white shadow-md fixed top-0 z-50">
      <img
        src="/koeonly_logo_128x128.png"
        alt="コエオンリー"
        className="h-12 w-12 object-contain"
      />
    </header>
  );
}
