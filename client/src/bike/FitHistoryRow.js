import React from 'react'

const FitHistoryRow=(props)=> {
if(props.show===false) return null

  return (
      <tr>
      <td>{props.title}</td>
      {props.fitHistory.map((item, i, array) => {
       return(<td className={"centerthis "+(i>0&&array[i][props.rowKey]!==array[i-1][props.rowKey]&&"fks-color").toString()} key={i}>{item[props.rowKey]}</td>)
      })
      }

      </tr>
    )
  }

export default FitHistoryRow
