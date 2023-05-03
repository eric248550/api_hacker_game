

import * as React from "react";
import { Routes, Route } from "react-router-dom";

import './App.css';
import Level1 from './pages/Level1';
import Level2 from './pages/Level2';
import Level3 from './pages/Level3';
import Level4 from './pages/Level4';
import Level5 from './pages/Level5';
import Level6 from './pages/Level6';
import Level7 from './pages/Level7';

export default function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Level1 />} />
        <Route path="level1" element={<Level1 />} />
        <Route path="level2" element={<Level2 />} />
        <Route path="level3" element={<Level3 />} />
        <Route path="level4" element={<Level4 />} />
        <Route path="level5" element={<Level5 />} />
        <Route path="level6" element={<Level6 />} />
        <Route path="level7" element={<Level7 />} />
        
        <Route path="*" element={<Level1 />} />
        {/* <Route path="/" element={<HomeLayout />}>
            <Route index element={<Level1 />} />
            <Route path="level1" element={<Level1 />} />
            <Route path="*" element={<Level1 />} />
        </Route> */}
      </Routes>
    </div>
  );
}