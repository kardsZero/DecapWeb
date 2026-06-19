import { useRef } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_j3jilb8",
        "template_0g7mnle",
        form.current,
        "M2RLHKTYCsCtBxspn"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error(error);
          alert("Failed to send message");
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <input
        type="text"
        name="user_name"
        placeholder="Your Name"
        required
      />

      <input
        type="email"
        name="user_email"
        placeholder="Your Email"
        required
      />

      <textarea
        name="message"
        placeholder="Your Message"
        required
      />

      <button type="submit">
        Send Message
      </button>
    </form>
  );
}

export default Contact;