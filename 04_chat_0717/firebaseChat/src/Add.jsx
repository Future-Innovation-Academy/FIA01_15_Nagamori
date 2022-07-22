import React from 'react'

const Add = ({ 
  addData, 
  // TODO: テキストボックスをこちら側に移植する勇気が出なかったので断念。次こそは・・・
  // handleInputChange, 
  // handleInputChangeWeight, 
  // handleInputChangeRep, 
  // handleInputChangeNote, 
  // titleValue, weightValue, repValue, noteValue 
}) => {
  return (
    <div>
      {/* TODO: コンポーネント化しようとして断念したのでおいおい身に着ける */}

      {/* 送信のボタンを記述 */}
      <button onClick={addData}>送信</button>
    </div>
  )
}

export default Add