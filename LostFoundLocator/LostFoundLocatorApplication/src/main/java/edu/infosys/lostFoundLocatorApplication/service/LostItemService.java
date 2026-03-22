package edu.infosys.lostFoundLocatorApplication.service;

import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.dao.LostItemDao;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class LostItemService {
	@Autowired
	 private LostItemDao lostItemDao;
   public String generateLostItemId() { 
	String newId="";
	String id=lostItemDao.getLastId();
	if(id==null) {
		newId="L100001";
	}
	else {
		int num = Integer.parseInt(id.substring(1)) + 1;
		newId="L"+num;
	}
	return newId;
}
}