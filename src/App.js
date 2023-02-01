import './App.css';
import MainPage from './components/pages/MainPage';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import Nav from './components/Nav';
import EmployeePage from './components/pages/EmployeePage';
import RobotPage from './components/pages/RobotPage';
import StationPage from './components/pages/StationPage';
import CarPage from './components/pages/CarPage';
import ProductionLinePage from './components/pages/ProductionLinePage';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/station" element={<StationPage />} />
        <Route path="/robot" element={<RobotPage />} />
        <Route path="/car" element={<CarPage />} />
        <Route path="/productionLine" element={<ProductionLinePage />} />
      </Routes>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
