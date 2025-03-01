import React, { Component } from "react";

import Grid from "../dashboard/layout/grid";
import Row from "../dashboard/layout/row";
import ValueBox from "../dashboard/widget/valueBox";

export default ({ credit, debt }) => (
  <Grid cols="12">
    <fieldset>
      <legend>Resumo</legend>
      <Row>
        <ValueBox
          cols="12 4"
          color="green"
          icon="bank"
          value={`R$ ${credit}`}
          text="Total de Créditos"
        />
        <ValueBox
          cols="12 4"
          color="red"
          icon="credit-card"
          value={`R$ ${(debt).toFixed(2)}`}
          text="Total de Débitos"
        />
        <ValueBox
          cols="12 4"
          color="blue"
          icon="money"
          value={`R$ ${credit - debt}`}
          text="Valor Consolidado"
        />
      </Row>
    </fieldset>
  </Grid>
);
