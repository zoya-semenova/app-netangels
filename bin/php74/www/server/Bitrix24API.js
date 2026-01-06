'use strict';

import axios from 'axios'

class Bitrix24API {
    constructor() {
        this.domain = 'localhost';
        this.accessToken = '4823e668007c8902007c1b3a00000001504607abbd091ee0f10983a108969389249e51';
        this.baseURL = `https://${this.domain}/rest/`;
    }
    async makeRequest(method, data = {}) {
        try {
            const url = `${this.baseURL}${method}`;
            const response = await axios.post(url, {
                ...data,
                auth: this.accessToken
            });
            return response.data;
        } catch (error) {
            console.error('API Error:', error.response?.data || error.message);
            throw error;
        }
    }
// Получение списка сделок
    async getDeals(params = {}) {
        return await this.makeRequest('crm.deal.list', params);
    }
// Создание новой сделки
    async createDeal(dealData) {
        return await this.makeRequest('crm.deal.add', { fields: dealData });
    }
// Обновление сделки
    async updateDeal(dealId, dealData) {
        return await this.makeRequest('crm.deal.update', {
            id: dealId,
            fields: dealData
        });
    }
// Получение контактов
    async getContacts(params = {}) {
        return await this.makeRequest('crm.contact.list', params);
    }
// Создание контакта
    async createContact(contactData) {
        return await this.makeRequest('crm.contact.add', { fields: contactData });
    }
}
export default Bitrix24API;