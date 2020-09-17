package com.graduate.springboot;

import com.graduate.springboot.Common.originalentity;
import com.graduate.springboot.Dao.entity.Notice;
import com.graduate.springboot.Service.CandidateService;
import com.graduate.springboot.Service.NoticeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@SpringBootTest
class SpringbootApplicationTests {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private NoticeService noticeService;
    @Test
    @ExceptionHandler(Exception.class)
    void contextLoads() throws Exception {
//        String idnumber="340104199705131511";
//        List<Candidate>candidates= candidateService.selectByIdNumber(idnumber);
//        if (candidates.get(0).getCandidateIdnumber().equals("340104199705131511")){
//            System.out.println("success");
//        }
//        candidateService.autoIncrement();
//        candidateService.inserttest();
//        int insert=candidateService.insertNoRepeatInfo();
//        if(insert!=0){
//            System.out.println("success");
//        }
//        else {
//            System.out.println("fail");
//        }
//        try {
//            List<Notice> list = noticeService.selectNoTenByTypeAndPageNum("ttt", -1, "2016-04-17");
//            System.out.println("list=" + list);
//            System.out.println("hhhhh");
//            System.out.println("why"+new originalentity(500,"wrong").getMessage());
//        }catch (Exception e){
//            System.out.println("cause"+e.getMessage());
//        }
//    shelllsort st=new shelllsort();
//    st.shsort();


    }

}
