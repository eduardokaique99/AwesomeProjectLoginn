import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const SignalRService = {
  connection: null,
  onReceiveNotification: null,

  async start() {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://apicondsecurity.azurewebsites.net-signalr')
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
      console.log('Error while establishing connection', err);
    }
  },

  async stop() {
    if (this.connection) {
      await this.connection.stop();
      console.log('SignalR Disconnected');
    }
  }
};

export default SignalRService;
