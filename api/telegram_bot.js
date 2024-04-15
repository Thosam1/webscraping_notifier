require("dotenv").config();
const { Telegraf } = require('telegraf');

let bot = new Telegraf(process.env.TELEGRAM_BOT_API_KEY);

/* Uncomment this, run locally and send command /start on telegram to get the chat id */
// bot.start((ctx) =>
// {
//     ctx.reply('Yolo');
//     console.log(ctx)
//
//     // to log the chat id, put it in .env file
//     console.log(ctx.message.chat.id)
// })

bot.launch(
    {
        webhook: {
            domain: "https://webscraping-notifier.vercel.app/",
            port: 8000
        }
    }
);
console.log("bot has launched")

function sendMessage(message, times) {
    for (let i = 0; i < times; i++) {
        bot.telegram.sendMessage(process.env.TELEGRAM_BOT_CHAT_ID, message);
    }
}

module.exports = sendMessage;
