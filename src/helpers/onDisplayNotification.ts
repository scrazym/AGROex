import notifee from '@notifee/react-native';

export const onDisplayNotification = async (
  text: string,
  latestBet: number,
) => {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: 'Betting',
    body: `Your bet for lot ${text} was outbided by other users with ${Math.floor(Number(latestBet))}`,

    android: {
      channelId,
      smallIcon: 'name-of-a-small-icon',
      pressAction: {
        id: 'default',
      },
    },
  });
};
