import React from "react";
import { renderWithProviders, screen } from "./renderWithProviders";
import DesignSystem from "../pages/DesignSystem";

test("renders a sticky section navigation for the Design System sections", () => {
  renderWithProviders(<DesignSystem />);

  const nav = screen.getByRole("navigation", { name: /design system sections/i });
  expect(nav).toBeInTheDocument();
  expect(nav).toHaveTextContent(/01 · colors/i);
  expect(nav).toHaveTextContent(/02 · typography/i);
  expect(nav).toHaveTextContent(/03 · ink/i);
  expect(nav).toHaveTextContent(/04 · components/i);
});
