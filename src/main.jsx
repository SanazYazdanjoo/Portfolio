// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Impressum from './pages/Impressum';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Voluntary from './pages/Voluntary';
import CurriculumVitae from './pages/CurriculumVitae';
import Sitemap from './pages/Sitemap';
import DesignSystem from './pages/DesignSystem';
import './index.css';

// The Magic Sweeper: Looks for any 'index.jsx' inside your 'src/projects/' folders
const projectFiles = import.meta.glob('./projects/*/index.jsx', { eager: true });

const dynamicProjectRoutes = Object.keys(projectFiles).map((filePath) => {
  const folderName = filePath.split('/')[2]; 
  const ProjectComponent = projectFiles[filePath].default;
  return {
    path: `/projects/${folderName}`,
    element: <ProjectComponent />,
  };
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App must contain an <Outlet />
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "privacy", element: <Privacy /> },
      { path: "impressum", element: <Impressum /> },
      { path: "contact", element: <Contact /> },
      { path: "projects", element: <Projects /> },
      { path: "voluntary", element: <Voluntary /> },
      { path: "cv", element: <CurriculumVitae /> },
      { path: "sitemap", element: <Sitemap /> },
      { path: "designsystem", element: <DesignSystem /> },
      ...dynamicProjectRoutes, 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);