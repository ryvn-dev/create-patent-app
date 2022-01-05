import React from "react";
import { Slate, Editable } from "slate-react";
// Import the `Node` helper interface from Slate.
import { Node } from "slate";

// Define a serializing function that takes a value and returns a string.
const serialize = (value) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join("\n")
  );
};

const PlainTextExample = ({ editor, text, setText, setWordCount }) => {
  const handler = (event) => {
    setText(event);
    const pureText = serialize(event);
    const matchSpace = pureText.replace(/\r\n|\n/g, " ").match(/([\s]+)/g);
    matchSpace === null ? setWordCount(1) : setWordCount(matchSpace.length + 1);
  };

  // Render the Slate context.
  return (
    <Slate editor={editor} value={text} onChange={handler}>
      <Editable placeholder="Enter some claim texts..." />
    </Slate>
  );
};

export default PlainTextExample;
