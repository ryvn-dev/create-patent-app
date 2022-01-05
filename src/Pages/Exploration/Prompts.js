import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Skeleton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardHeader from "@mui/material/CardHeader";
import { v4 } from "uuid";
import { ReactEditor } from "slate-react";
import { Transforms } from "slate";

export default function NestedList({ prompts, editor, logging }) {
  // click list button and the text would be inserted into the editor
  const onClickHandler = (e) => {
    e.preventDefault();
    Transforms.insertText(editor, `${e.currentTarget.getAttribute("data")}`);
    ReactEditor.focus(editor);
  };

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {logging ? (
            <Skeleton sx={{ width: "15%", height: 40 }} />
          ) : (
            "Generated Prompts"
          )}
        </ListSubheader>
      }
    >
      {prompts.map(function (itemText) {
        if (logging) {
          return (
            <CardHeader
              key={v4()}
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={30}
                  height={30}
                />
              }
              title={
                <>
                  <Skeleton
                    animation="wave"
                    height={20}
                    width="100%"
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton
                    animation="wave"
                    height={20}
                    width="100%"
                    style={{ marginBottom: 6 }}
                  />
                </>
              }
              subheader={<Skeleton animation="wave" height={20} width="40%" />}
            />
          );
        } else {
          return (
            <ListItemButton key={v4()} data={itemText} onClick={onClickHandler}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={itemText} />
            </ListItemButton>
          );
        }
      })}
    </List>
  );
}
