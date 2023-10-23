import NotFound404 from "@/components/single/NotFound404";
import Home from "@/modules/Home";
import SinglePoster from "@/modules/SinglePoster";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/poster/:id" element={<SinglePoster />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  </BrowserRouter>
);
export default AppRoutes;
