import { useState, useEffect, useCallback } from "react";
import VideoInput from "./components/VideoInput";
import CaptionInput from "./components/CaptionInput";
import VideoPlayer from "./components/VideoPlayer";
import Swal from 'sweetalert2';
import { useSnackbar } from 'notistack';
// import logo from "../../../src/assets/Spyne+Logo+black.webp";
import logo from "../src/assets/colored-white-logo-1.png";
import Register from "./components/Register";
import Login from "./components/Login";

const STORAGE_KEYS = {
  CAPTIONS: "videoCaptions",
  VIDEO_URL: "videoURL"
};

const App = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // Initialize state from localStorage
  const [videoURL, setVideoURL] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.VIDEO_URL) || "";
    } catch (error) {
      console.error("Error loading video URL from localStorage:", error);
      return "";
    }
  });

  const [captions, setCaptions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CAPTIONS);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading captions from localStorage:", error);
      return [];
    }
  });

  // Persist data to localStorage
  const persistData = useCallback((key, value) => {
    try {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
      enqueueSnackbar(`Error saving data: ${error.message}`, { variant: "error" });
    }
  }, [enqueueSnackbar]);

  const handleVideoURLChange = (url) => {
    setVideoURL(url);
    persistData(STORAGE_KEYS.VIDEO_URL, url);
  };

  const handleAddCaption = (caption) => {
    const newCaptions = [...captions, caption];
    setCaptions(newCaptions);
    persistData(STORAGE_KEYS.CAPTIONS, newCaptions);
  };

  const handleDeleteCaption = async (index) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      const newCaptions = captions.filter((_, i) => i !== index);
      setCaptions(newCaptions);
      persistData(STORAGE_KEYS.CAPTIONS, newCaptions);
      enqueueSnackbar("Caption deleted successfully", { variant: "success" });
    }
  };

  const handleEditCaption = (index, updatedCaption) => {
    const newCaptions = [...captions];
    newCaptions[index] = updatedCaption;
    setCaptions(newCaptions);
    persistData(STORAGE_KEYS.CAPTIONS, newCaptions);
    enqueueSnackbar("Caption updated successfully", { variant: "success" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      {/*   <header className="bg-black/40 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-[102px] h-[40px] space-y-4 ml-2" />
                <h1 className="text-2xl font-bold text-white tracking-tight ml-2">

                  <span className="text-gray-400">Studio</span>
                </h1>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-black-500/10 text-gray-400 border border-blue-500/20">
                Pro
              </span>
            </div>
            <div className=" md:flex space-x-6 text-gray-400">
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Features</span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors"><Login /></span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors"><Register /></span>
            </div>
          </div>
        </div>
      </header> */}
      <header className="bg-black/40 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-[102px] h-[40px] ml-2" />
                <h1 className="text-2xl font-bold text-white tracking-tight ml-2">
                  <span className="text-gray-400">Studio</span>
                </h1>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-black-500/10 text-gray-400 border border-blue-500/20">
                Pro
              </span>
            </div>
            <div className="hidden md:flex space-x-6 text-gray-400">
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Features</span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors"><Login /></span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors"><Register /></span>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-400 hover:text-blue-400">
                {/* Add a mobile menu icon here */}
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/70">
            <div className="flex flex-col space-y-4 p-4">
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Features</span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors"><Login /></span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors"><Register /></span>
            </div>
          </div>
        )}
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
//old Header 