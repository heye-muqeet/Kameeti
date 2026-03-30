# Kameeti – Tradition Meets Tech

A comprehensive mobile-first web application for managing Pakistani-style rotating savings committees (kameeti/committee) with trust scoring, gamification, and seamless contact-based discovery.

## Design System

### Color Palette

**Light Mode:**
- Primary: Teal (#0d9488) - Trust and growth
- Accent: Gold (#fbbf24) - Star ratings and achievements
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Destructive: Red (#dc2626)

**Dark Mode:**
- Fully implemented with adjusted contrast ratios
- Primary shifts to lighter teal (#14b8a6)
- Maintains accessibility standards

### Typography
- Clean, modern system fonts with tabular figures for financial data
- Hierarchy: Display headings with medium weight, body text with normal weight
- Optimized for mobile readability

### Components Library

**Core Components:**
- Button (primary, secondary, ghost, destructive variants)
- Input (with label and error states)
- Avatar (with initials fallback)
- Badge (status indicators)
- Card (clickable and static)
- StarRating (1-5 stars with partial fill support)
- BottomSheet (modal dialogs)
- BottomNav (4-tab navigation)
- TopBar (with back button and actions)
- FAB (floating action button)

## Application Structure

### Authentication Flow
1. **Welcome Screen** - Hero with brand identity
2. **Sign Up** - Phone + country code input
3. **Sign In** - Returning user flow
4. **Verify OTP** - 6-digit code verification

### Main Navigation (Bottom Tabs)

#### Home Tab
- User's active and completed kameeti groups
- Status indicators (Active/Completed)
- Payment due warnings
- Quick access to group dashboards
- FAB for creating new groups

#### Discover Tab
- Contact-based group discovery
- Groups where admin is in user's contacts
- Search functionality
- Group preview cards with key info
- Join request capability

#### Friends Tab
- Contact-synced friend list
- Trust scores visible at a glance
- "On Kameeti" badges
- Contact permission management
- Share app functionality

#### Profile Tab
- User avatar and masked phone number
- Trust score display (stars + points)
- Badge collection (Trusted, Early Bird, Reliable)
- Reputation history timeline
- Visibility settings (Everyone/Friends/Hidden)
- Sign out

### Group Management

#### Create Group Flow
Multi-section form with:
- **Basics**: Group name
- **Money & Schedule**: Currency, installment amount, period (monthly/weekly), start date, total periods
- **Rules**: Method 1 (buy-in) vs Method 2 (mid-cycle join), optional notes

#### Group Dashboard
- Role badge (Admin/Member)
- Progress indicator (period X of Y)
- Hero card showing:
  - Current pot amount
  - Receiver information
  - Due date
- Payment status for current period
- Quick access to record payments
- Member list preview

#### Period Detail
- Checkbox interface for marking payments
- On-time indicators
- Running totals (collected vs expected)
- Completion status
- Save functionality

#### Group Settings (Admin)
- Join requests inbox with trust score preview
- Member list with roles
- Edit/Archive/Leave actions

#### Join Requests (Admin View)
- Requesters shown with:
  - Avatar and name
  - Star rating (1-5)
  - Trust level label
  - Timestamp
- Accept/Reject actions

#### Group Preview (Non-member)
- Group details card
- Admin info with contact badge
- Installment, schedule, member count
- Method indicator
- Request to join button
- Share functionality

#### Member Detail
- Avatar and role
- Financial summary (contributed, received, balance)
- Activity timeline showing:
  - Payment history per period
  - Receiver periods
  - On-time status

### User Profiles

**Public User Profile:**
- Avatar and name
- Star rating with trust points
- Badge showcase
- Recent activity feed

## Features & Functionality

### Trust System (Automated)
- **Points**: Earned through on-time payments and completed cycles
- **Stars**: 1-5 rating based on reliability
- **Badges**: Achievement indicators (Trusted, Early Bird, Reliable, etc.)
- **Visibility Control**: Users choose who sees their trust score

### Ledger Functionality
- Track installment payments per period
- Mark receiver for each period
- Calculate expected pot automatically
- Show member balances (contributed vs received)
- On-time payment tracking

### Contact Discovery
- Permission-based contact access
- Match phone numbers with registered users
- Discover groups by admin contacts
- Friend list with "On Kameeti" indicators

### Join Workflow
1. User discovers group (admin in contacts)
2. Views group preview
3. Requests to join
4. Admin sees request with trust score
5. Admin accepts or rejects
6. User notified of decision

## Technical Implementation

### Stack
- React 18.3.1 with TypeScript
- React Router 7 for navigation
- Tailwind CSS 4 for styling
- Lucide React for icons
- Mobile-first responsive design

### Routing Structure
```
/ - Welcome
/signup - Sign up
/signin - Sign in
/verify-otp - OTP verification

/home - Home tab
/discover - Discover tab
/friends - Friends tab
/profile - Profile tab

/create-group - Create group form
/group/:id - Group dashboard
/group/:id/period/:periodId - Period detail
/group/:id/settings - Group settings
/group/:id/join-requests - Join requests (admin)
/group/:id/member/:memberId - Member detail
/group-preview/:id - Group preview (non-member)
/user/:id - User public profile
```

### Design Patterns
- **Mobile-first**: 390×844 viewport optimization
- **Touch targets**: Minimum 44pt for accessibility
- **Safe areas**: Bottom navigation respects mobile chrome
- **Progressive enhancement**: Smooth animations and transitions
- **Empty states**: Helpful guidance when no data
- **Loading states**: Ready for async operations
- **Error states**: Clear error messaging

## Key Screens Summary

**16 Complete Screens:**
1. Welcome
2. Sign Up
3. Sign In
4. Verify OTP
5. Home (My Groups)
6. Discover Groups
7. Friends List
8. User Profile (Me)
9. Create Group
10. Group Dashboard
11. Period Detail
12. Group Settings
13. Join Requests (Admin)
14. Group Preview
15. Member Detail
16. User Public Profile

**10 Reusable Components:**
All with consistent styling and behavior across the application.

## Accessibility
- Adequate color contrast (WCAG AA)
- Touch targets ≥44pt
- Readable typography
- Semantic HTML structure
- Keyboard navigation support

## Notes
- No actual payment processing (ledger tracking only)
- Mock data for demonstration
- Phone-based authentication (OTP)
- Contact permission required for discovery
- Reputation updates automatically from behavior
