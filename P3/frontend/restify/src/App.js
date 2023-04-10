import logo from './logo.svg';
import './App.css';
// import MessageList from './components/MessageList';
// import { NotificationContext, useNotificationContext } from './contexts/NotificationContext';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Notification from './pages/notification';
import PropertySearch from './pages/property/PropertySearch';
import PropertyDetail from './pages/property/PropertyDetail';
import PropertyCreate from './pages/property/PropertyCreate';
import ImageUploader from './pages/property/ImageUploader';
import PropertyUpdate from './pages/property/PropertyUpdate';

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
        <Route path="property-search" element={<PropertySearch />} />
        <Route path="property-detail/:propertyId" element={<PropertyDetail />} />
        <Route path="property-create" element={<PropertyCreate />} />
        <Route path="image-uploader" element={<ImageUploader />} />
        <Route path="property-update/:propertyId" element={<PropertyUpdate />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
