// rafceでできる
import React from 'react'
// useStateとuseEffectをインポート
import { useState, useEffect } from 'react'


    const Data = () => {
            // useState準備
            // 配列を保持
            const  [pokemon, setPokemon] = useState([]);
            const  [data, setData] = useState();
            
            const options = {
                method: 'GET',
                url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
                qs: {name: 'Bench Press', type: 'strength', muscle: 'biceps'},
                headers: {
                  'X-RapidAPI-Key': '★★別途ご連携したAPIキー★★',
                  'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com',
                  useQueryString: true
                }
              };


    // useEffectでAPIのデータを保持
    useEffect(() => {
            
            const fetchData = async () => {
                // Data取得のおまじない
                console.log("はじめ")
                const response = await fetch(
                    options.url
                    , { // ここで盛大に詰まった
                        headers: options.headers
                      }
                    )
                    // Json変換
                    const data = await response.json();
                    console.log(data, "data"); //Json変換後データ
                    console.log(response, "response"); //Json変換後データ
                    console.log(options.url, "options.url"); //取得先URL

            // useStateを使ってpokemonListの精査したデータを保持
            setPokemon(data);
        };
        fetchData();
    }, [])


  console.log(data, 'Clickしたデータ')
    return (
            <hr />
    )
}

export default Data;