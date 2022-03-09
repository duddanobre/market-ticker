import {api, apiPapperstone} from './api'

const service = () => {
  const resource = '/last';
  const resource2 = '/quotes';

  async function getInstruments() {
    try {
      const response = await api.get(`${resource}/USD-BRL,EUR-BRL,BTC-USD,BTC,USD-EUR,DKK-EUR,BOB,BOB-USD,UYU,GBP-EUR,JPY-USD,ETH-USD`);
      
      return response.data;
    } catch(err) {
      return Promise.reject(err);
    }
  }

  async function getCfds() {
    try {
      const response = await apiPapperstone.get(`${resource2}?symbols=Tesla_Inc_(TSLA.O),Alibaba_Group_(BABA.N),Commonwealth_Bank_(CBA.AX),Apple_Inc_(AAPL.O),Facebook_Inc_(FB.O)`);
      
      return response.data;
    } catch(err) {
      return Promise.reject(err);
    }
  }

  return {
    getInstruments,
    getCfds
  }
}

export const instrumentsService = service();
