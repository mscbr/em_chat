import React, { useState, useRef } from 'react';
import * as faceapi from 'face-api.js';

import { useUserMedia } from 'hooks/useUserMedia';
import './index.css';

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' }
};

const VideoFeedback = () => {
  // const [mediaStream, setMediaStream] = useState(null);
  // const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream as MediaStream;
  }

  const handleCanPlay = () => {
    videoRef.current?.play();
  };

  // Promise.all([
  //   faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  //   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  //   faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  //   faceapi.nets.faceExpressionNet.loadFromUri('/models')
  // ]).then(() => {
  //   setLoading(false);
  //   startVideo();
  // });

  const handlePlay = () => {
    console.log('playing');
    // if (videoRef.current) {
    //   const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    //   document.body.append(canvas);
    //   const displaySize = {
    //     width: videoRef.current.width,
    //     height: videoRef.current.height
    //   };
    //   faceapi.matchDimensions(canvas, displaySize);
    //   setInterval(async () => {
    //     const detections = await faceapi
    //       .detectAllFaces(
    //         videoRef.current as HTMLVideoElement,
    //         new faceapi.TinyFaceDetectorOptions()
    //       )
    //       .withFaceLandmarks()
    //       .withFaceExpressions();
    //     const resizedDetections = faceapi.resizeResults(
    //       detections,
    //       displaySize
    //     );
    //     canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    //     faceapi.draw.drawDetections(canvas, resizedDetections);
    //     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    //     faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    //   }, 100);
    // }
  };

  return (
    <video
      onCanPlay={handleCanPlay}
      ref={videoRef}
      id="video-stream"
      autoPlay
      playsInline
      muted
    />
  );
};

export default VideoFeedback;
