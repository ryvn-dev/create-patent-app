import React from "react";

import {
  Button,
  Typography,
  Tooltip,
  IconButton,
  Alert,
  Snackbar,
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Slider,
} from "@mui/material";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

import { v4 } from "uuid";

import randomStartingText from "./randomStaringText";

import { Transforms, Editor } from "slate";
import { ReactEditor } from "slate-react";
// Import the `Node` helper interface from Slate.
import { Node } from "slate";

function BasicGrid({ param, setParam }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SelectClaimSubject param={param} setParam={setParam} />
        </Grid>
        <Grid item xs={6}>
          <SelectField param={param} setParam={setParam} />
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}>
          <Typography variant="h6">Creativity | {param.creativity}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}>
          <Typography variant="h6">Diversity | {param.diversity}</Typography>
        </Grid>
        <Grid item xs={6}>
          <SelectCreativity param={param} setParam={setParam} />
        </Grid>
        <Grid item xs={6}>
          <SelectDiversity param={param} setParam={setParam} />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography variant="h6">
            Sentence Length | {param.sentencelength}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SelectSentenceLength param={param} setParam={setParam} />
        </Grid>
      </Grid>
    </Box>
  );
}

function SelectClaimSubject({ param, setParam }) {
  const handleChange = (event) => {
    setParam({ ...param, engine: event.target.value });
  };

  const labelId = v4();
  const selectId = v4();

  return (
    <FormControl variant="standard" sx={{ my: 2, minWidth: "100%" }}>
      <InputLabel id={labelId}>Creation Subject</InputLabel>
      <Select
        labelId={labelId}
        id={selectId}
        value={param.engine}
        onChange={handleChange}
        label="CreationSubject"
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value={"IndependentClaim"}>Independent Claim</MenuItem>
        <MenuItem value={"DependentClaim"} disabled={true}>
          Dependent Claim
        </MenuItem>
        <MenuItem value={"Embodiment"} disabled={true}>
          Embodiment
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function SelectField({ param, setParam }) {
  const handleChange = (event) => {
    setParam({ ...param, field: event.target.value });
  };

  const labelId = v4();
  const selectId = v4();

  return (
    <FormControl variant="standard" sx={{ my: 2, minWidth: "100%" }}>
      <InputLabel id={labelId}>Field</InputLabel>
      <Select
        labelId={labelId}
        id={selectId}
        value={param.field}
        onChange={handleChange}
        label="Field"
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value={"General"}>General</MenuItem>
        <MenuItem value={"Chemical"} disabled={true}>
          Chemical
        </MenuItem>
        <MenuItem value={"Mechanical"} disabled={true}>
          Mechanical
        </MenuItem>
        <MenuItem value={"TSMC"}>TSMC</MenuItem>
      </Select>
    </FormControl>
  );
}

function SelectCreativity({ param, setParam }) {
  const handleChange = (event) => {
    setParam({ ...param, creativity: event.target.value });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        aria-label="Small steps"
        value={param.creativity}
        step={0.1}
        marks
        min={0.1}
        max={1}
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{ color: "#7F6852" }}
      />
    </Box>
  );
}

function SelectDiversity({ param, setParam }) {
  const handleChange = (event) => {
    setParam({ ...param, diversity: event.target.value });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        aria-label="Small steps"
        value={param.diversity}
        step={1}
        marks
        min={1}
        max={40}
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{ color: "#233B5E" }}
      />
    </Box>
  );
}

function SelectSentenceLength({ param, setParam }) {
  const handleChange = (event) => {
    setParam({ ...param, sentencelength: event.target.value });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        aria-label="Small steps"
        value={param.sentencelength}
        step={1}
        marks
        min={1}
        max={50}
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{ color: "#09585D" }}
      />
    </Box>
  );
}

function SettingButton({ param, setParam }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Settings">
        <IconButton onClick={handleClickOpen}>
          <MoreVertRoundedIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: 24, textAlign: "center" }}>
          SETTINGS
        </DialogTitle>
        <DialogContent>
          <BasicGrid param={param} setParam={setParam} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Apply</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function TitleBar({ param, setParam, editor }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const renewHandler = async (e) => {
    const focusMove = new Promise((resolve, reject) => {
      ReactEditor.focus(editor);
      Transforms.delete(editor, {
        at: Editor.end(editor, []),
        unit: "block",
        reverse: true,
      });
      Transforms.insertText(editor, randomStartingText());
      Transforms.select(editor, Editor.end(editor, []));
    });
    await focusMove;
  };

  const copyHandler = () => {
    // for https
    // navigator.clipboard.writeText(serialize(editor.children)).then(
    //   function () {
    //     console.log("Async: Copying to clipboard was successful!");
    //   },
    //   function (err) {
    //     console.error("Async: Could not copy text: ", err);
    //   }
    // );

    // for http
    Transforms.select(editor, {
      anchor: Editor.start(editor, []),
      focus: Editor.end(editor, []),
    });
    document.execCommand("copy");

    console.log("Copying to clipboard was successful!");

    setOpen(true);
  };

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={0} alignItems="center">
        <Grid item xs={8}>
          <Typography variant="h4">Independent Claim</Typography>
        </Grid>
        <Grid item xs={1} sx={{ textAlign: "center" }}>
          <Tooltip title="Tutorial">
            <IconButton>
              <LightbulbOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1} sx={{ textAlign: "center" }}>
          <Tooltip title="Renew">
            <IconButton onClick={renewHandler}>
              <AutorenewRoundedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1} sx={{ textAlign: "center" }}>
          <Tooltip title="Copy">
            <IconButton onClick={copyHandler}>
              <ContentCopyRoundedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1} sx={{ textAlign: "center" }}>
          <SettingButton param={param} setParam={setParam} />
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copy to the clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}
