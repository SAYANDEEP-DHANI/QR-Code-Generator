"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Link, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { saveAs } from "file-saver";
import { toPng } from "html-to-image";
import QRCode from "react-qr-code";

function Qrcodegenerator() {
  const [url, setUrl] = React.useState("");
  const [color, setColor] = React.useState("#dde2e9");
  const [bgcolor, setBgColor] = React.useState("#51218c");
  const [logo, setLogo] = React.useState<string | null>(null);
  const [logoFile, setLogoFile] = React.useState<File | null>(null);

  // const handleDownload = async () => {
  //   const qrCodeElem = document.getElementById("qr-code");
  //   if (!qrCodeElem) return;

  //   try {
  //     const dataUrl = await toPng(qrCodeElem);
  //     saveAs(dataUrl, "qr-code.png");
  //   } catch (error) {
  //     console.error("Failed to download QR code:", error);
  //   }
  // };
  const handleDownload = async () => {
    const qrCodeSvg = document.querySelector("#qr-code svg");
    if (!qrCodeSvg) return;

    try {
      const dataUrl = await toPng(qrCodeSvg); // Convert SVG to PNG
      saveAs(dataUrl, "qr-code.png"); // Save as PNG
    } catch (error) {
      console.error("Failed to download QR code:", error);
    }
  };

  // const handleDownload = async () => {
  //   const qrCodeElem = document.querySelector("#qr-code svg");
  //   if (!qrCodeElem) return;

  //   try {
  //     const serializer = new XMLSerializer();
  //     const svgString = serializer.serializeToString(qrCodeElem);
  //     const blob = new Blob([svgString], { type: "image/svg+xml" });
  //     saveAs(blob, "qr-code.svg");
  //   } catch (error) {
  //     console.error("Failed to download QR code:", error);
  //   }
  // };

  return (
    <div className="relative z-10 mx-6 flex max-w-[1250px] w-full min-h-[550px] h-full">
      <Card className="flex-1 flex flex-col w-full h-auto mx-auto bg-sky-300 backdrop-blur-md shadow-sm border-2 rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            QR Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-full flex flex-col md:flex-row gap-8">
            {/* Left Side - Input Fields */}
            <div className="flex-1 space-y-6">
              <Tabs
                defaultValue="link"
                className="space-y-6"
                onValueChange={(val) => setUrl(val)}
              >
                <TabsList className="h-10 w-full grid grid-cols-1 bg-slate-200">
                  <TabsTrigger
                    value="link"
                    className="text-white font-bold flex items-center gap-2"
                  >
                    <Link className="w-4 h-4 " />
                    Link
                  </TabsTrigger>
                </TabsList>

                {/* Link QR Code */}
                <TabsContent value="link">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="url" className="font-semibold">
                        URL
                      </label>
                      <Input
                        id="url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value.trim())}
                        className="w-full border-2 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400 border-slate-200/90 hover:border-blue-500"
                      />
                    </div>

                    {/* QR Code & Background Color Pickers (Side-by-Side) */}
                    <div className="flex gap-4">
                      <div className="space-y-2 flex-1">
                        <label className="font-semibold">QR Code Color</label>
                        <div className="flex items-center gap-2">
                          <div
                            className="relative w-12 h-12 rounded-md border-2 border-slate-200/90"
                            style={{ backgroundColor: color }}
                          >
                            <input
                              type="color"
                              value={color}
                              onChange={(e) => setColor(e.target.value)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                          <input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="flex-1 border-2 h-12 bg-transparent border-slate-200/90 rounded-md text-center"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 flex-1">
                        <label className="font-semibold">
                          Background Color
                        </label>
                        <div className="flex items-center gap-2">
                          <div
                            className="relative w-12 h-12 rounded-md border-2 border-slate-200/90"
                            style={{ backgroundColor: bgcolor }}
                          >
                            <input
                              type="color"
                              value={bgcolor}
                              onChange={(e) => setBgColor(e.target.value)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                          <input
                            type="text"
                            value={bgcolor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="flex-1 border-2 h-12 bg-transparent border-slate-200/90 rounded-md text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="space-y-2">
                <label htmlFor="Logo" className="font-semibold">
                  Logo
                </label>
                <Input
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={(e: any) => {
                    if (e.target.files && e.target.files[0]) {
                      setLogoFile(e.target.files[0]);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setLogo(reader.result as string);
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                  className="w-full border-2 bg-transparent border-slate-200/90 hover:border-blue-500"
                />
              </div>
            </div>

            {/* QR Code Preview (Right Side) */}
            <div className="relative flex-1 bg-blue-500 rounded-lg flex flex-col justify-center space-y-6">
              <span>
                <LayoutGrid className="w-8 h-8 text-emerald-100 absolute top-4 right-4" />
              </span>
              <p className="text-center font-semibold text-2xl text-emerald-100 ">
                Scan me
              </p>
              <div id="qr-code" className="flex justify-center">
                <QRCodeSVG
                  value={url}
                  size={256}
                  fgColor={color}
                  bgColor={bgcolor}
                  imageSettings={
                    logo
                      ? { src: logo, height: 50, width: 50, excavate: true }
                      : undefined
                  }
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-blue-700 text-white rounded-md flex items-center gap-2 hover:bg-blue-900"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Qrcodegenerator;
