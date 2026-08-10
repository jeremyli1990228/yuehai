import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Configuration from './pages/Configuration'
import EstimatedWeight from './pages/EstimatedWeight'
import PrintApplication from './pages/PrintApplication'
import Summary from './pages/Summary'
import Records from './pages/Records'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="configuration" element={<Configuration />} />
          <Route path="estimated-weight" element={<EstimatedWeight />} />
          <Route path="print-application" element={<PrintApplication />} />
          <Route path="summary" element={<Summary />} />
          <Route path="records" element={<Records />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
