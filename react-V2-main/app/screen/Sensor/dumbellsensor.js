import React, { useEffect, useState, useRef } from 'react';
import HumanPose from 'react-native-human-pose';
import { View, Text, TouchableOpacity, Button } from 'react-native';

export const Dumbellsensor = () => {
  const [noOfCurls, setNoOfCurls] = useState(0);
  const [isCurling, setIsCurling] = useState(false);
  const [message, setMessage] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown initial value
  const [countdownFinished, setCountdownFinished] = useState(false); // New state to track countdown finish
  const [status, setStatus] = useState('unknown');
  const isCountedRef = useRef(false); // Ref to track counting status

  const calculateAngle = (joint1, joint2, joint3) => {
    const radians = Math.atan2(joint3.y - joint2.y, joint3.x - joint2.x) - Math.atan2(joint1.y - joint2.y, joint1.x - joint2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);

    if (angle > 180) {
      angle = 360 - angle;
    }

    return angle;
  };

  const onPoseDetected = (pose) => {
    const leftShoulder = pose[0]?.pose?.leftShoulder;
    const leftElbow = pose[0]?.pose?.leftElbow;
    const leftWrist = pose[0]?.pose?.leftWrist;
  
    const rightShoulder = pose[0]?.pose?.rightShoulder;
    const rightElbow = pose[0]?.pose?.rightElbow;
    const rightWrist = pose[0]?.pose?.rightWrist;
  
    const minConfidence = 0.7; // Adjust the confidence level as needed
  
    if (
      leftShoulder?.confidence > minConfidence &&
      leftElbow?.confidence > minConfidence &&
      leftWrist?.confidence > minConfidence &&
      rightShoulder?.confidence > minConfidence &&
      rightElbow?.confidence > minConfidence &&
      rightWrist?.confidence > minConfidence
    ) {
      const leftElbowWristAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
      const rightElbowWristAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
  
      // Check if both arms are between 90-270 degrees (up and down trajectory)
      if (
        leftElbowWristAngle >= 90 &&
        leftElbowWristAngle <= 270 &&
        rightElbowWristAngle >= 90 &&
        rightElbowWristAngle <= 270
      ) {
        setIsCurling(true);
        setStatus('proper');
      } else {
        setIsCurling(false);
        setStatus('improper');
      }
    } else {
      setIsCurling(false);
      setStatus('improper');
    }
  };
  

  useEffect(() => {
    if (isStarted && countdownFinished && isCurling && !isCountedRef.current) {
      setNoOfCurls((prevNoOfCurls) => prevNoOfCurls + 1);
      isCountedRef.current = true; // Set the ref to true after counting a barbell curl
    } else if (!isCurling) {
      isCountedRef.current = false; // Reset the ref if the curling stops
    }
  }, [isCurling, isStarted, countdownFinished]);

  const handleStart = () => {
    setIsStarted(true);
    setNoOfCurls(0);
    setCountdown(5);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(countdownInterval);
          setCountdownFinished(true);
          return prevCountdown;
        }
      });
    }, 1000);
  };

  const handleStop = () => {
    setIsStarted(false);
    setIsCurling(false);
    setStatus('unknown');
    setCountdownFinished(false); // Reset countdown finished state
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Human Pose</Text>
      <HumanPose
        height={500}
        width={400}
        enableKeyPoints={false}
        enableSkeleton={false}
        flipHorizontal={false}
        isBackCamera={false}
        color={'0, 255, 0'}
        mode={'single'}
        onPoseDetected={onPoseDetected}
      />
      <Text
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: 'center',
          textShadowColor: 'black',
          backgroundColor: 'white',
          padding: 10,
          fontSize: 20,
          color: status === 'proper' ? 'green' : 'red',
        }}>
        {isStarted && countdown > 0 ? `Starting in ${countdown}` : `No of Barbell Curls: ${noOfCurls}`}
      </Text>
      {isCurling && status !== 'unknown' && (
        <Text
          style={{
            position: 'absolute',
            top: 100,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 70,
            color: status === 'proper' ? 'green' : 'red',
            fontWeight: 'bold'
          }}>
          {status}
        </Text>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
        <Button title="Start" onPress={handleStart} disabled={isStarted} />
        <Button title="Stop" onPress={handleStop} disabled={!isStarted} />
      </View>
    </View>
  );
};

export default Dumbellsensor;
