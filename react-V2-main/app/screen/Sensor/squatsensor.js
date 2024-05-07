import React, { useEffect, useState, useRef } from 'react';
import HumanPose from 'react-native-human-pose';
import { View, Text, Button } from 'react-native';

export const Squatsensor = () => {
  const [noOfSquats, setNoOfSquats] = useState(0);
  const [isSquatting, setIsSquatting] = useState(false);
  const [message, setMessage] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [status, setStatus] = useState('unknown');
  const isCountedRef = useRef(false); // Ref to track counting status

  const onPoseDetected = (pose) => {
    const leftHipY = pose[0]?.pose?.leftHip?.y;
    const leftKneeY = pose[0]?.pose?.leftKnee?.y;
    const leftAnkleY = pose[0]?.pose?.leftAnkle?.y;
  
    if (
      pose[0]?.pose?.leftHip?.confidence > 0.6 &&
      pose[0]?.pose?.leftKnee?.confidence > 0.6 &&
      pose[0]?.pose?.leftAnkle?.confidence > 0.6
    ) {
      const verticalDistanceHipKnee = Math.abs(leftHipY - leftKneeY);
      const verticalDistanceKneeAnkle = Math.abs(leftKneeY - leftAnkleY);
  
      // Check for high knee position
      if (verticalDistanceHipKnee > 200) {
        setIsSquatting(false);
        setMessage('High Knee - Invalid Count');
        setStatus('improper');
        return;
      }
  
      // Check for half squat position
      if (verticalDistanceKneeAnkle > 200) {
        setIsSquatting(false);
        setMessage('Half Squat - Invalid Count');
        setStatus('improper');
        return;
      }
  
      const verticalDistance = Math.abs(leftHipY - leftAnkleY);
  
      if (verticalDistance < 300) {
        if (!isSquatting) {
          setIsSquatting(true);
          setStatus('proper');
          setMessage('');
          isCountedRef.current = false; // Reset the ref when starting a squat
        }
      } else if (isSquatting && !isCounted) {
        setIsSquatting(false);
        setStatus('improper');
        setMessage('');
        setNoOfSquats(noOfSquats + 1);
        isCountedRef.current = true; // Set the ref to true after counting a squat
      }
    };
  };


  useEffect(() => {
    if (isStarted && isSquatting && !isCountedRef.current) {
      setNoOfSquats(noOfSquats + 1);
      isCountedRef.current = true; // Set the ref to true after counting a squat
    }
  }, [isSquatting, isStarted]);

  const handleStart = () => {
    setIsStarted(true);
    setNoOfSquats(0);
    setCountdown(5);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
    }, 5000);
  };

  const handleStop = () => {
    setIsStarted(false);
    setIsSquatting(false);
    setMessage('');
    setStatus('unknown');
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
        color={'0, 255, 0'} // Initial color is red
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
        {isStarted && countdown > 0 ? `Starting in ${countdown}` : `No of Squats: ${noOfSquats}`}
      </Text>
      {isSquatting && status !== 'unknown' && (
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

export default Squatsensor;
