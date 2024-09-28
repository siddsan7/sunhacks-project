import React from "react";

const getCustomColor = (index) => {
  const colors = [
    "#FF5733", // Custom color (hex)
    "#FF5733", // Custom color (hex)
    "#FF5733", // Custom color (hex)
    "#FF5733", // Custom color (hex)
    "#33C4FF", // Custom color (hex)
    "#33C4FF", // Custom color (hex)
    "#33C4FF", // Custom color (hex)
    "#33C4FF", // Custom color (hex)
    "#75FF33", // Custom color (hex)
    "#75FF33", // Custom color (hex)
    "#75FF33", // Custom color (hex)
    "#75FF33", // Custom color (hex)
    "#FFC300", // Custom color (hex)
    "#FFC300", // Custom color (hex)
    "#FFC300", // Custom color (hex)
    "#FFC300", // Custom color (hex)
  ];

  return colors[index % colors.length];
};

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Centered Box */}
      <div className="bg-white rounded-xl shadow-lg p-14">
        <div className="grid grid-cols-4 gap-6">
          {/* 4x4 Grid of Rounded Squares */}
          {Array.from({ length: 16 }).map((_, index) => (
            <div
              key={index}
              style={{ backgroundColor: getCustomColor(index) }} // Custom colors
              className="bg-blue-500 h-32 w-32 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
