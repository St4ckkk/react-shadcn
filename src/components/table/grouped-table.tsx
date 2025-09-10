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
import { ChevronDown, ChevronRight, Users, Building } from "lucide-react"

const jobData = [
  { id: 1, title: "Senior React Developer", company: "TechCorp", category: "Web Development", salary: 120000, location: "Remote" },
  { id: 2, title: "Frontend Engineer", company: "StartupXYZ", category: "Web Development", salary: 95000, location: "San Francisco" },
  { id: 3, title: "Full Stack Developer", company: "DevStudio", category: "Web Development", salary: 110000, location: "New York" },
  { id: 4, title: "iOS Developer", company: "MobileFirst", category: "Mobile Development", salary: 105000, location: "Austin" },
  { id: 5, title: "Android Developer", company: "AppCraft", category: "Mobile Development", salary: 98000, location: "Seattle" },
  { id: 6, title: "Data Scientist", company: "AnalyticsPro", category: "Data Science", salary: 130000, location: "Boston" },
  { id: 7, title: "ML Engineer", company: "AI Solutions", category: "Data Science", salary: 140000, location: "Remote" }
]

export default function GroupedTable() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  const groupedData = jobData.reduce((acc, job) => {
    if (!acc[job.category]) {
      acc[job.category] = []
    }
    acc[job.category].push(job)
    return acc
  }, {} as Record<string, typeof jobData>)

  const toggleGroup = (category: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedGroups(newExpanded)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web Development":
        return <Building className="h-4 w-4" />
      case "Mobile Development":
        return <Users className="h-4 w-4" />
      case "Data Science":
        return <Users className="h-4 w-4" />
      default:
        return <Building className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pivot / Grouped Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(groupedData).map(([category, jobs]) => (
                <>
                  <TableRow key={category} className="bg-gray-50">
                    <TableCell colSpan={4}>
                      <Button
                        variant="ghost"
                        onClick={() => toggleGroup(category)}
                        className="flex items-center space-x-2 font-semibold"
                      >
                        {expandedGroups.has(category) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        {getCategoryIcon(category)}
                        <span>{category}</span>
                        <Badge variant="secondary">{jobs.length} jobs</Badge>
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                  {expandedGroups.has(category) && jobs.map((job) => (
                    <TableRow key={job.id} className="pl-8">
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell className="font-mono">${job.salary.toLocaleString()}</TableCell>
                      <TableCell>{job.location}</TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}