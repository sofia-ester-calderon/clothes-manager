import React from "react";
import { useState, useEffect } from "react";
import { Colors } from "../data/data";

export const AllColorsContext = React.createContext([]);

function AllColorsProvider({ children }) {
  const [allColors, setAllColors] = useState([]);

  useEffect(() => {
    setTimeout(function () {
      setAllColors(Colors);
    }, 1000);
  }, []);

  return (
    <AllColorsContext.Provider value={allColors}>
      {children}
    </AllColorsContext.Provider>
  );
}

export default AllColorsProvider;
