import React, {useState} from 'react'
import axios from 'axios'
import Data from './components/Data';


function App() {
  const [data, setData] = useState({});
  const [didLoad, setDidLoad] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usrList, setCheck] = useState(false);

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
  
  const handleCheck = (e) => {
    setCheck(e.target.checked);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    var urlopt;
    if (usrList){
      // shows filtered list
      urlopt = `http://localhost:3001/user-game-list`;
    } else {
      // shows complete list
      urlopt = `http://localhost:3001/game-list`;
    }

    const url = `${urlopt}?webTradeEligibility=${details.webTradeEligibility}&browserid=${details.browserid}&steamLoginSecure=${details.steamLoginSecure}&sessionid=${details.sessionid}&steamparental=${details.steamparental}`
    setLoading(true);
    setError(null);

    axios.get(url)
    .then(response => {
      setData(response.data);
      setDidLoad(true);

      setLoading(false);
    }).catch(error => {
      setLoading(false);
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

  const dataList = didLoad && data.map(data => (<Data data={data}></Data>))

  return (
    <div className="app">

      <h1 className='center'>trading card profit</h1>

      <form className='center' onSubmit={handleSubmit}>
        <h3>webTradeEligibility</h3> <input type="text" name="webTradeEligibility" onChange={handleChange}/>
        <h3>browserid</h3> <input type="text" name="browserid" onChange={handleChange}/>
        <h3>steamLoginSecure</h3> <input type="text" name="steamLoginSecure" onChange={handleChange}/>
        <h3>sessionid</h3> <input type="text" name="sessionid" onChange={handleChange}/>
        <h3>steamparental</h3> <input type="text" name="steamparental" onChange={handleChange}/>
        <h3 className='align'>Show games you do not own</h3> <input type="checkbox" onChange={handleCheck}/> 
        <button type="submit">Submit</button>
      </form>
        
      {error && <h2>{error}</h2>}
        
      {loading ? <div>
        <div className='fixed-height'>
          <div className="loader"></div>  
        </div>
        <h2>Please wait, this could take up to 3 minutes</h2>
      </div> : null}

      {didLoad ? <table className="center">
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
