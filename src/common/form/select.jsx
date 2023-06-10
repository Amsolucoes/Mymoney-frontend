import React from "react";

export default (props) => (
  <select
    {...props.input}
    className="form-control"
    placeholder={props.placeholder}
    readOnly={props.readOnly}
  >
    <option value={props.value}>PAGO</option>
    <option value={props.value}>AGENDADO</option>
    <option value={props.value}>PENDENTE</option>
  </select>
);
