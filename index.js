// 建立express伺服器
const express = require("express");
const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: "HDAZE4rUGDHSTS8G9mWOpCJUFQhcL5F3YP8mRxu4ciBXYfev6Sn/1MsPYgk1OHqIpmI6KzFZdByC3SuyRNk57Pi5R242aPubaqy2aDs7zCiMzl9qB1Rp0UK4vk7llAAulYuu1ntHurbsQ4y8JgpLUQdB04t89/1O/w1cDnyilFU=", //填入在Line developers得到的channelAccessToken
  channelSecret: 'e37597240c5bc02615c30c778b27ce08',
}
const client = new line.Client(config);
// const crypto = require('crypto');
const app = express();

// const client = new line.Client({
//   channelID: '1657915027', //填入在Line developers得到的channel ID
//   channelSecret: 'e37597240c5bc02615c30c778b27ce08', //填入在Line developers得到的channelSecret金鑰
//   channelAccessToken: "HDAZE4rUGDHSTS8G9mWOpCJUFQhcL5F3YP8mRxu4ciBXYfev6Sn/1MsPYgk1OHqIpmI6KzFZdByC3SuyRNk57Pi5R242aPubaqy2aDs7zCiMzl9qB1Rp0UK4vk7llAAulYuu1ntHurbsQ4y8JgpLUQdB04t89/1O/w1cDnyilFU=" //填入在Line developers得到的channelAccessToken
// });

// app.post('/webhook', line.middleware({ 
//   channelID: '1657915027', //填入在Line developers得到的channel ID
//   channelSecret: 'e37597240c5bc02615c30c778b27ce08', //填入在Line developers得到的channelSecret金鑰
//   channelAccessToken: "HDAZE4rUGDHSTS8G9mWOpCJUFQhcL5F3YP8mRxu4ciBXYfev6Sn/1MsPYgk1OHqIpmI6KzFZdByC3SuyRNk57Pi5R242aPubaqy2aDs7zCiMzl9qB1Rp0UK4vk7llAAulYuu1ntHurbsQ4y8JgpLUQdB04t89/1O/w1cDnyilFU=" //填入在Line developers得到的channelAccessToken
// }), (req, res) => {
//   let signInKey = '';
//   try {
//     //產生對照組header
//     signInKey = crypto.createHmac('sha256', your_channelSecret).
//     update(Buffer.from(JSON.stringify(req.body)), 'utf8').digest('base64');
//   } catch (e) {
//     //產生失敗的處理
//   }

//   if(signInKey !== req.header('x-Line-Signature')){ 
//     return res.send(error);
//   }

//   return res.json(handleEvent(req.body.events[0]));

// });

// function handleEvent(event) {
//   let cReply = { //建立回應訊息
//     type: 'text',  
//     text: `你剛才說了"${event.message.text}"`
//   };
//   if (event.type !== 'message' || event.message.type !== 'text') {
//     cReply.text = '拍謝，看不懂';
//   }
//   return client.replyMessage(event.replyToken, cReply);//回覆訊息
// }

// // 引用linebot SDK
var linebot = require("linebot");

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: '1657915027',
  channelSecret: 'e37597240c5bc02615c30c778b27ce08',
  channelAccessToken: "HDAZE4rUGDHSTS8G9mWOpCJUFQhcL5F3YP8mRxu4ciBXYfev6Sn/1MsPYgk1OHqIpmI6KzFZdByC3SuyRNk57Pi5R242aPubaqy2aDs7zCiMzl9qB1Rp0UK4vk7llAAulYuu1ntHurbsQ4y8JgpLUQdB04t89/1O/w1cDnyilFU=" //填入在Line developers得到的channelAccessToken
});

// let bot = linebot({
//   channelId: process.env.channelId,
//   channelSecret: process.env.channelSecret,
//   channelAccessToken: process.env.channelAccessToken,
// });

const linebotParser = bot.parser();

// 當有人傳送訊息給Bot時
bot.on("message", function (event) {
  const userText = event.message.text;
  const bot = '@小烏丸';
  const guild = '@宗族戰';
  const nourish = '@培養';
  const cooperate = '@合作';
  const equipment = '@裝備';
  switch(userText){
    case bot:
      event.reply('殺!!!\n可對我使用以下指令\n@宗族戰\n@培養\n@合作\n@裝備')
      break;
    case guild:
      event.reply('https://hackmd.io/_seRSLOES5mABMQ8z3nxLQ?view')
      break;
    case nourish:
      event.reply('https://hackmd.io/yAfn0VMfQTe9j95HWVc1MQ?view')
      break;  
    case cooperate:
      event.reply('https://hackmd.io/JQ1-u0utQSmsVZGKaWuE_A?view')
      break;
    case equipment:
      event.reply('https://hackmd.io/KBCOJN86Q-uEDvZgNpFDQQ?view')
      break;
  }
});

bot.on("memberJoined", function (event) {
  if(event.source.type === "group"){
    let groupId = event.source.groupId;
    let userId = event.joined.members[0].userId;
    client.getGroupMemberProfile(groupId,userId).then((profile) => {
      let replyMsg = [
        {
          "type": "text",
          "text": `${profile.displayName}\n歡迎加入沉睡森林\n請先閱讀沉睡森林指南\nhttps://hackmd.io/G1YZTdiOQZyd8ATiOFLfTA?view\n閱讀完後記得做入會簽到\n記事本有文章要簽到，如下圖`
        },
        {
          "type": "image",
          "originalContentUrl": "https://truth.bahamut.com.tw/s01/202302/201f28dba33a557d86e5260f6e280673.JPG",
          "previewImageUrl": "https://truth.bahamut.com.tw/s01/202302/201f28dba33a557d86e5260f6e280673.JPG"
        },
        {
          "type": "image",
          "originalContentUrl": "https://truth.bahamut.com.tw/s01/202302/34a6b67e2e45620a37dbf68b9dd2e9e9.JPG",
          "previewImageUrl": "https://truth.bahamut.com.tw/s01/202302/34a6b67e2e45620a37dbf68b9dd2e9e9.JPG"
        },
        {
          "type": "image",
          "originalContentUrl": "https://truth.bahamut.com.tw/s01/202302/d089ec95f7c1f67e277f091c35094174.JPG",
          "previewImageUrl": "https://truth.bahamut.com.tw/s01/202302/d089ec95f7c1f67e277f091c35094174.JPG"
        },
        {
          "type": "text",
          "text": "以上三篇簽到後\n申請257733\n可輸入「@小烏丸」給我其它指示",
        }
      ]
      client.replyMessage(event.replyToken, replyMsg)
    })
}
});

// 送出帶有line-bot需要資訊的POST請求
app.post("/", linebotParser);

// 啟動express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Express server start");
});

module.exports = app