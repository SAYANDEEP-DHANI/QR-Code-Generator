import Image from "next/image";
import Qrcodegenerator from "./components/Qrcodegenerator";

export default function Home() {
  return (
    <div className="reletive min-h-[100vh] h-full flex justify-center items-center">
      <Qrcodegenerator />
    </div>
  );
}
