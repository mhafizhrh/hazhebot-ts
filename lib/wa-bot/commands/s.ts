import { Client, Message } from "whatsapp-web.js";

export default {
    code: "s",
    type: "common",
    isActive: true,
    async run(msg: Message, client: Client) {
        let media;

        if (!msg.hasQuotedMsg) {
            if (msg.hasMedia) {
                media = await msg.downloadMedia();
            } else {
                msg.reply("sertakan media");
            }
        }

        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.hasMedia) {
                media = await quotedMsg.downloadMedia();
            } else {
                msg.reply("quote harus berupa media");
            }
        }

        if (media) {
            msg.reply(media, "", {
                sendMediaAsSticker: true,
            });
        }
    },
};
