import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { getUserId } from "../../Services/LoginService";
import { generateId, saveLostItem } from "../../Services/LostItemService";

const LostItemRegistration = () => {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  let [newId, setNewId] = useState("");
  let[ldate, setLdate] = useState(() => new Date().toISOString().split("T")[0]);
  const [userId, setUserId] = useState("");
  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: new Date(),
    status: false,
  });

  const setLostItemId = () => {
    generateId()
      .then((response) => setNewId(response.data))
      .catch(() => setSubmitError("Could not load item ID. Ensure you are logged in and the backend is running on port 9595."));
  };

  const setUsername = () => {
    getUserId()
      .then((response) => setUserId(response.data))
      .catch(() => setSubmitError("Could not load username. Please log in and ensure the backend is running on port 9595."));
  };

  useEffect(() => {
    setLostItemId();
    setUsername();
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setLostItem((values) => ({ ...values, [name]: value }));
  };

  const lostItemSubmit = (event) => {
    event.preventDefault();
    setSubmitError("");
    const payload = {
      ...lostItem,
      lostItemId: newId,
      username: userId,
      lostDate: ldate,
      status: false,
    };
    saveLostItem(payload)
      .then(() => {
        setFlag(true);
      })
      .catch((err) => {
        setSubmitError(
          err.response?.data?.message || err.message || "Failed to submit. Check that the backend is running on port 9595."
        );
      });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    setSubmitError("");
    let tempErrors = {};
    let isValid = true;

    if (!newId) {
      tempErrors.general = "Item ID not loaded yet. Please wait or refresh the page.";
      isValid = false;
    }
    if (!userId) {
      tempErrors.general = "Username not loaded. Please log in first.";
      isValid = false;
    }
    if (!lostItem.lostItemName.trim()) {
      tempErrors.lostItemName = "Item Name is required";
      isValid = false;
    }

    if (!lostItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }
    if (!lostItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }
    if (!lostItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }

    if (!lostItem.location.trim()) {
      tempErrors.location = "Lost Location is required";
      isValid = false;
    }
    setErrors(tempErrors);
    if (tempErrors.general) setSubmitError(tempErrors.general);
    if (isValid) {
      lostItemSubmit(event);
    }
  };

  const returnBack = () => {
    navigate("/student-menu");
  };
  let clearAll = () => {
    newId = "";
    lostItem.lostItemId = "";
    lostItem.lostItemName = "";
    lostItem.color = "";
    lostItem.brand = "";
    lostItem.category = "";
    lostItem.location = "";
    lostItem.lostDate = new Date();
    ldate = new Date();
  };

  const nextItem = () => {
    newId = "";
    lostItem.lostItemId = "";
    lostItem.lostItemName = "";
    lostItem.color = "";
    lostItem.brand = "";
    lostItem.category = "";
    lostItem.location = "";
    lostItem.lostDate = new Date();
    ldate = new Date();
    navigate("/lost-entry");
  };
  return (
    <div className="content-page">
      <div className="content-card">
        <h2 className="page-title">Lost Item Form Submission</h2>
        <form onSubmit={handleValidation}>
          <div className="form-group">
            <label className="form-label">Item Id</label>
            <input
              name="itemId"
              className="form-control"
              value={newId}
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Lost Item Name</label>
            <input
              name="lostItemName"
              className="form-control"
              value={lostItem.lostItemName}
              onChange={(event) => onChangeHandler(event)}
            />
            {errors.lostItemName && (
              <div className="text-danger">{errors.lostItemName}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Item Category</label>
            <input
              name="category"
              className="form-control"
              value={lostItem.category}
              onChange={(event) => onChangeHandler(event)}
            />
            {errors.category && (
              <div className="text-danger">{errors.category}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Item Color</label>
            <input
              name="color"
              className="form-control"
              value={lostItem.color}
              onChange={(event) => onChangeHandler(event)}
            />
            {errors.color && (
              <div className="text-danger">{errors.color}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Item Brand Name</label>
            <input
              name="brand"
              className="form-control"
              value={lostItem.brand}
              onChange={(event) => onChangeHandler(event)}
            />
            {errors.brand && (
              <div className="text-danger">{errors.brand}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Location of Lost Item</label>
            <input
              name="location"
              className="form-control"
              value={lostItem.location}
              onChange={(event) => onChangeHandler(event)}
            />
            {errors.location && (
              <div className="text-danger">{errors.location}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Select Lost Date</label>
            <input
              type="date"
              placeholder="yyyy-mm-dd"
              className="form-control"
              value={ldate}
              onChange={(event) => setLdate(event.target.value)}
            />
          </div>
          <div className="form-group btn-actions">
            <button type="submit" className="btn-primary">
              Submit
            </button>
            <button type="button" className="btn-warning" onClick={clearAll}>
              Clear
            </button>
            <button type="button" className="btn-success" onClick={returnBack}>
              Return
            </button>
          </div>
        </form>
        {submitError && (
          <div className="text-danger" style={{ marginTop: 8 }}>{submitError}</div>
        )}
        {flag && (
          <div className="text-success" style={{ marginTop: 12 }}>
            Lost Item form submitted.
            <button className="btn-warning" onClick={nextItem} style={{ marginLeft: 10 }}>
              New Form Submission
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default LostItemRegistration;