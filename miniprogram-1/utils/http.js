function getskey(){
  wx.login({
    success(e) {
      wx.getUserInfo({
        success: function (info) {
          console.log(info);
          console.log("rowdata=" + info.rawData)
          wx.request({
            url: 'http://localhost:8080/login',
            data: {
              code: e.code,
              rowData: info.rawData,
              signature: info.signature,
              encryptedData: info.encryptedData,
              iv: info.iv
            },
            success: function (anwser) {
              console.log("sessionid=" + anwser.data)
              wx.setStorageSync("skey", { time: Date.now(), data: anwser.data })
              wx.navigateBack({

              })
            }
          })
        }
      })
    }
  })
}