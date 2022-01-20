import React from "react";
import {
  Vibration,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

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
    };
  }

  vibrate = () => {
    Vibration.vibrate([500, 500, 500]);
  };

  pomTimer = () => {
    pomInterval = setInterval(() => {
      let newSec = this.state.seconds;
      newSec--;
      if (newSec < 0) {
        newSec = 59;
        this.state.minutes--;
      }
      this.setState({
        seconds: newSec,
      });

      if (newSec <= 0 && this.state.minutes <= 0) {
        this.vibrate();
        if (this.state.timerState == "WORK!") {
          this.setState({
            timerState: "Rest",
            minutes: this.state.breakMins,
            seconds: this.state.breakSecs,
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
        btnState: "Start",
      });
    } else {
      this.setState({
        minutes: this.state.breakMins,
        seconds: this.state.breakSecs,
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
          placeholder="number of reps"
          keyboardType="numeric"
        />
        <Text>Sets:</Text>
        <TextInput
          style={styles.inputStyles}
          placeholder="number of sets"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputStyles}
          placeholder="rest between sets"
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
