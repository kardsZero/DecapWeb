import { useEffect, useState } from "react";

function Gallery() {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/kardsZero/DecapWeb/main/content/pages/gallery.md"
    )
      .then((res) => res.text())
      .then((text) => {
        // Get title
        const titleMatch = text.match(/title:\s*(.*)/);
        if (titleMatch) {
          setTitle(titleMatch[1]);
        }

        // Get images
        const imageMatches = [...text.matchAll(/- (\/uploads\/.*)/g)];
        setImages(imageMatches.map((m) => m[1]));
      });
  }, []);

  return (
    <div>
      <h1>{title}</h1>

      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={`https://decapweb.netlify.app${img}`}
            alt={`Gallery ${index + 1}`}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;