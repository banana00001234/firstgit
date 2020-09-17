package com.graduate.springboot.Common;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;



import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.AlgorithmParameters;
import java.security.Security;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
public class WxMethod {
    public static JSONObject getSessionKeyAndOpenId(String code) {
        String requestUrl = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String, String> requestUrlParam = new HashMap<>();
        // https://mp.weixin.qq.com/wxopen/devprofile?action=get_profile&token=164113089&lang=zh_CN
        //小程序appId
        requestUrlParam.put("appid", "wx2d24b22df2d8e4d7");
        //小程序secret
        requestUrlParam.put("secret", "55d7cfe25dead3e6e675c1e4ecf91f3e");
        //小程序端返回的code
        requestUrlParam.put("js_code", code);
        //默认参数
        requestUrlParam.put("grant_type", "authorization_code");
        //发送post请求读取调用微信接口获取openid用户唯一标识
        JSONObject jsonObject = JSON.parseObject(HttpMethod.doGet(requestUrl, requestUrlParam));
        return jsonObject;
    }
}
