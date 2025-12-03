import React from 'react'
import { useSelector } from 'react-redux';

const TodoList = () => {
    const todos = useSelector(state => state.todo.todos) //.slice.sliceStatefield
    return (
        <div>Todo List</div>
    )
};
export default TodoList;