import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const SignalRService = {
  connection: null,
  onReceiveNotification: null,

  async start() {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://condsecuritysignalr.service.signalr.net/signalr/notificationHub')
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.on('ReceiveNotification', (notificationDetails) => {
      if (this.onReceiveNotification) {
        this.onReceiveNotification(notificationDetails);
      }
    });

    try {
      await this.connection.start();
      console.log('SignalR Connected');
    } catch (err) {
      console.error('Error while establishing connection', err);
    }
  },

  async stop() {
    if (this.connection) {
      try {
        await this.connection.stop();
        console.log('SignalR Disconnected');
      } catch (err) {
        console.error('Error while stopping connection', err);
      }
    }
  }
};

export default SignalRService;
