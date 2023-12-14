type Args = {
  values: number[];
};


type Utility = {

  calculateMean: (args: Args) => number;
  calculateMedian: (args: Args) => number;
  calculateMode: (args: Args) => number[];
};

//Custom hook for utility functions.

const useUtility = (): Utility => {


  // --------------------------  Mean --------------------------
  const calculateMean = (data: Args): number => {
    const { values } = data;
    let sum = 0,
      mean = 0;
    for (let i = 0; i < values.length; i++) {
      sum += +values[i];
    }
    mean = sum / values.length;
    return mean;
  };

  // --------------------------  Median --------------------------
  const calculateMedian = (data: Args): number => {
    let { values } = data;

    let N = values.length,
      median = 0,
      sortedData = values.sort((a, b) => a - b);

    if (N % 2 === 0) {
      median = +sortedData[N / 2 - 1] + +sortedData[N / 2];
      median = +median / 2;
    } else {
      median = +sortedData[parseInt((N / 2).toString())];
    }

    return median;
  };

  /* --------------------------  Mode --------------------------
     Haven't used Empirical Formula as it limits the results to single mode.
     this function can calculate Mode even for Multi-modal values in Time Complexity, N


    Iterating through all the values and using every value as a key for object , key:value pair as key:frequency of a particular value
    Assiging in object as key value will help in mapping the frequency of a particular value in single loop avoiding nested loops reducing complexity from NxN to N.
    Also counting the current maximum occurances of a particular value.

    For eg [1,2,2,4,6,6,6]
    will be stored as 
    {
      'val-1':1,
      'val-2':2,
      'val-4':1,
      'val-6':3
    }
    with maximum occurance will 3 and resulting mode will be [6].


    for Multi-modal list
            For eg [1,2,2,2,4,6,6,6]
    The maximum occurance will be 3 and resulting mode will be [2,6]
  */

  const calculateMode = (data: Args): number[] => {
    const { values } = data;
    let val: any = {}; // Object to store key:frequency of values.
    let currentMax = 0; //Current Maximum occurance
    let mode: number[] = [];

    for (let i = 0; i < values.length; i++) {
      if (val[`val-${values[i]}`]) {
        val[`val-${values[i]}`]++;
        if (currentMax < val[`val-${values[i]}`]) {
          currentMax = val[`val-${values[i]}`]; // Keeping track of the current maximum occurance
        }
      } else {
        val[`val-${values[i]}`] = 1;
      }
    }

    let keys = Object.keys(val);

    for (let i = 0; i < Object.keys(val).length; i++) {
      // Now iterating through it and comparing it with maximum occurance will give the required mode.
      if (val[keys[i]] === currentMax && currentMax!==1) {
        let index: any = keys[i].toString().split("-").pop(); // Extracting mode from keys
        mode.push(parseFloat(index));
      }
    }
    return mode;
  };

  return { calculateMean, calculateMedian, calculateMode };
};

export default useUtility;
