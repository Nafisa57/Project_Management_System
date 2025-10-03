import { ImgHTMLAttributes } from "react";

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/icon.jpeg" // put your file inside public/icon.jpeg
      alt="App Logo"
      className="h-10 w-10 rounded-md"
      {...props}
    />
  );
}
