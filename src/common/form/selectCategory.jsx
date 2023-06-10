import React from "react";

export default (props) => (
  <select
    {...props.input}
    className="form-control"
    placeholder={props.placeholder}
    readOnly={props.readOnly}
  >
    <option value={props.value}>Contas Fixas</option>
    <option value={props.value}>Alimentacao</option>
    <option value={props.value}>Casa</option>
    <option value={props.value}>Banco</option>
  </select>
);