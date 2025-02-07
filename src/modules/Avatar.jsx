import Lottie, { useLottie } from "lottie-react";
import animationData from "../animations/avatar.json";
import { useEffect, useRef } from "react";

 export default function Avatar() {
  const lottieRef = useRef(null);

  
  useEffect(() => {
    if (lottieRef.current) {
      
      lottieRef.current.goToAndStop(0, true);
     
      lottieRef.current.play();
    }
  }, []); 

  return (
    <Lottie 
      lottieRef={lottieRef}
      animationData={animationData}
      loop={false}
      autoplay={true}
    />
  );
}