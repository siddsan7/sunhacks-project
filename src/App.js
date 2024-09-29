import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import Switcher12 from "./Switcher12";

// Square Texts
const squareTextsLayered = [
  ["Beat 1", "Beat 2", "Beat 3", "Beat 4"],
  ["Sub bass 1", "Sub bass 2", "Sub bass 3", "Sub bass 4"],
  ["Synth 1", "Synth 2", "Synth 3", "Synth 4"],
  ["Vocal 1", "Vocal 2", "Vocal 3", "Vocal 4"]
];

const audioSources = ['/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Drum Loops/Freeze 1-Drum Rack [2022-10-15 095511].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Drum Loops/Freeze 1-Drum Rack [2022-10-15 095544].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Drum Loops/Freeze 1-Drum Rack [2022-10-15 095607].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Drum Loops/Freeze 1-Drum Rack [2022-10-15 095617].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Sub-Bass Loops/Freeze 9-3 OP Boom [2022-10-15 095516].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Sub-Bass Loops/Freeze 9-3 OP Boom [2022-10-15 095544].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Sub-Bass Loops/Freeze 9-3 OP Boom [2022-10-15 095607].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Sub-Bass Loops/Freeze 9-3 OP Boom [2022-10-15 095617].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Synth Loops/Freeze 2-Troposphere Pad [2022-10-15 095508]-1.wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Synth Loops/Freeze 2-Troposphere Pad [2022-10-15 095544].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Synth Loops/Freeze 2-Troposphere Pad [2022-10-15 095607].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Synth Loops/Freeze 2-Troposphere Pad [2022-10-15 095617].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Vocal Loops/Freeze 4-Arcade [2022-10-15 095508]-1.wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Vocal Loops/Freeze 4-Arcade [2022-10-15 095544].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Vocal Loops/Freeze 4-Arcade [2022-10-15 095607].wav', '/PROJECT STEMS/TRUVONNE STEMS for Class 2022-2023/Vocal Loops/Freeze 7-Freeze 3-Arcade [2022-10-15 095617].wav']; // Fill this with your audio sources

// Function to generate colors for the squares
const getCustomColor = (index) => {
  const colors = ["#FF5733", "#33C4FF", "#75FF33", "#FFC300"];
  return colors[index % colors.length];
};

// LayeringBeatpad Component
const LayeringBeatpad = ({ handleSquareClick, toggleRowLayering, rowLayering, isLayering }) => (
  <div>
    {squareTextsLayered.map((row, rowIndex) => (
      <div key={rowIndex} className="flex mb-4 items-center">
        <div className="grid grid-cols-4 gap-6">
          {row.map((text, colIndex) => {
            const index = rowIndex * 4 + colIndex;
            return (
              <div
                key={index}
                data-index={index}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#909699")} // Hover color
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = getCustomColor(rowIndex))} // Reset color
                onClick={() => handleSquareClick(index, rowIndex)}
                style={{ backgroundColor: getCustomColor(rowIndex) }}
                className="h-36 w-36 rounded-lg shadow-md flex items-center justify-center transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              >
                <span className="text-center text-xl text-black pointer-events-none">
                  {text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Conditionally render the row switcher when in layering mode */}
        {isLayering && (
          <div className="ml-4">
            <Switcher12
              onToggle={() => toggleRowLayering(rowIndex)} // Toggle layering for each row
              isChecked={rowLayering[rowIndex]} // Reflect the current state for the row
            />
          </div>
        )}
      </div>
    ))}
  </div>
);

function App() {
  const [isLayering, setIsLayering] = useState(false); // Overall layering toggle
  const [rowLayering, setRowLayering] = useState([true, true, true, true]); // Row-specific layering
  const [currentSound, setCurrentSound] = useState(null); // Currently playing sound for one-shot mode

  const soundsByRow = {}; // Store currently playing sounds by row

  // Handle click for one-shot or layering behavior
  const handleSquareClick = (index, rowIndex) => {
    if (isLayering) {
      if (!rowLayering[rowIndex]) {
        // Stop only the sounds playing in the current row (one-shot mode)
        if (soundsByRow[rowIndex]) {
          soundsByRow[rowIndex].forEach((sound) => sound.stop());
        }
        soundsByRow[rowIndex] = [];
      }
      playSound(index, rowIndex);
    } else {
      // In one-shot mode: Stop currently playing sound
      if (currentSound) {
        currentSound.stop(); // Stop the currently playing sound
      }
      playSound(index); // Play the new sound
    }
  };

  const playSound = (index, rowIndex) => {
    const sound = new Howl({
      src: [audioSources[index]],
      html5: true
    });
    sound.play();

    // If in one-shot mode, keep track of the currently playing sound
    if (!isLayering) {
      setCurrentSound(sound);
    } else {
      // Track the sound by row
      if (!soundsByRow[rowIndex]) {
        soundsByRow[rowIndex] = [];
      }
      soundsByRow[rowIndex].push(sound); // Add sound to the row's playing list
    }
  };

  const toggleRowLayering = (rowIndex) => {
    setRowLayering((prevState) => {
      const newRowLayering = [...prevState];
      newRowLayering[rowIndex] = !newRowLayering[rowIndex]; // Toggle the state for the selected row
      return newRowLayering;
    });
  };

  const toggleMode = (checked) => {
    setIsLayering(checked);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyMap = {
        q: 0,
        w: 1,
        e: 2,
        r: 3,
        a: 4,
        s: 5,
        d: 6,
        f: 7,
        z: 8,
        x: 9,
        c: 10,
        v: 11,
        u: 12,
        i: 13,
        o: 14,
        p: 15
      };
  
      const index = keyMap[event.key.toLowerCase()];
      if (index !== undefined) {
        // Calculate the row index
        const rowIndex = Math.floor(index / 4);
        
        // Check if the row is in one-shot mode
        if (!rowLayering[rowIndex]) {
          // In one-shot mode, stop the current sound if there is one
          if (currentSound) {
            currentSound.stop(); // Stop currently playing sound
          }
        }
        
        // Call handleSquareClick regardless of mode
        handleSquareClick(index, rowIndex); // Pass both index and rowIndex
      }
    };
  
    window.addEventListener("keydown", handleKeyPress);
  
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isLayering, currentSound, rowLayering]); // Add rowLayering to dependencies
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-16 relative">
        {/* Toggle Switch for Overall One Shot/Layering */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
          <Switcher12
            isChecked={isLayering} // Pass the global state
            onToggle={toggleMode} // Pass the function that updates global mode
          />
        </div>

        {/* Render the LayeringBeatpad with row-specific toggling */}
        <LayeringBeatpad
          handleSquareClick={handleSquareClick}
          toggleRowLayering={toggleRowLayering}
          rowLayering={rowLayering}
          isLayering={isLayering} // Pass the global mode to conditionally render the row switches
        />
      </div>
    </div>
  );
}

export default App;