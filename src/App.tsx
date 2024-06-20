import './App.css'
import Header from './components/Header/Header'


// import Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { Footer } from './components/Footer/Footer';
import TutorialView from './pages/TutorialView/TutorialView';
import ChaptersView from './pages/ChaptersView/ChaptersView';
import TutorialLearn from './pages/TutorialLearn/TutorialLearn';
import ChapterLearn from './pages/ChapterLearn/ChapterLearn';





function App() {


  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tutorial-view" element={<TutorialView />} />
        <Route path="/chapters-view" element={<ChaptersView />} />
        <Route path="/tutorial-learn/:id" element={<TutorialLearn />} />
        <Route path="/chapter-learn" element={<ChapterLearn />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
