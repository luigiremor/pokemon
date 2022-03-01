import Head from 'next/head'
import axios from 'axios'
import Social from '../components/Social'
import { useEffect, useState } from 'react'

export default function Home() {
  useEffect(() => {
    getPokemons()
    // getPokemon()
  }, [])

  useEffect(() => {
    getPokemon()
  }, [])

  const [pokemons, setPokemons] = useState({})
  const [loading, setLoading] = useState(false)
  const [pokemonChosen, setPokemonChosen] = useState(false)
  const [pokemon, setPokemon] = useState({})

  const getPokemons = async () => {
    try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
      setPokemons(res.data.results)
      setLoading(true)
    } catch (err) {
      alert(err.message)
    }
  }

  const getPokemon = async sel => {
    try {
      if (sel != undefined) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${sel}`)
        setPokemon(res.data)
        setPokemonChosen(true)
      }
    } catch (err) {
      alert(err.message)
    }
  }
  // console.log(pokemon)
  // console.log(pokemons)
  return (
    <div>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="An amazing pokedex on Web" />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png"
        />
      </Head>

      <main className=" w-screen flex justify-center my-10">
        <div>
          <div className="text-3xl text-center font-mono mb-5">
            Which pokemon do you want to know?
          </div>
          <div className="mb-5">
            <select
              className="w-full bg-gray-200/50 rounded-md p-2"
              onChange={e => getPokemon(e.target.value)}
            >
              <option disabled selected hidden>
                Select your pokemon
              </option>
              {loading &&
                pokemons.map(pokemon => {
                  return (
                    <option className="hover:bg-gray-100" key={pokemon.name}>
                      {pokemon.name}
                    </option>
                  )
                })}
            </select>
          </div>
          <div className="flex justify-center">
            {!pokemonChosen ? (
              <div className="flex h-full items-center justify-center text-2xl font-mono">
                Select a pokemon!
                <img
                  className="h-16"
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs"
                />
              </div>
            ) : (
              <div className="flex-col justify-center w-1/2">
                <img
                  className="flex justify-center h-64 m-auto"
                  src={pokemon.sprites.front_default}
                />
                <div className="flex-col self-center justify-center font-mono ">
                  <div className="flex justify-center">{pokemon.name}</div>
                  <div className="flex justify-center text-gray-500">
                    #{`${pokemon.id}`.padStart(3, '0')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="absolute bottom-0 mb-5 self-center font-mono w-full">
        <div className="flex select-none justify-center ">
          Did you like?
          <span className="ml-1 select-none font-bold">
            Feel free to leave me feedbacks
          </span>
        </div>
        <div className="flex justify-center">
          <Social />
        </div>
      </footer>
    </div>
  )
}
