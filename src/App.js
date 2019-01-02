import React, { Component } from "react";
import io from "socket.io-client";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  async componentDidMount() {
    const socket = io("http://localhost:5000")
    socket.on("connect", async () => {
      console.log("connected");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      var options = {
        audioBitsPerSecond: 16000,
        mimeType: "audio/webm;codecs=pcm"
      };

      const recorder = new MediaRecorder(stream, options);

      recorder.start(1000)

      recorder.ondataavailable = e => {
        console.log('data available')
        const data = e.data;

        socket.emit("audio chunk", { audio: data });
      };

      socket.on("subtitles", text => console.log(text));
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
