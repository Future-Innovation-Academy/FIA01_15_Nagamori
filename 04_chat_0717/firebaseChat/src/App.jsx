import { useState, useEffect } from 'react'
import './App.css'
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import Add from './Add';

// TODO: 削除ボタンを習ったのちにコメントアウト外す
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import ToggleButton from '@mui/material/ToggleButton';


import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Item from './Item.jsx';


function App() {
// 1. useState
  //useStateでデータを受け取れる準備をする
  const [data, setData] = useState([{ 
    id: "",
    title: "",
    weight: "",
    rep: "",
    note: "",
    // selected: "" 
  }]);
  // console.log(data, "useStateの箱の方をみましょう！");


  //3. 登録用のuseStateを準備します🤗
  const [titleValue, setTitleValue] = useState("");

    // タイトル入力欄のテキスト情報を保持するuseState
    const [weightValue, setWeightValue] = useState("");
    const [repValue, setRepValue] = useState("");
    const [noteValue, setNoteValue] = useState("");
    // TODO: boolean値がうまく渡せないのでおいおい確認
    // const [selectedValue, setSelectedValue] = useState(false);

  //2. useEffect
  useEffect(() => {
    //2.1 query = コレクション(firebaseの箱のこと)の指定をする
    // firebaseで用意されたおまじない
    const q = query(collection(db, "group")); //データにアクセス

    //2.2 クリーンアップ関数
    // onSnapshot…リアルタイムの更新(変更あった！)を都度キャッチする
    const unsub = onSnapshot(q, (querySnapshot) => {
      setData(
        // docsにアクセスして、保持しまくる
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          // title: doc.data().title,
          weight: doc.data().weight,
          rep: doc.data().rep,
          note: doc.data().note,
          selected: doc.data().selected,
        }))
      );
    });
    // unsubって何だろう
    return () => unsub();
  }, []);



    //4. inputのonChangeのイベントを記述🤗
    const handleInputChange = (e) => {
      console.log(e, "event");
      console.log(e.target, "event target");
      setTitleValue(e.target.value);
      // TODO: 変数分必要？
      // setWeightValue(e.target.value);
      // setRepValue(e.target.value);
      // setNoteValue(e.target.value);
      // setSelectedValue(e.target.value);
    };
    const handleInputChangeWeight = (e) => {
      console.log("weight");
      console.log(e, "event");
      console.log(e.target, "event target");
      setWeightValue(e.target.value);
    };
    const handleInputChangeRep = (e) => {
      console.log("rep");
      console.log(e, "event");
      console.log(e.target, "event target");
      setRepValue(e.target.value);
    };
    const handleInputChangeNote = (e) => {
      console.log("note");
      console.log(e, "event");
      console.log(e.target, "event target");
      setNoteValue(e.target.value);
    };
    
    // TODO: boolean値がうまく渡せないのでおいおい確認
    // const handleInputChangeSelected = (e) => {
    //   console.log("selected");
    //   console.log(e, "event");
    //   console.log(e.target, "event target");
    //   setSelectedValue(e.target.value);
    // };


      //送信の処理を記述＝送信のボタンが押されたら登録の処理を実行する🤗
  const addData = async () => {
    // 処理を記述していきます🤗
    // alert(1); // 記述後、送信ボタンを押す→画面に変化があればコメントアウトしましょう🤗

    // firebaseへの登録の処理
    console.log('addはじめ')
    await addDoc(
      collection(db, "group"), //場所どこ？
      {
        title: titleValue,
        weight: weightValue,
        rep: repValue,
        note: noteValue,
        // selected: selectedValue,
      }
      );
      console.log('addおわり')

    // 文字を空にします🤗
    setTitleValue("");
    setWeightValue("");
    setRepValue("");
    setNoteValue("");
    
    // TODO: boolean値がうまく渡せないのでおいおい確認
    // setSelectedValue(false);
  };




  return (
    <div className="App">
      {/* ここから書いていきます */}
      <h1>きょうの筋トレ記録</h1>
      {/* 今回は決め打ちで大胸筋上部、インクラインダンベルフライとしているが、本当はここも選べるようにしたい */}
      <h2>★大胸筋上部★</h2>
      <h3>★★インクラインダンベルフライ★★</h3>
      <form>
        {/* muiからテキストボックスを使用 */}
        {/* 重さ */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1, display: 'flex', width: '25ch' }} variant="outlined">
          <FormHelperText id="outlined-weight-helper-text">重さ</FormHelperText>
          <OutlinedInput
            required
            value={weightValue}
            onChange={handleInputChangeWeight}
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
            value={repValue}
            onChange={handleInputChangeRep}
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
            value={noteValue}
            onChange={handleInputChangeNote}
            aria-describedby="outlined-note-helper-text"
            inputProps={{
              'aria-label': 'note',
            }}
            />
        </FormControl>
          {/* 補助の有無 */}
          {/* TODO: Boolean値をうまく渡せないのでおいおい実装 */}
          {/* <ToggleButton className="toggle"
              value="selected"
              selected={selectedValue}
              onChange={() => {
                setSelected(!selected);
              }}
              >
              補助の有無
            </ToggleButton> */}
        </Box>

        {/* 送信ボタン */}
                <Add addData={addData} titleValue={titleValue} handleInputChange={handleInputChange}>
          
          </Add>
          {/* 削除ボタンは習ってないのでコメントアウト */}
        {/* <IconButton aria-label="delete" onClick={(e) => setData([])}>
          <DeleteIcon />
        </IconButton> */}
      </form>

      <Item>合計セット数
      {/* dataというuseStateの塊を、es6のmapというおまじないを使って表示しています */}
      {data.map((item, index) => (
        <div key={index} className="noteSet">
          <Stack direction="row" spacing={1}>
            {/* <Item>{item.id + 1}セットめ</Item> */}
            <Item>重さ: {item.weight} kg</Item>
            <Item>回数: {item.rep} 回</Item>
            <Item>メモ: {item.note}</Item>
            {/* TODO: 削除ボタンを習ったのちにコメントアウト外す */}
            {/* <button type="submit" onClick={() => handleDelete(item.id)}>このセットを削除</button> */}
          </Stack>
        </div>
      ))}
      </Item>
      {/* ここまで書いていきました */}
    </div>
  );
}
export default App;
