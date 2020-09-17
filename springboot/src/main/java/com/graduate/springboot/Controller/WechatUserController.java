package com.graduate.springboot.Controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.graduate.springboot.Common.WxMethod;
import com.graduate.springboot.Common.originalentity;
import com.graduate.springboot.Dao.WechatUserMapper;
import com.graduate.springboot.Dao.entity.WechatUser;
import com.graduate.springboot.Service.WechatUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@EnableAutoConfiguration
public class WechatUserController {
    private WechatUserService wechatUserService;
    @Autowired
    public void setWechatUserService(WechatUserService wechatUserService){this.wechatUserService=wechatUserService;}
    @Autowired
    WechatUserMapper wechatUserMapper;
    @GetMapping("/login")
    public String userlogin(@RequestParam(value = "code")String code,
                            @RequestParam(value = "rowData")String rowData,
                            @RequestParam(value = "signature")String signature,
                            @RequestParam(value = "encryptedData")String encryptedData,
                            @RequestParam(value = "iv")String iv) {
            String Sessionid= UUID.randomUUID().toString().replaceAll("-","");//生成自定义登录码
            JSONObject SessionKeyOpenId = WxMethod.getSessionKeyAndOpenId(code);
            JSONObject Rowdata= JSON.parseObject(rowData);
            String openid = SessionKeyOpenId.getString("openid");
//            String sessionKey = SessionKeyOpenId.getString("session_key");
            WechatUser wxuser=wechatUserService.getuserinfo(openid);
            WechatUser wechatuser=new WechatUser();
            if(wxuser==null){
                String user_nickname= Rowdata.getString("nickName");
                int user_gender=Rowdata.getInteger("gender");
                String user_country=Rowdata.getString("country");
                String user_province=Rowdata.getString("province");
                String user_city=Rowdata.getString("city");
                String user_avatarUrl=Rowdata.getString("avatarUrl");
                String user_language=Rowdata.getString("language");

                wechatuser.setCity(user_city);
                wechatuser.setCountry(user_country);
                wechatuser.setCustomCode(Sessionid);
                wechatuser.setGender(user_gender);
                wechatuser.setLanguage(user_language);
                wechatuser.setLastLogin(new Date());
                wechatuser.setNickname(user_nickname);
                wechatuser.setOpenid(openid);
                wechatuser.setAvatarurl(user_avatarUrl);
                wechatuser.setProvince(user_province);
                this.wechatUserMapper.insert(wechatuser);
                System.out.println("insert complete"+wechatuser);
            }
            else {
                wxuser.setCustomCode(Sessionid);
                wxuser.setLastLogin(new Date());
                this.wechatUserMapper.updateByPrimaryKey(wxuser);
            }
//            System.out.println("openid"+openid);
//            originalentity result = originalentity.build(openid);
//            System.out.println(result);
//
//            return null;

       return Sessionid;
    }
}
