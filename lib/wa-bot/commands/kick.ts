import { Client, GroupChat, Message } from "whatsapp-web.js";

export default {
    code: "kick",
    type: "common",
    isActive: true,
    /**
     *
     * @param {WAWebJS.Message} msg
     * @param {Client} client
     */
    async run(msg: Message, client: Client) {
        let chat = (await msg.getChat()) as GroupChat;
        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            const chatQuotedMsg = await quotedMsg.getChat();
            const userId = chatQuotedMsg.id.user.split("-")[0];
            const participantId = `${userId}@c.us`;
            await chat.removeParticipants([participantId]);
        } else {
            let mentions: string[] = msg.mentionedIds;
            mentions.forEach((v, i) => {
                mentions[i] = v.substring(1);
            });

            let participants = msg.body.split(" ");
            participants.splice(0, 1);
            participants.forEach((v, i) => {
                participants[i] = `${v}@c.us`;
            });

            participants = participants.filter((v) => {
                console.log("cek", v);
                console.log(!v.startsWith("@"));
                return !v.startsWith("@");
            });

            participants.concat(mentions);

            const uniqqq = [...new Set(participants)];

            console.log(participants);
            console.log("uniqqq", uniqqq);
            console.log(await chat.removeParticipants(participants));

            await chat.removeParticipants(participants);
        }
    },
};
