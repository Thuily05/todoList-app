import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { api } from './rtkData.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*ApiProvider là 1 component do RTK Query cung cấp, chức năng là cung cấp context cho toàn bộ ứng dụng để các hook như 
    usePokemonListQuery biết api nào, endpoint nào để gọi rồi trả về dữ liệu
    thay thế cho việc dùng Provider của Redux store truyền vào khi dùng RTK Query đứng 1 mình (không cần dùng store)
    api truyền vào ApiProvider vẫn giữ đầy đủ các dữ liệu endpoints, hookReact (RTK query tạo tự động), cache, helper */}
    <ApiProvider api={api}>
      <App />
    </ApiProvider>
  </StrictMode>,
)
