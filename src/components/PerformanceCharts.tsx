"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
// import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"

const gradeDistribution = [
  { grade: 'A', count: 30 },
  { grade: 'B', count: 40 },
  { grade: 'C', count: 20 },
  { grade: 'D', count: 8 },
  { grade: 'F', count: 2 },
]

const attendanceRate = [
  { month: 'Jan', rate: 95 },
  { month: 'Feb', rate: 92 },
  { month: 'Mar', rate: 98 },
  { month: 'Apr', rate: 94 },
  { month: 'May', rate: 96 },
  { month: 'Jun', rate: 97 },
]

export default function PerformanceCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Charts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium mb-2">Grade Distribution</h3>
            <ChartContainer
              config={{
                count: {
                  label: "Number of Students",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistribution}>
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Bar dataKey="count" fill="var(--color-count)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Attendance Rate</h3>
            <ChartContainer
              config={{
                rate: {
                  label: "Attendance Rate",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceRate}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Line type="monotone" dataKey="rate" stroke="var(--color-rate)" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

