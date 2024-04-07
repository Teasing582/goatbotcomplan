module.exports = {
 config: {
 name: "top",
 version: "1.0",
 author: "bills",
 role: 0,
 shortDescription: {
 en: "Top 30 Rich Users"
 },
 longDescription: {
 en: ""
 },
 category: "group",
 guide: {
 en: "{pn}"
 }
 },
 onStart: async function ({ api, args, message, event, usersData }) {
 const allUsers = await usersData.getAll();

 const topUsers = allUsers.sort((a, b) => b.money - a.money).slice(0, 30);

 const topUsersList = topUsers.map((user, index) => `${index + 1}. ${user.name}: ${user.money}`);

 const messageText = `🔬 ursa 𝖠𝗌𝗌𝗂𝗌𝗍𝖺𝗇𝖼𝖾 \n\nTop 30 Richest Users:\n${topUsersList.join('\n')}`;

 message.reply(messageText);
 }
};
