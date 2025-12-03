import { useState } from 'react'
import './App.css'
import { PokemonDetails, PokemonList } from './component.jsx'

function App() {
  const [selectedPokemon, selectPokemon] = useState(undefined)
  return (
    <>
      <header>
        <h1>My PokeDex</h1>
      </header>
      <main>
        {selectedPokemon ? (
          <>
            <PokemonDetails pokemonName={selectedPokemon} />
            <button onClick={() => selectPokemon(undefined)}>back</button>
          </>
        ) : (
          <PokemonList onPokemonSelected={selectPokemon} />
          /*truyền hàm setState: selectPokemon xuống cho pokemonList. lúc này ở component pokemonlist
          có sự kiện <button onClick={() => onPokemonSelected(pokemon.name)}>
           -> bản chất chạy selectPokemon('pikachu') -> selectedPokemon = pikachu
           và vì có selectedPokemon, app sẽ không hiện list nữa mà hiện detail */
        )}
      </main>
    </>

  )
}

export default App
