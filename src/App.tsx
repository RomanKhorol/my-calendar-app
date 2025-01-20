import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home-page/Home";
import ChatRoom from "./components/chat-room/ChatRoom";
import Customers from "./components/customers/Customers";
import DashBoard from "./components/dash-board/DashBoard";
import Inbox from "./components/inbox/Inbox";
import Invoices from "./components/invoices/Invoices";
import Products from "./components/products/Products";
import HelpCenter from "./components/help-center/HelpCenter";
import Settings from "./components/setting-page/Settings";
import CalendarTable from "./components/calendar/Calendar";
import Layout from "./components/layout/Layout";
// import "../firebase/firebase"

function App() {
    
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route index path="/calendar" element={<CalendarTable />} />
          <Route index path="/chatRoom" element={<ChatRoom />} />
          <Route index path="/products" element={<Products />} />
          <Route index path="/help-center" element={<HelpCenter />} />
          <Route index path="/customers" element={<Customers />} />
          <Route index path="/invoices" element={<Invoices />} />
          <Route index path="/dash-board" element={<DashBoard />} />
          <Route index path="/inbox" element={<Inbox />} />
          <Route index path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
