package edu.infosys.lostFounderLocatorApplication.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.lostFoundLocatorApplication.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication.dao.LostItemDao;
import edu.infosys.lostFoundLocatorApplication.service.LostItemService;
import edu.infosys.lostFoundLocatorApplication.service.LostfoundUserService;
import edu.infosys.lostFoundLocatorApplication.service.MatchEngineService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535",allowCredentials = "true")
public class LostItemController {
     
	@Autowired
	private LostItemDao lostItemDao;
	
	@Autowired
	private LostfoundUserService service;
	
	@Autowired 
	private LostItemService lostService;

	@Autowired
	private MatchEngineService matchEngineService;
	

	@PostMapping("/lost")
	public void saveLostItem(@RequestBody LostItem lostItem) {
		lostItemDao.saveLostItem(lostItem);
		matchEngineService.createMatchesForLostItem(lostItem);
		

	}

	@GetMapping("/lost")
	public List<LostItem> getAllLostItems() {
		return  lostItemDao.getAllLostItems();
	}

	@GetMapping("/lost/{lostItemId}")
	public LostItem getLostItemById(@PathVariable String lostItemId) {
		return lostItemDao.getLostItemById(lostItemId);
	}

	@DeleteMapping("/lost/{lostItemId}")
	public void deleteLostItemById(@PathVariable String lostItemId) {
		
		   lostItemDao.deleteLostItemById(lostItemId);

	}

	@GetMapping("/lost-id")
	public String generateLostItemId(){
		
		return lostService.generateLostItemId();
	}
	
	@GetMapping("/lost-user")
	public List<LostItem>getLostItemsByUsername(){
		String userId=service.getUserId();
		return lostItemDao.getLostItemsByUsername(userId);
	}
}


