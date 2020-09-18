// pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:'',
      noticedetail:{},
      isnull:false,
      space:'   '
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.id)
      this.setData({id:options.id})
      if(this.data.id!==""){
        this.findNoticeDetail(this.data.id)
      }
      else{
        this.setData({isnull:true})
      }
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
  findNoticeDetail:function(id){
    var that=this;
    var noid=id
    wx.request({
      url: 'http://localhost:8080/noticedetail',
      data:{
        noid
      },
      success:function(res){
        if(res!==""){
          // for (let a = 0; a < res.data.data.length; a++) {
          //   let unixTimestamp = new Date(res.data.data[a].noDatetime)

          //   let birthday = unixTimestamp.getFullYear() + "年" + (unixTimestamp.getMonth() + 1) + "月" + unixTimestamp.getDate() + "日" + unixTimestamp.getHours() + ":" + unixTimestamp.getMinutes() + ":" + unixTimestamp.getSeconds();
          //   res.data.data[a].noDatetime = birthday
          // }
          that.setData({ noticedetail: res.data.data}
          )
        }
        console.log(res.data.data)
      }
    })
  }
})