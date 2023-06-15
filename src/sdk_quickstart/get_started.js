import SignalingManager from "../signaling_manager/signaling_manager.js";
import showMessage from '../utils/showmessage.js';
import projectSelector from "../utils/projectSelector.js";

// The following code is solely related to UI implementation and not Agora-specific code
window.onload = async () => {
  // Set the project selector
  setupProjectSelector();

  // Signaling Manager will create the engine and channel for you
  const {
    signalingEngine,
    signalingChannel,
    config,
    login,
    logout,
    createChannel,
    join,
    leave,
    sendPeerMessage,
    sendChannelMessage,
  } = await SignalingManager(showMessage);

  // Display channel name
  document.getElementById("channelName").innerHTML = config.channelName;
  // Display User name
  document.getElementById("userId").innerHTML = config.uid;

  // Buttons
  // login
  document.getElementById("login").onclick = async function () {
    await login();
  };

  // logout
  document.getElementById("logout").onclick = async function () {
    await logout();
  };

  // create channel
  document.getElementById("create_channel").onclick = async function () {
    await createChannel();
  };

  // join channel
  document.getElementById("join").onclick = async function () {
    await join();
  };

  // leave channel
  document.getElementById("leave").onclick = async function () {
    await leave();
  };

  // send peer-to-peer message
  document.getElementById("send_peer_message").onclick = async function () {
    let peerId = document.getElementById("peerId").value.toString();
    let peerMessage = document.getElementById("peerMessage").value.toString();
    await sendPeerMessage(peerId, peerMessage);
  };

  // send channel message
  document.getElementById("send_channel_message").onclick = async function () {
    let channelMessage = document
      .getElementById("channelMessage")
      .value.toString();
    await sendChannelMessage(channelMessage);
  };
};

const setupProjectSelector = async () => {
  const resp = await fetch("/projectselector.html")
  console.log(resp)
  const html = await resp.text()
  document.getElementById("projectSelector").innerHTML = html

  document.getElementById("projectSelector").onclick = async function () {
    projectSelector();
  }
};
