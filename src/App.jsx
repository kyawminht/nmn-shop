import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ShopProvider } from "./context/ShopContext"
import { BottomNavigation } from "./components/bottoms-navigation"
import HomePage from "./pages/HomePage"
import CategoriesPage from "./pages/CategoriesPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import AdminPage from "./pages/AdminPage"
import "./styles/global.css"

function App() {

  if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
  });
}

  return (
    <Router>
      <ShopProvider>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 to-white">
          <main className="flex-1 pb-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <BottomNavigation />
        </div>
      </ShopProvider>
    </Router>
  )
}

export default App