import { useState } from "react";
import VideoInput from "./components/VideoInput";
import CaptionInput from "./components/CaptionInput";
import VideoPlayer from "./components/VideoPlayer";

const App = () => {
  const [videoURL, setVideoURL] = useState("");
  const [captions, setCaptions] = useState([]);

  const handleVideoURLChange = (url) => {
    setVideoURL(url);
  };

  const handleAddCaption = (caption) => {
    setCaptions([...captions, caption]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                <span className="text-blue-400">Video</span>
                <span className="text-white">Caption</span>
              </h1>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Pro
              </span>
            </div>
            <div className="text-gray-400 text-sm hidden sm:block">
              Professional Video Captioning Tool
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {videoURL ? (
              <VideoPlayer videoURL={videoURL} captions={captions} />
            ) : (
              <div className="h-[500px] flex items-center justify-center bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700">
                <div className="text-center space-y-3 max-w-sm mx-auto px-6">
                  <div className="text-4xl">🎥</div>
                  <p className="text-gray-400 text-lg">
                    Enter a video URL to get started
                  </p>
                  <p className="text-gray-500 text-sm">
                    Supports YouTube, Vimeo, and other video platforms
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controls Section */}
          <div className="lg:col-span-1 order-1 lg:order-2 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
              <VideoInput onVideoURLChange={handleVideoURLChange} />
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
              <CaptionInput onAddCaption={handleAddCaption} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            Made with ❤️ for video creators
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
