import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";

export function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
