import React from "react";
import { Box, Container } from "@mui/material";
import NotFoundImg from "../../assets/images/404.png";

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: "100px", textAlign: "center" }}>
      <Box component="img" alt="not-found" src={NotFoundImg}></Box>
    </Container>
  );
};

export default NotFound;
