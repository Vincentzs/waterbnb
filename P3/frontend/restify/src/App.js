import logo from './logo.svg';
import './App.css';
// import MessageList from './components/MessageList';
// import { NotificationContext, useNotificationContext } from './contexts/NotificationContext';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Notification from './pages/notification';

function App() {
  // return (
  //   <main>
  //     <NotificationContext.Provider value={useNotificationContext()}>
  //       <MessageList />
  //     </NotificationContext.Provider>
  //   </main>
  // );
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route path="notification" element={<Notification />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
