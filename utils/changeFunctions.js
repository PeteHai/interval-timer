
let changeWorkMin = (mins) => {
  clearInterval(pomInterval);
  this.setState({
    minutes: mins || 0,
    workmins: mins || 0,
    btnState: "Start",
  });
};

let changeWorkSec = (secs) => {
  clearInterval(pomInterval);
  this.setState({
    seconds: secs || 0,
    worksecs: secs || 0,
    btnState: "Start",
  });
};

let changeBreakMin = (mins) => {
  clearInterval(pomInterval);
  this.setState({
    breakMins: mins || 0,
    btnState: "Start",
  });
};

let changeBreakSec = (secs) => {
  carInterval(pomInterval);
  this.setState({
    breakSecs: secs || 0,
    btnState: "Start",
  });
};

let changeRepsNum = (num) => {
  clearInterval(pomInterval);
  this.setState({
    currentRepState: 1,
    repsNum: num || 0,
    btnState: "Start",
  });
};

let changeSetsNum = (num) => {
  clearInterval(pomInterval);
  this.setState({
    currentSetsState: 1,
    setsNum: num || 0,
    btnState: "Start",
  });
};

let changeSetRestNum = (num) => {
  clearInterval(pomInterval);
  this.setState({
    setRestNum: num || 0,
    btnState: "Start",
  });
};

// Creating the functionality for the reset button
let reset = () => {
  clearInterval(pomInterval);
  if (this.state.timerState == "WORK!") {
    this.setState({
      minutes: this.state.workmins,
      seconds: this.state.worksecs,
      currentRepState: 1,
      currentSetsState: 1,
      btnState: "Start",
    });
  } else {
    this.setState({
      minutes: this.state.breakMins,
      seconds: this.state.breakSecs,
      currentRepState: 1,
      currentSetsState: 1,
      btnState: "Start",
    });
  }
};
// Creating the functionality for the pause/start button
let chnageBtnState = () => {
  if (this.state.btnState == "Start") {
    this.pomTimer();
    this.setState({
      btnState: "Pause",
    });
  } else if (this.state.btnState == "Pause") {
    clearInterval(pomInterval);
    this.setState({
      btnState: "Start",
    });
  } else if (this.state.btnState == "DONE") {
    this.reset();
  }
};

export {
  changeWorkMin,
  changeWorkSec,
  changeBreakMin,
  changeBreakSec,
  changeRepsNum,
  changeSetsNum,
  changeSetRestNum,
  reset,
  chnageBtnState,
};
