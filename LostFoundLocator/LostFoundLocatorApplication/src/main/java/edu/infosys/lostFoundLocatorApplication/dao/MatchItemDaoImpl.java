package edu.infosys.lostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItemId;

@Service
@Repository
public class MatchItemDaoImpl implements MatchItemDao {

	@Autowired
	private MatchItemRepository repository;

	@Override
	public void saveMatchItem(MatchItem matchItem) {
		repository.save(matchItem);
	}

	@Override
	public List<MatchItem> getAllMatchItems() {
		return repository.findAll();
	}

	@Override
	public MatchItem getMatchItemById(MatchItemId matchItemId) {
		return repository.findById(matchItemId).get();
	}

	@Override
	public void deleteMatchItemById(MatchItemId matchItemId) {
		repository.deleteById(matchItemId);
	}

	@Override
	public List<MatchItem> getMatchItemsByLostUsername(String username) {
		return repository.getMatchItemsByLostUsername(username);
	}

	@Override
	public List<MatchItem> getMatchItemsByFoundUsername(String username) {
		return repository.getMatchItemsByFoundUsername(username);
	}
}

