package edu.infosys.lostFoundLocatorApplication.service;

import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.dao.FoundItemDao;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class FoundItemService {
	@Autowired
	 private FoundItemDao foundItemDao;
   public String generateFoundItemId() { 
	String newId="";
	String id=foundItemDao.getLastId();
	if(id==null) {
		newId="F100001";
	}
	else {
		int num = Integer.parseInt(id.substring(1)) + 1;
		newId="F"+num;
	}
	return newId;
}
}