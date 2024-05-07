import React, { useEffect, useState, useRef } from 'react';
import HumanPose from 'react-native-human-pose';
import { View, Text, TouchableOpacity, Button } from 'react-native';

export const Lungesensor = () => {
  const [noOfLunges, setNoOfLunges] = useState(0);
  const [isLunging, setIsLunging] = useState(false);
  const [message, setMessage] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [status, setStatus] = useState('unknown');
  const [isCounted, setIsCounted] = useState(false); // Track if the current lunge has been counted
  const [isNeutral, setIsNeutral] = useState(true); // Track if the user is in a neutral position
  const [smoothedPose, setSmoothedPose] = useState(null); // Store smoothed pose data
  const isCountedRef = useRef(false); // Ref to track counting status
  const poseBufferRef = useRef([]); // Buffer to store previous poses for smoothing
  const smoothingWindowSize = 5; // Number of previous poses to consider for smoothing

  const movingAverage = (pose) => {
    if (!pose) return null;

    // Add current pose to the buffer
    poseBufferRef.current.push(pose);
    if (poseBufferRef.current.length > smoothingWindowSize) {
      // Remove the oldest pose if buffer size exceeds the window size
      poseBufferRef.current.shift();
    }

    // Calculate average pose from buffer
    const averagePose = {
      pose: {
        leftHip: { x: 0, y: 0, confidence: 0 },
        leftKnee: { x: 0, y: 0, confidence: 0 },
        leftAnkle: { x: 0, y: 0, confidence: 0 },
        rightHip: { x: 0, y: 0, confidence: 0 },
        rightKnee: { x: 0, y: 0, confidence: 0 },
        rightAnkle: { x: 0, y: 0, confidence: 0 },
      },
    };

    poseBufferRef.current.forEach((p) => {
      Object.keys(averagePose.pose).forEach((key) => {
        averagePose.pose[key].x += p.pose[key].x;
        averagePose.pose[key].y += p.pose[key].y;
        averagePose.pose[key].confidence += p.pose[key].confidence;
      });
    });

    Object.keys(averagePose.pose).forEach((key) => {
      averagePose.pose[key].x /= poseBufferRef.current.length;
      averagePose.pose[key].y /= poseBufferRef.current.length;
      averagePose.pose[key].confidence /= poseBufferRef.current.length;
    });

    return averagePose;
  };

  const onPoseDetected = (pose) => {
    const smoothed = movingAverage(pose[0]);
    const leftHipY = pose[0]?.pose?.leftHip?.y;
    const rightHipY = pose[0]?.pose?.rightHip?.y;
    const leftKneeY = pose[0]?.pose?.leftKnee?.y;
    const rightKneeY = pose[0]?.pose?.rightKnee?.y;
    const leftAnkleY = pose[0]?.pose?.leftAnkle?.y;
    const rightAnkleY = pose[0]?.pose?.rightAnkle?.y;

    setSmoothedPose(smoothed);
    const minConfidence = 0.7;
    if (
      pose[0]?.pose?.leftHip?.confidence > minConfidence &&
      pose[0]?.pose?.leftKnee?.confidence > minConfidence&&
      pose[0]?.pose?.leftAnkle?.confidence > minConfidence &&
      pose[0]?.pose?.rightHip?.confidence > minConfidence &&
      pose[0]?.pose?.rightKnee?.confidence > minConfidence &&
      pose[0]?.pose?.rightAnkle?.confidence > minConfidence
    ) {
      const verticalDistanceLeftHipKnee = Math.abs(leftHipY - leftKneeY);
      const verticalDistanceLeftKneeAnkle = Math.abs(leftKneeY - leftAnkleY);
      const verticalDistanceRightHipKnee = Math.abs(rightHipY - rightKneeY);
      const verticalDistanceRightKneeAnkle = Math.abs(rightKneeY - rightAnkleY);

      // Check if one side is in the front (assuming left side is in the front)
      const isLeftInFront = leftHipY < rightHipY;

      // Check for high knee position
      if (
        (isLeftInFront && verticalDistanceLeftHipKnee > 200) ||
        (!isLeftInFront && verticalDistanceRightHipKnee > 200)
      ) {
        setIsLunging(false);
        setMessage('High Knee - Invalid Count');
        setStatus('improper');
        return;
      }

      // Check for half lunge position
      if (
        (isLeftInFront && verticalDistanceLeftKneeAnkle > 200) ||
        (!isLeftInFront && verticalDistanceRightKneeAnkle > 200)
      ) {
        setIsLunging(false);
        setMessage('Half Lunge - Invalid Count');
        setStatus('improper');
        return;
      }

      const verticalDistanceLeft = Math.abs(leftHipY - leftAnkleY);
      const verticalDistanceRight = Math.abs(rightHipY - rightAnkleY);

      if ((verticalDistanceLeft < 300 || verticalDistanceRight < 300) && !isLunging && isNeutral) {
        setIsLunging(true);
        setStatus('proper');
        setMessage('');
        setIsCounted(false); // Reset the count status when starting a new lunge
        isCountedRef.current = false; // Reset the ref when starting a lunge
      } else if (
        (verticalDistanceLeft >= 300 || verticalDistanceRight >= 300) &&
        isLunging &&
        !isCountedRef.current
      ) {
        setIsLunging(false);
        setStatus('improper');
        setMessage('');
        if (!isCounted) {
          setNoOfLunges(noOfLunges + 1);
          setIsCounted(true); // Mark the lunge as counted
        }
        isCountedRef.current = true; // Set the ref to true after counting a lunge
      }
    } else {
      setIsLunging(false);
      setStatus('improper');
      setMessage('');
    }
  };

  useEffect(() => {
    if (isStarted && isLunging && !isCountedRef.current) {
      setNoOfLunges(noOfLunges + 1);
      isCountedRef.current = true; // Set the ref to true after counting a lunge
    }
  }, [isLunging, isStarted, noOfLunges]);

  const handleStart = () => {
    setIsStarted(true);
    setNoOfLunges(0);
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
    setIsLunging(false);
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
        {isStarted && countdown > 0 ? `Starting in ${countdown}` : `No of Lunges: ${noOfLunges}`}
      </Text>
      {isLunging && status !== 'unknown' && (
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

export default Lungesensor;