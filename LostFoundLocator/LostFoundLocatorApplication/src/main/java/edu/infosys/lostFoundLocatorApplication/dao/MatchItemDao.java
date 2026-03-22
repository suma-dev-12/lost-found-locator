package edu.infosys.lostFoundLocatorApplication.dao;

import java.util.List;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItemId;

public interface MatchItemDao {

	public void saveMatchItem(MatchItem matchItem);

	public List<MatchItem> getAllMatchItems();

	public MatchItem getMatchItemById(MatchItemId matchItemId);

	public void deleteMatchItemById(MatchItemId matchItemId);

	public List<MatchItem> getMatchItemsByLostUsername(String username);

	public List<MatchItem> getMatchItemsByFoundUsername(String username);
}

