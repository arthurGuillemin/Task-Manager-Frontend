import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NewTask from './pages/NewTask';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewTask />} />
      </Routes>
    </Router>
  );
}

export default App;
