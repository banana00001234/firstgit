package com.graduate.springboot.Controller;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.graduate.springboot.Common.WxMethod;
import com.graduate.springboot.Common.originalentity;
import com.graduate.springboot.Dao.CandidateMapper;
import com.graduate.springboot.Dao.entity.Candidate;
import com.graduate.springboot.Dao.entity.WechatUser;
import com.graduate.springboot.Service.CandidateService;
import com.graduate.springboot.Service.WechatUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;
import com.alibaba.fastjson.JSON;

import java.awt.*;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

@RestController
@EnableAutoConfiguration
public class CandidateController {
    private CandidateService candidateService;
    @Autowired
    public void setCandidateService(CandidateService candidateService){this.candidateService=candidateService;}
    @Autowired
    private WechatUserService wechatUserService;

    @Autowired
    private CandidateMapper candidateMapper;

    @GetMapping("/candidate")
    @ResponseBody
    public originalentity candi_insert(@RequestParam(value = "data")String data,
                                    @RequestParam(value = "sessionkey")String sessionkey
                                    ) {
        JSONObject sdata=JSON.parseObject(data);
        WechatUser skey=wechatUserService.getBySessionKey(sessionkey);
        if(skey==null){
            System.out.println("null");
            return new originalentity(500,"您还未登陆");

        }else {
            String oid=  skey.getOpenid();
            List<Candidate> candidate=candidateService.selectByOpenid(oid);
            if (candidate==null||candidate.isEmpty())
            {

                    Integer candidateNceeScore = sdata.getInteger("candidate__ncee_score");
                    Integer candidateAge=sdata.getInteger("candidate_age");
                    String award=sdata.getString("candidate_award");
                    String birthday=sdata.getString("candidate_birthday");
                    String email=sdata.getString("candidate_email");
                    String idnumber=sdata.getString("candidate_idnumber");
                    String name=sdata.getString("candidate_name");
                    String nativeplace=sdata.getString("candidate_nativeplace");
                    String nceeWish=sdata.getString("candidate_ncee_wish");
                    String phone= sdata.getString("candidate_phone");
                    String sex=sdata.getString("candidate_sex");
                    String openid=skey.getOpenid();

                    List<Candidate>ca=candidateService.selectByIdNumber(idnumber);

//                    String opid=ca.iterator().next().getOpenid();
                    if (ca==null||ca.isEmpty()){
                        Candidate candi=new Candidate();
                        candi.setCandidateAge(candidateAge);
                        candi.setCandidateAward(award);
                        candi.setCandidateBirthday(birthday);
                        candi.setCandidateEmail(email);
                        candi.setCandidateIdnumber(idnumber);
                        candi.setCandidateName(name);
                        candi.setCandidateNativeplace(nativeplace);
                        candi.setCandidateNceeScore(candidateNceeScore);
                        candi.setCandidateNceeWish(nceeWish);
                        candi.setCandidatePhone(phone);
                        candi.setCandidateSex(sex);
                        candi.setOpenid(openid);
                        try {
                            candidateService.insertNoRepeatInfo(candi);
                            System.out.println("success");
                            return new originalentity(200,"报名成功!");
                        }catch (Exception e){
                            return new originalentity(500,"数据插入失败");
                        }
                    }else {
                        return new originalentity(500,"身份证号重复");
                    }



            }
            else {
                return new originalentity(500,"您已报名");
            }
        }




    }
    @GetMapping("/update")
    @ResponseBody
    public originalentity updateCandi(@RequestParam(value="code")String code,
                              @RequestParam(value = "data")String data,
                              @RequestParam(value = "skey")String skey){
        JSONObject SessionKeyOpenId = WxMethod.getSessionKeyAndOpenId(code);
        WechatUser sessionkey=wechatUserService.getBySessionKey(skey);
        if(sessionkey==null){
            System.out.println("ohno");
            return new originalentity(500,"请重新登陆");
        }else {
            String openid = sessionkey.getOpenid();
            String sessionkeyopenid = SessionKeyOpenId.getString("openid");
            System.out.println("openid="+openid);
            System.out.println("session="+sessionkeyopenid);
                if(openid.equals(sessionkeyopenid)) {
                    System.out.println("why");
                    Candidate candi = new Candidate();
                    JSONObject sdata = JSON.parseObject(data);
                    Integer candidateNceeScore = sdata.getInteger("candidate__ncee_score");
                    Integer candidate_age = sdata.getInteger("candidate_age");
                    String award = sdata.getString("candidate_award");
                    String birthday = sdata.getString("candidate_birthday");
                    String email = sdata.getString("candidate_email");
                    String idnumber = sdata.getString("candidate_idnumber");
                    String name = sdata.getString("candidate_name");
                    String nativeplace = sdata.getString("candidate_nativeplace");
                    String nceeWish = sdata.getString("candidate_ncee_wish");
                    String phone = sdata.getString("candidate_phone");
                    String sex = sdata.getString("candidate_sex");
                    List<Candidate> list = candidateService.selectByIdNumber(idnumber);
                    if(list==null||list.isEmpty()){
                        candi.setCandidateAge(candidate_age);
                        candi.setCandidateAward(award);
                        candi.setCandidateBirthday(birthday);
                        candi.setCandidateEmail(email);
                        candi.setCandidateIdnumber(idnumber);
                        candi.setCandidateName(name);
                        candi.setCandidateNativeplace(nativeplace);
                        candi.setCandidateNceeScore(candidateNceeScore);
                        candi.setCandidateNceeWish(nceeWish);
                        candi.setCandidatePhone(phone);
                        candi.setCandidateSex(sex);
                        candi.setOpenid(sessionkeyopenid);
                        try {
                            this.candidateMapper.updateByOpenId(candi);
                            System.out.println("true");
                            return new originalentity(200, "更新成功");
                        }catch (Exception e){
                            return new originalentity(500,"更新失败");
                        }
                    }else {
//                        String can_idnum = list.get(0).getCandidateIdnumber();
                        String can_openid = list.get(0).getOpenid();
                        if (can_openid.equals(openid)) {
                            candi.setCandidateAge(candidate_age);
                            candi.setCandidateAward(award);
                            candi.setCandidateBirthday(birthday);
                            candi.setCandidateEmail(email);
                            candi.setCandidateIdnumber(idnumber);
                            candi.setCandidateName(name);
                            candi.setCandidateNativeplace(nativeplace);
                            candi.setCandidateNceeScore(candidateNceeScore);
                            candi.setCandidateNceeWish(nceeWish);
                            candi.setCandidatePhone(phone);
                            candi.setCandidateSex(sex);
                            candi.setOpenid(sessionkeyopenid);
                            try {
                                this.candidateMapper.updateByOpenId(candi);
                                System.out.println("true");
                                return new originalentity(200, "更新成功");
                            }catch (Exception e){
                                return new originalentity(500,"更新失败");
                            }
                        }
                        else {
                            return new originalentity(500,"身份证号冲突!");
                        }
                    }


//                    if (can_idnum.equals(idnumber)) {
//                        if (can_openid.equals(openid)) {
//                            candi.setCandidateAge(candidate_age);
//                            candi.setCandidateAward(award);
//                            candi.setCandidateBirthday(birthday);
//                            candi.setCandidateEmail(email);
//                            candi.setCandidateIdnumber(idnumber);
//                            candi.setCandidateName(name);
//                            candi.setCandidateNativeplace(nativeplace);
//                            candi.setCandidateNceeScore(candidateNceeScore);
//                            candi.setCandidateNceeWish(nceeWish);
//                            candi.setCandidatePhone(phone);
//                            candi.setCandidateSex(sex);
//                            candi.setOpenid(sessionkeyopenid);
//                            try {
//                                this.candidateMapper.updateByOpenId(candi);
//                                System.out.println("true");
//                                return new originalentity(200, "更新成功");
//                            }catch (Exception e){
//                                return new originalentity(500,"更新失败");
//                            }
//                        }
//                        else {
//                            return new originalentity(500,"身份证号冲突!");
//                        }
//                    }
//                    else {
//                        candi.setCandidateAge(candidate_age);
//                        candi.setCandidateAward(award);
//                        candi.setCandidateBirthday(birthday);
//                        candi.setCandidateEmail(email);
//                        candi.setCandidateIdnumber(idnumber);
//                        candi.setCandidateName(name);
//                        candi.setCandidateNativeplace(nativeplace);
//                        candi.setCandidateNceeScore(candidateNceeScore);
//                        candi.setCandidateNceeWish(nceeWish);
//                        candi.setCandidatePhone(phone);
//                        candi.setCandidateSex(sex);
//                        candi.setOpenid(sessionkeyopenid);
//                        try {
//                            this.candidateMapper.updateByOpenId(candi);
//                            System.out.println("true");
//                            return new originalentity(200, "更新成功");
//                        }catch (Exception e){
//                            return new originalentity(500,"更新失败");
//                        }
//                    }
                }else {
                        return new originalentity(500,"请重新登陆");
                }

        }


    }

