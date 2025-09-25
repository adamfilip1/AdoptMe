import AnimalFilterModal from './AnimalFilterModal.js';

function AnimalList() {
  const [animals, setAnimals] = React.useState([]);
  const [showFilter, setShowFilter] = React.useState(false);

  React.useEffect(() => {
    fetch('http://localhost:5001/api/zvirata')
      .then(res => res.json())
      .then(data => setAnimals(data))
      .catch(err => console.error('Error loading animals:', err));
  }, []);

  const toggleFilter = () => setShowFilter(!showFilter);

  const list = animals.map((animal) =>
    React.createElement(
      'div',
      { className: 'animal-card', key: animal.id },
      React.createElement('img', {
        src: animal.fotoUrl,
        alt: animal.jmeno,
        className: 'animal-photo'
      }),
      React.createElement(
        'div',
        { className: 'animal-info' },
        React.createElement(
          ReactRouterDOM.Link,
          { to: `/zvire/${animal.id}` },
          React.createElement('h2', null, animal.jmeno)
        ),
        React.createElement('p', null, animal.pohlavi),
        React.createElement('p', null, animal.plemeno),
        React.createElement('p', null, animal.vek)
      )
    )
  );

  return React.createElement(
    'div',
    null,
    // Header s tlačítkem
    React.createElement(
      'div',
      { className: 'header' },
      React.createElement('div', { className: 'logo' }, 'AdoptMe'),
      React.createElement(
        'button',
        {
          className: 'filter-button',
          onClick: toggleFilter
        },
        'Použít filtr'
      )
    ),
    // Modal
    showFilter &&
      React.createElement(AnimalFilterModal, {
        onClose: toggleFilter,
        setFilteredAnimals: setAnimals
      }),
    ...list
  );
}

export default AnimalList;
