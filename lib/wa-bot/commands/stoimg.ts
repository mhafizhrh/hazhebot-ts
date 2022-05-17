import { Client, Message } from "whatsapp-web.js";

export default {
    code: "stoimg",
    type: "common",
    isActive: true,
    async run(msg: Message, client: Client) {
        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.hasMedia) {
                const media = await quotedMsg.downloadMedia();
                msg.reply(media);
            } else {
                msg.reply("quote harus berupa media");
            }
        }
    },
};
