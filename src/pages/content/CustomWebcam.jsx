import Webcam from "react-webcam";
import { ContextPhoto } from "../../context/Index";
import { useCallback, useRef, useState, useEffect } from "react";

const CustomWebCam = (props) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

  
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        props.sendToParent(imageSrc);
        props.hideKet(false);
    }, [webcamRef, setImgSrc]);

    const retake = () => {
        setImgSrc(null);
        props.sendToParent(null);
        props.hideKet(true);
    };

    return (
        <>
            {/* {imgSrc ? (
                <img src={imgSrc} />
            ) : (
                <Webcam height={600} width={600} audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            )} */}
            
            {!imgSrc && (
                <Webcam height={600} width={600} audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="rounded" />
            )}

            {imgSrc ? (
                <div>
                    <button onClick={retake} className="py-3 px-3 mt-3 w-full bg-red-400 hover:bg-red-600 text-white rounded">
                        <i className="fa-solid fa-camera pr-3"></i>
                        Retake Photo
                    </button>
                </div>
            ) : (
                <div>
                    <button onClick={capture} className="py-3 px-3 mt-3 w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded">
                        <i className="fa-solid fa-camera pr-3"></i>
                        Capture Photo
                    </button>
                </div>
            )}
                {/* <p>The State of isParentData is {props.toChild}</p> */}
        </>

    )
}

export default CustomWebCam
