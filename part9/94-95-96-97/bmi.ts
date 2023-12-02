interface BMI {
  weight: number
  height: number
  bmi: string
}

interface Error {
  error: string 
}

export type BMIResult = BMI | Error;

const bmi = (weight: string, height: string): BMIResult => {
  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    return {
      error: 'malformatted inputs'
    };
  }

  const value = Number(weight) / (Number(height) * Number(height));
  let bmi;
  if (value < 18.50) {
    bmi = 'Underweight';
  } else if (value > 18.50 && value < 24.99) {
    bmi = 'Normal Weight';
  } else {
    bmi = 'Overweigth';
  }

  return {
    weight: Number(weight),
    height: Number(height),
    bmi
  };
};

export default bmi;

