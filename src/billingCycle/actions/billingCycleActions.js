import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset as resetForm, initialize } from "redux-form";
import { showTabs, selectTab } from "../../common/tab/actions/tabActions";
import { API_URL } from "../../consts"; // Ajuste o caminho conforme necessário

const BASE_URL = API_URL;
const INITIAL_VALUES = {credits: [{}], debts: [{}]};

export function getList() {
  const userId = localStorage.getItem("userId"); // Pegando o ID do usuário
  console.log("Buscando ciclos com userId:", userId); // 🔹 Adicione este log


  if (!userId) {
    toastr.error("Erro", "Usuário não autenticado!");
    return { type: "BILLING_CYCLES_FETCHED", payload: [] };
  }

  const request = axios.get(`${BASE_URL}/billingCycles`, { params: { userId } });
  return {
    type: "BILLING_CYCLES_FETCHED",
    payload: request,
  };
}

export function create(values) {
  return submit(values, "post");
}

export function update(values) {
  return submit(values, "put");
}

export function remove(values) {
  return submit(values, "delete");
}

function submit(values, method) {
  return (dispatch) => {
    const id = values._id ? values._id : ''
    const userId = localStorage.getItem("userId"); // Obtendo o ID do usuário

    if (!userId) {
      toastr.error("Erro", "Usuário não autenticado!");
      return;
    }

    const data = { ...values, userId }; // Incluindo o userId na requisição

    axios[method](`${BASE_URL}/billingCycles/${id}`, data)
      .then((resp) => {
        toastr.success("Sucesso", "Operação realizada com sucesso!");
        dispatch(init());
      })
      .catch((e) => {
        console.log(e);
       toastr.error(e.response.data.reason.message);
      });
    return {
      type: "TEMP",
    };
  };
}

export function showUpdate(billingCycle) {
  return [
    showTabs("tabUpdate"),
    selectTab("tabUpdate"),
    initialize("billingCycleForm", billingCycle),
  ];
}

export function showDelete(billingCycle) {
  return [
    showTabs("tabDelete"),
    selectTab("tabDelete"),
    initialize("billingCycleForm", billingCycle),
  ];
}

export function init() {
  return [
    showTabs("tabList", "tabCreate"),
    selectTab("tabList"),
    getList(),
    initialize("billingCycleForm", INITIAL_VALUES),
  ];
}
