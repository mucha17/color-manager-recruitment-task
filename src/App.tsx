import './App.scss';
import { LocalStorageProvider } from './contexts/LocalStorageContext/LocalStorageContext';
import DefaultLayout from './layouts/DefaultLayout';

const App = () => {
  return (
    <LocalStorageProvider>
      <DefaultLayout />
    </LocalStorageProvider>
  );
};

export default App;
