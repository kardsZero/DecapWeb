import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function About() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/kardsZero/DecapWeb/main/content/pages/about.md"
    )
      .then((res) => res.text())
      .then((text) => {
        const body = text.replace(/---[\s\S]*?---/, "").trim();
        setContent(body);
      });
  }, []);

  return (
    <div>
      <h1>About</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default About;