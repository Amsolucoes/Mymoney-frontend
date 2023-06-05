import axios from 'axios'

const BASE_URL = 'http://localhost:3010/api'

export function getSummary() {
    const request = axios.get(`${BASE_URL}/BillingCycles/summary`)
    return {
        type: 'BILLING_SUMMARY_FETCHED',
        payload: request
    }
}