import Image from "next/image";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Course from "./components/Course";
import Background from "./components/Background";
import Statistics from "./components/Statistics";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Background />
      <Navbar />
      <Header />
      <Course />
      <Statistics />
    </main>
  );
}