    @GetMapping("/selectcandidate")
    @ResponseBody
    public originalentity selectCandi(@RequestParam(value = "sessionkey")String sessionkey){
        WechatUser skey=wechatUserService.getBySessionKey(sessionkey);
        if(skey==null){
            System.out.println("null");
            return new originalentity(500,"未找到相关报名信息");

        }else {
            try{
                String openid=skey.getOpenid();
                List<Candidate> candidate=candidateService.selectByOpenid(openid);

                String candi=candidate.iterator().next().getOpenid();
                if(candi!=null){
                    candidate.iterator().next().setOpenid("");
                }
//            for(int i=0;i<candidate.size();i++){
//                if(candidate.get(i).equals(openid)){
//                    candidate.remove(i);
//                    break;
//                }
//            }
//            for(int i=0;i<candidate.size();i++){
//                Candidate candid= candidate.get(i);
//                System.out.println( candid.getOpenid());
//            }
                Iterator<Candidate> iterator=candidate.iterator();
                while (iterator.hasNext()){
                    Candidate can=iterator.next();
                    if(can.equals("")){
                        iterator.remove();
                    }
                }
                return new originalentity(200,"获取报名信息成功",candidate);
            }catch (Exception e){
                return new originalentity(500,"您还未报名");
            }


        }
    }
    @GetMapping(value = "/selectallcandi")
    @CrossOrigin
    @ResponseBody
    public JSONObject selectAllCandi(@RequestParam(value = "page")int page,
                                         @RequestParam(value = "limit")int limit){
        JSONObject json=new JSONObject();
        if(page>=1){
            System.out.println("keyi");
            int pagenum =(page-1)*limit;
            List<Candidate>list= candidateService.selectByPage(pagenum,limit);
            int totalcount=candidateService.getallcandi().size();
            System.out.println("count="+totalcount);
            json.put("code",0);
            json.put("msg","");
            json.put("count",totalcount);
            json.put("data",list);
            return json;

        }

        else {
            System.out.println("bukeyi");
            json.put("code",500);
            json.put("msg","");
            json.put("count","");
            json.put("data","");
            return json;
        }
    }
    @RequestMapping(value = "/admininsertcandi")
    @CrossOrigin
    @ResponseBody
    public originalentity insertCandi(@RequestBody Candidate candidate){
        int id=candidate.getId();
        String idnumber=candidate.getCandidateIdnumber();
        if(id==0){
            System.out.println("idnumber="+idnumber);
            List<Candidate> list = candidateService.selectByIdNumber(idnumber);
            System.out.println("xing");
            if(list==null||list.isEmpty()){
                try {
                    candidateService.autoIncrement();
                    candidateService.adminInsertCandi(candidate);
                    return new originalentity(200,"");
                }catch (Exception e){
                    System.out.println("e="+e);
                    return new originalentity(500,"");
                }
            }else {
                return new originalentity(500,"身份证号重复");
            }
        }
        else {
            try {
                candidateService.updateByPrimaryKey(candidate);
                return new originalentity(200,"");
            }catch (Exception e){
                System.out.println("ue="+e);
                return new originalentity(500,"");
            }

        }

    }
    @RequestMapping(value = "/admindeletecandi")
    @CrossOrigin
    @ResponseBody
    public originalentity deletecandi(@RequestParam(value = "id")int id){
        candidateService.autoIncrement();
         int delete = candidateService.deleteByPrimaryKey(id);
         candidateService.autoIncrement();
         System.out.println("del="+delete);
         if(delete!=0){
             return new originalentity(200,"删除成功");
         }
        else {
            return new originalentity(500,"");
         }
    }

}
