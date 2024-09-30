import { useState } from "react";
import Spinner from "../Loader/Spinner";

function EmptyCard({ imgSrc, message }: { imgSrc: string; message: string }) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {!isImgLoaded && (
        <div className="w-60 h-60 flex items-center justify-center">
          <div className="loader">
            <Spinner />
          </div>
        </div>
      )}

      {}

      <img
        src={imgSrc}
        alt="No Notes"
        className={`w-60 transition-opacity duration-300 ${
          isImgLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsImgLoaded(true)}
      />

      {isImgLoaded && (
        <p className="w-1/2 font-medium text-slate-700 text-center leading-7 mt-10">
          {message}
        </p>
      )}
    </div>
  );
}

export default EmptyCard;
