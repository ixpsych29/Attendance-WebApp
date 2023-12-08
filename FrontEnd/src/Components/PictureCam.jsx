import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import axios from "axios";

const PictureCam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    // console.log(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const handlePicSubmit = async () => {
    console.log("submission working!");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/attendance",
        {
          picture: imgSrc,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
          height={300}
          width={300}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={0.8}
          mirrored={true}
        />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <>
            <button onClick={retake}>Retake photo</button>
            <button onClick={handlePicSubmit}>Submit</button>
          </>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
  );
};

export default PictureCam;
