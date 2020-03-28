import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const TimePicker = (props) => {
  const [minutes, setMinutes] = useState(props.minutes);
  const [seconds, setSeconds] = useState(props.seconds);

  const minutesChanged = (value) => {
    setMinutes(value);
    props.onMinutesChange(value);
  };

  const secondsChanged = (value) => {
    setSeconds(value);
    props.onSecondsChange(value);
  };

  return (
    <View style={styles.container}>
      <Text>{props.type}</Text>
      <Text>Mins: </Text>
      <TextInput
        style={styles.inputContainer}
        value={minutes.toString()}
        onChangeText={(value) => minutesChanged(value)}
      />
      <Text>Secs: </Text>
      <TextInput
        style={styles.inputContainer}
        value={seconds.toString()}
        onChangeText={(value) => secondsChanged(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    padding: 20,
  },
  inputTextStyle: {
    borderColor: 'black',
  },
  inputContainer: {
    width: 70,
    borderWidth: 2,
    height: 40,
  },
});
export default TimePicker;
