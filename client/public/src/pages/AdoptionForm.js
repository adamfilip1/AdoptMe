const { useParams, Link } = ReactRouterDOM;

function AdoptionForm() {
  const { id } = useParams();
  const [form, setForm] = React.useState({
    jmeno: '',
    telefon: '',
    email: '',
    adresa: '',
    zprava: ''
  });
  const [sent, setSent] = React.useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // tohle ti tam chybělo!
    
    console.log("Odesílám adopční žádost na id:", id); // debug
    
    fetch(`http://localhost:5001/api/adopce/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(res => res.ok ? setSent(true) : Promise.reject('Chyba'))
    .catch(err => console.error('Chyba při odesílání:', err));
  };
  

  const header = React.createElement(
    'div',
    { className: 'header' },
    React.createElement('div', { className: 'logo' }, 'AdoptMe'),
    React.createElement(
      Link,
      { to: '/', className: 'button back-button' },
      'Zpět na seznam'
    )
  );

  if (sent) {
    return React.createElement(
      'div',
      null,
      header,
      React.createElement(
        'div',
        { className: 'form-confirmation' },
        React.createElement('h2', null, 'Žádost o adopci byla úspěšně odeslána 🐾'),
        React.createElement('p', null, 'Ozveme se vám co nejdříve.')
      )
    );
  }

  return React.createElement(
    'div',
    null,
    header,
    React.createElement(
      'form',
      { className: 'adoption-form', onSubmit: handleSubmit },
      React.createElement('h2', null, `Adopční formulář pro zvíře č. ${id}`),

      React.createElement('label', null, 'Jméno'),
      React.createElement('input', {
        type: 'text',
        name: 'jmeno',
        value: form.jmeno,
        placeholder: 'Např. Jan Novák',
        onChange: handleChange,
        required: true
      }),

      React.createElement('label', null, 'Telefon'),
      React.createElement('input', {
        type: 'tel',
        name: 'telefon',
        value: form.telefon,
        placeholder: '+420...',
        onChange: handleChange,
        required: true
      }),

      React.createElement('label', null, 'Email'),
      React.createElement('input', {
        type: 'email',
        name: 'email',
        value: form.email,
        placeholder: 'např. jan@example.com',
        onChange: handleChange,
        required: true
      }),

      React.createElement('label', null, 'Adresa'),
      React.createElement('input', {
        type: 'text',
        name: 'adresa',
        value: form.adresa,
        placeholder: 'Ulice, město, PSČ',
        onChange: handleChange,
        required: true
      }),

      React.createElement('label', null, 'Proč si chcete psa adoptovat?'),
      React.createElement('textarea', {
        name: 'zprava',
        value: form.zprava,
        placeholder: 'Popište svou motivaci...',
        onChange: handleChange
      }),

      React.createElement('button', { type: 'submit', className: 'button' }, 'Odeslat žádost')
    )
  );
}

export default AdoptionForm;
