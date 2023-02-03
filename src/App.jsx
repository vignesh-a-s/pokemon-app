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

function AppContent() {
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

  // Focuses pokemon search bar upon value change
  useEffect(() => {
    let pokeSearchInput = document.querySelector('input[id="pokeSearchBar"]');
    pokeSearchInput.focus({
      preventScroll: true
    });
  }, [pokemon, filter, selectedItem]);

  const CONTAINER_WIDTH = 1000;
  const TABLE_WIDTH_PERCENT = 70;

  // CSS in JS styles (powered by Emotion)
  const Title = styled.h1`
    font-size: 3.2em;
    line-height: 1.1;
    text-align: center;
  `;

  const AppContainer = styled.div`
    margin: auto;
    max-width: ${CONTAINER_WIDTH}px;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  `;

  const TableContainer = styled.div`
    display: grid;
    grid-template-columns: ${TABLE_WIDTH_PERCENT}% ${100 - TABLE_WIDTH_PERCENT}%;
    column-gap: 1rem;

    @media only screen and (max-width: 800px) {
      grid-template-columns: 100% 0%;
      column-gap: 0rem;
    }
  `;

  const InfoContainer = styled.div`
    position: fixed;
    width: ${100 - TABLE_WIDTH_PERCENT}%;
    max-width: ${CONTAINER_WIDTH * 0.3}px;

    @media only screen and (max-width: 800px) {
      visibility: hidden
    }
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

function App() {
  return (
    <AppContent />
  )
}

export default App;
