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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  User,
  Building,
  DollarSign
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const employeeData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
    position: "Senior Developer",
    status: "Active",
    salary: 95000,
    joinDate: "2022-03-15",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    department: "Design",
    position: "UI/UX Designer",
    status: "Active",
    salary: 78000,
    joinDate: "2022-06-20",
    avatar: "https://github.com/vercel.png"
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    department: "Marketing",
    position: "Marketing Manager",
    status: "Inactive",
    salary: 82000,
    joinDate: "2021-11-10",
    avatar: "https://github.com/nextjs.png"
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    department: "Engineering",
    position: "Frontend Developer",
    status: "Active",
    salary: 88000,
    joinDate: "2023-01-08",
    avatar: "https://github.com/react.png"
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    department: "Sales",
    position: "Sales Representative",
    status: "Active",
    salary: 65000,
    joinDate: "2023-04-12",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: 6,
    name: "Diana Lee",
    email: "diana@example.com",
    department: "HR",
    position: "HR Specialist",
    status: "Active",
    salary: 72000,
    joinDate: "2022-09-05",
    avatar: "https://github.com/vercel.png"
  },
  {
    id: 7,
    name: "Eva Martinez",
    email: "eva@example.com",
    department: "Engineering",
    position: "Backend Developer",
    status: "Active",
    salary: 92000,
    joinDate: "2022-12-01",
    avatar: "https://github.com/nextjs.png"
  },
  {
    id: 8,
    name: "Frank Chen",
    email: "frank@example.com",
    department: "Design",
    position: "Graphic Designer",
    status: "Active",
    salary: 68000,
    joinDate: "2023-02-14",
    avatar: "https://github.com/react.png"
  },
  {
    id: 9,
    name: "Grace Taylor",
    email: "grace@example.com",
    department: "Marketing",
    position: "Content Writer",
    status: "Active",
    salary: 55000,
    joinDate: "2023-03-20",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: 10,
    name: "Henry Davis",
    email: "henry@example.com",
    department: "Sales",
    position: "Sales Manager",
    status: "Active",
    salary: 95000,
    joinDate: "2022-08-15",
    avatar: "https://github.com/vercel.png"
  }
]

export default function DataTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const filteredData = employeeData.filter((employee) => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const departments = [...new Set(employeeData.map(emp => emp.department))]
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Employee Management System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <ScrollArea className="h-[400px] w-full">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No employees found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  currentData.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback>{employee.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-blue-500" />
                          <span>{employee.department}</span>
                        </div>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3" />
                          <span>{employee.salary.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>{employee.joinDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">Rows per page:</p>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                if (pageNum > totalPages) return null
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}