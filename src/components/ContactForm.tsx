import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Button, TextField } from "@mui/material";

const ContactForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [inputErr, setInputErr] = useState({
    first: false,
    last: false,
    email: false,
    msg: false,
  });
  const [inputErrMsg, setInputErrMsg] = useState({
    first: "",
    last: "",
    email: "",
    msg: "",
  });

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let err = false;
    let msgs = {
      first: "",
      last: "",
      email: "",
      msg: "",
    };
    if (firstname === "") {
      msgs.first = "Please enter your first name";
      err = true;
    }
    if (lastname === "") {
      msgs.last = "Please enter your last name";
      err = true;
    }
    if (email === "") {
      msgs.email = "Please enter your email name";
      err = true;
    }
    if (msg === "") {
      msgs.msg = "Message cannot be empty";
      err = true;
    }
    const errorIndicators = {
      first: Boolean(msgs.first),
      last: Boolean(msgs.last),
      email: Boolean(msgs.email),
      msg: Boolean(msgs.msg),
    };

    setInputErr(errorIndicators);
    if (err) {
      setInputErrMsg(msgs);
      return;
    }
    fetch("https://notification-proxy.crosscopy.io/notion", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        message: msg,
        email,
        name: `${firstname} ${lastname}`,
        tags: ["CrossCopy", "Doc"],
      }),
    })
      .then(() => {
        enqueueSnackbar("Message Sent", { variant: "success" });
        setFirstname("");
        setLastname("");
        setEmail("");
        setMsg("");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Failed to Send Message", { variant: "error" });
      });
  };
  return (
    <section className="bg-white py-5">
      <form className="w-full max-w-lg mx-auto" onSubmit={submit}>
        <div className="flex justify-center">
          <h1 className="text-5xl text-black">Leave a Message</h1>
        </div>
        <div className="grid grid-cols-2 gap-y-4 gap-x-2">
          <TextField
            id="first-name"
            label="First Name"
            variant="outlined"
            error={inputErr.first}
            helperText={inputErrMsg.first}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            id="last-name"
            label="Last Name"
            variant="outlined"
            error={inputErr.last}
            helperText={inputErrMsg.last}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            className="col-span-2"
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            error={inputErr.email}
            helperText={inputErrMsg.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="message"
            className="col-span-2"
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            error={inputErr.msg}
            helperText={inputErrMsg.msg}
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <Button className="col-span-2" variant="outlined" type="submit">
            Send
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
