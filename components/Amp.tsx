import { Fragment } from "react";

/** Renders text with every "&" set as the studio's yellow italic ampersand. */
export function Amp({ text }: { text: string }) {
  const parts = text.split("&");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="amp">&amp;</span>}
          {part}
        </Fragment>
      ))}
    </>
  );
}
