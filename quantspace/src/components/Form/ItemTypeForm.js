import React from "react";

const ItemTypeForm = () => {
  return (
    <div>
      <h1>ItemTypes Form</h1>
      <form>
        <label>
          Item Type Name:
          <input type="text" name="itemTypeName" />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description"></textarea>
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ItemTypeForm;
