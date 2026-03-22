package edu.infosys.lostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.bean.FoundItem;
@Service
@Repository
public class FoundItemDaoImpl implements FoundItemDao {

	@Autowired
	private FoundItemRepository repository;
	
	
	
	
	@Override
	public void saveFoundItem(FoundItem foundItem) {
		// TODO Auto-generated method stub
		repository.save(foundItem);

	}

	@Override
	public List<FoundItem> getAllFoundItems() {
		// TODO Auto-generated methodstub
		return  repository.findAll();
	}

	@Override
	public FoundItem getFoundItemById(String foundItemId) {
		// TODO Auto-generated method stub
		return repository.findById(foundItemId).get();
	}

	@Override
	public void deleteFoundItemById(String foundItemId) {
		// TODO Auto-generated method stub
		   repository.deleteById(foundItemId);

	}

	@Override
	public String getLastId() {
		// TODO Auto-generated method stub
		return repository.getLastId();
	}
	
	@Override
	public List<FoundItem>getFoundItemsByUsername(String username){
		return repository.getFoundItemsByUsername(username);
	}

}