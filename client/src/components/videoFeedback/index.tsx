import React, { useCallback, useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Spinner, Button, Text } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

import { useUserMedia } from 'hooks/useUserMedia';
import './index.css';

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'user' }
};

interface Props {
  username: string;
  transferDetections?: (
    username: string,
    data?: faceapi.WithFaceExpressions<{
      detection: faceapi.FaceDetection;
    }>[]
  ) => void;
}

const VideoFeedback: React.FC<Props> = ({ username, transferDetections }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [drawDet, setDrawDet] = useState(false);
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream as MediaStream;
  }

  const handleCanPlay = useCallback(() => {
    videoRef.current?.play();
  }, [videoRef]);
  const handleDrawDet = useCallback(() => {
    setDrawDet((state) => !state);
  }, []);

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
          const detections = drawDet
            ? await faceapi
                .detectAllFaces(
                  //@ts-expect-error
                  videoRef.current,
                  new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceExpressions()
            : await faceapi
                .detectAllFaces(
                  //@ts-expect-error
                  videoRef.current,
                  new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceExpressions();
          if (drawDet) {
            const resizedDetections = faceapi.resizeResults(detections, {
              //@ts-expect-error
              width: canvasRef.current.width,
              //@ts-expect-error
              height: canvasRef.current.height
            });
            //@ts-expect-error
            canvasRef.current.getContext('2d').clearRect(
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
          }

          if (transferDetections && detections) {
            transferDetections(username, detections);
          }
        }, 100);
      }

      return () => clearInterval(renderDetection);
    }
  }, [videoRef.current, canvasRef.current, context, drawDet]);

  return mediaStream ? (
    <div id="video-wrapper">
      <Button
        id="drawBtn"
        onClick={handleDrawDet}
        border={drawDet ? '5px solid lime' : 'initial'}
        opacity={drawDet ? 0.9 : 0.3}
      >
        <ViewIcon />
      </Button>
      <video
        onCanPlay={handleCanPlay}
        ref={videoRef}
        id="video-stream"
        autoPlay
        playsInline
        muted
      />
      <canvas id="canvas" ref={canvasRef} />
      <Text>VIDEO FEEDBACK</Text>
    </div>
  ) : (
    <Spinner />
  );
};

export default VideoFeedback;
