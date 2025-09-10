import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Minus } from "lucide-react"

const attendanceData = [
  { student: "John Doe", "2024-01-15": "present", "2024-01-16": "present", "2024-01-17": "absent", "2024-01-18": "present", "2024-01-19": "late" },
  { student: "Jane Smith", "2024-01-15": "present", "2024-01-16": "present", "2024-01-17": "present", "2024-01-18": "absent", "2024-01-19": "present" },
  { student: "Bob Johnson", "2024-01-15": "late", "2024-01-16": "present", "2024-01-17": "present", "2024-01-18": "present", "2024-01-19": "present" },
  { student: "Alice Brown", "2024-01-15": "present", "2024-01-16": "absent", "2024-01-17": "present", "2024-01-18": "present", "2024-01-19": "late" }
]

const dates = ["2024-01-15", "2024-01-16", "2024-01-17", "2024-01-18", "2024-01-19"]

export default function MatrixTable() {
  const getAttendanceIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "late":
        return <Minus className="h-4 w-4 text-yellow-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  // const getAttendanceBadge = (status: string) => {
  //   switch (status) {
  //     case "present":
  //       return <Badge variant="default" className="bg-green-500">Present</Badge>
  //     case "absent":
  //       return <Badge variant="destructive">Absent</Badge>
  //     case "late":
  //       return <Badge variant="secondary" className="bg-yellow-500">Late</Badge>
  //     default:
  //       return <Badge variant="outline">-</Badge>
  //   }
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Matrix / Cross Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white z-10">Student</TableHead>
                {dates.map((date) => (
                  <TableHead key={date} className="text-center">
                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </TableHead>
                ))}
                <TableHead className="text-center">Total Present</TableHead>
                <TableHead className="text-center">Attendance %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((student, index) => {
                const presentCount = dates.filter(date => student[date as keyof typeof student] === 'present').length
                const attendancePercent = Math.round((presentCount / dates.length) * 100)
                
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium sticky left-0 bg-white z-10">
                      {student.student}
                    </TableCell>
                    {dates.map((date) => (
                      <TableCell key={date} className="text-center">
                        <div className="flex items-center justify-center">
                          {getAttendanceIcon(student[date as keyof typeof student] as string)}
                        </div>
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-medium">
                      {presentCount}/{dates.length}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={attendancePercent >= 80 ? "default" : attendancePercent >= 60 ? "secondary" : "destructive"}
                      >
                        {attendancePercent}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}