import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { getAllMatchItems } from "../../Services/MatchItemService";

const MatchItemReport = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllMatchItems()
      .then((res) => setItemList(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || err.message || "Failed to load match items.")
      );
  }, []);

  const returnBack = () => {
    navigate("/admin-menu");
  };

  return (
    <div className="report-page">
      <div className="report-card">
        <h2 className="report-title">Match Item List</h2>

        {error && <div className="text-danger" style={{ marginBottom: 12 }}>{error}</div>}

        <table className="report-table">
          <thead>
            <tr>
              <th>Lost Item Id</th>
              <th>Found Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Lost Username</th>
              <th>Found Username</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item) => (
              <tr key={`${item.matchItemId?.lostItemId}-${item.matchItemId?.foundItemId}`}>
                <td>{item.matchItemId?.lostItemId}</td>
                <td>{item.matchItemId?.foundItemId}</td>
                <td>{item.itemName}</td>
                <td>{item.category}</td>
                <td>{item.lostUsername}</td>
                <td>{item.foundUsername}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="report-actions">
          <button onClick={returnBack} className="btn-success">
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchItemReport;

