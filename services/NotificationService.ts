import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {Notification} from 'types';

class NotificationController {
  private _intervalId: NodeJS.Timeout | undefined;

  public init(): void {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);

        const id = NotificationService.getIntervalId();
        if (notification.userInteraction && id) clearInterval(id);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }

  private getIntervalId(): NodeJS.Timeout | undefined {
    return this._intervalId;
  }

  public saveIntervalId(id: NodeJS.Timeout): void {
    this._intervalId = id;
  }

  public sendNotification({title, message}: Notification): void {
    PushNotification.localNotification({
      channelId: 'channel-id',
      title,
      message,
    });
  }

  public createChannel(): void {
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
      },
      () => {
        PushNotification.channelExists('channel-id', function (exists) {
          console.log('channel is created', exists);
        });
      },
    );
  }

  public checkPermissions(): void {
    PushNotification.checkPermissions(permissions => {
      console.log('permission', permissions);
    });
  }
}

export const NotificationService = new NotificationController();
