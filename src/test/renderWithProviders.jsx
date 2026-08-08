// Wraps components in the same providers main.jsx uses, so anything calling
// useTranslation() or router hooks (Link, useNavigate, useParams) works as
// expected.
//
// Usage:
//   import { renderWithProviders, screen } from "../test/renderWithProviders";
//   renderWithProviders(<Nav />);
//   renderWithProviders(<ProjectPage />, { route: "/projects/gaze-assisted-input" });

import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "../context/LanguageContext";

export function renderWithProviders(ui, { route = "/", ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <MemoryRouter initialEntries={[route]}>
        <LanguageProvider>{children}</LanguageProvider>
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from RTL so test files need only one import
export * from "@testing-library/react";