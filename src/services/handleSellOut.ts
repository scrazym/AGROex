import api from './api';

export const handleSellOutLot = async (id: string) => {
  const res = await api.post(`/purchase/lots/${id}/latest-bet`);
};
