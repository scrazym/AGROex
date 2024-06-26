export const onBoardingData: DataBoardProps[] = [
  {
    id: 'firstScreen',
    uri: 'https://tenor.com/ru/view/tkthao219-bubududu-panda-gif-21986741.gif',
    title: 'Welcome!',
    decr: 'Agroex - agricultural trade market in Belarus',
    btnText: 'Skip all',
  },

  {
    id: 'secondScreen',
    uri: 'https://tenor.com/ru/view/tkthao219-bubududu-panda-gif-21659299.gif',
    title: '4 product categories',
    decr: 'A wide range of products from cucumbers to almonds',
    btnText: 'Skip all',
  },
  {
    id: 'thirdScreen',
    uri: 'https://tenor.com/ru/view/tkthao219-bubududu-panda-gif-24571367.gif',
    title: 'Catalog ads',
    decr: 'Buy and sell your products through the catalog',
    btnText: 'Skip all',
  },
  {
    id: 'fourthScreen',
    uri: 'https://tenor.com/ru/view/love-bear-panda-gif-18519831.gif',
    title: 'Convenient search',
    decr: 'Flexible setting of filters to find the necessary products',
    btnText: 'Skip all',
  },
  {
    id: 'fifthScreen',
    uri: 'https://tenor.com/ru/view/tkthao219-bubududu-panda-gif-21587369.gif',
    title: 'Payment and shipment',
    decr: 'Support and consult at the final stages of the transaction',
    btnText: 'Go to Homepage →',
  },
];

export type DataBoardProps = {
  id: string;
  uri: string;
  title: string;
  decr: string;
  btnText: string;
};
