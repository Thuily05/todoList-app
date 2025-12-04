import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    todos: [{
        id: 1,
        text: 'Learn Redux Toolkit',
        completed: false,
    },]
}
export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        //state - nhung du lieu cua state hien tai trong store
        //action la cac tuong tac cua user, di kem voi payload la data cua action
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                text: action.payload, //tham so la text
                completed: false
            };
            state.todos.push(newTodo) //day todo vao cuoi mang todos ban dau
        },
        //cai gi dang unique thi lay no ra de xoa san pham
        deleteTodo: (state, action) => {
            //filter va find: filter tra ve tat ca cac phan tu thoa man dieu kien, find tra ve phan tu dau tien thoa man dieu kien
            //cu phap: array.find(item => DK loc); array.filter(item => DK loc)
            state.todos = state.todos.filter(item => item.id !== action.payload)
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload)
            //tra ve phan tu todo dau tien cua mang cua id bang voi action.payload
            if (!todo) return; //neu todo = null return
            todo.completed = !todo.completed //thay doi trang thai completed cua todo
        },
        //co the doi ten bien action va state
        editTodo: (state, action) => {
            const { id, text } = action.payload; //lấy ra id và text của action.payload
            const todo = state.todos.find(todo => todo.id === id);
            if (!todo) return;
            todo.text = text;
        }
    }
})
export const { addTodo, deleteTodo, toggleTodo, editTodo } = todoSlice.actions
export default todoSlice.reducer 