// src/main.jsx
// ─────────────────────────────────────────────────────────────────────────────
// ADMIN GUARD — /admin was routed in production. It only writes to your local
// Express server (localhost:3001), so on Vercel it silently fails — but the
// editing UI itself was still publicly reachable. It's now:
//   • lazy-loaded (kept out of the production bundle entirely), and
//   • registered only when import.meta.env.DEV is true.
// Everything else — including the "Magic Sweeper" dynamic project routes —
// is unchanged.
// ─────────────────────────────────────────────────────────────────────────────

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
import Sitemap from './pages/Sitemap';
import DesignSystem from './pages/DesignSystem';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';

// Dev-only: lazy so the Admin dashboard never ships in the production bundle
const Admin = lazy(() => import('./pages/Admin'));

// The Magic Sweeper: looks for any 'index.jsx' inside your 'src/projects/' folders
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>
);