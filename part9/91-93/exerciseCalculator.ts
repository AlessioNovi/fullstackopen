interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: 1 | 2 | 3 | null,
  ratingDescription: 'OK' | 'ENOUGH' | 'BAD' | 'NOT CALCULATED',
  target: number,
  average: number
}

interface ParsedArgs {
  days: number[]
  target: number
}

const validateArgv = (args: string[]): ParsedArgs => {
  if (args.length <= 1) throw Error('Not enough arguments')
  console.log(args)
  const target = args[0]
  const days = args.slice(1)

  const invalidDays: boolean = days.some((day) => isNaN(Number(day)))

  if (isNaN(Number(target)) || invalidDays) {
    throw Error('Passed invalid arguemnts')
  }

  const convertedDays = days.map((day) => Number(day))

  return {
    days: convertedDays,
    target: Number(target)
  }
}

const calculateExercises = (target: number, days: number[]): Result => {
  const trainingDays = days.filter((day) => day > 0).length;
  const average = days.reduce((acc, val) => acc + val) / days.length
  const success = average >= target;
  
  let rating: Result['rating']
  let ratingDescription: Result['ratingDescription']

  if (average > target * 1.2) {
    rating = 3
    ratingDescription = 'OK'
  } else if (average > target * 0.8) {
    rating = 2
    ratingDescription = 'ENOUGH'
  } else if (average < target * 0.8) {
    rating = 1
    ratingDescription = 'BAD'
  } else {
    rating = null
    ratingDescription = 'NOT CALCULATED'
  }

  return {
    periodLength: days.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { target, days } = validateArgv(process.argv.slice(2))
  console.log(calculateExercises(target, days))
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error)
  }
}


