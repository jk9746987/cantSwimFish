// 建立express伺服器
const express = require("express");
const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: "5BlymjqpeWBFPiZTtoGI5ll839aCe3BOMfVIQ4OtbUoL5OK7t8tov8iwc6A8kU941q345xYoFYqtq1+OMwguJXSrRm+lIxwSWennYOqFuxPs1U/t50uOrAANS3PkpvJxiqKcLW6GJlWLaeeiMr4VEAdB04t89/1O/w1cDnyilFU=", //填入在Line developers得到的channelAccessToken
  channelSecret: 'aade486fd0d71f5adc399acf167e5b44',
}
const client = new line.Client(config);
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
          "text": `${profile.displayName}你好\n《不會游泳的魚》是宗族戰取向的公會，不希望邀您進來宗族又馬上將您請出去，所以剛入坑或休閒玩家不太適合這裡。\n請依序回答以下問題(可複製及上傳範例截圖，方便審核。\n★照實回答即可無標準答案★\n（如果打擊值4000%↑前兩題可以選擇不回答\n1.目前遊戲大概花費多少錢？\n2.預計每個月花多少錢？\n3.每天遊玩時數(hr)?\n4.可配合宗戰開打6hr內打完？\n5.可配合課加速器嗎？`
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

app.get('/', (req, res) => {
  return res.json('line bot api').status(200)
})

module.exports = app