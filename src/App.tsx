import { Routes, Route, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { OnboardingPage } from './pages/guest/OnboardingPage';
import { ChatPage } from './pages/guest/ChatPage';
import { CheckInPage } from './pages/guest/CheckInPage';
import { FeedbackPage } from './pages/guest/FeedbackPage';
import { ProfilePage } from './pages/guest/ProfilePage';
import { MessagesPage } from './pages/guest/MessagesPage';
import { ServicesPage } from './pages/guest/ServicesPage';
import { ServiceDetailPage } from './pages/guest/ServiceDetailPage';
import { SettingsPage } from './pages/guest/SettingsPage';
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { StaffChatPage } from './pages/staff/StaffChatPage';
import { GuestProfilesPage } from './pages/staff/GuestProfilesPage';
import { GuestProfilePage } from './pages/staff/GuestProfilePage';
import { FeedbackReviewPage } from './pages/staff/FeedbackReviewPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { SettingsPage as AdminSettingsPage } from './pages/admin/SettingsPage';
import { Sidebar } from './components/Sidebar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isPublicRoute = ['/', '/signin'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-brand-50">
      {isAuthenticated && !isPublicRoute && <Sidebar />}
      <div className={isAuthenticated && !isPublicRoute ? 'lg:pl-64' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          
          {/* Guest Routes */}
          <Route path="/onboarding" element={
            <ProtectedRoute allowedRoles={['guest']}>
              <OnboardingPage />
            </ProtectedRoute>
          } />
          <Route path="/chat" element={
            <ProtectedRoute allowedRoles={['guest']}>
              <ChatPage />
            </ProtectedRoute>
          } />
          <Route path="/messages" element={
            <ProtectedRoute allowedRoles={['guest']}>
              <MessagesPage />
            </ProtectedRoute>
          } />
          <Route path="/services" element={
            <ProtectedRoute allowedRoles={['guest']}>
              <ServicesPage />
            </ProtectedRoute>
          } />
          <Route path="/services/:id" element={
            <ProtectedRoute allowedRoles={['guest']}>
              <ServiceDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/check-in" element={
            <ProtectedRoute allowedRoles={['guest']}>
              <CheckInPage />
            </ProtectedRoute>
          } />
          <Route path="/feedback" element={
            <ProtectedRoute allowedRoles={['guest']}>
              <FeedbackPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute allowedRoles={['guest']}>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute allowedRoles={['guest']}>
              <SettingsPage />
            </ProtectedRoute>
          } />
          
          {/* Staff Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['staff']}>
              <StaffDashboard />
            </ProtectedRoute>
          } />
          <Route path="/staff/chat" element={
            <ProtectedRoute allowedRoles={['staff']}>
              <StaffChatPage />
            </ProtectedRoute>
          } />
          <Route path="/guests" element={
            <ProtectedRoute allowedRoles={['staff']}>
              <GuestProfilesPage />
            </ProtectedRoute>
          } />
          <Route path="/guests/:id" element={
            <ProtectedRoute allowedRoles={['staff']}>
              <GuestProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/reviews" element={
            <ProtectedRoute allowedRoles={['staff']}>
              <FeedbackReviewPage />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/analytics" element={
            <ProtectedRoute allowedRoles={['staff']}>
              <AnalyticsPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={['staff']}>
              <AdminSettingsPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;