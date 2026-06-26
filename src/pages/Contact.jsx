import emailjs from "@emailjs/browser";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    contact_number: "",
    email: "",
    city: "",
    state: "",
    nationality: "",
    start_date: "",
    end_date: "",
    arrival_point: "",
    departure_point: "",
    places: [],
    activities: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Checkbox handler
  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Calculate Trip Duration
    const start = new Date(formData.start_date);
    const end = new Date(formData.end_date);

    const duration =
      start && end
        ? Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
        : 0;

    const templateParams = {
      full_name: formData.full_name,
      age: formData.age,
      gender: formData.gender,
      contact_number: formData.contact_number,
      email: formData.email,
      city: formData.city,
      state: formData.state,
      nationality: formData.nationality,

      start_date: formData.start_date,
      end_date: formData.end_date,
      trip_duration: `${duration} Day(s)`,

      arrival_point: formData.arrival_point,
      departure_point: formData.departure_point,

      places: formData.places.join(", "),
      activities: formData.activities.join(", "),

      submitted_at: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_j3jilb8",
        "template_0g7mnle",
        templateParams,
        "M2RLHKTYCsCtBxspn"
      )
      .then(() => {
        alert("Message sent successfully!");

        setFormData({
          full_name: "",
          age: "",
          gender: "",
          contact_number: "",
          email: "",
          city: "",
          state: "",
          nationality: "",
          start_date: "",
          end_date: "",
          arrival_point: "",
          departure_point: "",
          places: [],
          activities: [],
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send message");
      });
  };

  return (
    <form onSubmit={sendEmail}>

      <input
        type="text"
        name="full_name"
        value={formData.full_name}
        onChange={handleChange}
        placeholder="Full Name"
      />

      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <input
        type="text"
        name="contact_number"
        value={formData.contact_number}
        onChange={handleChange}
        placeholder="Phone Number"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
      />

      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
      />

      <input
        type="text"
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
        placeholder="Nationality"
      />

      <input
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
      />

      <input
        type="date"
        name="end_date"
        value={formData.end_date}
        onChange={handleChange}
      />

      <input
        type="text"
        name="arrival_point"
        value={formData.arrival_point}
        onChange={handleChange}
        placeholder="Arrival Point"
      />

      <input
        type="text"
        name="departure_point"
        value={formData.departure_point}
        onChange={handleChange}
        placeholder="Departure Point"
      />

      <h3>Places</h3>

      <label>
        <input
          type="checkbox"
          name="places"
          value="Shillong"
          onChange={handleCheckbox}
        />
        Shillong
      </label>

      <label>
        <input
          type="checkbox"
          name="places"
          value="Dawki"
          onChange={handleCheckbox}
        />
        Dawki
      </label>

      <label>
        <input
          type="checkbox"
          name="places"
          value="Mawlynnong"
          onChange={handleCheckbox}
        />
        Mawlynnong
      </label>

      <h3>Activities</h3>

      <label>
        <input
          type="checkbox"
          name="activities"
          value="Trekking"
          onChange={handleCheckbox}
        />
        Trekking
      </label>

      <label>
        <input
          type="checkbox"
          name="activities"
          value="Camping"
          onChange={handleCheckbox}
        />
        Camping
      </label>

      <label>
        <input
          type="checkbox"
          name="activities"
          value="Photography"
          onChange={handleCheckbox}
        />
        Photography
      </label>

      <button type="submit">
        Send Inquiry
      </button>

    </form>
  );
}

export default Contact;