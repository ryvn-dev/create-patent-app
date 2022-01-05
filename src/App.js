import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Typography, Box, Paper, Link as MUILINK, Grid } from "@mui/material";

import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import LogoBlack from "./assets/images/jcipblack.png";

import { keyframes } from "@mui/styled-engine";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Exploration from "./Pages/Exploration";

const fadein = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// in MUI 5 simply use sx objects
const Styles = {
  navbox: {
    position: "fixed",
    top: "8px",
    left: "8px",
    width: "calc(100% - 16px)",
    height: "70px",
    opacity: 0,
    transition: "opacity .4s cubic-bezier(.19, 1, .22, 1)",
    zIndex: 100,
    border: "1px solid #eaeaea",
    background: "rgba(255,255,255,0.85)",
  },
  navbar: {
    position: "fixed",
    top: "8px",
    left: "8px",
    width: "calc(100% - 16px)",
    height: "70px",
    opacity: 1,
    boxShadow: "0 0 0 0",
    background: "rgba(255,255,255,0)",
    animation: `${fadein} 2s`,
  },
  logo: {
    mt: 2,
    ml: 1,
    // textDecoration: "none",
    // height: "70%"
  },
  linkage: {
    display: "inline-block",
    position: "relative",
    color: "black",
    fontSize: "14px",
    ml: 2,
    "&:after": {
      content: '""',
      position: "absolute",
      width: "100%",
      transform: "scaleX(0)",
      height: "1px",
      bottom: 0,
      left: 0,
      backgroundColor: "black",
      transformOrigin: "bottom right",
      transition: "transform 0.25s ease-out",
    },
    "&:hover&:after": {
      transform: "scaleX(1)",
      transformOrigin: "bottom left",
    },
  },
  linkagereverse: {
    display: "inline-block",
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      width: "100%",
      transform: "scaleX(1)",
      height: "1px",
      bottom: 0,
      left: 0,
      backgroundColor: "black",
      transformOrigin: "bottom right",
      transition: "transform 0.25s ease-out",
    },
    "&:hover&:after": {
      transform: "scaleX(0)",
      transformOrigin: "bottom left",
    },
  },
};

function TopBar() {
  const [isTop, setIsTop] = React.useState(0);

  React.useEffect(() => {
    window.onscroll = () => {
      setIsTop(window.pageYOffset);
    };
  }, []);

  return (
    <>
      <Paper
        sx={isTop === 0 ? Styles.navbox : { ...Styles.navbox, opacity: 1 }}
        elevation={0}
      />
      <AppBar sx={Styles.navbar}>
        <Toolbar>
          <Link to="/">
            <Box component="img" sx={Styles.logo} alt="logo" src={LogoBlack} />
          </Link>
          <Link to="/exploration">
            <Typography variant="caption" sx={Styles.linkage}>
              Exploration
            </Typography>
          </Link>
          <Typography variant="caption" sx={Styles.linkage}>
            Exploitation
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="caption" sx={Styles.linkage}>
            News
          </Typography>
          <Typography variant="caption" sx={Styles.linkage}>
            Story
          </Typography>
          <Box
            sx={{ ml: 2, width: "1.2em", height: "1.2em", bgcolor: "black" }}
          ></Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

function Footer() {
  return (
    <>
      <Box sx={{ mt: 30, mb: 4, mx: 8 }}>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={5}>
            <Typography variant="button">About</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="button">Address</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="button">Contact</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="button">Info</Typography>
          </Grid>

          <Grid item xs={5}>
            <Typography variant="body2" sx={{ width: "70%" }}>
              Released in 2021 in JCIP Technology Service, JCIP Creation
              Intelligence derived under the mindset of accelerating patent
              specification composing and focusing primarily on providing AI-aid
              system to enhance the quality of application.
            </Typography>
            <Typography variant="body2" sx={Styles.linkagereverse}>
              Read more.
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2" sx={{ width: "70%" }}>
              Rm. 1, 7F., No. 100, Sec. 2, Roosevelt Rd., Zhongzheng Dist.,
              Taipei City 100 , Taiwan (R.O.C.)
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ width: "70%" }}>
              Email us/ Extension number
            </Typography>
            <Typography
              variant="body2"
              sx={{ ...Styles.linkage, ml: 0, color: "inherit" }}
            >
              <MUILINK
                color="inherit"
                href="mailto:anna@home.jcipo.com.tw"
                sx={{ textDecoration: "none" }}
              >
                Anna#723
              </MUILINK>
            </Typography>
            <br />
            <Typography
              variant="body2"
              sx={{ ...Styles.linkage, ml: 0, color: "inherit" }}
            >
              <MUILINK
                color="inherit"
                href="mailto:ollie@home.jcipo.com.tw"
                sx={{ textDecoration: "none" }}
              >
                Ollie#795
              </MUILINK>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" sx={{ width: "70%" }}>
              Miscellany
            </Typography>
            <Typography
              variant="body2"
              sx={{ ...Styles.linkage, ml: 0, color: "inherit" }}
            >
              News
            </Typography>
            <br />
            <Typography
              variant="body2"
              sx={{ ...Styles.linkage, ml: 0, color: "inherit" }}
            >
              Terms & conditions
            </Typography>
            <br />
            <Typography
              variant="body2"
              sx={{ ...Styles.linkage, ml: 0, color: "inherit" }}
            >
              Privacy statement
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ my: 4 }}
      >
        {"Copyright © "}
        <MUILINK
          color="inherit"
          href="http://www.jcipgroup.com/"
          sx={{ textDecoration: "none" }}
        >
          JCIP Group
        </MUILINK>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

export default function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/exploration" element={<Exploration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
