因為時間需求，使用 NextJs 將原 https://codepen.io/tariso/pen/LyoaRM 裡面的 Codes 並直接給寫成 JSX 語法，不少的 functions 大部分相同，多了一些 React Hook 狀態管理


會使用 NextJs 是因為文件有要求儘量不要從外部的連結 fetch 資料，我用了一種 Hard Coding 方法，將外部連結內容 Copy 一份到 Local 端資料夾內，並使用 NextJs 的 API End Point ，直接 fetch ; 其實這裡也可以使用 ReactJs 並使用 import ...方法，將外部連結的內容以變數形式引入，可達到同樣的效果。



有關輸入框是使用 Material MUI，背景顏色是用漸層色作為主軸。



有關清除輸入框後列表就會消失的部分，我是直接設定當輸入框內容為 null，返回一個 null array，只是效果僅止於對第一個所輸入的字母有效。
