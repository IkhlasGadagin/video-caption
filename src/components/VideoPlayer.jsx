import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
// import { XCircle } from "@mui/icons-material";

const VideoPlayer = ({ videoURL, captions }) => {
  const [currentCaption, setCurrentCaption] = useState("");
  const playerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        const matchingCaption = captions.find(
          (cap) => Math.floor(cap.timestamp) === Math.floor(currentTime)
        );
        setCurrentCaption(matchingCaption ? matchingCaption.text : "");
      }
    }, 500);
    return () => clearInterval(interval);
  }, [captions]);

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-3">Video Preview</h2>
      <div className="relative">
        <ReactPlayer ref={playerRef} url={videoURL} controls width="100%" />
        {currentCaption && (
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-md">
            {currentCaption}
          </div>
        )}
      </div>
      <h3 className="text-lg mt-4">Captions List</h3>
      <ul className="mt-2 space-y-2">
        {captions.map((cap, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-700 p-2 rounded-md"
          >
            <span>
              [{cap.timestamp}s] {cap.text}
            </span>
            {/* <button onClick={() => onDeleteCaption(index)} className="text-red-500">
              <XCircle />
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoPlayer;


// import { useState, useRef, useEffect } from "react";
// import ReactPlayer from "react-player";

// const VideoPlayer = ({ videoURL, captions }) => {
//   const [currentCaption, setCurrentCaption] = useState("");
//   const [playing, setPlaying] = useState(true);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (playerRef.current) {
//         const currentTime = playerRef.current.getCurrentTime();
//         const matchingCaption = captions.find(
//           (cap) => Math.floor(cap.timestamp) === Math.floor(currentTime)
//         );
//         setCurrentCaption(matchingCaption ? matchingCaption.text : "");
//       }
//     }, 500);

//     return () => clearInterval(interval);
//   }, [captions]);

//   return (
//     <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
//       <div className="aspect-w-16 aspect-h-9 relative">
//         <ReactPlayer
//           ref={playerRef}
//           url={videoURL}
//           controls
//           width="100%"
//           height="100%"
//           playing={playing}
//           style={{ position: 'absolute', top: 0, left: 0 }}
//           config={{
//             file: {
//               attributes: {
//                 controlsList: 'nodownload',
//                 className: 'rounded-t-xl'
//               }
//             }
//           }}
//         />
//         {currentCaption && (
//           <div 
//             className="absolute bottom-16 left-1/2 transform -translate-x-1/2 
//                        bg-black bg-opacity-75 text-white px-6 py-3 rounded-lg
//                        text-lg font-medium max-w-[80%] text-center
//                        transition-opacity duration-200 ease-in-out"
//           >
//             {currentCaption}
//           </div>
//         )}
//       </div>
//       <div className="p-4 border-t border-gray-700">
//         <div className="flex items-center justify-between">
//           <button
//             onClick={() => setPlaying(!playing)}
//             className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg
//                      transition-colors duration-200 flex items-center space-x-2"
//           >
//             <span>{playing ? "Pause" : "Play"}</span>
//           </button>
//           <div className="text-gray-400 text-sm">
//             {captions.length} caption{captions.length !== 1 ? 's' : ''} added
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
