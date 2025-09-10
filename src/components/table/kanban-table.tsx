import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { GripVertical, Calendar, Plus } from "lucide-react"

interface Task {
  id: number
  title: string
  assignee: string
  priority: "High" | "Medium" | "Low"
  status: "Pending" | "In Progress" | "Done"
  dueDate: string
  avatar: string
  description?: string
}

const initialTasks: Task[] = [
  { 
    id: 1, 
    title: "Design new homepage", 
    assignee: "John Doe", 
    priority: "High", 
    status: "Pending", 
    dueDate: "2024-02-15", 
    avatar: "https://github.com/shadcn.png",
    description: "Create wireframes and mockups for the new homepage design"
  },
  { 
    id: 2, 
    title: "Implement user authentication", 
    assignee: "Jane Smith", 
    priority: "Medium", 
    status: "In Progress", 
    dueDate: "2024-02-20", 
    avatar: "https://github.com/vercel.png",
    description: "Set up JWT authentication and user management system"
  },
  { 
    id: 3, 
    title: "Write API documentation", 
    assignee: "Bob Johnson", 
    priority: "Low", 
    status: "Done", 
    dueDate: "2024-02-10", 
    avatar: "https://github.com/nextjs.png",
    description: "Document all REST API endpoints with examples"
  },
  { 
    id: 4, 
    title: "Setup CI/CD pipeline", 
    assignee: "Alice Brown", 
    priority: "High", 
    status: "In Progress", 
    dueDate: "2024-02-25", 
    avatar: "https://github.com/react.png",
    description: "Configure automated testing and deployment pipeline"
  },
  { 
    id: 5, 
    title: "Code review for feature X", 
    assignee: "Charlie Wilson", 
    priority: "Medium", 
    status: "Pending", 
    dueDate: "2024-02-18", 
    avatar: "https://github.com/shadcn.png",
    description: "Review pull request for new feature implementation"
  },
  { 
    id: 6, 
    title: "Database optimization", 
    assignee: "Diana Lee", 
    priority: "High", 
    status: "Pending", 
    dueDate: "2024-02-22", 
    avatar: "https://github.com/vercel.png",
    description: "Optimize database queries and add proper indexing"
  }
]

export default function KanbanTable() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive"
      case "Medium": return "default"
      case "Low": return "secondary"
      default: return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "bg-green-50 border-green-200"
      case "In Progress": return "bg-blue-50 border-blue-200"
      case "Pending": return "bg-yellow-50 border-yellow-200"
      default: return "bg-gray-50 border-gray-200"
    }
  }

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = []
    }
    acc[task.status].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  const statuses: Task["status"][] = ["Pending", "In Progress", "Done"]

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
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

  const addNewTask = (status: Task["status"]) => {
    const newTask: Task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: "New Task",
      assignee: "Unassigned",
      priority: "Medium",
      status,
      dueDate: new Date().toISOString().split('T')[0],
      avatar: "https://github.com/shadcn.png",
      description: "Click to edit this task"
    }
    
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kanban-Style Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statuses.map((status) => (
            <div key={status} className="space-y-4">
              <div className={`flex items-center justify-between p-4 rounded-lg border-2 ${getStatusColor(status)}`}>
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-lg">{status}</h3>
                  <Badge variant="secondary" className="bg-white">
                    {groupedTasks[status]?.length || 0}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => addNewTask(status)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div 
                className="space-y-3 min-h-[300px] p-2"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
              >
                {groupedTasks[status]?.map((task) => (
                  <Card 
                    key={task.id} 
                    className={`cursor-move hover:shadow-lg transition-all duration-200 border-2 ${
                      draggedTask?.id === task.id ? 'opacity-50 rotate-2' : ''
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                          <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-sm mb-2 line-clamp-2">{task.title}</h4>
                      
                      {task.description && (
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.avatar} />
                          <AvatarFallback>{task.assignee[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">{task.assignee}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {(!groupedTasks[status] || groupedTasks[status].length === 0) && (
                  <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-sm text-gray-500">Drop tasks here</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">How to use:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Drag and drop tasks between columns to change their status</li>
            <li>• Click the + button to add new tasks to any column</li>
            <li>• Tasks are color-coded by priority (High: Red, Medium: Blue, Low: Gray)</li>
            <li>• Each column shows the count of tasks in that status</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}