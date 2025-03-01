import axios from 'axios'

const BASE_URL = 'http://localhost:3010/api'

export function getSummary() {
    const userId = localStorage.getItem("userId"); // Pegando o ID do usuário

    if (!userId) {
        console.error("Usuário não autenticado!");
        return { type: 'BILLING_SUMMARY_FETCHED', payload: { totalCredit: 0, totalDebt: 0 } };
    }

    const request = axios.get(`${BASE_URL}/BillingCycles/summary?userId=${userId}`);
    
    return {
        type: 'BILLING_SUMMARY_FETCHED',
        payload: request
    }
}