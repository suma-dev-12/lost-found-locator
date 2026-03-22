import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../App.css";
import { getAllLostItems, getLostItemsByUsername } from "../../Services/LostItemService";
import { getRole } from "../../Services/LoginService";

const LostItemReport = () => {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState([]);
    const [role, setRole] = useState("");
 
const showLostItems = () => {
      getRole().then((response)=>{
          setRole(response.data);
          if(response.data==='Admin'){
            getAllLostItems().then((res1)=>{
              setItemList(res1.data);
           });
          }
          else if (response.data==='Student'){
            getLostItemsByUsername().then((res2)=>{
              setItemList(res2.data);
           });
          }
        });
    }
    useEffect(() => {
       showLostItems();
    }, []);
 
    const returnBack=()=>{
        if(role==='Admin')
           navigate('/admin-menu');
        else if(role==='Student')
          navigate('/student-menu');
    }
    return (
        <div className="report-page">
          <div className="report-card">
            <h2 className="report-title">
              {role === "Admin" ? "Admin Lost Item List" : "Student Lost Item List"}
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
                  <th>Lost Date</th>
                  <th>User Id</th>
                  <th>Status</th>
                  {role === "Student" && <th>Search</th>}
                </tr>
              </thead>
              <tbody>
                {itemList.map((item) => (
                  <tr key={item.lostItemId}>
                    <td>{item.lostItemId}</td>
                    <td>{item.lostItemName}</td>
                    <td>{item.category}</td>
                    <td>{item.color}</td>
                    <td>{item.brand}</td>
                    <td>{item.location}</td>
                    <td>{item.lostDate}</td>
                    <td>{item.username}</td>
                    <td className={item.status ? "status-found" : "status-not-found"}>
                      {item.status ? "Found" : "Not Found"}
                    </td>
                    {role === "Student" && (
                      <td>
                        <Link to={`/search/${item.lostItemId}`}>
                          <button className="btn-warning">Search Find Item</button>
                        </Link>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="report-actions">
              <button onClick={returnBack} className="btn-success">Return</button>
            </div>
          </div>
        </div>
      );
}
export default LostItemReport;