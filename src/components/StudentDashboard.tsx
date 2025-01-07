import StudentInfo from './StudentInfo'
import CourseProgress from './CourseProgress'
import PerformanceCharts from './PerformanceCharts'

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <StudentInfo />
      <CourseProgress />
      {/* <PerformanceCharts /> */}
    </div>
  )
}

