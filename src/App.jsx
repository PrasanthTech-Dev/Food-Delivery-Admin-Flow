import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import QuickActionModal from './components/layout/QuickActionModal';

// Modules
import DashboardOverview from './components/modules/Dashboard/DashboardOverview';
import OrdersList from './components/modules/Orders/OrdersList';
import OrderDetailsModal from './components/modules/Orders/OrderDetailsModal';
import RefundRequestModal from './components/modules/Orders/RefundRequestModal';

import RestaurantList from './components/modules/Restaurants/RestaurantList';
import RestaurantDetailModal from './components/modules/Restaurants/RestaurantDetailModal';
import MenuManagerModal from './components/modules/Restaurants/MenuManagerModal';
import AddRestaurantModal from './components/modules/Restaurants/AddRestaurantModal';

import DeliveryPartnerList from './components/modules/Delivery/DeliveryPartnerList';
import DriverDetailModal from './components/modules/Delivery/DriverDetailModal';
import VerificationModal from './components/modules/Delivery/VerificationModal';

import CustomerList from './components/modules/Customers/CustomerList';
import CustomerDetailModal from './components/modules/Customers/CustomerDetailModal';

import FinanceOverview from './components/modules/Finance/FinanceOverview';
import PayoutModal from './components/modules/Finance/PayoutModal';

import PromotionsList from './components/modules/Promotions/PromotionsList';
import CreateCouponModal from './components/modules/Promotions/CreateCouponModal';

import SupportAndSettings from './components/modules/Settings/SupportAndSettings';

// Mock Data
import {
  initialStats,
  initialOrders,
  initialRestaurants,
  initialMenuItems,
  initialDeliveryPartners,
  initialCustomers,
  initialTransactions,
  initialCoupons,
  initialNotifications,
} from './data/mockData';

