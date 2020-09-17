package com.graduate.springboot.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.graduate.springboot.Dao.entity.Entity;
import com.graduate.springboot.Service.AnnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
//@RequestMapping(value="/Ann")
public class AnnController {

    private AnnService annService;
    @Autowired
    public void setAnnService(AnnService annService){
        this.annService=annService;
    }

    @GetMapping("/ann")
    @ResponseBody
        public List<Entity> listAnn(){

        List<Entity> list=annService.getAnn();
        if(list==null){
            System.out.println("there is nothing");
        }
        System.out.println("thanks");
        return list;
    }

}

