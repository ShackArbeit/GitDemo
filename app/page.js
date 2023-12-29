// 因為這裡有使用 React Hook ，所以是 client component 
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// 這裡使用 Material Mui 的 Input 元件
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';


 const Home = () => {
  // 建立新的變數及初始直為一個空的 Array 
  const [cities, setCities] = useState([]);
  // 
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // 這裡使用 useEffect 是 React 的通常寫法，確保每一次 render 時都抓取到更新的資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(
        //    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
        //  );
      
        // 這裡將原本 url 裡面的內容下載到 City.json 內，並利用 NextJs 裡面的 API Router 直接抓取
        // 而不是從外部抓取
        const response = await fetch('/City.json');
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // 將抓取後的內容放進定義的 cities 陣列內
        setCities(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);
  // 這裡定義符合這則表達式的函式
  const findMatches = (wordToMatch, cities) => {
  // 遍歷剛剛放進陣列 cities 並定義參數 wordToMatch 的正則表達條件
  // g 整個 string 中找到所有符合的 string ，i 表示不區分大小寫
    return cities.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex);
    });
  };
  // 以下為資料內人口的函式
  const numberWithCommas = (x) => {
  // 將數字類型轉換為字串並加上正則條件的表達式
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 這裡定義根據輸入的文字進行返回不同內容的函式
  const displayMatches = (e) => {
    // 變數 value 為使用者輸入不同子母的值
    const { value } = e.target;
  // 將 value 放進變數 searchTerm 內，注意 searchTerm 原本是 null 
    setSearchTerm(value);
  //  將定義過的函式 findMatches  放進變數  matchArray 內
    const matchArray = findMatches(value, cities);
  // 若沒有輸入任何字母若刪除字母，則將變數 suggestions 返回初始值空陣列
  // 也就是結果列表為空陣列，沒有值
    if (value === '') {
       setSuggestions([]);
       return;
     }
  // 變數 html 內裡面的值是已經先經過 matchArray (findMatches 函式) 經過正則表達式所篩選出來的值
    const html = matchArray.map(place => {
      const regex = new RegExp(value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${value}</span>`);
       return (
         <li key={place.city}>
           <span className="name" dangerouslySetInnerHTML={{ __html: `${cityName}, ${stateName}` }} />
           <span className="population">{numberWithCommas(place.population)}</span>
         </li>
       )})
  //  將篩選出來的值放進 Dom 元素後再放進初始值為空陣列的 suggestions 變數內
  // 這樣 suggestions 可以是這樣 suggestions=[{Losangle,33333},{New York,444444}.......]
    setSuggestions(html);
  }

  return (
  // 這裡的 CSS Style 是使用 Tailwind 
    <main className="min-h-screen p-24 ">
      <div className="w-full">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert mx-auto"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <Box
      //  這裡使用 Material MUI 的 sx props 設定 CSS 樣式
        sx={{
          py: 2,
          display: 'grid',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
          maxWidth: '400px',
          margin: '0 auto',
          position: 'relative',
          top: '3rem',
        }}
      >
        <Input
          placeholder="State Or City"
          className="h-20"
          value={searchTerm}
          onChange={displayMatches}
          sx={{
            border:'2px solid #21aaf6',
            borderRadius:'3px',
            fontSize:'30px'
          }}
        />
        <ul className="suggestions">{suggestions}</ul>
      </Box>
    </main>
  );
};

export default Home