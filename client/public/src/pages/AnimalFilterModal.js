function AnimalFilterModal({ onClose, setFilteredAnimals }) {
  const [vekOd, setVekOd] = React.useState('');
  const [vekDo, setVekDo] = React.useState('');
  const [pohlavi, setPohlavi] = React.useState('');
  const [plemeno, setPlemeno] = React.useState('');

  function prevestVek(vekText) {
    const cislo = parseInt(vekText);
    return isNaN(cislo) ? 0 : cislo;
  }

  function filtruj() {
    fetch('http://localhost:5001/api/zvirata')
      .then(res => res.json())
      .then(data => {
        const vysledky = data.filter(zvire => {
          const vekCislo = prevestVek(zvire.vek);
          return (!vekOd || vekCislo >= vekOd) &&
                 (!vekDo || vekCislo <= vekDo) &&
                 (!pohlavi || zvire.pohlavi.toLowerCase() === pohlavi) &&
                 (!plemeno || zvire.plemeno.toLowerCase().includes(plemeno.toLowerCase()));
        });
        setFilteredAnimals(vysledky);
        onClose();
      });
  }

  function odstranitFiltry() {
    fetch('http://localhost:5001/api/zvirata')
      .then(res => res.json())
      .then(data => {
        setFilteredAnimals(data);
        setVekOd('');
        setVekDo('');
        setPohlavi('');
        setPlemeno('');
        onClose();
      });
  }

  return React.createElement(
    'div',
    { className: 'modal-overlay' },
    React.createElement(
      'div',
      { className: 'modal filter-modal' },
      React.createElement('h2', null, 'Filtr'),
      React.createElement('div', { className: 'filter-group' },
        React.createElement('label', null, 'Věk od'),
        React.createElement('input', {
          type: 'number',
          value: vekOd,
          onChange: e => setVekOd(e.target.value)
        })
      ),
      React.createElement('div', { className: 'filter-group' },
        React.createElement('label', null, 'Věk do'),
        React.createElement('input', {
          type: 'number',
          value: vekDo,
          onChange: e => setVekDo(e.target.value)
        })
      ),
      React.createElement('div', { className: 'filter-group' },
        React.createElement('label', null, 'Pohlaví'),
        React.createElement('select', {
          value: pohlavi,
          onChange: e => setPohlavi(e.target.value)
        },
          React.createElement('option', { value: '' }, 'Vyberte...'),
          React.createElement('option', { value: 'pes' }, 'Pes'),
          React.createElement('option', { value: 'fena' }, 'Fena')
        )
      ),
      React.createElement('div', { className: 'filter-group' },
        React.createElement('label', null, 'Plemeno'),
        React.createElement('select', {
          value: plemeno,
          onChange: e => setPlemeno(e.target.value)
        },
        React.createElement('option', { value: '' }, 'Vyberte...'),
        React.createElement('option', { value: 'Labrador' }, 'Labrador'),
        React.createElement('option', { value: 'Husky' }, 'Husky'),
        React.createElement('option', { value: 'Americký pitbulteriér' }, 'Americký pitbulteriér'),
        React.createElement('option', { value: 'Bernardýn' }, 'Bernardýn'),
        React.createElement('option', { value: 'Mops' }, 'Mops'),
        React.createElement('option', { value: 'Bulldog' }, 'Bulldog'),
        React.createElement('option', { value: 'Boxer' }, 'Boxer'),
        React.createElement('option', { value: 'Chihuahua' }, 'Chihuahua'),
        React.createElement('option', { value: 'Německý ovčák' }, 'Německý ovčák')
        )
      ),
      React.createElement('div', { className: 'filter-actions' },
        React.createElement('button', { className: 'button primary', onClick: filtruj }, 'Použít'),
        React.createElement('button', { className: 'button secondary', onClick: odstranitFiltry }, 'Odstranit filtry'),
        React.createElement('button', { className: 'button', onClick: onClose }, 'Zavřít')
      )
    )
  );
}

export default AnimalFilterModal;
