
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginComponent/LoginPage.jsx';
import RegisterUser from './Components/LoginComponent/RegisterUser.jsx';
import AdminMenu from './Components/LoginComponent/AdminMenu.jsx';
import StudentMenu from './Components/LoginComponent/StudentMenu.jsx';
import Dummy from './Components/ItemComponent/Dummy';
import LostItemReport from './Components/ItemComponent/LostItemReport.jsx';
import FoundItemReport from './Components/ItemComponent/FoundItemReport.jsx';
import MatchItemReport from './Components/ItemComponent/MatchItemReport.jsx';
import MatchItemSearch from './Components/ItemComponent/MatchItemSearch.jsx';
import ChatPage from './Components/ChatComponent/ChatPage.jsx';
import LostItemRegistration from './Components/ItemComponent/LostItemRegistration.jsx';
import FoundItemRegistration from './Components/ItemComponent/FoundItemRegistration.jsx';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/admin-menu" element={<AdminMenu />} />
          <Route path="/student-menu" element={<StudentMenu />} />
          <Route path="/dummy/:no" element={<Dummy />} />
          <Route path="/lost-entry" element={<LostItemRegistration />} />
          <Route path="/lost-report" element={<LostItemReport />} />
          <Route path="/found-entry" element={<FoundItemRegistration />} />
          <Route path="/found-report" element={<FoundItemReport />} />
          <Route path="/match-report" element={<MatchItemReport />} />
          <Route path="/search/:lostItemId" element={<MatchItemSearch />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;













