import { useParams } from "react-router-dom"
import { NotificationContext, useNotificationContext } from "../../contexts/NotificationContext";
import MessageList from "../../components/MessageList";

const Notification = () => {
   return (
        <main>
          <NotificationContext.Provider value={useNotificationContext()}>
            <MessageList />
          </NotificationContext.Provider>
        </main>
    );
}

export default Notification;