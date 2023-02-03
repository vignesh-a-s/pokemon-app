// import pokemon from './pokemon.json'
import './pokemon.css'
import PropTypes from 'prop-types'

/**
 * React Component - provides Pokemon Type
 * @param {*}
 * @param {*} 
 * @returns {*}
 */
const PokeType = ({types, pokeId}) => {
  // Extracts the formatted types as a map and reduces them
  let typesMap = types.map((type, index) => {

    // Defines type key and classes
    let typeClasses = `pokemonType ${type.toLowerCase()}`,
        typeKey = ['pokeType', String(pokeId), String(index)].join(':');

    // Returns the type as a formatted span element
    return <span className={typeClasses} key={typeKey}>{type}</span>;
  }).reduce((prev, curr) => {

    // Reduces the pokemon type map into a single string separated by spaces
    return (prev===null) ? [curr] : [...prev, ' ', curr];
  }, null);

  // Returns the formatted pokemon types
  return typesMap;
}

// Prop Types for PokeType
PokeType.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string),
  pokeId: PropTypes.number
};


/**
 * React Component - provides Pokemon Row
 * @param {*} pokemon 
 * @param {*} onSelect 
 * @returns {*}
 */
const PokeRow = ({pokemon, onSelect}) => (
    <tr onClick={() => {onSelect(pokemon)}}>
      <td>{pokemon.name.english}</td>
      <td><PokeType types={pokemon.type} pokeId={pokemon.id} key={['pokeTypeRow', pokemon.id].join(':')} /></td>
    </tr>
);

// Prop Types for PokeRow
PokeRow.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string)
  }),
  onSelect: PropTypes.func,
};


/**
 * React Component - loads Pokemon Data
 * @param {*}
 * @param {*}
 * @param {*}
 * @param {*}
 * @returns {*}
 */
const PokeData = ({pokemon, numEntries=-1, filter, selectItem}) => {
  let pokemonTypes = []; // Unique pokemon types

  if (numEntries <= -1) {
    numEntries = pokemon.length;
  }

  // Defines the map for the pokemon data
  let data = pokemon
  .slice(0, numEntries)
  .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
  .map(poke => {

    // Saves pokemon type if unique
    poke.type.forEach((type) => {
      if (!pokemonTypes.includes(type)) {
        pokemonTypes.push(type);
      }
    });
    
    // Returns the table row containing the pokemon name and types
    return <PokeRow pokemon={poke} key={['pokeRow', poke.id].join(':')} 
      onSelect={(pokemon) => selectItem(pokemon)} />
  });

  // Returns the pokemon data
  return data;
};

/**
 * React Component - builds Pokemon Table
 * @param {*}
 * @param {*}
 * @param {*}
 * @param {*}
 * @returns {*}
 */
export const PokeTable = ({pokemon, numEntries=-1, filter, selectItem}) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Pokemon</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <PokeData pokemon={pokemon} numEntries={numEntries} filter={filter} selectItem={selectItem} />
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

/**
 * React Component - provides Pokemon Search filter
 * @param {*} 
 * @param {*} 
 * @returns 
 */
export const PokeSearch = ({filter, filterSet}) => {
  return (
    <input type="text" className='pokeSearch' placeholder='Search Pokemon...' 
      value={filter} onChange={(evt) => filterSet(evt.target.value)} />
  );
};

/**
 * React Component - displays Pokemon Info
 * @param {*} 
 * @returns 
 */
export const PokeInfo = ({id, name, base}) => (
  <div className='pokeInfo'>
    <h1>{name.english}</h1>
    <table>
      <thead>
        <tr>
          <th>Base</th>
          <th>Stat</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(base).map((key) => (
            <tr key={['PokeInfo', String(id), 'Base', key].join(':')}>
              <td>{key}</td>
              <td>{base[key]}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

// Prop Types for PokeInfo
PokeInfo.propTypes = {
  id: PropTypes.number,
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
}