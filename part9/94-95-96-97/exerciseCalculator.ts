interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: 1 | 2 | 3 | null,
  ratingDescription: 'OK' | 'ENOUGH' | 'BAD' | 'NOT CALCULATED',
  target: number,
  average: number
}

interface FuncErr {
  error: string
}

const validateArgv = (days: number[], target: number): boolean | Error => {
  const invalidDays: boolean = days.some((day) => typeof day !== "number");

  if (typeof target !== 'number' || invalidDays) {
    throw Error('Passed invalid arguemnts');
  }

  return true;
};

const calculateExercises = ({days, target}: {days: number[], target: number}): Result => {
  const trainingDays = days.filter((day) => day > 0).length;
  const average = days.reduce((acc, val) => acc + val) / days.length;
  const success = average >= target;
  
  let rating: Result['rating'];
  let ratingDescription: Result['ratingDescription'];

  if (average > target * 1.2) {
    rating = 3;
    ratingDescription = 'OK';
  } else if (average > target * 0.8) {
    rating = 2;
    ratingDescription = 'ENOUGH';
  } else if (average < target * 0.8) {
    rating = 1;
    ratingDescription = 'BAD';
  } else {
    rating = null;
    ratingDescription = 'NOT CALCULATED';
  }

  return {
    periodLength: days.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const calculate = ({days, target}: {days: number[], target: number}): Result | FuncErr => {
  if (days === undefined || target === undefined) {
    return { error: 'missing parameters'};
  }

  try {
    if (validateArgv(days, target)) {
      const result = calculateExercises({days, target});
      return result;
    } else {
      throw Error('Unable to perform Operation');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message};
    } else {
      return { error: 'Something bad has happened'};
    }
  }
};

export default calculate;




