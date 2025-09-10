import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Share2, 
  Upload, 
  Plus, 
  MoreHorizontal, 
  MessageCircle, 
  Eye, 
  Calendar,
  GripVertical,
  Filter,
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

interface Task {
  id: number
  title: string
  description: string
  priority: "Critical" | "High" | "Medium" | "Low"
  status: "In Progress" | "Reviewed" | "Completed"
  assignees: Array<{
    name: string
    avatar: string
  }>
  comments: number
  views: number
  dueDate?: string
  category: string
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Website Redesign for Client A",
    description: "Complete redesign of the company website with modern UI/UX principles and responsive design.",
    priority: "High",
    status: "In Progress",
    assignees: [
      { name: "John Doe", avatar: "https://github.com/shadcn.png" },
      { name: "Jane Smith", avatar: "https://github.com/vercel.png" }
    ],
    comments: 12,
    views: 45,
    dueDate: "2024-02-15",
    category: "Web Development"
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Develop cross-platform mobile application for iOS and Android using React Native.",
    priority: "Critical",
    status: "In Progress",
    assignees: [
      { name: "Bob Johnson", avatar: "https://github.com/nextjs.png" },
      { name: "Alice Brown", avatar: "https://github.com/react.png" }
    ],
    comments: 8,
    views: 32,
    dueDate: "2024-03-01",
    category: "Mobile Development"
  },
  {
    id: 3,
    title: "API Integration Project",
    description: "Integrate third-party APIs and develop custom endpoints for data synchronization.",
    priority: "Medium",
    status: "Reviewed",
    assignees: [
      { name: "Charlie Wilson", avatar: "https://github.com/shadcn.png" }
    ],
    comments: 5,
    views: 28,
    dueDate: "2024-02-20",
    category: "Backend Development"
  },
  {
    id: 4,
    title: "Database Optimization",
    description: "Optimize database queries and implement proper indexing for better performance.",
    priority: "High",
    status: "In Progress",
    assignees: [
      { name: "Diana Lee", avatar: "https://github.com/vercel.png" },
      { name: "Eva Martinez", avatar: "https://github.com/nextjs.png" }
    ],
    comments: 15,
    views: 67,
    dueDate: "2024-02-25",
    category: "DevOps"
  },
  {
    id: 5,
    title: "UI/UX Design System",
    description: "Create comprehensive design system and component library for consistent user experience.",
    priority: "Medium",
    status: "Completed",
    assignees: [
      { name: "Frank Chen", avatar: "https://github.com/react.png" }
    ],
    comments: 3,
    views: 89,
    category: "Design"
  },
  {
    id: 6,
    title: "Security Audit",
    description: "Conduct comprehensive security audit and implement necessary security measures.",
    priority: "Critical",
    status: "Reviewed",
    assignees: [
      { name: "Grace Taylor", avatar: "https://github.com/shadcn.png" },
      { name: "Henry Davis", avatar: "https://github.com/vercel.png" }
    ],
    comments: 22,
    views: 156,
    dueDate: "2024-02-28",
    category: "Security"
  },
  {
    id: 7,
    title: "Performance Testing",
    description: "Conduct load testing and optimize application performance for better user experience.",
    priority: "High",
    status: "In Progress",
    assignees: [
      { name: "Ivan Petrov", avatar: "https://github.com/nextjs.png" }
    ],
    comments: 7,
    views: 34,
    dueDate: "2024-03-05",
    category: "Testing"
  },
  {
    id: 8,
    title: "Documentation Update",
    description: "Update project documentation and create user guides for new features.",
    priority: "Low",
    status: "Completed",
    assignees: [
      { name: "Julia Kim", avatar: "https://github.com/vercel.png" }
    ],
    comments: 2,
    views: 18,
    category: "Documentation"
  }
]

