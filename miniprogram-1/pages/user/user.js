
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userinfo:"",
      hasuserinfo:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var userinfo=that.data.userinfo
    if (app.globalData.userinfo!==null) {
      console.log('app.globalData.userinfo'+app.globalData.userinfo)
      that.setData({ userinfo: app.globalData.userinfo },
        { hasuserinfo: true })
    }
    else if (userinfo!=='') {
      console.log('haha')
      that.setData({ hasuserinfo: true })
    }
    else{
      let hasuserinfo = that.data.hasuserinfo
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            if (hasuserinfo == false) {
              wx.getUserInfo({
                success: function (res) {

                  that.setData({ userinfo: res.userInfo },
                    { [app.globalData.userinfo]: res.userInfo })
                  that.setData({ hasuserinfo: true })
                  console.log(res.userInfo.nickName)
                  console.log(that.data.hasuserinfo)
                }
              })
            }
          }


          
        }
      })
    }
    console.log('userinfo'+userinfo)
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
  onGetUserInfo:function(){
    var that=this;
   
    let hasuserinfo=that.data.hasuserinfo
    wx.getSetting({
      success(res){
        if(res.authSetting['scope.userInfo']){
          if (hasuserinfo == false) {
            wx.getUserInfo({
              success: function (res) {

                that.setData({ userinfo: res.userInfo },
                  { [app.globalData.userinfo]: res.userInfo })
                that.setData({ hasuserinfo: true })
                console.log(res.userInfo.nickName)
                console.log(that.data.hasuserinfo)
              }
            })
          }
        }
      }
    })
    
    
  
  }
})