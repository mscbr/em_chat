import * as faceapi from 'face-api.js';

export interface IUser {
  username: string;
  userId: string;
  detectionData: faceapi.WithFaceExpressions<{
    detection: faceapi.FaceDetection;
  }>[];
}
