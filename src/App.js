import React, {useState} from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

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
    
    axios.get(url).then((response) => {
      setData(response.data);
      setLoading(true);
      console.log(response.data)
    })
  }

  const dataList = loading && data.map(data => (
    <tbody>
      <td><img src={data.gameImg} alt="" /></td>
      <td>{data.name}</td>
      <td>$ {data.gamePrice}</td>
      <td>$ {data.profit}</td>
      <td><a href={data.gameUrl}>Buy it!</a></td>
    </tbody>
  ))

  return (
    <div className="app">

      <form onSubmit={handleSubmit}>
        <h3>webTradeEligibility</h3> <input type="text" name="webTradeEligibility" onChange={handleChange}/>
        <h3>browserid</h3> <input type="text" name="browserid" onChange={handleChange}/>
        <h3>steamLoginSecure</h3> <input type="text" name="steamLoginSecure" onChange={handleChange}/>
        <h3>sessionid</h3> <input type="text" name="sessionid" onChange={handleChange}/>
        <h3>steamparental</h3> <input type="text" name="steamparental" onChange={handleChange}/>
        <button type="submit">Submit</button>
      </form>
      
      <table className="center">
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
      </table>

      

    </div>
  );
}

export default App;
