import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.css";
import { getLostItemById } from "../../Services/LostItemService";
import { getFoundItemsByLostItem } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";

const MatchItemSearch = () => {
  const navigate = useNavigate();
  const { lostItemId } = useParams();
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState("");
  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: "",
    status: false,
  });
  const [foundItemList, setFoundItemList] = useState([]);

  const loadData = () => {
    if (!lostItemId) return;
    setError("");
    getLostItemById(lostItemId)
      .then((res) => setLostItem(res.data))
      .catch(() => setError("Could not load lost item. Check login and backend on port 9595."));
    getFoundItemsByLostItem(lostItemId)
      .then((res) => setFoundItemList(res.data || []))
      .catch(() => setError("Could not load matching found items."));
  };

  useEffect(() => {
    loadData();
  }, [lostItemId]);

  const returnBack = () => {
    navigate("/lost-report");
  };

  const claimItem = (foundItemId, foundUsername) => {
    const payload = {
      lostItemId: lostItem.lostItemId,
      foundItemId,
      itemName: lostItem.lostItemName,
      category: lostItem.category,
      lostUsername: lostItem.username,
      foundUsername,
    };
    saveMatchItem(payload)
      .then(() => setFlag(true))
      .catch((err) =>
        setError(err.response?.data?.message || err.message || "Could not save match.")
      );
  };

  return (
    <div className="report-page">
      <div className="report-card">
        <h2 className="report-title">Student&apos;s Lost Item</h2>
        {error && <div className="text-danger" style={{ marginBottom: 12 }}>{error}</div>}

        <table className="report-table">
          <thead>
            <tr>
              <th>Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Lost Date</th>
              <th>User Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{lostItem.lostItemId}</td>
              <td>{lostItem.lostItemName}</td>
              <td>{lostItem.category}</td>
              <td>{lostItem.color}</td>
              <td>{lostItem.brand}</td>
              <td>{lostItem.location}</td>
              <td>{lostItem.lostDate}</td>
              <td>{lostItem.username}</td>
              <td className={lostItem.status ? "status-found" : "status-not-found"}>
                {lostItem.status ? "Found" : "Not Found"}
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="report-title" style={{ marginTop: 28 }}>
          Probable Matching Found Item List
        </h2>

        <table className="report-table">
          <thead>
            <tr>
              <th>Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Found Date</th>
              <th>User Id</th>
              <th>Status</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {foundItemList.map((item) => (
              <tr key={item.foundItemId}>
                <td>{item.foundItemId}</td>
                <td>{item.foundItemName}</td>
                <td>{item.category}</td>
                <td>{item.color}</td>
                <td>{item.brand}</td>
                <td>{item.location}</td>
                <td>{item.foundDate}</td>
                <td>{item.username}</td>
                <td className={item.status ? "status-returned" : "status-not-returned"}>
                  {item.status ? "Returned" : "Not Returned"}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn-warning"
                    onClick={() => claimItem(item.foundItemId, item.username)}
                  >
                    Claim
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="report-actions">
          <button type="button" onClick={returnBack} className="btn-success">
            Return
          </button>
        </div>

        {flag && (
          <p className="text-success" style={{ textAlign: "center", marginTop: 16 }}>
            Item claimed — match saved.
          </p>
        )}
      </div>
    </div>
  );
};

export default MatchItemSearch;
