import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { GoalsPage } from '../features/goals/GoalsPage';
import { AIMentorPage } from '../features/ai-mentor/AIMentorPage';
import { CalendarPage } from '../features/calendar/CalendarPage';
import { AnalyticsPage } from '../features/analytics/AnalyticsPage';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="ai-mentor" element={<AIMentorPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
