import "./App.sass";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import ContentSlider from "./components/Content";
import { GalleryContextProvider } from "./context/GalleryContext";

function App() {
  return (
    <BrowserRouter>
      <div>
        <GalleryContextProvider>
          <Routes>
            <Route path="/*" element={<ContentSlider />} />
          </Routes>
        </GalleryContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
