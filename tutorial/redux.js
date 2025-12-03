//configureStore() là hàm trung tâm của Redux Toolkit
//Cấu trúc đầy đủ:
configureStore({

    //reducer là nơi combine reducer của từng slice
    reducer: {
        sliceName1: sliceReducer1,
        //ý nghĩa: phần state tên sliceName1 sẽ được xử lý bởi sliceReducer1
        //state của redux luôn có dạng object: sliceName1: {count: 1}, sliceName2: {item: []}
        //sliceReducer1 chỉ được gọi khi sliceName1 được cập nhật
        sliceName2: sliceReducer2,
        //ý nghĩa: phần state tên sliceName2 sẽ được xử lý bởi sliceReducer2
        //sliceReducer2 không được gọi thì sliceName2 vẫn giữ nguyên trạng thái
    },

    //custom middleware hoặc thêm middleware
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        loggerMiddleware,
    ],

    //bật redux devtools khi dev
    devTools: process.env.NODE_ENV! == 'production',

    //state mặc định nếu muốn khởi tạo
    preloadedState: {
        sliceName1: initialState1,
    },

    //ít dùng, trừ khi cần custom store enhancer
    enhancers: (defaultEnhancers) => [
        ...defaultEnhancers,
    ]
})
//configureStore() sẽ tự động làm 1 số việc:
//combine reducers, thêm redux-thunk, bật devtools, tối ưu hóa perfomance, tự infer type dispatch/state
