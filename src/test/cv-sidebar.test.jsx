import React from "react";
import { renderWithProviders, screen } from "./renderWithProviders";
import CV from "../pages/CurriculumVitae";

test("renders a sticky section navigation for the main CV sections", () => {
  renderWithProviders(<CV />);

  const nav = screen.getByRole("navigation", { name: /cv sections/i });
  expect(nav).toBeInTheDocument();
  expect(nav).toHaveTextContent(/about/i);
  expect(nav).toHaveTextContent(/experience/i);
  expect(nav).toHaveTextContent(/education/i);
  expect(nav).toHaveTextContent(/skills/i);
});
