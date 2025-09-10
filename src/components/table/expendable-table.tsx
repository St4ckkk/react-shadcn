import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, ChevronRight, Calendar } from "lucide-react"

const projectData = [
  {
    id: 1,
    name: "Website Redesign",
    client: "Tech Corp",
    status: "In Progress",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    budget: 50000,
    team: [
      { name: "John Doe", role: "Lead Developer", avatar: "https://github.com/shadcn.png" },
      { name: "Jane Smith", role: "UI Designer", avatar: "https://github.com/vercel.png" }
    ],
    details: {
      description: "Complete redesign of the company website with modern UI/UX",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      milestones: ["Design Phase", "Development", "Testing", "Deployment"]
    }
  },
  {
    id: 2,
    name: "Mobile App",
    client: "StartupXYZ",
    status: "Planning",
    progress: 25,
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    budget: 75000,
    team: [
      { name: "Bob Johnson", role: "Mobile Developer", avatar: "https://github.com/nextjs.png" },
      { name: "Alice Brown", role: "Product Manager", avatar: "https://github.com/react.png" }
    ],
    details: {
      description: "Cross-platform mobile application for customer management",
      technologies: ["React Native", "Node.js", "MongoDB"],
      milestones: ["Research", "Prototyping", "Development", "Testing", "Launch"]
    }
  }
]

export default function ExpandableTable() {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expandable Row Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Budget</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectData.map((project) => (
                <>
                  <TableRow key={project.id} className="cursor-pointer">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRow(project.id)}
                      >
                        {expandedRows.has(project.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>
                      <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">${project.budget.toLocaleString()}</TableCell>
                  </TableRow>
                  
                  {expandedRows.has(project.id) && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-0">
                        <Card className="m-4 border-l-4 border-l-blue-500">
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Project Details</h4>
                                  <p className="text-sm text-gray-600">{project.details.description}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Technologies</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {project.details.technologies.map((tech, index) => (
                                      <Badge key={index} variant="outline">{tech}</Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Timeline</h4>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex items-center space-x-2">
                                      <Calendar className="h-4 w-4 text-gray-400" />
                                      <span>Start: {project.startDate}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Calendar className="h-4 w-4 text-gray-400" />
                                      <span>End: {project.endDate}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Team Members</h4>
                                  <div className="space-y-2">
                                    {project.team.map((member, index) => (
                                      <div key={index} className="flex items-center space-x-3">
                                        <Avatar className="h-8 w-8">
                                          <AvatarImage src={member.avatar} />
                                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium text-sm">{member.name}</div>
                                          <div className="text-xs text-gray-500">{member.role}</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Milestones</h4>
                                  <div className="space-y-1">
                                    {project.details.milestones.map((milestone, index) => (
                                      <div key={index} className="flex items-center space-x-2 text-sm">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>{milestone}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}