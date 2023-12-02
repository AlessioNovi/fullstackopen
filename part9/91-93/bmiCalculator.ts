const bmi = (weight: number, height: number): string => {
  const value = weight / (height * height);

  if (value < 18.50) {
    return 'Underweight'
  } else if (value > 18.50 && value < 24.99) {
    return 'Normal Weight'
  } else {
    return 'Overweigth'
  }
} 

console.log(`BMI is ${bmi(70, 1.75)}`)
console.log(70 / (1.75 * 1.75 ))