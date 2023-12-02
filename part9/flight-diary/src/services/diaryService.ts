import diaryEntries  from '../data/entries';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';


const getEntries = (): DiaryEntry[]  => {
  return diaryEntries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryEntries.map(({id, date, weather, visibility}) => {
    return {
      id,
      date,
      weather,
      visibility,
    };
  });
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaryEntries.find(d => d.id === id);
  return entry;
}; 

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const id = Math.max(...diaryEntries.map((d) => d.id)) + 1;

  const newEntry: DiaryEntry = {
    id,
    ...entry
  };
  diaryEntries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
};