const axios = require('axios');

const fs = require('fs');


module.exports = {

  config: {

    name: "teach",

    version: "1.0.1",

    author: "@itsunknown",//convert Kaizenji 

    countDown: 5,

    role: 0,

    shortDescription: "Teach Simsimi",

    longDescription: "teach {message} => {response}",

    category: "fun",

    guide: "{p} teach message => response",

  },


onStart: async function ({ api, event, args, reply }) {

    const content = args.join(" ");

    const [ask, ans] = content.split("=>").map(item => item.trim());


    // Checking arguments

    if (!ask || !ans) return api.sendMessage('𝖬𝗂𝗌𝗌𝗂𝗇𝗀 𝗊𝗎𝖾𝗋𝗒!\n𝖾𝗑𝖺𝗆𝗉𝗅𝖾: 𝗍𝖾𝖺𝖼𝗁 𝗁𝗂 => 𝗁𝖾𝗅𝗅𝗈', event.threadID);


    const url = `https://sim-api-0xx.onrender.com/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`;


    try {

        const response = await axios.get(url);

        if (response.data) {

            api.sendMessage(`𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗧𝗲𝗮𝗰𝗵𝗲𝗱!🥳\n\n𝗬𝗼𝘂𝗿 𝗮𝘀𝗸: ${ask}\n𝗕𝗼𝘁 𝗿𝗲𝘀𝗽𝗼𝗻𝘀𝗲: ${ans}`, event.threadID);

        } 

    } catch(err) {

        api.sendMessage('Error while teaching', event.threadID);

        console.log(err);

	 }

	 }

};
