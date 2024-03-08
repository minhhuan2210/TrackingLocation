import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import { Notification } from 'types';

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
      requestPermissions: true,
    });
  }

  private getIntervalId(): NodeJS.Timeout | undefined {
    return this._intervalId;
  }

  public saveIntervalId(id: NodeJS.Timeout): void {
    this._intervalId = id;
  }

  public sendNotification({
    title,
    message,
  }: Notification): void {
    PushNotification.localNotification({
      title,
      message,
    });
  }
}

export const NotificationService = new NotificationController();
