import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { LandingPage } from '@/pages/LandingPage'
import { SetupPage } from '@/pages/SetupPage'
import { AssessmentPage } from '@/pages/AssessmentPage'
import { ReviewPage } from '@/pages/ReviewPage'
import { ResultsPage } from '@/pages/ResultsPage'
import { AssessmentProvider } from '@/context/AssessmentContext'

export default function App() {
  return (
    <AssessmentProvider>
    <BrowserRouter>
      <ScrollToTop />
      <PageLayout>
        <Routes>
          <Route path="/"            element={<LandingPage />} />
          <Route path="/setup"       element={<SetupPage />} />
          <Route path="/assessment"  element={<AssessmentPage />} />
          <Route path="/review"      element={<ReviewPage />} />
          <Route path="/results"     element={<ResultsPage />} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
    </AssessmentProvider>
  )
}
