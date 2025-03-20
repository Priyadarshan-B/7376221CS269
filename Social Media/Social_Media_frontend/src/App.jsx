import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/themeProvider";
import AppLayout from "./components/layout/appLayout";
import UserPost from "./pages/UserPost/UserPost";
import TopUser from "./pages/Topuser/topUser";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<UserPost />} />
            <Route path="/topuser" element={<TopUser />} />

          </Routes>
        </AppLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
