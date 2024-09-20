import Inventory from './pages/Inventory';
import CreatorInfo from './constants/CreatorInfo';
import SanginInfo from './constants/SanginInfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Search from './pages/Search';
import MyPage from './pages/MyPage';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creator" element={<Inventory infomations={CreatorInfo} />} />
        <Route path="/sangin" element={<Inventory infomations={SanginInfo} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;