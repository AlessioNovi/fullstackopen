import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";
import DiaryForm from "./DiaryForm";



const BASE_URL = 'http://localhost:3000/api/diaries'

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    (async () => {
      const { data } = await axios.get<NonSensitiveDiaryEntry[]>(BASE_URL)
      setDiaries(data)
    })()
  }, [])

  const addNewDiary = async (newDiaryEntry: NewDiaryEntry) => {
    try {
      const { data } = await axios.post<DiaryEntry>(BASE_URL, newDiaryEntry)
      setDiaries(diaries.concat(data))
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data)
      } else {
        setError('Unknown Error: ' + error)
      }
      console.log(error)
      setTimeout(() => setError(''), 2000)
    }
  }

  return (
    <div>
      <h1>Diary Entries</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <DiaryForm onSubmit={addNewDiary}/>
      {diaries.map((diary) => {
        return (
          <div key={diary.id}>
            <h2>{diary.date}</h2>
            <br />
            <p>Visibility {diary.visibility}</p>
            <p>Weather {diary.weather}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
