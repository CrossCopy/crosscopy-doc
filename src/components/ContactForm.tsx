import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetch(
      "https://notification-proxy.crosscopy.io/notion",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          message: msg,
          email,
          name: `${firstname} ${lastname}`,
          tags: ["CrossCopy", "Doc"],
        }),
      }
    );
  };

  return (
    <form className="w-full max-w-lg mx-auto" onSubmit={submit}>
      <div className="flex justify-center">
        <h1 className="text-5xl">Contact Us</h1>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-first-name"
            type="text"
            placeholder="First"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Last"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            E-mail
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Message
          </label>
          <textarea
            className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
            id="message"
            onChange={(e) => setMsg(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <button className="btn right-0" type="submit">
          Send
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
