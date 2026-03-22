
package edu.infosys.lostFounderLocatorApplication.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.lostFoundLocatorApplication.bean.FoundItem;
import edu.infosys.lostFoundLocatorApplication.dao.FoundItemDao;
import edu.infosys.lostFoundLocatorApplication.service.FoundItemService;
import edu.infosys.lostFoundLocatorApplication.service.LostfoundUserService;
import edu.infosys.lostFoundLocatorApplication.service.MatchEngineService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535",allowCredentials = "true")
public class FoundItemController {
     
	@Autowired
	private FoundItemDao foundItemDao;
	
	@Autowired
	private LostfoundUserService service;
	
	@Autowired 
	private FoundItemService foundService;

	@Autowired
	private MatchEngineService matchEngineService;
	

	@PostMapping("/found")
	public void saveFoundItem(@RequestBody FoundItem foundItem) {
		foundItemDao.saveFoundItem(foundItem);
		matchEngineService.createMatchesForFoundItem(foundItem);
		

	}

	@GetMapping("/found")
	public List<FoundItem> getAllFoundItems() {
		return  foundItemDao.getAllFoundItems();
	}

	@GetMapping("/found/{foundItemId}")
	public FoundItem getFoundItemById(@PathVariable String foundItemId) {
		return foundItemDao.getFoundItemById(foundItemId);
	}

	@DeleteMapping("/found/{foundItemId}")
	public void deleteFoundItemById(@PathVariable String foundItemId) {
		
		   foundItemDao.deleteFoundItemById(foundItemId);

	}

	@GetMapping("/found-id")
	public String generateLostItemId(){
		
		return foundService.generateFoundItemId();
	}
	
	@GetMapping("/found-user")
	public List<FoundItem>getFoundItemsByUsername(){
		String userId=service.getUserId();
		return foundItemDao.getFoundItemsByUsername(userId);
	}

	/** Probable found items for a given lost item (same category + name/color/brand similarity). */
	@GetMapping("/found-by-lost/{lostItemId}")
	public List<FoundItem> getFoundItemsByLostItem(@PathVariable String lostItemId) {
		return matchEngineService.getProbableFoundItemsForLostItem(lostItemId);
	}

	@PutMapping("/found")
	public void updateFoundItem(@RequestBody FoundItem foundItem) {
	    foundItemDao.saveFoundItem(foundItem);
	    matchEngineService.createMatchesForFoundItem(foundItem);
	}
	
}


