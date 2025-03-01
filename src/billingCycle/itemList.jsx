import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "../dashboard/layout/grid";
import { Field, arrayInsert, arrayRemove } from "redux-form";
import Input from "../common/form/input";
import Select from "../common/form/select";
import SelectCategory from "../common/form/selectCategory";
import Selectparcelas from '../common/form/selectParcelas';
import If from "../common/operador/if";
import moment from "moment";
import { formatDate, formatDateForDisplay } from '../helpers/date';

class itemList extends Component {
  add(index, item = {}) {
    if (!this.props.readOnly) {
      this.props.arrayInsert("billingCycleForm", this.props.field, index, item);
    }
  }

  remove(index) {
    if (!this.props.readOnly && this.props.list.length > 1) {
      this.props.arrayRemove("billingCycleForm", this.props.field, index);
    }
  }

  renderRows() {
    const list = this.props.list || [];
    console.log(list);
    return list.map((item, index) => (
      <tr key={index}>
        <td>
          <Field
            name={`${this.props.field}[${index}].name`}
            component={Input}
            placeholder="Informe o nome"
            readOnly={this.props.readOnly}
          />
        </td>
        <td>
          <Field
            name={`${this.props.field}[${index}].value`}
            component={Input}
            placeholder="Informe o valor"
            readOnly={this.props.readOnly}
            format={(value) => {
              if (value === undefined || value === "") return ""; // Permite campo vazio
              return `R$ ${value}`; // Apenas adiciona "R$ " sem alterar o número
            }}
            parse={(value) => {
              if (!value) return ""; // Permite apagar tudo
        
              // Remove "R$" e espaços extras, substitui vírgula por ponto
              const numericValue = value.replace(/R\$\s?/g, "").replace(",", ".");
        
              return numericValue; // Mantém o valor como string para não formatar instantaneamente
            }}
            onBlur={(event) => {
              let { value } = event.target;
        
              if (value) {
                // Converte para float e mantém 2 casas decimais
                const numericValue = parseFloat(value.replace(",", "."));
                this.props.input.onChange(isNaN(numericValue) ? "" : numericValue.toFixed(2));
              }
            }}
          />
        </td>
        <If test={this.props.showStatus}>
          <td>
            <Field
              name={`${this.props.field}[${index}].parcela`}
              component={Selectparcelas}
              placeholder="Informe a parcela"
              readOnly={this.props.readOnly}
            />
          </td>
        </If>
        <If test={this.props.showStatus}>
          <td>
            <Field
              name={`${this.props.field}[${index}].totalParcelas`}
              component={Selectparcelas}
              placeholder="Informe o total de parcelas"
              readOnly={this.props.readOnly}
            />
          </td>
        </If>
        <If test={this.props.showStatus}>
          <td>
            <Field
              name={`${this.props.field}[${index}].status`}
              component={({ input }) => (
                <select
                  {...input}
                  className="form-control"
                  style={{
                    backgroundColor:
                      input.value === "PENDENTE"
                        ? "yellow"
                        : input.value === "AGENDADO"
                        ? "lightblue"
                        : input.value === "PAGO"
                        ? "lightgreen"
                        : "transparent",
                  }}
                >
                  <option value="">Selecione...</option>
                  <option value="PENDENTE">Pendente</option>
                  <option value="AGENDADO">Agendado</option>
                  <option value="PAGO">Pago</option>
                </select>
              )}
            />
          </td>
        </If>
        <If test={this.props.showStatus}>
          <td>
            <Field
              name={`${this.props.field}[${index}].vencimento`}
              component={Input}
              placeholder="Informe o vencimento"
              readOnly={false}
              format={formatDateForDisplay}
              parse={formatDate}
              value={item.vencimento}
            />
          </td>
        </If>
        <If test={this.props.showStatus}>
          <td>
            <Field
              name={`${this.props.field}[${index}].category`}
              component={SelectCategory}
              placeholder="Informe a categoria"
              readOnly={this.props.readOnly}
            />
          </td>
        </If>
        <td>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.add(index + 1)}
          >
            <i className="fa fa-plus"></i>
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => this.add(index + 1, item)}
          >
            <i className="fa fa-clone"></i>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.remove(index)}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <Grid cols="12">
        <fieldset>
          <legend>{this.props.legend}</legend>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
                <If test={this.props.showStatus}>
                  <th>Parcela</th>
                </If>
                <If test={this.props.showStatus}>
                  <th>Total Parcelas</th>
                </If>
                <If test={this.props.showStatus}>
                  <th>Status</th>
                </If>
                <If test={this.props.showStatus}>
                  <th>Vencimento</th>
                </If>
                <If test={this.props.showStatus}>
                  <th>Categoria</th>
                </If>
                <th className="table-actions">Ações</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </fieldset>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ arrayInsert, arrayRemove }, dispatch);
export default connect(null, mapDispatchToProps)(itemList);
