import { useEffect, useState } from "react";

function App() {
  const [message,setMessage] = useState('');

  useEffect(() => {
    fetch("api/hello").then((res) => res.json()).then((data) => {
      setMessage(data.message);
    }).catch((error) => {
      console.error("Error fetching message:", error);
    })
  }, [])

  return <p className="font-bold p-4">{message}</p>
}

export default App
