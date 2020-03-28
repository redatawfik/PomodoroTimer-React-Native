import React, {useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar, Button, Text} from 'react-native';

import TimePicker from './components/TimerPicker';

const App: () => React$Node = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [title, setTitle] = useState('Work time');
  const [isWorking, setIsWorking] = useState(true);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setSeconds((currentSeconds) => currentSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  if (seconds === -1) {
    setSeconds(60);
    setMinutes((current) => current - 1);
  }

  if (seconds === 0 && minutes === 0) {
    setIsWorking(!isWorking);
    if (isWorking) {
      setTitle('Break time');
      setMinutes(breakMinutes);
      setSeconds(breakSeconds);
    } else {
      setTitle('Work time');
      setMinutes(workMinutes);
      setSeconds(workSeconds);
    }
  }

  const startClick = () => {
    setStart(true);
  };

  const pauseClick = () => {
    setStart(false);
  };

  const resetClick = () => {
    pauseClick();
    if (isWorking) {
      setMinutes(workMinutes);
      setSeconds(workSeconds);
    } else {
      setMinutes(breakMinutes);
      setSeconds(breakSeconds);
    }
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text style={{fontSize: 70, alignSelf: 'center'}}>{title}</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.largeFont}>{minutes}</Text>
          <Text style={styles.largeFont}> : </Text>
          <Text style={styles.largeFont}>{seconds}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button title={'Start'} onPress={startClick} />
          <Button title={'Pause'} onPress={pauseClick} />
          <Button title={'Reset'} onPress={resetClick} />
        </View>
        <View style={{flex: 1}}>
          <TimePicker
            minutes={25}
            seconds={0}
            type={'Work time:'}
            onMinutesChange={(value) => setWorkMinutes(value)}
            onSecondsChange={(value) => setWorkSeconds(value)}
          />
          <TimePicker
            minutes={5}
            seconds={0}
            type={'Break time:'}
            onMinutesChange={(value) => setBreakMinutes(value)}
            onSecondsChange={(value) => setBreakSeconds(value)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  timerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeFont: {
    fontSize: 100,
  },
});

export default App;
