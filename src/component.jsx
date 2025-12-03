import { usePokemonListQuery, usePokemonDetailQuery } from './rtkData.jsx'
export function PokemonList({ onPokemonSelected }) {
    const { data, isLoading, isError, isSuccess } = usePokemonListQuery() //gọi tắt là hook trong ghi note
    //hook Destructuring giúp lấy trực tiếp những giá trị cần từ object trả về là
    //data - hook.data, isLoading - hook.isLoading, isError - hook.isError, isSucess - hook.isSuccess
    //nếu không destructuring thì sẽ phải gọi trực tiếp -> tốn thời gian hơn
    //nếu sử dụng const data = usePokemonList
    //usePokemonListQuery là 1 object chứa nhiều thông tin dạng query
    /*{data, //dữ liệu fetch được
    isLoading, //true nếu đang fetch
    isError, //true nếu fetch lỗi
    error, //thông tin lỗi nếu có
    refetch, //hàm gọi lại API
    ...}
    ý nghĩa của việc viết hàm  
    queryFn() {
        return { data: fakePokemonListing }
      }
    có nghĩa là queryFn trả về giá object{data: ...}-> đây là giá trị RTK query sẽ đưa vào hook
    khi gọi hook usePokemonListQuery -> RTK sẽ chạy queryFn sau đó nhận về {data: fakePokemonListing} 
    -> hook usePokemonListQuery sẽ gắn fakePokemonListing và field data của object trả về hook
    nghĩa là queryFn(){return {data: fakePokemonListing}}
    usePokemonListQuery() trả về {data: fakePokemonListing, isLoading, isError, isSucess,...}
    */
    if (isLoading) {
        return "loading..."
    }
    if (isError) {
        return `error caught`
    }
    if (isSuccess) {
        return (
            <article>
                <h2>Overview</h2>
                <ol start={1}>
                    {data.results.map((pokemon) => (
                        <li key={pokemon.name}>
                            <button onClick={() => onPokemonSelected(pokemon.name)}>
                                {/*Khi button được click, onPokemonSelected sẽ nhận giá trị pokemon.name
                            và chạy logic bên trong*/}
                                {pokemon.name}
                            </button>
                        </li>
                    ))}
                </ol>
            </article>
        )
    }
}
export function PokemonDetails({ pokemonName }) {
    const { data, isLoading, isError, isSuccess } = usePokemonDetailQuery({
        name: pokemonName
    })
    if (isLoading) {
        return 'loading...'
    }
    if (isError) {
        return `error caught`
    }
    if (isSuccess) {
        return (
            <article>
                <h2>{data.name}</h2>
                <img src={data.sprites.front_default} alt={data.name} />
                <ul>
                    <li>id: {data.id}</li>
                    <li>{data.height}</li>
                    <li>
                        types:
                        {listFormatter.format(data.types.map((item) => item.type.name))}
                    </li>
                </ul>
            </article>
        )
    }
}

//intl.listFormat- api của JS dùng để format danh sách các phần từ thành chuỗi theo ngôn ngữ và cách trình bày
//ví dụ biến mảng ['apple', 'banana', 'orange'] thành apple, banana and orange
const listFormatter = new Intl.ListFormat('en-GB', { //en-GB -> ngôn ngữ english (UK)
    style: 'short', //dùng dạng rút gọn (thường là dấu phẩy, kí hiệu
    //long: apple, banana and orangel short: apple, banana& orange, narrow: apple, banana, orange
    type: 'conjunction' //dùng liên từ 'and' đển nối các phần tử
    //conjunction: and, disjunction: or, unit: dùng cho thời gian số lượng đo lường, ngăn cách bởi dấu phẩy
    /*VD: dùng const fruits = ['apple','banana','orange']
    console.log(listFormatter.format(fruit))-> kết quả là apple, banana& orange */
})
