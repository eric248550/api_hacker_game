

import * as React from "react";
import { Routes, Route } from "react-router-dom";

import './App.css';
import Level1 from './pages/Level1';

export default function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Level1 />} />
        <Route path="level1" element={<Level1 />} />
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