// The admin route only works against a local Express server (localhost:3001),
// so it's lazy-loaded and registered only in dev — it has no function in
// production and shouldn't ship in the bundle or be publicly reachable.

import React, { Suspense, lazy } from 'react';
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
import Credentials from './pages/Credentials';
import Sitemap from './pages/Sitemap';
import DesignSystem from './pages/DesignSystem';
import TagsDirectory from './tags/TagsDirectory';
import SingleTagPage from './tags/SingleTagPage';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';

// Dev-only: lazy so the Admin dashboard never ships in the production bundle
const Admin = lazy(() => import('./pages/Admin'));

// Auto-discovers a route for every 'index.jsx' under 'src/projects/'
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
      { path: "credentials", element: <Credentials /> },
      { path: "sitemap", element: <Sitemap /> },
      { path: "designsystem", element: <DesignSystem /> },
      { path: "tags", element: <TagsDirectory /> },
      { path: "tags/:tagName", element: <SingleTagPage /> },
      // Dev-only content editor — never registered in production builds
      ...(import.meta.env.DEV
        ? [{
            path: "admin",
            element: (
              <Suspense fallback={null}>
                <Admin />
              </Suspense>
            ),
          }]
        : []),
      ...dynamicProjectRoutes,
    ],
  },
]);


// A colophon for anyone who pops the console instead of scrolling the footer.
console.log(
  "%cChecking under the hood?%c\nBuilt from scratch with React, Tailwind CSS & Framer Motion.\nSource: https://github.com/SanazYazdanjoo/Portfolio",
  "font-weight: bold; font-size: 13px; color: #d3a22e;",
  "font-weight: normal; color: inherit;"
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>
);