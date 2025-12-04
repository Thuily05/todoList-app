import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo, editTodo } from '../slices/todoSlice';

const TodoList = () => {
    const todos = useSelector(state => state.todos.todos) //state.slice.sliceStatefield
    const [todoName, setTodoName] = useState('')
    const [idEdit, setEdit] = useState(1)
    const [textEdit, setTextEdit] = useState('')
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (!todoName) return;
        dispatch(addTodo(todoName));
        setTodoName(''); //2 way binding - clear dữ liệu input
    }
    const handleDeleteTodo = (id) => {
        console.log(`delete ${id}`)
        dispatch(deleteTodo(id))
    }
    console.log(todos)
    const handleToggleTodo = (id) => {
        console.log(`toggle ${id}`)
        dispatch(toggleTodo(id))
    }

    //redux action chỉ có 1 payload duy nhất, khi gọi editTodo(id, text) 
    //-> function chỉ nhận id làm payload -> do đó thực hiện truyền object khi gọi 
    //hoặc sửa action creator bằng prepare (nếu muốn truyền nhiều tham số)
    /*Sửa bằng prepare 
    editTodo: {
    prepare: (id, text) => {
        return { payload: { id, text } };
    },
    reducer(state, action) {
        console.log(action.payload);
        }
    }
    */
    const handleEditTodo = ({ id, text }) => {
        dispatch(editTodo({ id, text }))
    }

    return (
        <div className='flex flex-col gap-5 pt-5 items-center'>
            <div className='text-[20px] font-bold text-[#ffb3ff]'>My todos: {todos.length}</div>
            {todos.length === 0 ? <p>No todos</p> : <>
                {
                    todos.map((todo) => (
                        <ul>
                            <li className='flex flex-row gap-2.5 items-center'>
                                {(idEdit == todo.id) ? '' : <input type='checkbox'
                                    className='w-5 h-5'
                                    checked={todo.completed} //2 way binding 
                                    //Sử dụng checked = todo.completed để kiểm soát giá trị input của check box
                                    //todo.completed == true -> checkbox được tick
                                    //todo.completed == false -> checkbox bỏ tick
                                    //việc để checkbox == todo.completed giúp React biết được checkbox có đang check hay không
                                    //-> checkbox được cập nhật theo đúng state -> khi handleToggleTodo diễn ra -> không bị lệch trạng thái
                                    onChange={() => { handleToggleTodo(todo.id) }}
                                ></input>}

                                {(idEdit == todo.id) ? <input type='text'
                                    className='border border-black rounded-xl mr-2.5 p-1.5'></input> :
                                    <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>}
                                {(idEdit == todo.id) ?
                                    <button className='font-medium text-[14px] text-[#003333]'>
                                        Save changes</button> : ''}


                                <button onClick={() => { handleDeleteTodo(todo.id) }}
                                    className='bg-[#ccffff] font-medium text-[#001a1a] p-1
                                    border border-[#003333] rounded-xl text-[14px]'>Delete item</button>
                                <button
                                    onClick={() => { setEdit(todo.id); console.log(idEdit) }}
                                    className='bg-[#ccffff] font-medium text-[#001a1a] p-1
                                    border border-[#003333] rounded-xl text-[14px]'>Edit item</button>
                            </li>
                        </ul>
                    ))
                }
            </>}
            <div>
                <input
                    type='text'
                    value={todoName} //value lúc nào cũng hiện giá trị của todoName - 2 way binding
                    onChange={(e) => setTodoName(e.target.value)}
                    className='border border-black rounded-xl mr-5 p-2.5' />
                <button onClick={handleAddTodo}
                    className='bg-[#ccffff] font-medium text-[#001a1a] text-[14px] p-1 
                    border border-[#003333] rounded-xl'>
                    Add Todo</button>
            </div>
        </div>
    )
};
export default TodoList;

/*hàm onChange: onChange là một event handle trong JS/ React, được dùng để theo dõi và xử lý sự thay đổi giá trị của 1 phần tử input 
(<input>, <text area>, <select>). Khi người dùng nhập dữ liệu hoặc chọn 1 giá trị mới, hàm này sẽ được gọi.
e.target.value là giá trị option được chọn/ giá trị input nhập vào. e.target.checked là trạng thái check (true/ false)
Trong React, nó luôn trigger khi người dùng thay đổi, không cần mất focus
Thường kết hợp với state để tạo controlled component*/