import AnimalList from './pages/AnimalList.js';
import AnimalDetail from './pages/AnimalDetail.js';
import AdoptionForm from './pages/AdoptionForm.js';
import AnimalFilter from './pages/AnimalFilter.js';

const {
  BrowserRouter,
  Switch,
  Route
} = ReactRouterDOM;

function App() {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      Switch,
      null,
      // Seznam všech zvířat
      React.createElement(Route, {
        exact: true,
        path: '/',
        component: AnimalList
      }),
      // Detail zvířete
      React.createElement(Route, {
        exact: true,
        path: '/zvire/:id',
        component: AnimalDetail
      }),
      // Adopční formulář
      React.createElement(Route, {
        exact: true,
        path: '/zvire/:id/adopce',
        component: AdoptionForm
      }),
      // Filtry
      React.createElement(Route, {
        exact: true,
        path: '/filtry',
        component: AnimalFilter
      })
    )
  );
}

export default App;
