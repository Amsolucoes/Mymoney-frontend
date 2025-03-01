import React, { Component } from "react";
import { connect } from "react-redux";

import ContentHeader from "../common/template/contentHeader";
import Content from "../common/template/content";
import ValueBox from "./widget/valueBox";
import Row from "./layout/row";
import { bindActionCreators } from "redux";
import { getSummary } from "./actions/dashboardActions";

class Dashboard extends Component {
  componentWillMount() {
    this.props.getSummary();
  }

  render() {
    const { totalCredit, totalDebt } = this.props.summary;

    console.log(this.props.summary);

    return (
      <div>
        <ContentHeader title="Dashboard" subtitle="Versão 1.0" />
        <Content>
          <Row>
            <ValueBox
              cols="12 4"
              color="green"
              icon="bank"
              value={`R$ ${totalCredit}`}
              text="Total de Crédidos"
            />
            <ValueBox
              cols="12 4"
              color="red"
              icon="credit-card"
              value={`R$ ${totalDebt}`}
              text="Total de Débitos"
            />
            <ValueBox
              cols="12 4"
              color="blue"
              icon="money"
              value={`R$ ${(totalCredit - totalDebt).toFixed(2)}`}
              text="Valor Consolidado"
            />
          </Row>
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ summary: state.dashboard.summary });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getSummary }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
