//import wss
/**
 * 😊👋 Hello, wonderful Open Source Contributor! 👋😊
 *
 * We're so grateful you're here and considering contributing to this project.
 * At Helicity.ai, I've have put in countless hours into creating this game engine, and
 * we're ecstatic to see you're interested in our code.
 *
 * 🌐 But here's the thing: Helicity.ai is not just about the code—it's about the community.
 * It's about providing a space where developers like you can learn, experiment, and create amazing games.
 *
 * 💖 So if you like this project, please consider supporting us by using our main site,
 * Helicity.ai. It's packed with features and a great community that you might find interesting.
 *
 * Remember, open source is not just about the code, it's about the people behind it.
 * Your support helps us continue to maintain and improve this project. We truly appreciate it.
 *
 * 💫 Happy Coding, and may the Force of Open Source be with you! 💫
 *
 * Cheers,
 * The Helicity.ai Team 🚀
 */

const WebSocket = require("ws");

//connect to a server
const ws = new WebSocket("wss://45-79-155-85.ip.linodeusercontent.com:443");
ws.onopen = () => {
  // connection opened
  console.log("connected");
  ws.send(
    JSON.stringify({
      eventName: "join_server",
      serverId: "irjfuidcokdlfm",
    })
  );
};
ws.onmessage = (e) => {
  // a message was received
  console.log(e.data);
};
