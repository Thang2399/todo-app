import React, { useEffect, useState } from "react";
import Alert from "./alert";
import Items from "./items";
import "./App.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else return [];
};

function App() {
  const [value, setValue] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  // const [list, setIList] = useState([]);
  const [list, setIList] = useState(getLocalStorage);

  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const showAlert = (show: false, type: "", message: "") => {
    setAlert({ show, type, message });
  };

  const deleteItem = (id) => {
    setIList(list.filter((item) => item.id !== id));
    showAlert(true, "success", "Finished!");
  };

  const editItem = (id) => {
    console.log("editing");
    let specificItem = list.find((item) => item.id === id);
    setValue(specificItem.title);
    setIsEditing(true);
    setEditID(id);
  };
  const handleSubmit = (e) => {
    e.preventDefault();


    // empty list
    if (!value) {
      showAlert(true, "danger", "Empty list");
    }
    // editing value
    else if (value && isEditing) {
      setIList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: value };
          }
          return item;
        })
      );
      setValue("");
      setIsEditing(false);
      setEditID(null);
      showAlert(true, "success", "Value changed!");
    }
    //enter a new value
    else {
      const newItem = { id: new Date().getTime().toString(), title: value };
      setIList([...list, newItem]);
      setValue("");
      showAlert(true, "success", "value added!");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      <h1>Todo app</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="value"
          name="value"
          placeholder="What are you doing today?"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">{isEditing ? "Edit" : "Add"}</button>
      </form>
      {list.length > 0 && (
        <div className="items-container">
          <Items items={list} deleteItem={deleteItem} editItem={editItem} />
          <button
            type="button"
            onClick={() => {
              setIList([]);
              showAlert(true, "success", "Finished all!");
            }}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
