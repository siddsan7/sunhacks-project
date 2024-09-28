import React from "react";
const squareTexts = [
  'Kick', 'Snare', 'Hi-Hat', 'Tom',
  'Cymbal', 'Clap', 'Percussion', 'FX',
  'Bass', 'Lead', 'Pad', 'Arp',
  'Vocal', 'Chords', 'String', 'Pluck'
];

const getCustomColor = (index) => {
  const colors = [
    "#FF5733",
    "#FF5733",
    "#FF5733",
    "#FF5733",
    "#33C4FF",
    "#33C4FF",
    "#33C4FF",
    "#33C4FF",
    "#75FF33",
    "#75FF33",
    "#75FF33",
    "#75FF33",
    "#FFC300",
    "#FFC300",
    "#FFC300",
    "#FFC300",
  ];

  return colors[index % colors.length];
};

function App() {
  const handleMouseEnter = (event) => {
    event.target.style.backgroundColor = "#909699"; // Gray color
  };

  const handleMouseLeave = (event) => {
    const index = event.target.getAttribute("data-index");
    event.target.style.backgroundColor = getCustomColor(index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Centered Box */}
      <div className="bg-white rounded-xl shadow-lg p-12">
        <div className="grid grid-cols-4 gap-6">
          {/* 4x4 Grid of Rounded Squares */}
          {Array.from({ length: 16 }).map((_, index) => (
            <div
              key={index}
              data-index={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ backgroundColor: getCustomColor(index) }} // Custom colors
              className="h-36 w-36 rounded-lg shadow-md transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <span className="text-center text-xl text-black pointer-events-none">
              {squareTexts[index]}
              </span>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
