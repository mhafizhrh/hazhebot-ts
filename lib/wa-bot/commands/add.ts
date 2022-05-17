import { Client, GroupChat, Message } from "whatsapp-web.js";

export default {
    code: "add",
    type: "common",
    isActive: true,
    async run(msg: Message, client: Client) {
        const chat = (await msg.getChat()) as GroupChat;
        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            const chatQuotedMsg = await quotedMsg.getChat();
            const participantId = `${chatQuotedMsg.id.user}@c.us`;
            await chat.addParticipants([participantId]);
        } else {
            let participants = msg.body.split(" ");
            participants.splice(0, 1);
            participants.forEach((v, i) => {
                participants[i] = `${v}@c.us`;
            });
            console.log(participants);
            await chat.addParticipants(participants);
        }
    },
};
