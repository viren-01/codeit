import './app.css';
import AppRouter from './routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
