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
import { Grid3X3, List, MapPin, Calendar, DollarSign } from "lucide-react"

const jobData = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: 120000,
    type: "Full-time",
    posted: "2024-01-15",
    description: "We're looking for an experienced React developer to join our growing team.",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: 95000,
    type: "Full-time",
    posted: "2024-01-16",
    description: "Join our innovative startup and help build the next generation of web applications.",
    avatar: "https://github.com/vercel.png"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "New York, NY",
    salary: 85000,
    type: "Contract",
    posted: "2024-01-17",
    description: "Creative designer needed for exciting new projects in the fintech space.",
    avatar: "https://github.com/nextjs.png"
  }
]

export default function CardViewTable() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Card-View Table (Grid Toggle)</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="h-4 w-4 mr-2" />
              Table
            </Button>
            <Button
              variant={viewMode === 'card' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('card')}
            >
              <Grid3X3 className="h-4 w-4 mr-2" />
              Cards
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'table' ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Posted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobData.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={job.avatar} />
                          <AvatarFallback>{job.company[0]}</AvatarFallback>
                        </Avatar>
                        <span>{job.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{job.location}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">${job.salary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{job.type}</Badge>
                    </TableCell>
                    <TableCell>{job.posted}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobData.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={job.avatar} />
                        <AvatarFallback>{job.company[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{job.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="font-mono">${job.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Posted: {job.posted}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}