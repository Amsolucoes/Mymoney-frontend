import { toastr } from "react-redux-toastr";
import axios from "axios";
import consts from "../consts";

export function login(values) {
  return submit(values, `${consts.OAPI_URL}/login`);
}

export function signup(values) {
  return submit(values, `${consts.OAPI_URL}/signup`);
}

function submit(values, url) {
  console.log("URL da requisição:", url);
  console.log("Valores enviados:", values);

  return (dispatch) => {
    axios
      .post(url, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: values.token ? `Bearer ${values.token}` : "",
        }
      })
      .then((resp) => {
        console.log('resposta: ',resp);
        // 🔹 Salva apenas UM token no localStorage
        const { token } = resp.data;
        if (token) {
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        localStorage.setItem("userId", resp.data.userId);

        dispatch([{ type: "USER_FETCHED", payload: resp.data }]);
      })
      .catch((e) => {
        console.log("Erro ao logar:", e);
        e.response.data.errors.forEach((error) =>
          toastr.error("Erro", error)
        );
      });
  };
}

export function logout() {
  return { type: "TOKEN_VALIDATED", payload: false };
}

export function validateToken(token) {
  console.log('token:', token);
  return (dispatch) => {
    if (token) {
      axios
        .post(`${consts.API_URL}/validateToken`, { token })
        .then((resp) => {
          dispatch({ type: "TOKEN_VALIDATED", payload: resp.data.valid });
        })
        .catch((e) => dispatch({ type: "TOKEN_VALIDATED", payload: false }));
    } else {
      dispatch({ type: "TOKEN_VALIDATED", payload: false });
    }
  };
}
