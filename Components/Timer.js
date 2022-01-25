import React from "react";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";

let pomInterval;

export default class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      minutes: 0,
      seconds: 0,
      workmins: "",
      worksecs: "",
      breakMins: "",
      breakSecs: "",
      timerState: "WORK!",
      btnState: "Start",
      currentRepState: "",
      repsNum: "",
      currentSetsState: "",
      setsNum: "",
      setRestNum: "",
    };
  }

  pomTimer = () => {
    //setInterval,1000 means that this code will run every second
    pomInterval = setInterval(() => {
      //decrease reps number here
      let newSec = this.state.seconds;
      let newReps = this.state.currentRepState;
      let newSets = this.state.currentSetsState;

      newSec--;
      if (newSec < 0) {
        newSec = 59;
        this.state.minutes--;
      }
      this.setState({
        seconds: newSec,
      });

      if (newSets <= 0) {
        //if no more sets are remaining then workout is complete - message and reset
      }

      if (newReps <= 0) {
        //when no more reps are remaining reduce sets by one and reset current reps to repNum
        newSets--;
        this.setState({
          currentSetsState: newSets,
          currentRepState: this.state.repsNum,
        });
      }

      if (newSec <= 0 && this.state.minutes <= 0) {
        if (this.state.timerState === "WORK!") {
          newReps--;
          this.setState({
            timerState: "Rest",
            minutes: this.state.breakMins,
            seconds: this.state.breakSecs,
            currentRepState: newReps,
          });
        } else {
          this.setState({
            timerState: "WORK!",
            minutes: this.state.workmins,
            seconds: this.state.worksecs,
          });
        }
      }
    }, 1000);
  };

  changeWorkMin = (mins) => {
    clearInterval(pomInterval);
    this.setState({
      minutes: mins || 0,
      workmins: mins || 0,
      btnState: "Start",
    });
  };

  changeWorkSec = (secs) => {
    clearInterval(pomInterval);
    this.setState({
      seconds: secs || 0,
      worksecs: secs || 0,
      btnState: "Start",
    });
  };

  changeBreakMin = (mins) => {
    clearInterval(pomInterval);
    this.setState({
      breakMins: mins || 0,
      btnState: "Start",
    });
  };

  changeBreakSec = (secs) => {
    clearInterval(pomInterval);
    this.setState({
      breakSecs: secs || 0,
      btnState: "Start",
    });
  };

  changeRepsNum = (num) => {
    clearInterval(pomInterval);
    this.setState({
      currentRepState: num || 0,
      repsNum: num || 0,
      btnState: "Start",
    });
  };

  changeSetsNum = (num) => {
    clearInterval(pomInterval);
    this.setState({
      currentSetsState: num || 0,
      setsNum: num || 0,
      btnState: "Start",
    });
  };

  changeSetRestNum = (num) => {
    clearInterval(pomInterval);
    this.setState({
      setRestNum: num || 0,
      btnState: "Start",
    });
  };

  // Creating the functionality for the pause/start button
  chnageBtnState = () => {
    if (this.state.btnState == "Start") {
      this.pomTimer();
      this.setState({
        btnState: "Pause",
      });
    } else {
      clearInterval(pomInterval);
      this.setState({
        btnState: "Start",
      });
    }
  };

  // Creating the functionality for the reset button
  reset = () => {
    clearInterval(pomInterval);
    if (this.state.timerState == "WORK!") {
      this.setState({
        minutes: this.state.workmins,
        seconds: this.state.worksecs,
        currentRepState: this.state.repsNum,
        currentSetsState: this.state.setsNum,
        btnState: "Start",
      });
    } else {
      this.setState({
        minutes: this.state.breakMins,
        seconds: this.state.breakSecs,
        currentRepState: this.state.repsNum,
        currentSetsState: this.state.setsNum,
        btnState: "Start",
      });
    }
  };

  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>{this.state.timerState}</Text>
        <Text style={styles.textStyles}>
          {this.state.minutes}:{this.state.seconds}
        </Text>
        <Text>
          Remaining Reps: {this.state.currentRepState}/{this.state.repsNum}
        </Text>
        <Text>
          Remaining sets: {this.state.currentSetsState}/{this.state.setsNum}
        </Text>

        <Text>
          <Button
            style={styles.buttonStyles}
            title={this.state.btnState}
            onPress={this.chnageBtnState}
            color="green"
          />
          <Button
            style={styles.buttonStyles}
            title="Reset"
            onPress={this.reset}
            color="blue"
          />
        </Text>
        <Text>Work Time:</Text>
        <TextInput
          style={styles.inputStyles}
          value={this.state.workmins.toString()}
          placeholder="Work Minutes"
          onChangeText={this.changeWorkMin}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputStyles}
          value={this.state.worksecs.toString()}
          placeholder="Work Seconds"
          onChangeText={this.changeWorkSec}
          keyboardType="numeric"
        />
        <Text>Rest Time:</Text>
        <TextInput
          style={styles.inputStyles}
          value={this.state.breakMins.toString()}
          placeholder="Rest Minutes"
          onChangeText={this.changeBreakMin}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputStyles}
          value={this.state.breakSecs.toString()}
          placeholder="Rest Seconds"
          onChangeText={this.changeBreakSec}
          keyboardType="numeric"
        />
        <Text>Reps:</Text>
        <TextInput
          style={styles.inputStyles}
          value={this.state.repsNum.toString()}
          placeholder="number of reps"
          onChangeText={this.changeRepsNum}
          keyboardType="numeric"
        />
        <Text>Sets:</Text>
        <TextInput
          style={styles.inputStyles}
          value={this.state.setsNum.toString()}
          placeholder="number of sets"
          onChangeText={this.changeSetsNum}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputStyles}
          value={this.state.setRestNum.toString()}
          placeholder="rest between sets"
          onChangeText={this.changeSetRestNum}
          keyboardType="numeric"
        />
      </View>
    );
  }
}

// Creating a style sheet to write some styles
const styles = StyleSheet.create({
  viewStyles: {
    alignItems: "center",
  },

  textStyles: {
    fontSize: 48,
  },

  inputStyles: {
    paddingHorizontal: 1,
    paddingVertical: 2,
    borderColor: "black",
    borderWidth: 1,
    margin: 2,
    textAlign: "center",
    borderRadius: 5,
    maxWidth: 150,
  },

  buttonStyles: {
    padding: 10,
  },
});
