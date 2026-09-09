// The admin route only works against a local Express server (localhost:3001),
// so it's lazy-loaded and registered only in dev — it has no function in
// production and shouldn't ship in the bundle or be publicly reachable.

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage';
import { lazyWithRetry } from './utils/lazyWithRetry';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

// Route-level code splitting: each page ships as its own chunk, loaded on
// navigation instead of all bundled into the initial download. Wrapped in
// lazyWithRetry so a stale chunk hash from a previous deploy gets one
// automatic reload instead of a hard crash (see lazyWithRetry.js).
//
// withMotion: pages that still animate with framer-motion get its global
// config (reduced motion honoured) from MotionRoot, fetched in the same
// breath as the page chunk. The shell and the homepage do not import the
// library, so this is the only way it reaches a page — see MotionRoot.jsx.
const withMotion = (load) => () =>
  Promise.all([load(), import('./components/MotionRoot')]).then(([page, motion]) => {
    const Page = page.default;
    const MotionRoot = motion.default;
    const Wrapped = (props) => (
      <MotionRoot>
        <Page {...props} />
      </MotionRoot>
    );
    return { default: Wrapped };
  });

const Home = lazyWithRetry(() => import('./pages/Home'));
const About = lazyWithRetry(withMotion(() => import('./pages/About')));
const Privacy = lazyWithRetry(withMotion(() => import('./pages/Privacy')));
const Impressum = lazyWithRetry(withMotion(() => import('./pages/Impressum')));
const Contact = lazyWithRetry(withMotion(() => import('./pages/Contact')));
const Projects = lazyWithRetry(withMotion(() => import('./pages/Projects')));
const Voluntary = lazyWithRetry(withMotion(() => import('./pages/Voluntary')));
const CurriculumVitae = lazyWithRetry(() => import('./pages/CurriculumVitae'));
const Credentials = lazyWithRetry(withMotion(() => import('./pages/Credentials')));
const Sitemap = lazyWithRetry(withMotion(() => import('./pages/Sitemap')));
const DesignSystem = lazyWithRetry(withMotion(() => import('./pages/DesignSystem')));
const TagsDirectory = lazyWithRetry(() => import('./tags/TagsDirectory'));
const SingleTagPage = lazyWithRetry(() => import('./tags/SingleTagPage'));
const NotFound = lazyWithRetry(() => import('./pages/NotFound'));

// Dev-only: the DEV guard sits on the import itself, not just the route.
// Guarding only the route still emits an Admin chunk into dist/ (the
// dynamic import is live code even if never rendered); guarding here lets
// the build replace DEV with false and dead-code-eliminate the import, so
// no chunk is emitted at all. Not wrapped in lazyWithRetry — a dev hitting
// a real local import error wants to see it, not have the page silently
// reload.
const Admin = import.meta.env.DEV ? lazy(() => import('./pages/Admin')) : null;

// Auto-discovers a route for every 'index.jsx' under 'src/projects/'.
// eager: false — each case study is its own chunk, loaded on navigation.
// This only affects the *page wrapper* import; each wrapper's own
// `import { projectData } from './data'` (e.g. gaze-assisted-input/index.jsx:3)
// still resolves normally once its chunk loads. Test files that import
// <slug>.data.js directly (src/test/*.test.jsx) never go through this glob at
// all, so they're unaffected.
const projectFiles = import.meta.glob('./projects/*/index.jsx', { eager: false });

const dynamicProjectRoutes = Object.entries(projectFiles).map(([filePath, loadModule]) => {
  const folderName = filePath.split('/')[2];
  const ProjectComponent = lazyWithRetry(withMotion(loadModule));
  return {
    path: `/projects/${folderName}`,
    element: <ProjectComponent />,
  };
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App must contain an <Outlet />
    errorElement: <ErrorPage />, 
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
      // Catch-all LAST: any URL no route above claimed renders the styled,
      // translated 404 inside the App shell instead of the bare errorElement.
      { path: "*", element: <NotFound /> },
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
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);