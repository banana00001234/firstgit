package com.graduate.springboot.Controller;


import com.alibaba.fastjson.JSONObject;
import com.graduate.springboot.Common.originalentity;
import com.graduate.springboot.Dao.entity.Notice;
import com.graduate.springboot.Service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@EnableAutoConfiguration
public class NoticeController {
    private NoticeService noticeService;
    @Autowired
    public void setNoticeService(NoticeService noticeService){
        this.noticeService=noticeService;
    }
    @GetMapping("/no")
    @ResponseBody
    public List<Notice>listNotice(){
        List<Notice> list=noticeService.getTopFourNotice();
        if(list==null){
            System.out.println("there is nothing");
        }
        System.out.println(list.iterator().next().getNoDatetime());
        return list;
    }
    @GetMapping("/notice")
    @ResponseBody
    public List<Notice>NoticeUpdate(@RequestParam(value="type")String noType){
        if(noType.equals("type0")){
            List<Notice>list=noticeService.selectNoTopTen();
            return list;
        }
        else {
            List<Notice>list=noticeService.selectNoTopTenByType(noType);
            return list;
        }

    }
    @GetMapping("/noticemore")
    @ResponseBody
    public originalentity NoticeMore(@RequestParam(value = "noticetime") String noticedatetime,
                                     @RequestParam(value = "type")String type,
                                     @RequestParam(value = "pageNum")Integer pageNum) throws ParseException {

        if(pageNum>0){
            System.out.println("date="+noticedatetime);

            int startindex=pageNum*10;
            if(type.equals("type0")){
                    List<Notice>list =noticeService.selectNoTenByPageNum(startindex,noticedatetime);
                    if(list.isEmpty()){
                        System.out.println("hehe");
                    }
                    return new originalentity(200,"获取全部新闻",list);
            }
            else {
                List<Notice>list =noticeService.selectNoTenByTypeAndPageNum(type,startindex,noticedatetime);
                return new originalentity(200,"获取分类新闻",list);
            }

        }
        else {
            return new originalentity(500,"页面参数错误");
        }
    }
    @GetMapping("/noticedetail")
    @ResponseBody
    public  originalentity NoticeDetail(@RequestParam(value = "noid")String  noid){
        int id=Integer.parseInt(noid);
        try {
            List<Notice> list = noticeService.selectNoDetail(id);
            if (list != null) {
                return new originalentity(200,"获取新闻详情",list);
            } else {
                return new originalentity(500,"未找到该新闻");
            }
        }catch (Exception e){
            return new originalentity(500,"数据获取失败");
        }

    }
    @RequestMapping("/selectallnotice")
    @CrossOrigin
    @ResponseBody
    public JSONObject selectallnotice(@RequestParam(value = "page")int page,
                                      @RequestParam(value = "limit")int limit){
        JSONObject json=new JSONObject();
        System.out.println("notice");
        if(page>=1){
            System.out.println("keyi");
            int pagenum =(page-1)*limit;
            List<Notice>list= noticeService.selectNoticeByPageAndLimit(pagenum,limit);
            int totalcount=noticeService.getNotice().size();
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
    @RequestMapping(value = "/admininsertnotice")
    @CrossOrigin

    @ResponseBody
    public originalentity insertNotice(@RequestBody Notice notice){
        int id=notice.getId();
        System.out.println("id="+id);
        if(id==0){
            System.out.println("insertnotice");
            try {
                noticeService.insert(notice);
                return new originalentity(200,"");
            }catch (Exception e){
                System.out.println(e);
                return new originalentity(500,"",e);
            }
        }else {
            System.out.println("updatenotice");
            try {
                noticeService.updateByPrimaryKey(notice);
                return new originalentity(200,"");
            }catch (Exception e){
                System.out.println(e);
                return new originalentity(500,"");
            }
        }




    }
    @RequestMapping(value = "/admindeletenotice")
    @CrossOrigin
    @ResponseBody
    public originalentity deleteNotice(@RequestParam(value = "id")int id){
        noticeService.noticeAutoIncrement();
        if (id != 0) {
            try {
                noticeService.deleteByPrimaryKey(id);
            }catch (Exception e){
                return new originalentity(500,"");
            }

            return new originalentity(200,"");
        }
        else {
            return new originalentity(500,"被删除行id不存在");
        }
    }
}
