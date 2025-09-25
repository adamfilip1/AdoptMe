function AnimalDetail() {
  const { id } = ReactRouterDOM.useParams();
  const [animal, setAnimal] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch(`http://localhost:5001/api/zvirata/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Chyba při načítání dat');
        return res.json();
      })
      .then(data => {
        setAnimal(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return React.createElement('p', null, 'Načítám...');
  }

  if (error) {
    return React.createElement('p', null, 'Došlo k chybě: ' + error);
  }

  if (!animal) {
    return React.createElement('p', null, 'Zvíře nenalezeno');
  }

  return React.createElement(
    React.Fragment,
    null,

    // header
    React.createElement(
      'div',
      { className: 'header' },
      React.createElement('div', { className: 'logo' }, 'AdoptMe'),
      React.createElement(
        ReactRouterDOM.Link,
        {
          to: '/',
          className: 'filter-button'
        },
        'Zpět na seznam'
      )
    ),

    // Page content
    React.createElement(
      'div',
      { className: 'page-content' },

      React.createElement('h2', null, animal.jmeno),

      React.createElement('img', {
        src: animal.fotoUrl || 'https://via.placeholder.com/300',
        alt: animal.jmeno,
        style: {
          width: '100%',
          maxWidth: '400px',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          borderRadius: '8px',
          backgroundColor: '#eee',
          margin: '0 auto 16px',
          display: 'block'
        }
      }),

      React.createElement(
        'ul',
        { style: { listStyle: 'none', padding: 0, marginBottom: '20px' } },
        [
          ['Věk', animal.vek],
          ['Pohlaví', animal.pohlavi],
          ['Plemeno', animal.plemeno],
          ['Barva', animal.barva],
          ['Hmotnost', animal.hmotnost + ' kg'],
          ['Stav', animal.stav]
        ].map(([label, value], i) =>
          React.createElement(
            'li',
            { key: i, style: { marginBottom: '6px' } },
            React.createElement('strong', null, label + ': '),
            value
          )
        )
      ),

      React.createElement('p', null, animal.popis),

      React.createElement(
        ReactRouterDOM.Link,
        {
          to: `/zvire/${id}/adopce`,
          style: {
            display: 'block',
            textAlign: 'center',
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            marginTop: '16px'
          }
        },
        'Adoptovat'
      )
    )
  );
}

export default AnimalDetail;
