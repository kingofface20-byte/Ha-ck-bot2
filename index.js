const TelegramBot = require('node-telegram-bot-api');

// ستاسو د بوټ ټوکن
const token = '9076116342:AAHOMebo2fDVR5F6BS3nPUTgEjyp2Ib-Ons';
const bot = new TelegramBot(token, { polling: true });

// ستاسو د خوښې یوزرنوم یا لینک چې د بل چا پر ځای به کینوي
const myTarget = '@Mastershahzada'; 

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    // ۱. که پیغام متن ولري
    if (msg.text) {
        let text = msg.text;
        // دلته د بل چا یوزرنوم ولیکئ چې غواړئ پاک شي (مثلاً @REDX_64)
        if (text.includes('@REDX_64')) {
            text = text.replace(/@REDX_64/gi, myTarget);
            bot.sendMessage(chatId, text);
        } else {
            // که بل متن وي، هغسې یې تېر کړه یا که غواړئ هر متن بدل کړي
            bot.sendMessage(chatId, text);
        }
    }
    
    // ۲. که عکس، ویدیو، یا بل کوم فایل وي (سره له کیپشن)
    else if (msg.caption || msg.photo || msg.document || msg.video || msg.audio) {
        let caption = msg.caption || "";
        
        // که په کیپشن کې د بل چا یوزرنوم وي، زموږ په یوزرنوم یې بدلوي
        if (caption.includes('@REDX_64')) {
            caption = caption.replace(/@REDX_64/gi, myTarget);
        }

        // د عکس استول
        if (msg.photo) {
            const photoId = msg.photo[msg.photo.length - 1].file_id;
            bot.sendPhoto(chatId, photoId, { caption: caption });
        } 
        // د ویډیو استول
        else if (msg.video) {
            const videoId = msg.video.file_id;
            bot.sendVideo(chatId, videoId, { caption: caption });
        } 
        // د سند/فایل (Document) استول
        else if (msg.document) {
            const docId = msg.document.file_id;
            bot.sendDocument(chatId, docId, { caption: caption });
        }
        // د اډیو استول
        else if (msg.audio) {
            const audioId = msg.audio.file_id;
            bot.sendAudio(chatId, audioId, { caption: caption });
        }
    }
});

console.log("Bot is running and replacing usernames with @Mastershahzada12 successfully...");
