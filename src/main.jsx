// The admin route only works against a local Express server (localhost:3001),
// so it's lazy-loaded and registered only in dev — it has no function in
// production and shouldn't ship in the bundle or be publicly reachable.

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import App from './App';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';

// Route-level code splitting: each page ships as its own chunk, loaded on
// navigation instead of all bundled into the initial download.
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Impressum = lazy(() => import('./pages/Impressum'));
const Contact = lazy(() => import('./pages/Contact'));
const Projects = lazy(() => import('./pages/Projects'));
const Voluntary = lazy(() => import('./pages/Voluntary'));
const CurriculumVitae = lazy(() => import('./pages/CurriculumVitae'));
const Credentials = lazy(() => import('./pages/Credentials'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const DesignSystem = lazy(() => import('./pages/DesignSystem'));
const TagsDirectory = lazy(() => import('./tags/TagsDirectory'));
const SingleTagPage = lazy(() => import('./tags/SingleTagPage'));

// Dev-only: lazy so the Admin dashboard never ships in the production bundle
const Admin = lazy(() => import('./pages/Admin'));

// Auto-discovers a route for every 'index.jsx' under 'src/projects/'.
// eager: false — each case study is its own chunk, loaded on navigation.
// This only affects the *page wrapper* import; each wrapper's own
// `import { projectData } from './data'` (e.g. project-1/index.jsx:3)
// still resolves normally once its chunk loads. Test files that import
// data.js directly (src/test/*.test.jsx) never go through this glob at
// all, so they're unaffected.
const projectFiles = import.meta.glob('./projects/*/index.jsx', { eager: false });

const dynamicProjectRoutes = Object.entries(projectFiles).map(([filePath, loadModule]) => {
  const folderName = filePath.split('/')[2];
  const ProjectComponent = lazy(loadModule);
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
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </MotionConfig>
  </React.StrictMode>
);