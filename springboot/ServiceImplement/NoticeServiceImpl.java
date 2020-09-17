package com.graduate.springboot.ServiceImplement;

import com.graduate.springboot.Dao.NoticeMapper;
import com.graduate.springboot.Dao.entity.Notice;
import com.graduate.springboot.Service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {
    @Autowired
            private NoticeMapper noticeMapper;
    @Override
    public List<Notice>getNotice(){
        return noticeMapper.selectNotice();
    }
    @Override
    public  List<Notice>getTopFourNotice(){
        return noticeMapper.selectNoTopfour();
    }
    @Override
    public  List<Notice>selectNoTopTen(){
        return noticeMapper.selectNoTopTen();
    }
    @Override
    public  List<Notice>selectNoTopTenByType(String type){
        return noticeMapper.selectNoTopTenByType(type);
    }
    @Override
    public List<Notice> selectNoTenByTypeAndPageNum(String type, int pageNum, String  noticedatetime){

        List<Notice>list=noticeMapper.selectNoTenByTypeAndPageNum(type,pageNum,noticedatetime);

        return list;
    }
    @Override
    public List<Notice>selectNoTenByPageNum(int pageNum, String noticedatetime){
        List<Notice> list=noticeMapper.selectNoTenByPageNum(pageNum,noticedatetime);


        return list;

        }
    @Override
    public List<Notice>selectNoDetail(int id){
        return noticeMapper.selectNoDetail(id);
    }

    @Override
    public List<Notice>selectNoticeByPageAndLimit(int page,int limit){
        return noticeMapper.selectNoticeByPageAndLimit(page,limit);
    }
    @Override
    public int insert(Notice notice){
        return noticeMapper.insert(notice);
    }
    @Override
    public int updateByPrimaryKey(Notice notice){
        return noticeMapper.updateByPrimaryKey(notice);
    }
    @Override
    public void noticeAutoIncrement(){
        noticeMapper.autoIncrement();
    }
    @Override
    public int deleteByPrimaryKey(int id){
        return noticeMapper.deleteByPrimaryKey(id);
    }
}
