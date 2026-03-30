import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import { WelcomeScreen } from './screens/WelcomeScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { SignInScreen } from './screens/SignInScreen';
import { VerifyOTPScreen } from './screens/VerifyOTPScreen';
import { HomeScreen } from './screens/HomeScreen';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { FriendsScreen } from './screens/FriendsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { CreateGroupScreen } from './screens/CreateGroupScreen';
import { GroupDashboardScreen } from './screens/GroupDashboardScreen';
import { PeriodDetailScreen } from './screens/PeriodDetailScreen';
import { GroupSettingsScreen } from './screens/GroupSettingsScreen';
import { JoinRequestsScreen } from './screens/JoinRequestsScreen';
import { GroupPreviewScreen } from './screens/GroupPreviewScreen';
import { MemberDetailScreen } from './screens/MemberDetailScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground max-w-md mx-auto relative">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/verify-otp" element={<VerifyOTPScreen />} />

          <Route path="/home" element={<HomeScreen />} />
          <Route path="/discover" element={<DiscoverScreen />} />
          <Route path="/friends" element={<FriendsScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />

          <Route path="/create-group" element={<CreateGroupScreen />} />
          <Route path="/group/:groupId" element={<GroupDashboardScreen />} />
          <Route path="/group/:groupId/period/:periodId" element={<PeriodDetailScreen />} />
          <Route path="/group/:groupId/settings" element={<GroupSettingsScreen />} />
          <Route path="/group/:groupId/join-requests" element={<JoinRequestsScreen />} />
          <Route path="/group/:groupId/member/:memberId" element={<MemberDetailScreen />} />

          <Route path="/group-preview/:groupId" element={<GroupPreviewScreen />} />
          <Route path="/user/:userId" element={<UserProfileScreen />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}