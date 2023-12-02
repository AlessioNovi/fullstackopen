import { SyntheticEvent, useState } from "react"
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "./types"

interface FormProps {
  onSubmit: (newDiaryEntry: NewDiaryEntry) => Promise<DiaryEntry | undefined>
}

const DiaryForm = ({ onSubmit }: FormProps) => {
  const [date, setdate] = useState('')
  const [visibility, setVisibility] = useState('great')
  const [weather, setWeather] = useState('sunny')
  const [comment, setComment] = useState('')

  const submitFormDetails = (e: SyntheticEvent) => {
    e.preventDefault()
    const weatherFromEnum = Object.values(Weather).find((w) => w.toString() === weather)!
    const visibilityFromEnum = Object.values(Visibility).find((w) => w.toString() === visibility)!

    const obj = {date, visibility: visibilityFromEnum, weather: weatherFromEnum, comment}
    if (onSubmit(obj) !== undefined) {
      setdate('')
      setVisibility('great')
      setWeather('sunny')
      setComment('')
    }
  }

  return (
    <div>
      <h2>Add new Diary</h2>
      <form onSubmit={submitFormDetails}>
        <input  type="date" value={date} onChange={(e) => setdate(e.target.value)}/>
        <div>
          <span>Visibility </span>
          <label>
              great
              <input type="radio" checked={visibility === 'great'} name="visibility" value="great" onChange={(e) => setVisibility(e.target.value)}/>
          </label>
          <label>
              good
              <input type="radio" name="visibility" value="good" onChange={(e) => setVisibility(e.target.value)}/>
          </label>
          <label>
              ok
              <input type="radio" name="visibility" value="ok" onChange={(e) => setVisibility(e.target.value)}/>
          </label>
          <label>
              poor
              <input type="radio" name="visibility" value="poor" onChange={(e) => setVisibility(e.target.value)}/>
          </label>
        </div>
        <div>
          <span>Weather </span>
          <label>
              sunny
              <input type="radio" checked={weather === 'sunny'} name="weather" value="sunny" onChange={(e) => setWeather(e.target.value)}/>
          </label>
          <label>
              rainy
              <input type="radio" name="weather" value="rainy" onChange={(e) => setWeather(e.target.value)}/>
          </label>
          <label>
              cloudy
              <input type="radio" name="weather" value="cloudy" onChange={(e) => setWeather(e.target.value)}/>
          </label>
          <label>
              stormy
              <input type="radio" name="weather" value="stormy" onChange={(e) => setWeather(e.target.value)}/>
          </label>
          <label>
              windy
              <input type="radio" name="weather" value="windy" onChange={(e) => setWeather(e.target.value)}/>
          </label>
        </div>
        <label>
          comment
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>

  )
}


export default DiaryForm