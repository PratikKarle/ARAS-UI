import React from "react";

const LifeCycleForm = () => {
  return (
    <div>
      <h1>LifeCycles Form</h1>
      <form>
        <label>
          LifeCycle Name:
          <input type="text" name="lifeCycleName" />
        </label>
        <br />
        <label>
          Stages:
          <textarea name="stages"></textarea>
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default LifeCycleForm;
