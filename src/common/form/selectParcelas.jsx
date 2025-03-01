import React from "react";

export default (props) => (
  <select
    {...props.input}
    className="form-control"
    placeholder={props.placeholder}
    readOnly={props.readOnly}
  >
    <option value={props.value}>1</option>
    <option value={props.value}>2</option>
    <option value={props.value}>3</option>
    <option value={props.value}>4</option>
    <option value={props.value}>5</option>
    <option value={props.value}>6</option>
    <option value={props.value}>7</option>
    <option value={props.value}>8</option>
    <option value={props.value}>9</option>
    <option value={props.value}>10</option>
    <option value={props.value}>11</option>
    <option value={props.value}>12</option>

  </select>
);