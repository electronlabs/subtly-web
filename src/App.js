import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    var options = {
      audioBitsPerSecond: 16000,
      mimeType: "audio/webm;codecs=pcm"
    };

    const recorder = new MediaRecorder(stream, options);

    recorder.start(1000);

    recorder.ondataavailable = async e => {
      console.log("data available");
      const body = JSON.stringify({
        AudioStream: {
          AudioEvent: {
            AudioChunk: e.data
          }
        }
      });

      // const headers = new Headers({
      //   'content-type': 'application/json',
      //   'x-amzn-transcribe-language-code': 'en-US',
      //   'x-amzn-transcribe-sample-rate': '16000',
      //   'x-amzn-transcribe-media-encoding': 'pcm',
      // })

      // const result = await fetch('https://transcribestreaming.eu-west-1.amazonaws.com/stream-transcription', {
      //   method: 'POST',
      //   headers: headers,
      //   body: body,
      // });

      // console.log(result)

      // const xhr = new XMLHttpRequest();
      // xhr.open("POST", "https://transcribestreaming.eu-west-1.amazonaws.com/stream-transcription");
      // xhr.setRequestHeader("content-type", "application/json");
      // xhr.setRequestHeader("x-amzn-transcribe-language-code", "en-US");
      // xhr.setRequestHeader("x-amzn-transcribe-sample-rate", "16000");
      // xhr.setRequestHeader("x-amzn-transcribe-media-encoding", "pcm");

      // xhr.onreadystatechange = function() {
      //   console.log("onreadystatechange");
      //   if (xhr.readyState === 4) {
      //     console.log(xhr.response);
      //   }
      // };

      // xhr.send(body);

      axios({
        method: "post",
        url: "/stream-transcription",
        baseURL: "https://transcribestreaming.eu-west-1.amazonaws.com/",
        headers: {
          "content-type": "application/json",
          "x-amzn-transcribe-language-code": "en-US",
          "x-amzn-transcribe-sample-rate": "16000",
          "x-amzn-transcribe-media-encoding": "pcm"
        },
        data: body,
      });
    };
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
