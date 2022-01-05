import React, { useState } from "react";
import LandingImg from "../../assets/images/glacier.jpg";
import LandingText from "../../assets/images/landingtext.png";
import Hand from "../../assets/images/goldhand.jpg";
import Head from "../../assets/images/goldhead.jpg";
import { Box, Grid, Typography } from "@mui/material";
import { keyframes } from "@mui/styled-engine";
import Trail from "./Trail";
import SignIn from "./SignIn";
import transitionStyles from "../../assets/css/transition.module.css";


const imgshift = keyframes`
    from { 
        transform: translateX(-5vw);
    }
    to   { 
        transform: translateX(0vw);
    }
`;

const fadein = keyframes`
    from { 
        opacity: 0;
    }
    to   { 
        opacity: 0.7;
    }
`;

const Styles = {
  bgimgbox: {
    width: "100%",
    overflow: "hidden",
  },
  bgimg: {
    opacity: 0.95,
    animation: `${imgshift} 2s linear`,
  },
  bgtxt: {
    position: "absolute",
    top: 290,
    left: 10,
    animation: `${fadein} 2s linear forwards`,
    transition: "1s ease-in-out",
    "&:hover": {
      filter: "blur(10px)",
    },
  },
  secondrow: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  linkagereverse: {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
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

const Home = () => {
  const [open, setOpen] = useState(true);
  const [signin, setSignin] = useState(false);

  return (
    <div>
      <Grid container rowSpacing={2} columnSpacing={3} alignItems="center">
        <Grid item xs={8.5}>
          <Box sx={Styles.bgimgbox}>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                sx={Styles.bgimg}
                alt="LandingImg"
                src={LandingImg}
              />
              <Box
                component="img"
                sx={Styles.bgtxt}
                alt="LandingTxt"
                src={LandingText}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3.5}>
          <Typography variant="button">Don't sleep on it.</Typography>
          <Typography variant="h2">New features just arrived</Typography>
          <Typography variant="subtitle1">
            Write your patent specification fast and accurate.
          </Typography>
          <Typography variant="subtitle1" sx={Styles.linkagereverse} onClick={() => setSignin((signin) => !signin)}>
            Sign in
          </Typography>
          <SignIn signin={signin}/>
        </Grid>
      </Grid>
      <Box sx={{ mt: 10, mb: 4, mx: 8 }}>
        <Grid container rowSpacing={2} columnSpacing={3} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5">Dual Route Generation</Typography>
          </Grid>
          <Grid item xs={3} sx={{ position: "relative", overflow: "hidden" }}>
            <Box component="img" sx={Styles.secondrow} alt="Hand" src={Hand} />
            <div
              className={transitionStyles.containerleft}
              onClick={() => setOpen((open) => !open)}
            >
              <Trail open={open}>
                <span>Idea</span>
                <span>ClaimTree</span>
                <span>SanityCheck</span>
                <span>FullSpecification</span>
              </Trail>
            </div>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle2">Exploratory Generation</Typography>
            <br />
            <Typography variant="body2">
              From a simple idea to a full specification. Let AI think
              creatively and divergently.
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ position: "relative", overflow: "hidden" }}>
            <Box component="img" sx={Styles.secondrow} alt="Head" src={Head} />
            <div
              className={transitionStyles.containerright}
              onClick={() => setOpen((open) => !open)}
            >
              <Trail open={open}>
                <span>EmbodimentDetails</span>
                <span>ClaimTree</span>
                <span>Abstract</span>
                <span>Spec</span>
              </Trail>
            </div>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle2">Exploitative Generation</Typography>
            <br />
            <Typography variant="body2">
              From well-crafted details of embodiment to a full specification.
              Let AI elegantly summarize.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}


export default Home;