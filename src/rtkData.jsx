import React from 'react'
import ReactDOM from 'react-dom/client'
import { createApi, ApiProvider, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//data copy&pasted from https://pokeapi.co/api/v2/pokemon?limit=9

//Tạo APi bằng creatAPI- hàm của RTK Query để khai báo toàn bộ API
//lưu ý trong createApi, không được đổi tên baseQuery, queryFn hay query. bởi vì RTK query sẽ sử dụng các key này để xử lý dữ liệu
//baseQuery: hàm fetch chính nằm ở baseQuery, tất cả endpoint dùng chung baseQuery. 
/*Trong RTK query, mỗi endpoint dạng build.query() phải cung cấp 1 trong 2 thứ:
+ query: tạo ra đầu vào baseQuery cần, không fetch, ko gọi API, return giá trị cho baseQuery sử dụng
+ queryFn: hàm tự fetch, tự xử lý lỗi, return data */
export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `https://pokeapi.co/api/v2/`
    }),
    /* sử dụng fetchBaseQuery() để thay thế cho hàm này
    async (url) => {//hàm để fetch dữ liệu (thường dùng (fetchBaseQuery))
      const result = await fetch(url)
      if (result.ok) {
        const data1 = await result.json()
        return { data: data1 };
        //hoặc có thể viết return{data} thì giá trị data sẽ được truyền thẳng vào hook.data (object destructuring)
      }
      else {
        return {
          error: "something went wrong"
        }
      }*/

    //endpoint = 1API nhỏ trong hệ thống, ví dụ: getAllPokemon -> trả danh sách Pokemon; getPokemonDetail -> trả chi tiết, searchPokemon -> trả kết quả search
    //trong RTK query enpoint -> function fetch dữ liệu dùng trong React
    //trong creatApi, phải khai báo tất cả API con của mình trong 1 object duy nhất

    //endpoints: hàm khai báo tất cả endpoints, RTK Query truyền object build vào làm tham số, build được dùng để tạo các endpoint con
    endpoints: (build) => ({
        //bên trong {} -> mỗi key = 1 endpoint
        //build là 1 object đặc biệt do RTK Query cung cấp, nó có các hàm để tạo endpoint
        //build.query() -> endpoint dạng GET; build.mutation() -> endpoint dạng POST/PUT/DELETE

        //endpoint số 1 - build.query-> endpoint dạng query (GET logic)
        pokemonList: build.query({
            //khi khai báo endpoints như thế này có nghĩa là endpoint pokemonList sẽ có hàm xử lý dữ liệu là queryFn
            //RTK query sẽ tự tạo hook cho endpoint này là usePokemonListQuery()
            //Khi react component gọi hook const{data} = usePokemonListQuery() thì RTK sẽ gọi endpoint pokemonList -> chạy queryFn -> 
            // trả về data: fakePokemonListing -> trường data của hook nhận giá trị là fakePokemonListing
            //RTK query đưa dữ liệu này vào hook nên component nhận được data === fakePokemonListing
            //hook nhận được data -> dùng trong component
            //truyền vào field query 1 object, object này có hàm query() hoặc queryFn()
            query() {
                return {
                    url: 'pokemon',
                    params: {
                        limit: 9
                    }
                }
            }
        }),

        //endpoint số 2 - build.query -> endpoint dạng query (GET logic)
        //khi gọi hook usePokemonDetail -> endpoint được gọi -> queryFn trong hàm sẽ được chạy và trả về data là fakePokemonDetailData
        //ví dụ const data == usePokemonDetail() => giá trị của data sẽ là fakePokemonDetailData
        pokemonDetail: build.query({
            query: ({ name }) => `pokemon/${name}`
            //object destructuring: lấy trường name của tham số (name ở đây là arg.name)
            //khi truyền vào hook 1 object {name: pikachu} thì rtk query sẽ truyền vào pikachu vào trong hàm fetch
            //khai báo kiểu arrow function tên hàm: tham số -> return

        })
    })
})

//giả lập để thấy được trạng thái loading của hook trả về (có 0.5s để isLoading = true)
function simulateLoading() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 500)
    })
}

export const { usePokemonListQuery, usePokemonDetailQuery } = api
//cấu trúc destructuring object trong js, giúp lấy hook ra, là viết tắt của
//const usePokemonListQuery = api.usePokemonListQuery; const usePokemonDetailQuery = api.usePokemonDetailQuery;
//nếu không hook destructuring ra biến riêng thì hook vẫn nằm trong api, và để gọi thì phải sử dụng api.usePokemonListQuery