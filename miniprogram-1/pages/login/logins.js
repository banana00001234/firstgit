// pages/login/logins.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userinfo:null,
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //表单提交
  formsubmit:function(e){
    var skey=wx.getStorageSync("skey")
    var skeytime=  Date.now()-skey.time
    if(!skey.data||skeytime>120000){
      wx.showModal({
        title: '',
        content: '请登录',
        confirmText:'登录',
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url: '/pages/logs/logs',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
          else if(res.cancel){
            console.log('用户点击取消')
          }
        }
      })
    }
    else{
      var hint = " ";
      for (var item in e.detail.value) {
        if (item == 'candidate_award') {
          continue;
        }
        if (e.detail.value[item] == "" || e.detail.value[item] == 'undefined') {
          hint = "必填内容不能为空"
          wx.showModal({
            title: '错误',
            content: hint,
            showCancel: false
          })
          
          break;

        }
      }
      if (hint == " ") {
        console.log("skey="+skey.data)
        console.log(e);
        wx.request({
          url: 'http://localhost:8080/candidate',
          data: {
            data: e.detail.value,
            sessionkey: skey.data
          },
          success: function (e) {
            wx.showToast({
              title: e.data.message,
              icon:'none',
              duration:2000
            })
          }
        })
      }
    //  }
    }

    
  },
  //输入框格式检查
  scoreInput:function(e){
    let score=e.detail.value;
    let str = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
    if(str.test(score)){
      if(score>=0&&score<1000||score==""){

      }else{
        wx.showToast({
          title: '请填写正确的数字',
          icon: 'none'
        })
      }
    }
    else{
      wx.showToast({
        title: '请填写正确的数字',
        icon: 'none'
      })
    }
  },
  birthdayInput:function(e){
    let birthday = e.detail.value;
    let str = /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
    if (str.test(birthday) || birthday == ""){
      
    }else{
      wx.showToast({
        title: '请填写正确的年份',
        icon: 'none'
      })
    }
  },
  nameInput: function (e) {
    let name=e.detail.value;
    let str = /^[\u2E80-\u9FFF]+$/;
    if (str.test(name) || name == "") {
      
    } else {
      wx.showToast({
        title: '请填写正确的汉字',
        icon: 'none'
      })
    }
  },
  phoneInput: function (e) {
    let phone=e.detail.value;
    let str = /^1[34578]\d{9}$/;
    if (str.test(phone)) {
      
    } else {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
    }
  },
  ageInput: function (e) {
    let str = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
    let age = e.detail.value;
    if (str.test(age)) {
      if (age >= 1 && age <= 150||age=="") { 
        
      }
      else{
        wx.showToast({
          title: '请填写正确的年龄',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '请填写正确的年龄',
        icon: 'none'
      })
    }
  },
  idnumberInput: function (e) {
    let idnumber = e.detail.value;
    let str = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (str.test(idnumber)) {
      
    } else {
      wx.showToast({
        title: '请填写正确的身份证号',
        icon: 'none'
      })
    }
  },
  nativeInput: function (e) {
    let native = e.detail.value;
    let str = /^[\u2E80-\u9FFF]+$/;
    if (str.test(native) || native == "") {
     
    } else {
      wx.showToast({
        title: '请填写正确的籍贯',
        icon: 'none'
      })
    }
  },
  wishInput: function (e) {
    let wish = e.detail.value;
    let str = /^[\u2E80-\u9FFF]+$/;
    if (str.test(wish) ||wish == "") {
     
    } else {
      wx.showToast({
        title: '请填写正确的志愿',
        icon: 'none'
      })
    }
  },
  emailInput: function (e) {
    let email = e.detail.value;
    let str = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (str.test(email)) {
      
    } else {
      wx.showToast({
        title: '请填写正确的邮箱',
        icon:'none'
      })
    }
  },

})