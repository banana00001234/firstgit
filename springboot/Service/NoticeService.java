package com.graduate.springboot.Service;

import com.graduate.springboot.Dao.entity.Notice;

import java.util.List;

public interface NoticeService {
    List<Notice>getNotice();
    List<Notice>getTopFourNotice();
    List<Notice>selectNoTopTen();
    List<Notice>selectNoTopTenByType(String type);
    List<Notice>selectNoTenByTypeAndPageNum(String type, int pageNum, String noticedatetime);
    List<Notice>selectNoTenByPageNum(int pageNum, String noticedatetime);
    List<Notice>selectNoDetail(int id);
    List<Notice>selectNoticeByPageAndLimit(int page,int limit);
    int insert(Notice notice);
    int updateByPrimaryKey(Notice notice);
    void noticeAutoIncrement();
    int deleteByPrimaryKey(int id);
}
