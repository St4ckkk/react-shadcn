import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const projectData = [
  {
    id: 1,
    project: "Website Redesign",
    progress: 75,
    status: "In Progress",
    team: "Design Team",
    deadline: "2024-02-15"
  },
  {
    id: 2,
    project: "Mobile App",
    progress: 45,
    status: "In Progress",
    team: "Dev Team",
    deadline: "2024-03-01"
  },
  {
    id: 3,
    project: "API Integration",
    progress: 100,
    status: "Completed",
    team: "Backend Team",
    deadline: "2024-01-30"
  },
  {
    id: 4,
    project: "Database Migration",
    progress: 20,
    status: "Planning",
    team: "DevOps Team",
    deadline: "2024-04-01"
  }
]

export default function StripedTable() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Striped Progress Table</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Deadline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectData.map((project, index) => (
              <TableRow key={project.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <TableCell className="font-medium">{project.project}</TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Progress value={project.progress} className="w-24" />
                    <span className="text-sm text-gray-600">{project.progress}%</span>
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
                <TableCell>{project.deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}