import { useState, useRef } from 'react'
import './App.css'
import Fact from './Fact'
import ErrorComponent from './ErrorComponent'

function App() {
  const [fact, setFact] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const fetchCount = useRef(0);

  const fetchFact = async () => {
    setError("");

    fetchCount.current += 1;

    setLoading(true);

    try {
      if (fetchCount.current % 3 === 0) {
          throw new Error(`Ошибка для теста, которая показывается на каждый 3ий запрос`);
      }

      let response = await fetch("https://meowfacts.herokuapp.com/?lang=rus-ru");

      if (response.ok){
        let responseJson = await response.json();
        setFact(responseJson.data[0]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Неизвестная ошибка при загрузке факта");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="button-wrapper">
        <button className="counter" onClick={fetchFact} disabled={loading}>
          {loading ? 'Получаю...' : 'Получить факт'}
        </button>
      </div>
      
      {!error && fact && <Fact fact={fact}></Fact>}

      {error && <ErrorComponent error={error}></ErrorComponent>}
    </>
  )
}

export default App
