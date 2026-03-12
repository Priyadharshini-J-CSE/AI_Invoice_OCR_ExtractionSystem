import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadInvoice } from '../services/api';

const CameraScanner = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [clarity, setClarity] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && !capturedImage) {
      const interval = setInterval(() => {
        calculateClarity();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [capturedImage]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      alert('Camera access denied');
    }
  };

  const calculateClarity = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let sum = 0;
    for (let i = 4; i < data.length; i += 4) {
      const diff = Math.abs(data[i] - data[i - 4]);
      sum += diff;
    }
    
    const variance = sum / (data.length / 4);
    const clarityScore = Math.min(100, Math.round((variance / 30) * 100));
    
    setClarity(clarityScore);
    
    if (clarityScore >= 75 && !capturedImage) {
      captureImage();
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/jpeg');
    setCapturedImage(image);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleUsePhoto = async () => {
    const blob = await (await fetch(capturedImage)).blob();
    const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
    
    try {
      const result = await uploadInvoice(file);
      navigate(`/results/${result.invoice._id}`);
    } catch (error) {
      alert('Upload failed: ' + error.message);
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ color: '#0F1E3A' }}>Camera Scanner</h2>
        <button onClick={onClose} style={{
          background: 'transparent',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer'
        }}>×</button>
      </div>

      <div style={{ position: 'relative', marginBottom: '20px' }}>
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                borderRadius: '12px',
                background: '#000'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '3px solid #2D6CDF',
              width: '80%',
              height: '60%',
              borderRadius: '12px',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: clarity >= 75 ? '#4CAF50' : '#FFA726',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontWeight: '600'
            }}>
              Clarity: {clarity}%
            </div>
          </>
        ) : (
          <img src={capturedImage} alt="Captured" style={{
            width: '100%',
            borderRadius: '12px'
          }} />
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {capturedImage && (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button onClick={handleRetake} style={{
            padding: '12px 24px',
            background: 'white',
            color: '#2D6CDF',
            border: '2px solid #2D6CDF',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Retake
          </button>
          <button onClick={handleUsePhoto} style={{
            padding: '12px 24px',
            background: '#2D6CDF',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            Use Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraScanner;
