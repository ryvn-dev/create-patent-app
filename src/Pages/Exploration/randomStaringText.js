export default function randomStartingText() {
  // get random interger from 0 to max-1
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // common start prompts
  const startingPrompts = [
    "An information system",
    "A device",
    "A controller",
    "A computer medium",
    "A heat dissipation device",
    "An apparatus",
    "A method",
    "A neural network",
    "A wave power generation system",
    "A semiconductor structure",
    "An integrated circuit",
  ];

  return startingPrompts[getRandomInt(startingPrompts.length)];
}
