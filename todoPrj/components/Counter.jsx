import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from './slices/counterSlice.jsx';

const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    //count nhan tra ve la state.counter.value (state ban dau cua counter.value)
    //useSelector la 1 hook cua react-redux giup component lay du lieu tu store
    //cu phap: const data = useSelector((state)=>state.someSlice.someValue)
    //state la toan bo store, state.someSlice la reducer da dua vao store
    //state.someSlice.someValue la gia tri muon lay

    const dispatch = useDispatch() //trigger 1 action đến với store
    //useDispatch la mot hook cua react-redux dung de gui dispatch (dieu phoi) mot action len store
    //redux khong cho component tu sua state, muon thay doi state bat buoc dung dispatch de goi
    //cu phap: const dispatch = useDispatch; dispatch(increment): goi den action increment trong store
    //gia su co 2 action ten giong nhau trong 2 slice khac nhau, thi thuc hien import nhu nao de dispatch action:
    //import { increment as incrementCounter } from "./counterSlice";
    // import { increment as incrementProduct } from "./productSlice";

    const [amount, setAmount] = useState(0);

    const handleIncrement = () => {
        dispatch(increment())
    }
    const handleDecrement = () => {
        dispatch(decrement())
    }
    const handleAddAmount = () => {
        console.log(amount, typeof amount)
        dispatch(incrementByAmount(amount))
        //action.payload la gia tri tham so truyen vao action, vi du o day action.payload=amount
    }
    console.log(count);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleIncrement}>Tăng thêm 1</button>
            <button onClick={handleDecrement}>Giảm đi 1</button>
            <div>
                <input type='number' onChange={(e) => setAmount(Number(e.target.value))} />
                <button onClick={handleAddAmount}>Tăng thêm {amount}</button>
            </div>
        </div>
    )
};
export default Counter;