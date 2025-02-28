import { useState, useEffect } from "react";
import VideoInput from "./components/VideoInput";
import CaptionInput from "./components/CaptionInput";
import VideoPlayer from "./components/VideoPlayer";

const App = () => {
  const [videoURL, setVideoURL] = useState("");
  const [captions, setCaptions] = useState([]);

  // Load captions from localStorage on initial render
  useEffect(() => {
    const savedCaptions = localStorage.getItem("videoCaptions");
    if (savedCaptions) {
      setCaptions(JSON.parse(savedCaptions));
    }
    const savedVideoURL = localStorage.getItem("videoURL");
    if (savedVideoURL) {
      setVideoURL(savedVideoURL);
    }
  }, []);

  // Save captions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("videoCaptions", JSON.stringify(captions));
  }, [captions]);

  // Save video URL to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("videoURL", videoURL);
  }, [videoURL]);

  const handleVideoURLChange = (url) => {
    setVideoURL(url);
  };

  const handleAddCaption = (caption) => {
    setCaptions([...captions, caption]);
  };

  const handleDeleteCaption = (index) => {
    const newCaptions = captions.filter((_, i) => i !== index);
    setCaptions(newCaptions);
  };

  const handleEditCaption = (index, updatedCaption) => {
    const newCaptions = [...captions];
    newCaptions[index] = updatedCaption;
    setCaptions(newCaptions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <span className="text-blue-500 text-3xl">🎬</span>
                <h1 className="text-3xl font-bold text-white tracking-tight ml-2">
                  <span className="text-blue-400">Caption</span>
                  <span className="text-white">Studio</span>
                </h1>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Pro
              </span>
            </div>
            <div className="hidden md:flex space-x-6 text-gray-400">
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Features</span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Tutorial</span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Support</span>
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
              <VideoPlayer 
                videoURL={videoURL} 
                captions={captions}
                onDeleteCaption={handleDeleteCaption}
                onEditCaption={handleEditCaption}
              />
            ) : (
              <div className="h-[500px] flex items-center justify-center bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700">
                <div className="text-center space-y-4 max-w-sm mx-auto px-6">
                  <div className="text-5xl">🎥</div>
                  <h3 className="text-xl font-semibold text-white">
                    Ready to Add Captions?
                  </h3>
                  <p className="text-gray-400">
                    Enter a video URL to get started. Supports YouTube, Vimeo, and other major platforms.
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
            Made with ❤️ for video creators • {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
