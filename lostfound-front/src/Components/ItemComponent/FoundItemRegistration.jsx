import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { getUserId } from "../../Services/LoginService";
import { generateId, saveFoundItem } from "../../Services/FoundItemService";

const FoundItemRegistration = () => {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [newId, setNewId] = useState("");
  const [fdate, setFdate] = useState(() => new Date().toISOString().split("T")[0]);
  const [userId, setUserId] = useState("");
  const [foundItem, setFoundItem] = useState({
    foundItemId: "",
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    foundDate: new Date(),
    status: false,
  });

  const setFoundItemId = () => {
    generateId()
      .then((response) => setNewId(response.data))
      .catch(() =>
        setSubmitError(
          "Could not load item ID. Ensure you are logged in and the backend is running on port 9595."
        )
      );
  };

  const setUsername = () => {
    getUserId()
      .then((response) => setUserId(response.data))
      .catch(() =>
        setSubmitError(
          "Could not load username. Please log in and ensure the backend is running on port 9595."
        )
      );
  };

  useEffect(() => {
    setFoundItemId();
    setUsername();
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const name = event.target.name;
    const value = event.target.value;
    setFoundItem((values) => ({ ...values, [name]: value }));
  };

  const foundItemSubmit = (event) => {
    event.preventDefault();
    setSubmitError("");
    const payload = {
      ...foundItem,
      foundItemId: newId,
      username: userId,
      foundDate: fdate,
      status: false,
    };
    saveFoundItem(payload)
      .then(() => {
        setFlag(true);
      })
      .catch((err) => {
        setSubmitError(
          err.response?.data?.message ||
            err.message ||
            "Failed to submit. Check that the backend is running on port 9595."
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
    if (!foundItem.foundItemName.trim()) {
      tempErrors.foundItemName = "Item Name is required";
      isValid = false;
    }

    if (!foundItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }
    if (!foundItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }
    if (!foundItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }

    if (!foundItem.location.trim()) {
      tempErrors.location = "Found Location is required";
      isValid = false;
    }
    setErrors(tempErrors);
    if (tempErrors.general) setSubmitError(tempErrors.general);
    if (isValid) {
      foundItemSubmit(event);
    }
  };

  const returnBack = () => {
    navigate("/student-menu");
  };

  const nextItem = () => {
    navigate("/dummy/2");
  };

  return (
    <div className="content-page">
      <div className="content-card">
        <h2 className="page-title">Found Item Form Submission</h2>
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
            <label className="form-label">Found Item Name</label>
            <input
              name="foundItemName"
              className="form-control"
              value={foundItem.foundItemName}
              onChange={onChangeHandler}
            />
            {errors.foundItemName && (
              <div className="text-danger">{errors.foundItemName}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Item Category</label>
            <input
              name="category"
              className="form-control"
              value={foundItem.category}
              onChange={onChangeHandler}
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
              value={foundItem.color}
              onChange={onChangeHandler}
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
              value={foundItem.brand}
              onChange={onChangeHandler}
            />
            {errors.brand && (
              <div className="text-danger">{errors.brand}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Location of Found Item</label>
            <input
              name="location"
              className="form-control"
              value={foundItem.location}
              onChange={onChangeHandler}
            />
            {errors.location && (
              <div className="text-danger">{errors.location}</div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Select Found Date</label>
            <input
              type="date"
              placeholder="yyyy-mm-dd"
              className="form-control"
              value={fdate}
              onChange={(event) => setFdate(event.target.value)}
            />
          </div>
          <div className="form-group btn-actions">
            <button type="submit" className="btn-primary">
              Submit
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
            Found Item form submitted.
            <button className="btn-warning" onClick={nextItem} style={{ marginLeft: 10 }}>
              New Form Submission
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoundItemRegistration;