export default function KanbanComponent() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Newest")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "destructive"
      case "High": return "default"
      case "Medium": return "secondary"
      case "Low": return "outline"
      default: return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-purple-50 border-purple-200"
      case "Reviewed": return "bg-orange-50 border-orange-200"
      case "Completed": return "bg-green-50 border-green-200"
      default: return "bg-gray-50 border-gray-200"
    }
  }

  const getStatusHeaderColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-purple-500"
      case "Reviewed": return "bg-orange-500"
      case "Completed": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = []
    }
    acc[task.status].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  const statuses: Task["status"][] = ["In Progress", "Reviewed", "Completed"]

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", task.id.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, newStatus: Task["status"]) => {
    e.preventDefault()
    
    if (draggedTask && draggedTask.status !== newStatus) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === draggedTask.id 
            ? { ...task, status: newStatus }
            : task
        )
      )
    }
    
    setDraggedTask(null)
  }

  const handleDragEnd = () => {
    setDraggedTask(null)
  }

  const addNewTask = (status: Task["status"]) => {
    const newTask: Task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: "New Task",
      description: "Click to edit this task description",
      priority: "Medium",
      status,
      assignees: [],
      comments: 0,
      views: 0,
      category: "General"
    }
    
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  const deleteTask = (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const duplicateTask = (task: Task) => {
    const newTask: Task = {
      ...task,
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: `${task.title} (Copy)`,
      status: task.status
    }
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === "Completed").length
//   const inProgressTasks = tasks.filter(task => task.status === "In Progress").length
//   const reviewedTasks = tasks.filter(task => task.status === "Reviewed").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img src="/klio-logo.svg" alt="Klio Solutions" className="h-8 w-8" />
            <h1 className="text-3xl font-bold text-black">Kanban Dashboard</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="By Total Tasks" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-auto grid-cols-5">
            <TabsTrigger value="By Status">By Status</TabsTrigger>
            <TabsTrigger value="By Total Tasks" className="flex items-center space-x-2">
              By Total Tasks
              <Badge variant="secondary" className="ml-2">{totalTasks}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Tasks Due">Tasks Due</TabsTrigger>
            <TabsTrigger value="Extra Tasks">Extra Tasks</TabsTrigger>
            <TabsTrigger value="Tasks Completed" className="flex items-center space-x-2">
              Tasks Completed
              <Badge variant="secondary" className="ml-2">{completedTasks}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Newest">Newest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
                <SelectItem value="Priority">Priority</SelectItem>
                <SelectItem value="Due Date">Due Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="By Status" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {statuses.map((status) => (
              <div key={status} className="space-y-4">
                <div className={`${getStatusColor(status)} rounded-lg border-2 p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusHeaderColor(status)}`}></div>
                      <h3 className="font-semibold text-lg text-black">{status}</h3>
                      <Badge variant="secondary" className="bg-white">
                        {groupedTasks[status]?.length || 0}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addNewTask(status)}
                      className="h-8 w-8 p-0 hover:bg-white/50"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <ScrollArea className="h-[600px]">
                  <div 
                    className="space-y-2 p-2 rounded-lg border-2 border-dashed border-transparent hover:border-gray-300 transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, status)}
                  >
                    {groupedTasks[status]?.map((task) => (
                      <Card 
                        key={task.id} 
                        className={`cursor-move hover:shadow-lg transition-all duration-200 border-2 ${
                          draggedTask?.id === task.id ? 'opacity-50 rotate-1 scale-105' : 'hover:scale-105'
                        }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={handleDragEnd}
                      >
                        <CardContent className="p-2">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex items-center space-x-1">
                              <GripVertical className="h-3 w-3 text-gray-400" />
                              <Badge variant={getPriorityColor(task.priority)} className="text-xs px-1 py-0">
                                {task.priority}
                              </Badge>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => duplicateTask(task)}>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => deleteTask(task.id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <h4 className="font-semibold text-xs mb-1 text-black line-clamp-2">{task.title}</h4>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                          
                          <div className="flex items-center space-x-1 mb-2">
                            {task.assignees.slice(0, 3).map((assignee, index) => (
                              <Avatar key={index} className="h-4 w-4 -ml-1 first:ml-0 border border-white">
                                <AvatarImage src={assignee.avatar} />
                                <AvatarFallback className="text-xs bg-blue-500 text-white">
                                  {assignee.name[0]}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {task.assignees.length > 3 && (
                              <div className="h-4 w-4 -ml-1 rounded-full bg-purple-100 flex items-center justify-center border border-white">
                                <span className="text-xs text-purple-700">+{task.assignees.length - 3}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="h-3 w-3" />
                                <span>{task.comments}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{task.views}</span>
                              </div>
                            </div>
                            {task.dueDate && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{task.dueDate}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {(!groupedTasks[status] || groupedTasks[status].length === 0) && (
                      <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-1">No tasks in this column</p>
                          <p className="text-xs text-gray-400">Drop tasks here or add new ones</p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="By Total Tasks" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {statuses.map((status) => (
              <div key={status} className="space-y-4">
                <div className={`${getStatusColor(status)} rounded-lg border-2 p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusHeaderColor(status)}`}></div>
                      <h3 className="font-semibold text-lg text-black">{status}</h3>
                      <Badge variant="secondary" className="bg-white">
                        {groupedTasks[status]?.length || 0}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addNewTask(status)}
                      className="h-8 w-8 p-0 hover:bg-white/50"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <ScrollArea className="h-[600px]">
                  <div 
                    className="space-y-2 p-2 rounded-sm border-2 border-dashed border-transparent hover:border-gray-300 transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, status)}
                  >
                    {groupedTasks[status]?.map((task) => (
                      <Card 
                        key={task.id} 
                        className={`cursor-move rounded-sm hover:shadow-lg transition-all duration-200 border-2 ${
                          draggedTask?.id === task.id ? 'opacity-50 rotate-1 scale-105' : 'hover:scale-105'
                        }`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={handleDragEnd}
                      >
                        <CardContent className="">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-1">
                              <GripVertical className="h-3 w-3 text-gray-400" />
                              <Badge variant={getPriorityColor(task.priority)} className="text-xs px-1 py-0">
                                {task.priority}
                              </Badge>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => duplicateTask(task)}>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => deleteTask(task.id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <h4 className="font-semibold text-xs mb-1 text-black line-clamp-2">{task.title}</h4>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                          
                          <div className="flex items-center space-x-1 mb-2">
                            {task.assignees.slice(0, 3).map((assignee, index) => (
                              <Avatar key={index} className="h-5 w-5 -ml-3 first:ml-0 border border-white">
                                <AvatarImage src={assignee.avatar} />
                                <AvatarFallback className="text-xs bg-blue-500 text-white">
                                  {assignee.name[0]}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {task.assignees.length > 3 && (
                              <div className="h-4 w-4 -ml-1 rounded-full bg-purple-100 flex items-center justify-center border border-white">
                                <span className="text-xs text-purple-700">+{task.assignees.length - 3}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="h-3 w-3" />
                                <span>{task.comments}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{task.views}</span>
                              </div>
                            </div>
                            {task.dueDate && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{task.dueDate}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {(!groupedTasks[status] || groupedTasks[status].length === 0) && (
                      <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-1">No tasks in this column</p>
                          <p className="text-xs text-gray-400">Drop tasks here or add new ones</p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="Tasks Due" className="mt-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Tasks Due content will be implemented here</p>
          </div>
        </TabsContent>

        <TabsContent value="Extra Tasks" className="mt-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Extra Tasks content will be implemented here</p>
          </div>
        </TabsContent>

        <TabsContent value="Tasks Completed" className="mt-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Tasks Completed content will be implemented here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}