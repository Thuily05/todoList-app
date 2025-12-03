import { createSlice } from '@reduxjs/toolkit'
//slice - define ra state, action, reducer cùng 1 chỗ
const initialState = { //state ban đầu của slice counter
    value: 0, //value là biến muốn quản lý tương ứng với count
    //ngoài ra có thể thêm các trường như: step: 1, name: 'Thu'
};
export const counterSlice = createSlice({ //mỗi slice khi tạo bằng createSlice sẽ trả về object gồm actions, reducer, name
    name: 'counter', //mỗi slice 1 tên riêng biệt
    initialState, //giá trị ban đầu của state
    reducers: { //reducer function
        increment: (state) => {//mỗi trường trong một reducers là một action
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (states, actions) => {//mỗi function nhận state (và action nếu có payload)
            //hoan toan co the thay the ten bien cua states va actions
            //state cho biet gia tri hien tai cua bien trang thai, action cho biet ve hanh dong nguoi dung
            //payload cho biet du lieu truyen vao tu action cua nguoi dung
            states.value += actions.payload; //mutate state trực tiếp (nhờ Immer)
        }
    }
    //actions: object chứa các action creator
})
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer
//createSlice trả về counterSlice.reducer (không có s ở cuối)
//đây là hàm reducer được đưa vào store