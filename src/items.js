import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const items = ({ items, deleteItem, editItem }) => {
  return (
    <>
      {items.map((item) => {
        const { id, title } = item;
        // console.log(item.id);
        return (
          <article key={id} className="single-item">
            <p className="item-name">{title}</p>
            <div className="btn-container">
              <button onClick={() => editItem(id)} >
                <FaEdit className="icon fa-edit" />
              </button>
              <button onClick={() => deleteItem(id)}>
                <FaTrash className="icon fa-trash" />
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default items;
