import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Form from "./Component/Form.jsx";

function Graph() {
    return null;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex items-center justify-center mx-auto  ">
          <div>
             <div className="  shadow-2xl rounded-2xl ml-2  ">
              <Form/>
             </div>
          </div>
      </div>
        </>
  )
}

export default App
