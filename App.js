import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigation from "./src/navigation/AppNavigation";
import SignalRService from "./src/service/signalrService";
import NotificationModal from "./src/component/notificationModal";

export default function App() {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleReceiveNotification = (notificationDetails) => {
      setNotification(notificationDetails);
      setVisible(true);
    };

    SignalRService.start();
    SignalRService.onReceiveNotification = handleReceiveNotification;

    return () => {
      SignalRService.stop();
    };
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigation />
        <NotificationModal
          visible={visible}
          notificationDetails={notification}
          onClose={() => setVisible(false)}
        />
      </NavigationContainer>
    </PaperProvider>
  );
}
