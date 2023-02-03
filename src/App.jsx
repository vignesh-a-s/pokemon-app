/**
 * Inspired from the 'Introduction to React' tutorial series 
 * by 'Jack Herrington' ('https://www.youtube.com/@jherr')
 * 
 * Styling and feature extensions customized
 */

import { useState, useEffect } from 'react';
import './App.css';
import { PokeTable, PokeSearch, PokeInfo } from './Pokemon';
import styled from '@emotion/styled';

function App() {
  // States
  const [filter, filterSet] = useState(""); // Pokemon Search filter
  const [selectedItem, selectItem] = useState(null);  // Pokemon selection
  const [pokemon, pokemonSet] = useState([]); // Pokemon data

  // Loads pokemon JSON data from public URL
  useEffect(() => {
    // URL with Pokemon JSON data
    let pokemonUrl = `${window.location.href}pokemon.json`

    // Promise fetches pokemon JSON data asynchronously from public URL
    fetch(pokemonUrl)
      .then((resp) => resp.json())
      .then((data) => pokemonSet(data));
  }, []);

  // CSS in JS styles (powered by Emotion)
  const Title = styled.h1`
    font-size: 3.2em;
    line-height: 1.1;
    text-align: center;
  `;

  const AppContainer = styled.div`
    margin: auto;
    width: 800px;
    padding-top: 1rem;
  `;

  const TableContainer = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    column-gap: 1rem;
  `;

  const InfoContainer = styled.div`
    position: fixed;
    width: 30%;
  `;

  // Returned App
  return (
    <AppContainer>
      <Title>Pokemon Search</Title>
      <TableContainer>
        <div>
          <PokeSearch filter={filter} filterSet={filterSet} />
          <PokeTable pokemon={pokemon} numEntries={-1} filter={filter} selectItem={selectItem} />
        </div>
        <div>
          {selectedItem && (
            <InfoContainer>
              <PokeInfo {...selectedItem} />
            </InfoContainer>
          )}
        </div>
      </TableContainer>
    </AppContainer>
  )
}

export default App;
