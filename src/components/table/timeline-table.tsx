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
import { Clock } from "lucide-react"

const projectData = [
  {
    id: 1,
    name: "Website Redesign",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    progress: 75,
    status: "In Progress",
    team: "Design Team"
  },
  {
    id: 2,
    name: "Mobile App Development",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    progress: 45,
    status: "In Progress",
    team: "Dev Team"
  },
  {
    id: 3,
    name: "API Integration",
    startDate: "2024-01-01",
    endDate: "2024-01-30",
    progress: 100,
    status: "Completed",
    team: "Backend Team"
  },
  {
    id: 4,
    name: "Database Migration",
    startDate: "2024-03-01",
    endDate: "2024-04-01",
    progress: 20,
    status: "Planning",
    team: "DevOps Team"
  }
]

export default function TimelineTable() {
  const getTimelineBar = (_startDate: string, endDate: string, progress: number) => {
    // const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()
    // const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    // const elapsedDays = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    // const progressDays = Math.ceil((totalDays * progress) / 100)
    
    const isOverdue = now > end
    const isCompleted = progress === 100
    
    return (
      <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full rounded-full ${
            isCompleted ? 'bg-green-500' : 
            isOverdue ? 'bg-red-500' : 
            'bg-blue-500'
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
          {progress}%
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectData.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {getTimelineBar(project.startDate, project.endDate, project.progress)}
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{project.startDate}</span>
                        <span>{project.endDate}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        project.status === "Completed" ? "default" : 
                        project.status === "In Progress" ? "secondary" : 
                        "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.team}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>
                        {Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}