RTK query: thư viện nằm trong hệ sinh thái Redux, quản lý việc gọi API và caching dễ dàng

Lý do RTK query xuất hiện: hạn chế việc lặp đi lặp lại trong quá trình fetch data.
Để fetch data trong React:
- Khai báo useEffect và gọi API trong đó
- Xử lý cleanup function để tránh việc gọi duplicate data
- Tracking trạng thái loading để hiển thị skeleton
- Quản lý thời gian cache khi user tương tác UI
-> Không khó nhưng nhiều, nếu nhiều component cần implement thì khá mệt
-> RTK query xuất hiện
//REDUX TOOLKIT:
Redux toolkit package được thiết kế để trở thành cách viết tiêu chuẩn cho Redux logic.
Redux toolkit sinh ra để giải quyết 3 vấn đề sau của Redux: 
+ Configuring 1 redux store quá phức tạp
+ Cần quá nhiều package để Redux có thể làm gì đó hữu dụng
+ Redux cần quá nhiều boilerplate code (các đoạn mã được tái sử dụng, ví dụ như header của trang HTML)
Redux toolkit cũng bao gồm khả năng truy xuất (fetching) và lưu trữ (caching) dữ liệu mà chúng tôi gọi
là RTK query.
Các công cụ này sẽ có lợi cho tất cả Redux users.Dù bạn là một người dùng Redux mới hay là một người dùng
kinh nghiệm muốn đơn giản hóa một ứng dụng có sẵn, Redux Toolkit đều có thể giúp mã nguồn Redux của bạn tốt hơn.

1. INSTALLATION: CREATE A REACT REDUX APP
npm install @reduxjs/toolkit react-redux
pnpm add reduxjs/toolkit react-redux
yarn add reduxjs/toolkit react-redux
2. WHAT INCLUDED
Redux Toolkit bao gồm các APIs sau:
+ configureStore(): bọc createStore để cung cấp các tùy chọn cấu hình đơn giản hơn và các thiết lập mặc định tốt hơn.
Nó có thể tự động kết hợp các slice reducer của bạn, thêm bất kì Redux middleware nào bạn cung cấp, bao gồm
redux-thunk theo mặc định, và có thể sử dụng Redux DevTools Extension.
+ createReducer(): cho phép bạn cung cấp một bảng tìm kiếm (lookup table) gồm các action types tương ứng với 
case reducer function, thay vì viết câu lệnh switch. Ngoài ra, nó còn tự động sử dụng thư viện immer cho phép
bạn thay đổi các biến immutable 1 cách đơn giản hơn với normal mutative code như state.todos[3].completed = true.
+ createAction(): tạo một hàm action creater cho một chuỗi action type cho trước.
+ createSlice(): 
+ combineSlices():
+ createAsyncThunk():
+ createEntityAdapter():
+ createSelector():
3. RTK QUERY:  
RTK Query bao gồm các APIs sau:
createAPi():
fetchBaseQuery():
<ApiProvider/>:
setupListeners():