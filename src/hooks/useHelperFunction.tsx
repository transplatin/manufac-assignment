type List = {
  Alcohol: number;
  Ash: number | string;
  Magnesium: number;
  Flavanoids: number | string;
  Proanthocyanins: string;
  Hue: number;
  Unknown: number;
  Gamma?: number;
  "Malic Acid": number;
  "Alcalinity of ash": number;
  "Total phenols": number;
  "Nonflavanoid phenols": number | string;
  "Color intensity": number | string;
  "OD280/OD315 of diluted wines": number | string;
};
type GammaArgs = {
  values: List[];
};
type HelperFunction = {
  calculateGammaList: (args: GammaArgs) => List[];
  groupBy: (list: List[], key: "Alcohol") => any;
};

const useHelperFunction = (): HelperFunction => {
/*
Function to calculate gamma for a dataset
Gamma = (Ash*Hue)/Magnesium
adds the new property Gamma to dataset 
return the dataset
*/
  const calculateGammaList = (data: GammaArgs): List[] => {
    const { values } = data;
    let gammaList = [];
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      gammaList.push({
        ...values[i],
        Gamma: +((+value.Ash * +value.Hue) / +value.Magnesium).toFixed(3),
      });
    }
    return gammaList;
  };
 /*

 Group dataset in different classes based on Alcohol property.

 */
  const groupBy = (list: List[], key: "Alcohol") => {
    let classes: any = {};             // Classes
    for (let i = 0; i < list.length; i++) {
       let val=list[i]
       /*
       checking if class exist
       if not exist then it creates a class and then pushes the data in that respective class
       if already exist then pushes the data to class
       also adds additional property of flavanoidsArr and gammaArr use later.
       */
      if (!classes[`${val[key]}`]) {       
        classes[`${val[key]}`] = {
          data: [val],
          flavanoidsArr: [val.Flavanoids],
          gammaArr: [val.Gamma],
        };
      } else {
        //If class exist
        classes[`${val[key]}`] = {
          data: [...classes[`${val[key]}`].data, val],
          flavanoidsArr: [
            ...classes[`${val[key]}`].flavanoidsArr,
            val.Flavanoids,
          ],
          gammaArr: [...classes[`${val[key]}`].gammaArr, val.Gamma],
        };
      }
    }
    return classes;
  };

  return { groupBy, calculateGammaList };
};

export default useHelperFunction;
