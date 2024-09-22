// import Inventory from './pages/Inventory';
// import CreatorInfo from './constants/CreatorInfo';
// import SanginInfo from './constants/SanginInfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import MyPage from './pages/MyPage';
import StorePage from './pages/StorePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import MatchingDetail from "./pages/MatchingDetail";
import MatchingApply from "./pages/MatchingApply"; 

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/creator" element={<Inventory infomations={CreatorInfo} />} /> */}
        {/* <Route path="/sangin" element={<Inventory infomations={SanginInfo} />} /> */}
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:id" element={<MatchingDetail />} />
        <Route path="/apply" element={<MatchingApply />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/my-store" element={<StorePage />} /> {/* New route for store info */}
      </Routes>
    </Router>
  );
}

export default App;