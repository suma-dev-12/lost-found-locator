package edu.infosys.lostFoundLocatorApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.lostFoundLocatorApplication.bean.FoundItem;

public interface FoundItemRepository extends JpaRepository<FoundItem,String> {
      @Query("SELECT max(foundItemId) from FoundItem")
      public String getLastId();
      
      @Query("SELECT a from FoundItem a where a.status=false and a.username=?1 ")
      public List<FoundItem>getFoundItemsByUsername(String username);

      @Query("SELECT a from FoundItem a where a.status=false and a.category=?1 ")
      public List<FoundItem> getOpenFoundItemsByCategory(String category);
}
