import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Veylo — At-Home Skin and Body Technology",
    short_name: "Veylo",
    description: "At-home beauty and recovery devices with clear, practical guidance.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f4",
    theme_color: "#faf7f4",
    icons: [
      { src: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
