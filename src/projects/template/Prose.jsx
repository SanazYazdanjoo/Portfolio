import { ClampedText } from "./ClampedText";

// Right-rail pull-quote. Hidden below xl — the rail is a wide-screen
// enhancement, not new information.
function PullQuote({ text }) {
  if (!text) return null;
  return (
    <blockquote className="hidden xl:block border-l-2 border-primary-600 pl-5 pt-1">
      <p className="font-hand text-[28px] leading-snug text-text/80">{text}</p>
    </blockquote>
  );
}

// Long-form prose wrapper: caps the reading measure, and — for the three
// sections that get one — sets a lead-sentence pull-quote beside it in the
// right rail once the viewport is wide enough to hold three tracks.
export function Prose({ text, quote, rail, children }) {
  // Older data files set no explicit `quote` — lift the lead sentence instead.
  let resolvedQuote = quote;
  if (!resolvedQuote && typeof text === "string" && rail) {
    const match = text.match(/^.*?[.!?](?=\s|$)/);
    const sentence = (match ? match[0] : text).trim();
    resolvedQuote = sentence.length > text.length * 0.85 ? "" : sentence;
  }

  return (
    <div className={rail ? "xl:grid xl:grid-cols-[1fr_240px] xl:gap-10 items-start" : ""}>
      <div className="max-w-[68ch]">
        <ClampedText>
          <p className="text-[17px] leading-[1.7] text-text/90">{text}</p>
        </ClampedText>
        {children}
      </div>
      {rail && <PullQuote text={resolvedQuote} />}
    </div>
  );
}
