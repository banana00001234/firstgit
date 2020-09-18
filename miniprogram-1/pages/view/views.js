// pages/view/views.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:null,
    noticeurl:{"type1":{"item":[]},"type2":{"item":[]}},
    notice:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
     wx.request({
       url: 'http://localhost:8080/no',
       header:{
         'content-type':'application/json'
       },
       success:function(res){
         var index1 = 0;
         var index2 = 0;
         console.log(res);
         var noticeurl=that.data.noticeurl;
         var notice=that.data.notice
         for (let a = 0; a < res.data.length; a++) {
           var unixTimestamp = new Date(res.data[a].noDatetime)

           var birthday = unixTimestamp.getFullYear() + "-" + (unixTimestamp.getMonth() + 1) + "-" + unixTimestamp.getDate()
           res.data[a].noDatetime=birthday
         }
        that.setData({notice:res.data})
        //  var no=JSON.stringify(that.data.notice)
         console.log('res='+that.data.notice[0].noTitle)
        
       }
     })
     wx.login({
       success(e){
         wx.getUserInfo({
           success:function(info){
             console.log(info);
             console.log("rowdata="+info.rawData)
             wx.request({
               url: 'http://localhost:8080/login',
               data:{
                code:e.code,
                rowData:info.rawData,
                signature:info.signature,
                encryptedData:info.encryptedData,
                iv:info.iv
               },
               success:function(anwser){
                 console.log("sessionid="+anwser.data)
                 wx.setStorageSync("skey", {time:Date.now(),data:anwser.data})
               }
             })
           }
         })
       }
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onGetUserInfo:function(e){
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
})