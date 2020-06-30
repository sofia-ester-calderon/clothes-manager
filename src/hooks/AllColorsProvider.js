import React from "react";
import { useState, useEffect } from "react";
import * as api from "../api/colorsApi";

export const AllColorsContext = React.createContext([]);

function AllColorsProvider({ children }) {
  const [allColors, setAllColors] = useState([]);

  useEffect(() => {
    async function getColorsFromApi() {
      const colorData = await api.getColors();
      setAllColors(colorData);
    }
    getColorsFromApi();
  }, []);

  return (
    <AllColorsContext.Provider value={allColors}>
      {children}
    </AllColorsContext.Provider>
  );
}

export default AllColorsProvider;
