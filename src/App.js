import React, { useState } from "react";
import { Howl, Howler } from "howler";
import Switcher12 from "./Switcher12";

const squareTexts = [
  'Kick', 'Snare', 'Hi-Hat', 'Tom',
  'Cymbal', 'Clap', 'Percussion', 'FX',
  'Bass', 'Lead', 'Pad', 'Arp',
  'Vocal', 'Chords', 'String', 'Pluck'
];

const squareTextsLayered = [
  'Beat 1', 'Beat 2', 'Beat 3', 'Beat 4',
  'Sub bass 1', 'Sub bass 2', 'Sub bass 3', 'Sub bass 4',
  'Synth 1', 'Synth 2', 'Synth 3', 'Synth 4',
  'Vocal 1', 'Vocal 2', 'Vocal 3', 'Vocal 4'
];

const audioSources = []; // Fill this with your audio sources

const getCustomColor = (index) => {
  const colors = [
    "#FF5733", "#FF5733", "#FF5733", "#FF5733",
    "#33C4FF", "#33C4FF", "#33C4FF", "#33C4FF",
    "#75FF33", "#75FF33", "#75FF33", "#75FF33",
    "#FFC300", "#FFC300", "#FFC300", "#FFC300",
  ];
  return colors[index % colors.length];
};

const OneShotBeatpad = ({ handleSquareClick }) => (
  <div className="grid grid-cols-4 gap-6">
    {Array.from({ length: 16 }).map((_, index) => (
      <div
        key={index}
        data-index={index}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#909699"} // Hover color
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = getCustomColor(index)} // Reset color
        onClick={() => handleSquareClick(index)}
        style={{ backgroundColor: getCustomColor(index) }}
        className="h-36 w-36 rounded-lg shadow-md flex items-center justify-center transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl" // Added hover styles
      >
        <span className="text-center text-xl text-black pointer-events-none">
          {squareTexts[index]}
        </span>
      </div>
    ))}
  </div>
);

const LayeringBeatpad = ({ handleSquareClick }) => (
  <div className="grid grid-cols-4 gap-6">
    {Array.from({ length: 16 }).map((_, index) => (
      <div
        key={index}
        data-index={index}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#909699"} // Hover color
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = getCustomColor(index)} // Reset color
        onClick={() => handleSquareClick(index)}
        style={{ backgroundColor: getCustomColor(index) }}
        className="h-36 w-36 rounded-lg shadow-md flex items-center justify-center transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl" // Added hover styles
      >
        <span className="text-center text-xl text-black pointer-events-none">
          {squareTextsLayered[index]}
        </span>
      </div>
    ))}
  </div>
);

function App() {
  const [isLayering, setIsLayering] = useState(false); // State for layering mode

  const handleOneShotClick = (index) => {
    Howler.stop(); // Stop all sounds
    const sound = new Howl({
      src: [audioSources[index]],
      html5: true,
    });
    sound.play(); // Play the selected sound
  };

  const handleLayeringClick = (index) => {
    const sound = new Howl({
      src: [audioSources[index]],
      html5: true,
    });
    sound.play(); // Play the selected sound
  };

  const handleSquareClick = (index) => {
    if (isLayering) {
      handleLayeringClick(index); // Call layering click handler
    } else {
      handleOneShotClick(index); // Call one-shot click handler
    }
  };

  const toggleMode = (checked) => {
    setIsLayering(checked);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-16 relative">
        {/* Toggle Switch for One Shot/Layering */}
        <div className="absolute top-4 right-4 z-20">
          <Switcher12 onToggle={toggleMode} />
        </div>

        {/* Render the appropriate beatpad based on the layering state */}
        {isLayering ? (
          <LayeringBeatpad handleSquareClick={handleSquareClick} />
        ) : (
          <OneShotBeatpad handleSquareClick={handleSquareClick} />
        )}
      </div>
    </div>
  );
}

export default App;
