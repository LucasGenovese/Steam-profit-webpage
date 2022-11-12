import React from 'react'

function Data({data}) {
  return (
    <tbody key={data.gameID}>
      <td><img src={data.gameImg} alt="" /></td>
      <td>{data.name}</td>
      <td>$ {data.gamePrice}</td>
      <td>$ {data.profit}</td>
      <td><a href={data.gameUrl}>Buy it!</a></td>
    </tbody>
  )
}

export default Data