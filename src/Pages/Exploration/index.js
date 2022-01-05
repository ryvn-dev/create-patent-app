import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Box,
  LinearProgress,
  Paper,
  Container,
} from "@mui/material";
import RichText from "./Editor";
import TitleBar from "./TitleBar";
import NestedList from "./Prompts";
import randomStartingText from "./randomStaringText";
import { createEditor, Transforms, Editor } from "slate";
import { withReact, ReactEditor } from "slate-react";
import Axios from "axios";

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

const Exploration = () => {
  // Create a Slate editor object that won't change across renders.
  // const editor = useMemo(() => withReact(createEditor()), []);

  // CRA resolution
  const editorRef = useRef();
  if (!editorRef.current) editorRef.current = withReact(createEditor());
  const editor = editorRef.current;

  // landing behaviors (mounted ....)
  useEffect(() => {
    ReactEditor.focus(editor);
    Transforms.select(editor, Editor.end(editor, []));
  }, []);

  // record request
  const ajaxPost = useRef(null);

  // landing initText
  const initText = randomStartingText();

  // Add the initial value when setting up our state.
  const [text, setText] = useState(() => {
    const initTextInEditor = initText;
    return [
      {
        type: "paragraph",
        children: [{ text: `${initTextInEditor}` }],
      },
    ];
  });

  // counting the text word count
  const [wordCount, setWordCount] = React.useState(() => {
    const initTextInWordCount = initText;
    return initTextInWordCount.trim().split(" ").length;
  });

  const [prompts, setPrompts] = React.useState([
    "Nisi non magna deserunt elit laborum veniam sit fugiat dolore nulla. Magna est ut eu sint do sint aliqua quis dolore nulla anim et excepteur. Consequat aliquip aliqua tempor irure duis aute ad adipisicing nostrud ea id non. Id eu commodo dolor cillum qui irure ea esse occaecat. Dolor exercitation ea voluptate cupidatat ipsum. Aute est nulla excepteur Lorem amet dolor duis. Ex do eu adipisicing consectetur non cillum dolore.",
    "Nisi reprehenderit cupidatat ullamco commodo et adipisicing esse magna. Id adipisicing do labore fugiat aliqua ut labore elit aliqua. Cillum consectetur consectetur incididunt elit magna non enim incididunt. Do consequat commodo amet fugiat aliquip occaecat deserunt non deserunt laborum in minim commodo. Quis dolore nostrud sunt est sit eiusmod aliquip consectetur. Eu magna ipsum dolore voluptate. Voluptate ad sint officia fugiat non commodo aliquip enim nisi sunt ut sint mollit voluptate.",
    "Commodo occaecat irure id officia duis anim quis nostrud sit est elit consectetur deserunt. Sint culpa deserunt commodo ullamco esse exercitation tempor eiusmod minim nulla exercitation minim. Nulla cillum voluptate minim enim exercitation voluptate sunt in labore culpa commodo et. Aliqua aute eiusmod voluptate ullamco laborum sunt nulla dolor consequat eu ullamco aliquip.",
    "Irure elit anim id commodo cupidatat adipisicing. Aute sit elit ut nisi ipsum. Eiusmod sint fugiat ad in et nisi labore qui ad nulla consectetur labore Lorem dolor. Officia anim ut excepteur nostrud mollit laboris officia irure enim.",
    "Voluptate dolor cillum exercitation adipisicing amet id reprehenderit. Reprehenderit reprehenderit enim anim et occaecat commodo pariatur ex est. Id irure commodo dolor nisi ad elit do irure veniam et incididunt consectetur ipsum. Exercitation anim et fugiat in non commodo sint minim eu sit magna. Et aute nisi elit ut qui. Nostrud ullamco quis voluptate est occaecat reprehenderit dolore officia occaecat mollit proident ipsum aliqua.",
  ]);

  // setting parameters that should be passed to Backend API
  const [param, setParam] = React.useState({
    engine: "IndependentClaim",
    field: "General",
    creativity: 0.8,
    diversity: 30,
    sentencelength: 25,
  });

  const [logging, setLogging] = React.useState(false);

  const diff = (diffMe, diffBy) => diffMe.split(diffBy).join("");

  useEffect(() => {
    const loadData = async () => {
      // cancel previous ajax if exists
      if (ajaxPost.current) {
        ajaxPost.current.cancel();
      }

      // creates a new token for upcomming ajax (overwrite the previous one)
      ajaxPost.current = Axios.CancelToken.source();

      // current input prompt
      const currentInputPrompt = serialize(editor.children)
        .replace(/\r\n|\n|\s\s+/g, " ")
        .trim();

      const textData = {
        ...param,
        inputTxt: currentInputPrompt,
      };

      try {
        setLogging(true);
        const response = await Axios.post(
          "http://192.168.3.33/mlapi/claimgen/",
          textData,
          { cancelToken: ajaxPost.current.token }
        );
        const data = await response.data;
        const arrayData = Object.keys(data).map((key) =>
          diff(data[key], currentInputPrompt)
        );
        setPrompts(arrayData);
        setLogging(false);
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(
            "Previous request canceled, new request is send",
            error.message
          );
        } else {
          throw new Error(error);
        }
      }
    };

    loadData();
  }, [wordCount]);

  return (
    <Container maxWidth="lg" sx={{ mt: "100px" }}>
      <Box sx={{ my: 4 }}>
        <TitleBar param={param} setParam={setParam} editor={editor} />
      </Box>
      <Paper elevation={3}>
        <Box sx={{ my: 4, padding: 3 }} minHeight="200px">
          <RichText
            editor={editor}
            text={text}
            setText={setText}
            setWordCount={setWordCount}
          />
        </Box>
      </Paper>
      <Typography variant="body2" sx={{ mt: -2, mb: 3, px: 2 }}>
        <strong>Word Count: {wordCount}.</strong> Try the spacebar to issue, if
        not responding.
      </Typography>
      {logging ? (
        <>
          <LinearProgress color="success" />
          <Typography variant="caption" sx={{ mb: 1, textAlign: "right" }}>
            Still Loading? AI servers are evaluating over 1.5 billion parameters
            to tailor your claim. Thank you for your patience.
          </Typography>
        </>
      ) : null}
      <Paper elevation={3}>
        <Box sx={{ my: 4 }}>
          <NestedList prompts={prompts} editor={editor} logging={logging} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Exploration;
