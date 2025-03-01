import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getList, showUpdate, showDelete } from "./actions/BillingCycleActions";

class BillingCycleList extends Component {
  componentWillMount() {
    this.props.getList();
  }

  renderRows() {
    const list = this.props.list || [];
  
    return list.map((bc) => {
      // Evita erro se bc.credits ou bc.debts estiverem undefined
      const totalCredits = (bc.credits || []).reduce((sum, credit) => sum + (Number(credit.value) || 0), 0);
      const totalDebts = (bc.debts || []).reduce((sum, debt) => sum + (Number(debt.value) || 0), 0);
      const saldo = totalCredits - totalDebts;

      // Define a classe CSS com base no saldo
      const saldoClass = saldo >= 0 ? "text-primary" : "text-danger";
  
      return (
        <tr key={bc._id}>
          <td>{bc.name}</td>
          <td>R$ {totalCredits.toFixed(2)}</td>
          <td>R$ {totalDebts.toFixed(2)}</td>
          <td className={saldoClass}>R$ {(saldo).toFixed(2)}</td>
          <td>{bc.month}</td>
          <td>{bc.year}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.props.showUpdate(bc)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger" onClick={() => this.props.showDelete(bc)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }  

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Total Crédito</th>
              <th>Total Débito</th>
              <th>Saldo</th>
              <th>Mês</th>
              <th>Ano</th>
              <th className="table-actions">Ações</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ list: state.billingCycle.list });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getList, showUpdate, showDelete }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList);
