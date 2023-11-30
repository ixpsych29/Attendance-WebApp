import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";

// const videoConstraints = {
//   width: 400,
//   height: 400,
//   facingMode: "user",
// };

const PictureCam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const handlePicSubmit = () => {

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
          screenshotQuality={1}
          mirrored={true}
        />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <>
            <button onClick={retake}>Retake photo</button>
            <button onClick="handlePicSubmit">Submit</button>
          </>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
  );
};

export default PictureCam;
