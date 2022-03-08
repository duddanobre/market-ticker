import {api} from './api'

const service = () => {
  const resource = '/last';

  async function getInstruments() {
    try {
      const response = await api.get(`${resource}/USD-BRL,EUR-BRL,BTC-USD,BTC,USD-EUR,DKK,DKK-EUR,BOB,BOB-USD,UYU`);
      
      return response.data;
    } catch(err) {
      return Promise.reject(err);
    }
  }

  return {
    getInstruments,
  }
}

export const instrumentsService = service();
