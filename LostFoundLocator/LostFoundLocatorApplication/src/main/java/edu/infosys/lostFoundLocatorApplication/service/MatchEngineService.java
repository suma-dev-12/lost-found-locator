package edu.infosys.lostFoundLocatorApplication.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.bean.FoundItem;
import edu.infosys.lostFoundLocatorApplication.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItemId;
import edu.infosys.lostFoundLocatorApplication.dao.FoundItemRepository;
import edu.infosys.lostFoundLocatorApplication.dao.LostItemRepository;
import edu.infosys.lostFoundLocatorApplication.dao.MatchItemRepository;

@Service
public class MatchEngineService {

	@Autowired
	private LostItemRepository lostItemRepository;

	@Autowired
	private FoundItemRepository foundItemRepository;

	@Autowired
	private MatchItemRepository matchItemRepository;

	public void createMatchesForLostItem(LostItem lostItem) {
		if (lostItem == null || Boolean.TRUE.equals(lostItem.getStatus()))
			return;
		if (isBlank(lostItem.getLostItemId()) || isBlank(lostItem.getCategory()))
			return;

		List<FoundItem> candidates = foundItemRepository.getOpenFoundItemsByCategory(lostItem.getCategory());
		for (FoundItem found : candidates) {
			if (found == null || Boolean.TRUE.equals(found.getStatus()))
				continue;
			if (isBlank(found.getFoundItemId()))
				continue;
			if (!isSimilar(lostItem, found))
				continue;

			MatchItemId id = new MatchItemId(lostItem.getLostItemId(), found.getFoundItemId());
			if (matchItemRepository.existsById(id))
				continue;

			MatchItem match = new MatchItem();
			match.setMatchItemId(id);
			match.setItemName(firstNonBlank(lostItem.getLostItemName(), found.getFoundItemName()));
			match.setCategory(lostItem.getCategory());
			match.setLostUsername(lostItem.getUsername());
			match.setFoundUsername(found.getUsername());
			matchItemRepository.save(match);
		}
	}

	/**
	 * For student "search" screen: open found items in same category that are similar to this lost item.
	 */
	public List<FoundItem> getProbableFoundItemsForLostItem(String lostItemId) {
		List<FoundItem> result = new ArrayList<>();
		if (isBlank(lostItemId))
			return result;
		LostItem lost = lostItemRepository.findById(lostItemId).orElse(null);
		if (lost == null || Boolean.TRUE.equals(lost.getStatus()))
			return result;
		if (isBlank(lost.getCategory()))
			return result;

		List<FoundItem> candidates = foundItemRepository.getOpenFoundItemsByCategory(lost.getCategory());
		for (FoundItem found : candidates) {
			if (found == null || Boolean.TRUE.equals(found.getStatus()))
				continue;
			if (!isSimilar(lost, found))
				continue;
			result.add(found);
		}
		return result;
	}

	public void createMatchesForFoundItem(FoundItem foundItem) {
		if (foundItem == null || Boolean.TRUE.equals(foundItem.getStatus()))
			return;
		if (isBlank(foundItem.getFoundItemId()) || isBlank(foundItem.getCategory()))
			return;

		List<LostItem> candidates = lostItemRepository.getOpenLostItemsByCategory(foundItem.getCategory());
		for (LostItem lost : candidates) {
			if (lost == null || Boolean.TRUE.equals(lost.getStatus()))
				continue;
			if (isBlank(lost.getLostItemId()))
				continue;
			if (!isSimilar(lost, foundItem))
				continue;

			MatchItemId id = new MatchItemId(lost.getLostItemId(), foundItem.getFoundItemId());
			if (matchItemRepository.existsById(id))
				continue;

			MatchItem match = new MatchItem();
			match.setMatchItemId(id);
			match.setItemName(firstNonBlank(lost.getLostItemName(), foundItem.getFoundItemName()));
			match.setCategory(foundItem.getCategory());
			match.setLostUsername(lost.getUsername());
			match.setFoundUsername(foundItem.getUsername());
			matchItemRepository.save(match);
		}
	}

	/**
	 * "Similar" rule (simple + practical):
	 * - category must match (already filtered)
	 * - and (color matches OR brand matches OR item name matches)
	 */
	private boolean isSimilar(LostItem lost, FoundItem found) {
		String lostName = normalize(lost.getLostItemName());
		String foundName = normalize(found.getFoundItemName());
		String lostColor = normalize(lost.getColor());
		String foundColor = normalize(found.getColor());
		String lostBrand = normalize(lost.getBrand());
		String foundBrand = normalize(found.getBrand());

		boolean nameMatch = !lostName.isEmpty() && lostName.equals(foundName);
		boolean colorMatch = !lostColor.isEmpty() && lostColor.equals(foundColor);
		boolean brandMatch = !lostBrand.isEmpty() && lostBrand.equals(foundBrand);
		return nameMatch || colorMatch || brandMatch;
	}

	private static String normalize(String s) {
		if (s == null)
			return "";
		return s.trim().toLowerCase();
	}

	private static boolean isBlank(String s) {
		return s == null || s.trim().isEmpty();
	}

	private static String firstNonBlank(String a, String b) {
		if (!isBlank(a))
			return a;
		return b;
	}
}

