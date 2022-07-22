import { useState, useEffect } from "react";
import * as React from 'react';
import "./App.css";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';


import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Item from './Item.jsx';

function App() {

  const getData = () => {
    const data = localStorage.getItem("test");
    if (data) {
      return JSON.parse(data);
    } else {
      return []
    }
  }

  // 登録されるデータを保持するuseState
  const [data, setData] = useState(getData);

  // タイトル入力欄のテキスト情報を保持するuseState
  const [weight, setWeight] = useState("");
  const [rep, setRep] = useState("");
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState(false);

  // 送信を押したら登録
  const handleAddSubmit = (e) => {
    // フォームタグは送信の際に画面がリロードされるのでそれをさせないおまじないが以下
    e.preventDefault();
    
    // データを登録するための「塊＝オブジェクト」を作る
    let pushData = {
      id: data.length,
      weight,
      rep, // 追加　inputのuseState
      note,
      selected,
    };
    setData([...data, pushData]);
    setWeight("");
    setRep(""); // 追加　inputのuseState
    setNote("");
    setSelected(false);
  };

  // 宿題部分：特定の要素のみ削除する機能を追加するため、idを追加
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  // point! useStateの[data]に変更があったらlocalStrageを更新する
  // これはConstいらないのか？
  useEffect(() => {
    localStorage.setItem("test", JSON.stringify(data));
  }, [data]);

  // 入力した文字をクリアするボタンを作りたかったが、この実装だとSubmitもされてしまうので今回の提出としては断念
  // const titleClear = () => {
  //   // title = "";
  //   setTitle("")
  // } 
  // const repsClear = () => {
  //   // title = "";
  //   setEmail("")
  // } 
  return (
    <div className="App">
      {/* ここから書いていきます */}
      <h1>きょうの筋トレ記録</h1>
      {/* 今回は決め打ちで背中、ベントオーバーローイングとしているが、本当はここも選べるようにしたい */}
      <h2>★背中★</h2>
      <h3>★★ベントオーバーローイング★★</h3>
      <form onSubmit={handleAddSubmit}>
        {/* muiからテキストボックスを使用 */}
        {/* 重さ */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1, display: 'flex', width: '25ch' }} variant="outlined">
          <FormHelperText id="outlined-weight-helper-text">重さ</FormHelperText>
          <OutlinedInput
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            />
        </FormControl>
        {/* 回数 */}
        <FormControl sx={{ m: 1, display: 'flex', width: '25ch' }} variant="outlined">
          <FormHelperText id="outlined-rep-helper-text">回数</FormHelperText>
          <OutlinedInput
            required
            value={rep}
            onChange={(e) => setRep(e.target.value)}
            endAdornment={<InputAdornment position="end">回</InputAdornment>}
            aria-describedby="outlined-rep-helper-text"
            inputProps={{
              'aria-label': 'rep',
            }}
            />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1, display: 'flex', width: '40ch' }} variant="outlined">
          {/* メモ */}
          <FormHelperText id="outlined-note-helper-text">メモ</FormHelperText>
          <OutlinedInput
            value={note}
            onChange={(e) => setNote(e.target.value)}
            aria-describedby="outlined-note-helper-text"
            inputProps={{
              'aria-label': 'note',
            }}
            />
        </FormControl>
          {/* 補助の有無 */}
        <ToggleButton className="toggle"
              value="selected"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
              >
              補助の有無
            </ToggleButton>
        </Box>

        {/* 送信ボタン */}
        <button type="submit">保存</button>
        <IconButton aria-label="delete" onClick={(e) => setData([])}>
          <DeleteIcon />
        </IconButton>
      </form>

      <hr />
      <Item>セット数
      {/* dataというuseStateの塊を、es6のmapというおまじないを使って表示しています */}
      {data.map((item, index) => (
        <div key={index} className="noteSet">
          <Stack direction="row" spacing={1}>
            <Item>{item.id + 1}セットめ</Item>
            <Item>重さ: {item.weight}</Item>
            <Item>回数: {item.rep}</Item>
            <Item>メモ: {item.note}</Item>
            <button type="submit" onClick={() => handleDelete(item.id)}>このセットを削除</button>
          </Stack>
        </div>
      ))}
      </Item>
      {/* ここまで書いていきました */}
    </div>
  );
}

export default App;







