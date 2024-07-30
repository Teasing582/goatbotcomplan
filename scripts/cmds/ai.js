module.exports = {
  config: {
    name: "ai",
    version: "1.0",
    author: "Jay",
    countDown: 0,
    role: 0,
    shortDescription: "Chat with AI.",
    longDescription: "Chat with AI",
    category: "ai",
    guide: {
      en: "'{pn} ai'"
    }
  },
  onStart: async function ({ api, event, args }) {
    const fs = require('fs');
    const axios = require('axios');

    const input = args.join(" ");
    const botID = api.getCurrentUserID();
    const botData = await api.getUserInfo(botID);
    const sender = event.type === "message_reply" ? event.messageReply.senderID : event.senderID;
    const userInfo = await api.getUserInfo(sender);
    const userName = userInfo[sender].name;
    const botName = botData[botID].name;
    const replyMessage = (event.type === "message_reply" && event.messageReply) ? event.messageReply.body : "No reply message available";
    const userMessages = event.type === "message" ? input : `${userName}: ${replyMessage}\n${input}`;

    if (input.length < 2) {
      const responses = [
        "Please provide a question.",
        "No prompt provided.",
        "Please ask a question."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      api.sendMessage(randomResponse, event.threadID, event.messageID);
      return;
    }

    if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0]?.type === "photo") {
      const attachment = event.messageReply.attachments[0];
      const { url } = attachment;

      try {
        const b = await uploadImgbb(url);
        input += ' ' + b.image.url;
      } catch (error) {
        api.sendMessage("Failed to upload image.", event.threadID, event.messageID);
        return;
      }
    }

    try {
      const response = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(input)}`);
      const message = response.data.reply;
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        if (error.response.status == 401 && error.response.data.error.message.startsWith("You didn't provide an API key")) {
          api.sendMessage("API-Key is missing.", event.threadID, event.messageID);
        }
      } else {
        console.log(error.message);
        api.sendMessage(error.message, event.threadID, event.messageID);
      }
    }
  }
};
