package com.graduate.springboot.Controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.graduate.springboot.Common.originalentity;
import com.graduate.springboot.Dao.entity.Admin;
import com.graduate.springboot.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@EnableAutoConfiguration

public class AdminController {
    @Autowired
    private AdminService adminService;

    @RequestMapping ("/adminlogin")
    @ResponseBody
    @CrossOrigin
    public String adminlogin(@RequestParam(value = "adminname")String adminname,
                                     @RequestParam(value = "password")String password){
        System.out.println("aaaaa");

        JSONObject json=new JSONObject();
        List<Admin>list=adminService.selectAdmin(password);
        if(list==null||list.isEmpty()){
            System.out.println("nonono");
            json.put("status",500);
            json.put("message","true");
            return json.toJSONString();
        }
        else if (adminname.equals(list.iterator().next().getAdminName())){
            System.out.println("gogogo");
            json.put("status",200);
            json.put("message","wrong");
            return json.toJSONString();


        }
        else {
            json.put("status",400);
            return json.toJSONString();
        }
    }
    @RequestMapping("/adminhome")
    @CrossOrigin
    public String gotoHome(){
        System.out.println("kkkk");
        return "AdminManage";
    }
    @RequestMapping("/loginpage")
    public String returnlogin(){
        return "AdminLogin";
    }




}
