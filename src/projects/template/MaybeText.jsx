import { NeedsInputMarker } from "../../components/NeedsInputMarker";
import { isNeedsInput } from "../../data/needsInput";

// Renders a text value, or the needs-input marker when the data file still
// holds a placeholder, or nothing when the field is absent.
export function MaybeText({ value, path, as: As = "span", className }) {
  if (isNeedsInput(value)) return <NeedsInputMarker path={path} />;
  if (!value) return null;
  return <As className={className}>{value}</As>;
}
