import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, renderWithProviders, screen, waitFor } from "./renderWithProviders";
import { AskPortfolio } from "../components/AskPortfolio";

// The widget reads the reply as a plain byte stream (the API strips the SSE
// framing server-side), so a fake body only needs getReader().
function streamOf(...chunks) {
  const encoder = new TextEncoder();
  let i = 0;
  return {
    getReader: () => ({
      read: async () =>
        i < chunks.length
          ? { done: false, value: encoder.encode(chunks[i++]) }
          : { done: true, value: undefined },
    }),
  };
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("AskPortfolio", () => {
  it("starts closed: a launcher button, no dialog", () => {
    renderWithProviders(<AskPortfolio />);
    expect(screen.getByRole("button", { name: /ask ai/i })).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens with suggested questions and closes on Escape", async () => {
    renderWithProviders(<AskPortfolio />);
    fireEvent.click(screen.getByRole("button", { name: /ask ai/i }));

    const dialog = await screen.findByRole("dialog");
    expect(screen.getByText(/what did you build at ibs/i)).toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: "Escape" });
    // AnimatePresence keeps the panel mounted until the exit animation ends.
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("sends the question to /api/chat and renders the streamed reply with internal links", async () => {
    fetch.mockResolvedValue({
      ok: true,
      body: streamOf(
        "She digitalised a 13-step paper workflow — see ",
        "[the IBS case study](/projects/digitalising-ibs-travel-reimbursements)."
      ),
    });

    renderWithProviders(<AskPortfolio />);
    fireEvent.click(screen.getByRole("button", { name: /ask ai/i }));
    fireEvent.change(screen.getByPlaceholderText(/ask me anything/i), {
      target: { value: "What did she do at IBS?" },
    });
    fireEvent.submit(screen.getByPlaceholderText(/ask me anything/i).closest("form"));

    // The user turn echoes immediately; the reply streams in after.
    expect(await screen.findByText("What did she do at IBS?")).toBeInTheDocument();
    const link = await screen.findByRole("link", { name: /the ibs case study/i });
    expect(link).toHaveAttribute("href", "/projects/digitalising-ibs-travel-reimbursements");

    // The grounding is server-side: the client sends only visible turns + lang.
    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe("/api/chat");
    const sent = JSON.parse(init.body);
    expect(sent.messages).toEqual([{ role: "user", content: "What did she do at IBS?" }]);
    expect(["en", "de"]).toContain(sent.lang);
  });

  it("surfaces a rate-limit response as its own message, not a generic error", async () => {
    fetch.mockResolvedValue({ ok: false, status: 429 });

    renderWithProviders(<AskPortfolio />);
    fireEvent.click(screen.getByRole("button", { name: /ask ai/i }));
    fireEvent.click(screen.getByText(/what did you build at ibs/i));

    expect(await screen.findByRole("alert")).toHaveTextContent(/lots of questions/i);
  });
});
