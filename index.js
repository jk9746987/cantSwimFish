// 建立express伺服器
const express = require("express");
const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: "5BlymjqpeWBFPiZTtoGI5ll839aCe3BOMfVIQ4OtbUoL5OK7t8tov8iwc6A8kU941q345xYoFYqtq1+OMwguJXSrRm+lIxwSWennYOqFuxPs1U/t50uOrAANS3PkpvJxiqKcLW6GJlWLaeeiMr4VEAdB04t89/1O/w1cDnyilFU=", //填入在Line developers得到的channelAccessToken
  channelSecret: 'aade486fd0d71f5adc399acf167e5b44',
}
const client = new line.Client(config);
// const crypto = require('crypto');
const app = express();

// // 引用linebot SDK
var linebot = require("linebot");

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: '1661169547',
  channelSecret: 'aade486fd0d71f5adc399acf167e5b44',
  channelAccessToken: "5BlymjqpeWBFPiZTtoGI5ll839aCe3BOMfVIQ4OtbUoL5OK7t8tov8iwc6A8kU941q345xYoFYqtq1+OMwguJXSrRm+lIxwSWennYOqFuxPs1U/t50uOrAANS3PkpvJxiqKcLW6GJlWLaeeiMr4VEAdB04t89/1O/w1cDnyilFU=" //填入在Line developers得到的channelAccessToken
});

const linebotParser = bot.parser();

bot.on("memberJoined", function (event) {
  if(event.source.type === "group"){
    let groupId = event.source.groupId;
    let userId = event.joined.members[0].userId;
    client.getGroupMemberProfile(groupId,userId).then((profile) => {
      let replyMsg = [
        {
          "type": "text",
          "text": `${profile.displayName}你好\n我們是宗族戰取向的公會\n如果你是新手，你願意花時間學，我們會撥時間教學。\n\n但是如果想休閒玩，我們宗族可能不適合加入。\n以下問題請依序照實回答及PO範例上的截圖\n1.這遊戲有課金嗎？目前大概花多少了？\n2.預計每個月花多少錢在遊戲上？\n3.每天玩遊戲的時數（小時）？\n4.宗族最低要求為聲望3。`
        },
        {
          "type": "image",
          "originalContentUrl": "https://truth.bahamut.com.tw/s01/202305/88047ccdac9e4ae07c9f9139d08eb76d.JPG",
          "previewImageUrl": "https://truth.bahamut.com.tw/s01/202305/88047ccdac9e4ae07c9f9139d08eb76d.JPG"
        },
        {
          "type": "text",
          "text": `需注意\n「宗族戰」表現不好也不積極討論的話也會踢除\n以上。有問題請發問以上若是沒問題，麻煩到LINE的設定頁\n隱私設定>阻檔訊息打開\n方便邀請你入公會大群\n謝謝！`
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