package edu.infosys.lostFounderLocatorApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItemDTO;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItemId;
import edu.infosys.lostFoundLocatorApplication.dao.MatchItemDao;
import edu.infosys.lostFoundLocatorApplication.service.LostfoundUserService;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class MatchItemController {

	@Autowired
	private MatchItemDao matchItemDao;

	@Autowired
	private LostfoundUserService userService;

	@PostMapping("/match")
	public void saveMatchItem(@RequestBody MatchItemDTO matchItem) {
		matchItemDao.saveMatchItem(new MatchItem(matchItem));
	}

	@GetMapping("/match")
	public List<MatchItem> getAllMatchItems() {
		return matchItemDao.getAllMatchItems();
	}

	@GetMapping("/match/{lostItemId}/{foundItemId}")
	public MatchItem getMatchItemById(@PathVariable String lostItemId, @PathVariable String foundItemId) {
		return matchItemDao.getMatchItemById(new MatchItemId(lostItemId, foundItemId));
	}

	@DeleteMapping("/match/{lostItemId}/{foundItemId}")
	public void deleteMatchItemById(@PathVariable String lostItemId, @PathVariable String foundItemId) {
		matchItemDao.deleteMatchItemById(new MatchItemId(lostItemId, foundItemId));
	}

	@GetMapping("/match-lost-user")
	public List<MatchItem> getMatchItemsByLostUsername() {
		String userId = userService.getUserId();
		return matchItemDao.getMatchItemsByLostUsername(userId);
	}

	@GetMapping("/match-found-user")
	public List<MatchItem> getMatchItemsByFoundUsername() {
		String userId = userService.getUserId();
		return matchItemDao.getMatchItemsByFoundUsername(userId);
	}
}

