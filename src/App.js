import { useCallback, useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const debug = false;
  const [firePixels, setFirePixels] = useState([]);
  const fireWidth = 50;
  const fireHeigth = 50;
  const fireColorsPalette = [
    { r: 7, g: 7, b: 7 },
    { r: 31, g: 7, b: 7 },
    { r: 47, g: 15, b: 7 },
    { r: 71, g: 15, b: 7 },
    { r: 87, g: 23, b: 7 },
    { r: 103, g: 31, b: 7 },
    { r: 119, g: 31, b: 7 },
    { r: 143, g: 39, b: 7 },
    { r: 159, g: 47, b: 7 },
    { r: 175, g: 63, b: 7 },
    { r: 191, g: 71, b: 7 },
    { r: 199, g: 71, b: 7 },
    { r: 223, g: 79, b: 7 },
    { r: 223, g: 87, b: 7 },
    { r: 223, g: 87, b: 7 },
    { r: 215, g: 95, b: 7 },
    { r: 215, g: 95, b: 7 },
    { r: 215, g: 103, b: 15 },
    { r: 207, g: 111, b: 15 },
    { r: 207, g: 119, b: 15 },
    { r: 207, g: 127, b: 15 },
    { r: 207, g: 135, b: 23 },
    { r: 199, g: 135, b: 23 },
    { r: 199, g: 143, b: 23 },
    { r: 199, g: 151, b: 31 },
    { r: 191, g: 159, b: 31 },
    { r: 191, g: 159, b: 31 },
    { r: 191, g: 167, b: 39 },
    { r: 191, g: 167, b: 39 },
    { r: 191, g: 175, b: 47 },
    { r: 183, g: 175, b: 47 },
    { r: 183, g: 183, b: 47 },
    { r: 183, g: 183, b: 55 },
    { r: 207, g: 207, b: 111 },
    { r: 223, g: 223, b: 159 },
    { r: 239, g: 239, b: 199 },
    { r: 255, g: 255, b: 255 }
  ];

  function createFireStructure() {
    const newFirePixels = [];
    for (let row = 0; row < fireWidth; row++) {
      const theColumn = [];
      for (let column = 0; column < fireHeigth; column++) {
        theColumn[column] = 0;
      }
      newFirePixels.push(theColumn);
    }
    newFirePixels[newFirePixels.length - 1].map(
      (_, index) => (newFirePixels[newFirePixels.length - 1][index] = 36)
    );
    setFirePixels(newFirePixels);
  }

  const updateFireIntensityPerPixel = useCallback(
    (currRow, currColumn) => {
      if (currRow + 1 >= fireHeigth || currColumn + 1 > fireWidth) {
        return firePixels[currRow][currColumn];
      }

      const decay = Math.floor(Math.random() * 3);
      const belowPixelIntensity = firePixels[currRow + 1][currColumn];
      const newFireintensity = belowPixelIntensity - decay;
      return newFireintensity <= 0 ? 0 : newFireintensity;
    },
    [firePixels]
  );

  const calculateFirePropagation = useCallback(() => {
    const newFirePixels = [...firePixels];
    firePixels.length > 0 &&
      firePixels.map((fireRow, rowIndex) => {
        return (
          <tr>
            {fireRow.map(
              (_, columnIndex) =>
                (newFirePixels[rowIndex][
                  columnIndex
                ] = updateFireIntensityPerPixel(rowIndex, columnIndex))
            )}
          </tr>
        );
      });
    setFirePixels(newFirePixels);
  }, [firePixels, updateFireIntensityPerPixel]);

  useEffect(() => {
    createFireStructure();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(calculateFirePropagation, 1);
    return () => clearTimeout(timeout);
  }, [firePixels, calculateFirePropagation]);

  return (
    <div className="App">
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          {firePixels.length > 0 &&
            firePixels.map((fireRow, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {fireRow.map((fireData, columnIndex) => {
                    const color = fireColorsPalette[fireData];
                    return (
                      <td
                        key={columnIndex}
                        className="pixel"
                        style={{
                          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`
                        }}
                      >
                        {debug === true ? fireData : <></>}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
