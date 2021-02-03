import React, { useCallback, useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Spinner } from '@chakra-ui/react';

import { useUserMedia } from 'hooks/useUserMedia';
import './index.css';

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'user' }
};

const VideoFeedback = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream as MediaStream;
  }

  const handleCanPlay = useCallback(() => {
    videoRef.current?.play();
  }, [videoRef]);

  useEffect(() => {
    let renderDetection: NodeJS.Timeout;
    if (videoRef.current && canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');
      if (renderCtx) setContext(renderCtx);
      if (context) {
        faceapi.matchDimensions(canvasRef.current, {
          width: canvasRef.current.width,
          height: canvasRef.current.height
        });
        renderDetection = setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(
              //@ts-expect-error
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(detections, {
            //@ts-expect-error
            width: canvasRef.current.width,
            //@ts-expect-error
            height: canvasRef.current.height
          });
          context.clearRect(
            0,
            0,
            //@ts-expect-error
            canvasRef.current.width,
            //@ts-expect-error
            canvasRef.current.height
          );
          //@ts-expect-error
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceLandmarks(
            //@ts-expect-error
            canvasRef.current,
            resizedDetections
          );
          faceapi.draw.drawFaceExpressions(
            //@ts-expect-error
            canvasRef.current,
            resizedDetections
          );
        }, 100);
      }

      return () => clearInterval(renderDetection);
    }
  }, [videoRef.current, canvasRef.current, context]);

  return mediaStream ? (
    <div id="video-wrapper">
      <video
        onCanPlay={handleCanPlay}
        ref={videoRef}
        id="video-stream"
        autoPlay
        playsInline
        muted
      />
      <canvas id="canvas" ref={canvasRef} />
    </div>
  ) : (
    <Spinner />
  );
};

export default VideoFeedback;