export default function App() {
  // Navigation & Layout
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Core Data States
  const [stats, setStats] = useState(initialStats);
  const [orders, setOrders] = useState(initialOrders);
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [riders, setRiders] = useState(initialDeliveryPartners);
  const [customers, setCustomers] = useState(initialCustomers);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Modal States
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refundOrder, setRefundOrder] = useState(null);

  const [selectedRestaurantDetail, setSelectedRestaurantDetail] = useState(null);
  const [selectedRestaurantMenu, setSelectedRestaurantMenu] = useState(null);
  const [isAddRestaurantOpen, setIsAddRestaurantOpen] = useState(false);

  const [selectedDriverDetail, setSelectedDriverDetail] = useState(null);
  const [selectedDriverVerification, setSelectedDriverVerification] = useState(null);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [isCreateCouponOpen, setIsCreateCouponOpen] = useState(false);

  // Handlers for Orders
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        // Advance timeline step
        const updatedTimeline = o.timeline.map(t => {
          if (newStatus === 'Confirmed' && t.step === 'Restaurant Accepted') return { ...t, done: true, time: 'Just now' };
          if (newStatus === 'Confirmed' && t.step === 'In Kitchen Prep') return { ...t, done: true, time: 'Just now' };
          if (newStatus === 'Active Delivery' && t.step === 'Rider Picked Up') return { ...t, done: true, time: 'Just now' };
          if (newStatus === 'Active Delivery' && t.step === 'Out for Delivery') return { ...t, done: true, time: 'Just now' };
          if (newStatus === 'Delivered' && t.step === 'Delivered') return { ...t, done: true, time: 'Just now' };
          return t;
        });

        const assignedRider = (!o.rider && newStatus === 'Active Delivery')
          ? { id: 'RID-104', name: 'Marcus Vance', phone: '+1 (555) 891-2301', vehicle: 'E-Bike #42' }
          : o.rider;

        return {
          ...o,
          status: newStatus,
          rider: assignedRider,
          timeline: updatedTimeline,
        };
      }
      return o;
    }));
    showToast(`Order ${orderId} status advanced to "${newStatus}"`);
  };

  const handleCancelOrder = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
    showToast(`Order ${orderId} has been cancelled`);
  };

  const handleApproveRefund = (orderId, amount, method, note) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Delivered',
          paymentStatus: 'Refunded',
          refundReason: `Refund of $${amount.toFixed(2)} issued via ${method}. Note: ${note}`,
        };
      }
      return o;
    }));
    showToast(`Refund of $${amount.toFixed(2)} approved for ${orderId}`);
  };

  const handleRejectRefund = (orderId, note) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Delivered',
          paymentStatus: 'Paid',
          refundReason: `Claim rejected by admin: ${note}`,
        };
      }
      return o;
    }));
    showToast(`Refund claim for ${orderId} rejected`);
  };

  // Handlers for Restaurants
  const handleToggleStoreStatus = (restId) => {
    setRestaurants(prev => prev.map(r => r.id === restId ? { ...r, isOpen: !r.isOpen } : r));
    const target = restaurants.find(r => r.id === restId);
    showToast(`${target?.name} is now ${!target?.isOpen ? 'OPEN' : 'CLOSED'}`);
  };

  const handleApproveRestaurant = (restId) => {
    setRestaurants(prev => prev.map(r => r.id === restId ? { ...r, status: 'Approved' } : r));
    showToast(`Restaurant ${restId} approved and published to customer marketplace`);
  };

  const handleAddRestaurant = (newRest) => {
    setRestaurants(prev => [newRest, ...prev]);
    showToast(`Restaurant "${newRest.name}" registered successfully!`);
  };

  const handleUpdateCommission = (restId, rate) => {
    setRestaurants(prev => prev.map(r => r.id === restId ? { ...r, commissionRate: rate } : r));
    showToast(`Commission updated to ${rate}%`);
  };

  const handleUpdateOperatingHours = (restId, hours) => {
    setRestaurants(prev => prev.map(r => r.id === restId ? { ...r, operatingHours: hours } : r));
  };

  const handleToggleItemAvailability = (itemId) => {
    setMenuItems(prev => prev.map(item => item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item));
    showToast(`Dish availability updated`);
  };

  const handleAddMenuItem = (dish) => {
    const newItem = { ...dish, id: `MENU-${Math.floor(Math.random() * 800) + 200}` };
    setMenuItems(prev => [newItem, ...prev]);
    showToast(`Dish "${dish.name}" added to menu catalog!`);
  };

  // Handlers for Delivery Partners
  const handleToggleRiderStatus = (riderId, newStatus) => {
    setRiders(prev => prev.map(r => r.id === riderId ? { ...r, status: newStatus } : r));
    showToast(`Courier status updated to ${newStatus}`);
  };

  const handleApproveRiderVerification = (riderId, note) => {
    setRiders(prev => prev.map(r => {
      if (r.id === riderId) {
        return {
          ...r,
          status: 'Online',
          documents: { license: 'VERIFIED', insurance: 'VERIFIED', bgCheck: 'PASSED' },
        };
      }
      return r;
    }));
    showToast(`Courier ${riderId} credentials verified and active!`);
  };

  const handleRejectRiderVerification = (riderId, note) => {
    setRiders(prev => prev.map(r => r.id === riderId ? { ...r, status: 'Pending Verification' } : r));
    showToast(`Resubmission request sent to courier ${riderId}`);
  };

  // Handlers for Customers
  const handleToggleCustomerStatus = (custId, nextStatus) => {
    setCustomers(prev => prev.map(c => c.id === custId ? { ...c, status: nextStatus } : c));
    showToast(`Customer account status changed to ${nextStatus}`);
  };

  // Handlers for Promotions
  const handleCreateCoupon = (newCoupon) => {
    setCoupons(prev => [newCoupon, ...prev]);
    showToast(`Coupon "${newCoupon.code}" launched successfully!`);
  };

  const handleToggleCouponStatus = (couponId) => {
    setCoupons(prev => prev.map(c => {
      if (c.id === couponId) {
        const nextStatus = c.status === 'Active' ? 'Expired' : 'Active';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
    showToast(`Coupon status toggled`);
  };

  // Handlers for Finance Payout
  const handleAuthorizePayout = () => {
    showToast(`Weekly batch payout released to 142 restaurants and 310 couriers!`);
  };

  // Refresh Simulation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Live dashboard telemetry refreshed');
    }, 600);
  };

  // Quick Action Dispatcher
  const handleSelectQuickAction = (module, actionId) => {
    setActiveModule(module);
    if (actionId === 'create_coupon') setIsCreateCouponOpen(true);
    if (actionId === 'add_restaurant') setIsAddRestaurantOpen(true);
    if (actionId === 'batch_payout') setIsPayoutModalOpen(true);
  };

  return (
    <div className="h-screen h-dvh w-full bg-slate-950 text-slate-100 flex overflow-hidden font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-blue-600/95 border border-blue-400/50 text-white px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md text-xs sm:text-sm font-bold animate-in slide-in-from-top-4 duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* Main Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        badgeCounts={{
          pendingOrders: orders.filter(o => o.status === 'Pending').length,
          pendingRestaurants: restaurants.filter(r => r.status === 'Pending Verification').length,
          activeRiders: `${riders.filter(r => r.status === 'Online' || r.status === 'On Delivery').length} Live`,
          openDisputes: 2,
        }}
      />

      {/* Main Application Area (fixed viewport, offset by sidebar width) */}
      <div
        className={`flex-1 flex flex-col h-screen h-dvh w-full overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        {/* Top Navbar */}
        <Navbar
          activeModule={activeModule}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          notifications={notifications}
          onOpenQuickAction={() => setIsQuickActionOpen(true)}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Scrollable Slide / Content Section: scrollbar works and appears only inside this container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 w-full">
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Module 1: Dashboard & Analytics */}
          {activeModule === 'dashboard' && (
            <DashboardOverview
              stats={stats}
              orders={orders}
              onViewOrder={(orderId) => {
                const target = orders.find(o => o.id === orderId);
                if (target) setSelectedOrder(target);
              }}
              onNavigateModule={setActiveModule}
            />
          )}

          {/* Module 2: Order Management */}
          {activeModule === 'orders' && (
            <OrdersList
              orders={orders}
              onSelectOrder={setSelectedOrder}
              onUpdateStatus={handleUpdateOrderStatus}
              onOpenRefundModal={setRefundOrder}
              searchQuery={searchQuery}
            />
          )}

          {/* Module 3: Restaurant & Menu Management */}
          {activeModule === 'restaurants' && (
            <RestaurantList
              restaurants={restaurants}
              menuItems={menuItems}
              onOpenAddModal={() => setIsAddRestaurantOpen(true)}
              onOpenDetailModal={setSelectedRestaurantDetail}
              onOpenMenuModal={setSelectedRestaurantMenu}
              onToggleStoreStatus={handleToggleStoreStatus}
              onApproveRestaurant={handleApproveRestaurant}
              searchQuery={searchQuery}
            />
          )}

          {/* Module 4: Delivery Partner Management */}
          {activeModule === 'delivery' && (
            <DeliveryPartnerList
              riders={riders}
              onOpenDriverModal={setSelectedDriverDetail}
              onOpenVerificationModal={setSelectedDriverVerification}
              onToggleRiderStatus={handleToggleRiderStatus}
              searchQuery={searchQuery}
            />
          )}

          {/* Module 5: Customer Management */}
          {activeModule === 'customers' && (
            <CustomerList
              customers={customers}
              onOpenCustomerModal={setSelectedCustomer}
              onToggleCustomerStatus={handleToggleCustomerStatus}
              searchQuery={searchQuery}
            />
          )}

          {/* Module 6: Payments & Finance */}
          {activeModule === 'finance' && (
            <FinanceOverview
              transactions={transactions}
              onOpenPayoutModal={() => setIsPayoutModalOpen(true)}
              searchQuery={searchQuery}
            />
          )}

          {/* Module 7: Offers & Promotions */}
          {activeModule === 'promotions' && (
            <PromotionsList
              coupons={coupons}
              onOpenCreateCouponModal={() => setIsCreateCouponOpen(true)}
              onToggleCouponStatus={handleToggleCouponStatus}
              searchQuery={searchQuery}
            />
          )}

          {/* Module 8: Support, Reports & Settings */}
          {activeModule === 'settings' && (
            <SupportAndSettings
              searchQuery={searchQuery}
            />
          )}
        </main>
        </div>
      </div>

      {/* Global Modals */}
      {/* 1. Quick Action Modal */}
      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        onSelectAction={handleSelectQuickAction}
      />

      {/* 2. Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
        onOpenRefundModal={setRefundOrder}
        onCancelOrder={handleCancelOrder}
      />

      {/* 3. Refund Resolution Modal */}
      <RefundRequestModal
        order={refundOrder}
        isOpen={!!refundOrder}
        onClose={() => setRefundOrder(null)}
        onApproveRefund={handleApproveRefund}
        onRejectRefund={handleRejectRefund}
      />

      {/* 4. Restaurant Detail & Settings Modal */}
      <RestaurantDetailModal
        restaurant={selectedRestaurantDetail}
        isOpen={!!selectedRestaurantDetail}
        onClose={() => setSelectedRestaurantDetail(null)}
        onUpdateCommission={handleUpdateCommission}
        onUpdateOperatingHours={handleUpdateOperatingHours}
      />

      {/* 5. Menu Catalog & Dish Availability Modal */}
      <MenuManagerModal
        restaurant={selectedRestaurantMenu}
        menuItems={menuItems}
        isOpen={!!selectedRestaurantMenu}
        onClose={() => setSelectedRestaurantMenu(null)}
        onToggleItemAvailability={handleToggleItemAvailability}
        onAddMenuItem={handleAddMenuItem}
      />

      {/* 6. Add Restaurant Modal */}
      <AddRestaurantModal
        isOpen={isAddRestaurantOpen}
        onClose={() => setIsAddRestaurantOpen(false)}
        onAddRestaurant={handleAddRestaurant}
      />

      {/* 7. Driver Detail Modal */}
      <DriverDetailModal
        rider={selectedDriverDetail}
        isOpen={!!selectedDriverDetail}
        onClose={() => setSelectedDriverDetail(null)}
        onToggleStatus={handleToggleRiderStatus}
      />

      {/* 8. Courier Document Verification Modal */}
      <VerificationModal
        rider={selectedDriverVerification}
        isOpen={!!selectedDriverVerification}
        onClose={() => setSelectedDriverVerification(null)}
        onApproveVerification={handleApproveRiderVerification}
        onRejectVerification={handleRejectRiderVerification}
      />

      {/* 9. Customer Detail Modal */}
      <CustomerDetailModal
        customer={selectedCustomer}
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        onToggleStatus={handleToggleCustomerStatus}
      />

      {/* 10. Financial Batch Payout Modal */}
      <PayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        onAuthorizePayout={handleAuthorizePayout}
      />

      {/* 11. Create Coupon Modal */}
      <CreateCouponModal
        isOpen={isCreateCouponOpen}
        onClose={() => setIsCreateCouponOpen(false)}
        onCreateCoupon={handleCreateCoupon}
      />
    </div>
  );
}
