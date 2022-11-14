import React, {useState} from 'react'
import axios from 'axios'
import Data from './components/Data';

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [details,setDetails] = useState({
    webTradeEligibility: "",
    browserid:"",
    steamLoginSecure:"",
    sessionid:"",
    steamparental:""
  });

  const handleChange = (e) => {
    const {name, value} = e.target
    setDetails((prev)=> {
      return {...prev, [name]: value}
    })
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/game-list?webTradeEligibility=${details.webTradeEligibility}&browserid=${details.browserid}&steamLoginSecure=${details.steamLoginSecure}&sessionid=${details.sessionid}&steamparental=${details.steamparental}`

    axios.get(url)
    .then(response => {
      setData(response.data);
      setLoading(true);
    }).catch(error => {
      if (error.response){
        setError('Could not get any games for that input. Try loading your cookies again');
        console.log('Could not get any games for that input. Try loading your cookies again');
      } else if (error.request){
        setError('API is currently down');
        console.log('API is currently down');
      } else {
        setError('Unespected error: ', error.message);
        console.log('Unespected error: ', error.message);
      }
    })    
  }

  const dataList = loading && data.map(data => (<Data data={data}></Data>))

  return (
    <div className="app">

      <h1 className='center'>trading card profit</h1>

      <form className='center' onSubmit={handleSubmit}>
        <h3>webTradeEligibility</h3> <input type="text" name="webTradeEligibility" onChange={handleChange}/>
        <h3>browserid</h3> <input type="text" name="browserid" onChange={handleChange}/>
        <h3>steamLoginSecure</h3> <input type="text" name="steamLoginSecure" onChange={handleChange}/>
        <h3>sessionid</h3> <input type="text" name="sessionid" onChange={handleChange}/>
        <h3>steamparental</h3> <input type="text" name="steamparental" onChange={handleChange}/>
        <button type="submit">Submit</button>
      </form>
      
      {error && <h2>{error}</h2>}

      {loading ? <table className="center">
        <tbody>
          <tr>
            <th>cover</th>
            <th>name</th>
            <th>price</th>
            <th>profit</th>
            <th>steam page</th>
          </tr>  
        </tbody>
        {dataList}
      </table> : null}
    

    </div>
  );
}

export default App;
