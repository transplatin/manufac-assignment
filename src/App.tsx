import { useEffect, useState } from "react";
import "./App.css";
import wineData from "./assets/Wine-Data.json";
import useHelperFunction from "./hooks/useHelperFunction";
import useUtility from "./hooks/useUtility";
import Table from "./components/Table";

function App() {

  const [mean, setMean] = useState<string[]>([]);
  const [median, setMedian] = useState<string[]>([]);
  const [classesList, setClassesList] = useState<string[]>([]);
  const [mode, setMode] = useState<any>([]);
  const [gammaMean, setGammaMean] = useState<string[]>([]);
  const [gammaMedian, setGammaMedian] = useState<string[]>([]);
  const [gammaMode, setGammaMode] = useState<any>([]);

  const { groupBy, calculateGammaList } = useHelperFunction();
  const { calculateMean, calculateMedian, calculateMode } = useUtility();

  useEffect(() => {
    const data = calculateGammaList({ values: wineData }); //Caculates gamma for every value in dataset
    /*
    Group the dataset based on Alcohol property, 
    also adds flavoindsArr ( Flavanoids array containing Flavanoids value for a particular class ) and
    gammaArr (Gamma array containing gamma values of particular class )
    */
    const classes = groupBy(data, "Alcohol"); 
    let keys = Object.keys(classes);   // Keys are different class names
    //To store temporary values
    let meanTemp: string[] = [];
    let medianTemp: string[] = [];
    let modeTemp: any = [];
    let gammaMeanTemp: string[] = [];
    let gammaMedianTemp: string[] = [];
    let gammaModeTemp: any = [];
    /*
      Iterating through every class and computing Flavanoids Mean,Flavanoids Median,Flavanoids Mode, Gamma Mean , Gamma Median , Gamma Mode for every class.
     */
    for (let i = 0; i < keys.length; i++) {
      let e = classes[keys[i]];
    
      meanTemp = [
        ...meanTemp,
        calculateMean({ values: e.flavanoidsArr }).toFixed(3),
      ];
      medianTemp = [
        ...medianTemp,
        calculateMedian({ values: e.flavanoidsArr }).toFixed(3),
      ];
      modeTemp = [...modeTemp, calculateMode({ values: e.flavanoidsArr })];
      gammaMeanTemp = [
        ...gammaMeanTemp,
        calculateMean({ values: e.gammaArr }).toFixed(3),
      ];
      gammaMedianTemp = [
        ...gammaMedianTemp,
        calculateMedian({ values: e.gammaArr }).toFixed(3),
      ];
      gammaModeTemp = [...gammaModeTemp, calculateMode({ values: e.gammaArr })];
      keys[i] = `Class ${keys[i]}`;
    }
    //Updating the states
    setMean(meanTemp);
    setMedian(medianTemp);
    setGammaMean(gammaMeanTemp);
    setGammaMedian(gammaMedianTemp);
    setMode(modeTemp);
    setGammaMode(gammaModeTemp);
    setClassesList(keys);
    // eslint-disable-next-line
  }, []);
  console.clear()
  return (
    <div className="App">
      <body className="App-header">
        <Table
          classList={classesList}
          mean={mean}
          median={median}
          mode={mode}
          rowTitles={["Flavanoids Mean","Flavanoids Median", "Flavanoids Mode"]}
          tableHeader="Statistical Values"
        />

        <Table
          classList={classesList}
          mean={gammaMean}
          median={gammaMedian}
          mode={gammaMode}
          rowTitles={["Gamma Mean","Gamma Median", "Gamma Mode"]}
          tableHeader="Statistical Values ( Gamma )"
          tableFooter
        />
      </body>
    </div>
  );
}

export default App;
