import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Explore from '../pages/Explore.jsx'
import PlaceDetails from '../pages/PlaceDetails.jsx'
import Saved from '../pages/Saved.jsx'
import BudgetPlanner from '../pages/BudgetPlanner.jsx'
import About from '../pages/About.jsx'
import IndiaMap from '../pages/IndiaMap.jsx'
import NotFound from '../pages/NotFound.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/places" element={<Explore />} />
      <Route path="/places/:placeId" element={<PlaceDetails />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/budget-planner" element={<BudgetPlanner />} />
      <Route path="/india-map" element={<IndiaMap />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
