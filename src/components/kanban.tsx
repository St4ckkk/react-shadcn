import React, { useState, useEffect } from "react"
import { CirclePlus, SlidersHorizontal } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { 
  Search, 
  GripVertical, 
  Paperclip,
  UserPlus,
  MessageSquare,
  Check,
} from "lucide-react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useIsMobile } from "@/hooks/use-mobile"

interface Task {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  status: "backlog" | "in-progress" | "done" | "todo" | "cancelled" | "for-checking"
  assignees: Array<{
    name: string
    initials: string
    avatar?: string
  }>
  comments: number
  attachments: number
  progress: number
}

const initialTasks: Task[] = [
  {
    id: "ATATAT",
    title: "Integrate Stripe payment gateway",
    description: "Compile competitor landing page designs for inspiration. G..",
    priority: "high",
    status: "backlog",
    assignees: [
      { name: "John Doe", initials: "JD" },
      { name: "Jane Smith", initials: "JS" }
    ],
    comments: 4,
    attachments: 2,
    progress: 10
  },
  {
    id: "MWJL",
    title: "Set up automated backups",
    description: "Compile competitor landing page designs for inspiration. G..",
    priority: "low",
    status: "backlog",
    assignees: [
      { name: "Bob Johnson", initials: "BJ" },
      { name: "Alice Brown", initials: "AB" }
    ],
    comments: 3,
    attachments: 0,
    progress: 5
  },
  {
    id: "CWAR",
    title: "Dark mode toggle implementation",
    description: "Compile competitor landing page designs for inspiration. G..",
    priority: "high",
    status: "in-progress",
    assignees: [
      { name: "Diana Lee", initials: "DL" },
      { name: "Eva Martinez", initials: "EM" }
    ],
    comments: 6,
    attachments: 2,
    progress: 40
  },
  {
    id: "LMIN",
    title: "Database schema refactoring",
    description: "Compile competitor landing page designs for inspiration. G..",
    priority: "medium",
    status: "in-progress",
    assignees: [
      { name: "Frank Chen", initials: "FC" },
      { name: "Grace Taylor", initials: "GT" }
    ],
    comments: 2,
    attachments: 3,
    progress: 55
  },
  {
    id: "NTEL",
    title: "Accessibility improvements",
    description: "Compile competitor landing page designs for inspiration. G..",
    priority: "low",
    status: "in-progress",
    assignees: [
      { name: "Henry Davis", initials: "HD" }
    ],
    comments: 1,
    attachments: 1,
    progress: 35
  },
  {
    id: "TODO1",
    title: "User authentication setup",
    description: "Implement secure user login and registration system",
    priority: "high",
    status: "todo",
    assignees: [
      { name: "Sarah Wilson", initials: "SW" }
    ],
    comments: 2,
    attachments: 1,
    progress: 0
  },
  {
    id: "TODO2",
    title: "API documentation",
    description: "Create comprehensive API documentation for developers",
    priority: "medium",
    status: "todo",
    assignees: [
      { name: "Mike Johnson", initials: "MJ" }
    ],
    comments: 1,
    attachments: 0,
    progress: 0
  },
  {
    id: "CHECK1",
    title: "Code review for payment module",
    description: "Review and test the payment integration code",
    priority: "high",
    status: "for-checking",
    assignees: [
      { name: "Lisa Davis", initials: "LD" },
      { name: "Tom Brown", initials: "TB" }
    ],
    comments: 5,
    attachments: 3,
    progress: 90
  },
  {
    id: "CHECK2",
    title: "Security audit",
    description: "Perform security audit on the application",
    priority: "high",
    status: "for-checking",
    assignees: [
      { name: "Alex Green", initials: "AG" }
    ],
    comments: 3,
    attachments: 2,
    progress: 85
  },
  {
    id: "DONE1",
    title: "Database optimization",
    description: "Optimize database queries for better performance",
    priority: "medium",
    status: "done",
    assignees: [
      { name: "Emma Wilson", initials: "EW" }
    ],
    comments: 4,
    attachments: 1,
    progress: 100
  },
  {
    id: "DONE2",
    title: "Frontend responsive design",
    description: "Make the frontend fully responsive across all devices",
    priority: "high",
    status: "done",
    assignees: [
      { name: "David Lee", initials: "DL" }
    ],
    comments: 2,
    attachments: 0,
    progress: 100
  },
  {
    id: "CANCEL1",
    title: "Legacy feature removal",
    description: "Remove outdated legacy features from the system",
    priority: "low",
    status: "cancelled",
    assignees: [
      { name: "Rachel Kim", initials: "RK" }
    ],
    comments: 1,
    attachments: 0,
    progress: 0
  }
]


// TaskCard with React DnD
const TaskCard = ({ task, isPreview = false }: {
  task: Task
  isPreview?: boolean
}) => {
  const [{ isDragging: dragState }, drag] = useDrag({
    type: 'task',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  if (isPreview) {
    return (
      <Card className="p-4 bg-blue-50 rounded-sm border-2 border-blue-300 border-dashed transition-all duration-300 ease-in-out shadow-lg">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg text-gray-900 mb-2">{task.title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{task.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {task.assignees.slice(0, 2).map((assignee: any, index: number) => (
                <Avatar key={index} className="h-7 w-7 border border-white -ml-4 first:ml-0">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    {assignee.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex items-center space-x-2 border rounded p-1">
              <div className="relative w-4 h-4">
                <svg className="w-5 h-5 transform-rotate-90" viewBox="0 0 16 16">
                  <circle
                    cx="7"
                    cy="7"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-gray-300"
                  />
                  <circle
                    cx="7"
                    cy="7"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 6}`}
                    strokeDashoffset={`${2 * Math.PI * 6 * (1 - task.progress / 100)}`}
                    className={`${
                      task.progress === 100 ? 'text-green-600' :
                      task.progress >= 75 ? 'text-blue-600' :
                      task.progress >= 50 ? 'text-yellow-600' :
                      task.progress >= 25 ? 'text-orange-600' :
                      'text-red-600'
                    }`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-600 font-normal">{task.progress}%</span>
            </div>
          </div>

          <Separator className="my-2" />
          
          <div className="flex items-center justify-between mt-3">
            <Badge className="text-sm px-2 bg-white text-gray-800 rounded border border-gray-200">
              {task.priority}
            </Badge>
            
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Paperclip className="h-4 w-4" />
                <span>{task.attachments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{task.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card 
      ref={drag as any}
      className={`p-4 bg-white rounded-sm border-none transition-all duration-300 ease-in-out ${
        dragState ? 'opacity-0' : 'cursor-grab hover:shadow-lg'
      }`}
    >
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-md text-gray-900 mb-2">{task.title}</h4>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{task.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {task.assignees.slice(0, 2).map((assignee: any, index: number) => (
              <Avatar key={index} className="h-7 w-7 border border-white -ml-4 first:ml-0">
                <AvatarFallback className="bg-blue-500 text-white text-xs">
                  {assignee.initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center space-x-2 border rounded p-1">
            <div className="relative w-4 h-4">
              <svg className="w-5 h-5 transform-rotate-90" viewBox="0 0 16 16">
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-gray-300"
                />
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 6}`}
                  strokeDashoffset={`${2 * Math.PI * 6 * (1 - task.progress / 100)}`}
                  className={`${
                    task.progress === 100 ? 'text-green-600' :
                    task.progress >= 75 ? 'text-blue-600' :
                    task.progress >= 50 ? 'text-yellow-600' :
                    task.progress >= 25 ? 'text-orange-600' :
                    'text-red-600'
                  }`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-600 font-normal">{task.progress}%</span>
          </div>
        </div>

        <Separator className="my-2" />
        
        <div className="flex items-center justify-between mt-3">
          <Badge className="text-sm px-2 bg-white text-gray-800 rounded border border-gray-200">
            {task.priority}
          </Badge>
          
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Paperclip className="h-4 w-4" />
              <span>{task.attachments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>{task.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// TaskColumn with real-time positioning and preview
const TaskColumn = ({ status, tasks, onMoveTask, onReorderTask, dragOverIndex, draggedTask, draggedTaskId, previewTasks }: {
  status: { key: string; label: string; count: number }
  tasks: Task[]
  onMoveTask: (taskId: string, newStatus: string, insertIndex?: number) => void
  onReorderTask: (taskId: string, status: string, insertIndex: number) => void
  dragOverIndex: number | null
  draggedTask: Task | null
  draggedTaskId: string | null
  previewTasks?: Task[]
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item: any, monitor) => {
      const clientOffset = monitor.getClientOffset()
      if (clientOffset) {
        const rect = document.querySelector(`[data-column="${status.key}"]`)?.getBoundingClientRect()
        
        if (rect) {
          const y = clientOffset.y - rect.top
          const taskHeight = 200
          const index = Math.floor(y / taskHeight)
          const maxIndex = tasks.length
          const clampedIndex = Math.min(Math.max(index, 0), maxIndex)
          
          if (item.status !== status.key) {
            onMoveTask(item.id, status.key, clampedIndex)
          } else {
            onReorderTask(item.id, status.key, clampedIndex)
          }
        }
      }
    },
    hover: (item: any, monitor) => {
      const clientOffset = monitor.getClientOffset()
      if (clientOffset) {
        const rect = document.querySelector(`[data-column="${status.key}"]`)?.getBoundingClientRect()
        
        if (rect) {
          // Update drag over index for real-time feedback
          if (draggedTask && draggedTask.id !== item.id) {
            // This will be handled by the parent component
          }
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  // Use preview tasks if available, otherwise use regular tasks
  const displayTasks = previewTasks || tasks

  return (
    <div 
      ref={drop as any}
      data-column={status.key}
      className={`bg-gray-50 rounded-lg p-4 transition-all duration-300 ease-in-out ${
        isOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : 'hover:shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-md text-gray-900">{status.label}</h3>
          <Badge variant="secondary" className="bg-white border border-gray-200 text-gray-600 text-xs px-2 rounded">
            {status.count}
          </Badge>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 cursor-grab hover:bg-gray-200">
            <GripVertical className="h-4 w-4 text-gray-600" />
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-200">
                <CirclePlus className="h-4 w-4 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Task</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <div className="space-y-3">
        {displayTasks.map((task: Task, index: number) => (
          <React.Fragment key={task.id}>
            {/* Drop indicator above task */}
            {dragOverIndex === index && (
              <div className="h-1 bg-blue-400 rounded-full my-2 transition-all duration-300 ease-in-out"></div>
            )}
            
            {task.id === draggedTaskId ? (
              <TaskCard 
                task={task} 
                isPreview={true}
              />
            ) : (
              <TaskCard 
                task={task} 
              />
            )}
          </React.Fragment>
        ))}
        
        {/* Drop indicator at the end */}
        {dragOverIndex === displayTasks.length && (
          <div className="h-1 bg-blue-400 rounded-full my-2 transition-all duration-300 ease-in-out"></div>
        )}
        
        {(!displayTasks || displayTasks.length === 0) && !draggedTask && (
          <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500 mb-2">No task added here.</p>
            <Button variant="outline" size="sm" className="h-8">
              Add Task
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Column swapping with React DnD
const ColumnContainer = ({ status, onColumnMove, children }: {
  status: { key: string; label: string; count: number }
  onColumnMove: (draggedColumnId: string, targetColumnId: string) => void
  children: React.ReactNode
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'column',
    item: { id: status.key },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver }, drop] = useDrop({
    accept: 'column',
    drop: (item: any) => {
      if (item.id !== status.key) {
        onColumnMove(item.id, status.key)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div
      ref={(node) => {
        drag(node)
        drop(node)
      }}
      className={`transition-all duration-300 ease-in-out ${
        isDragging ? 'opacity-50 scale-105' : ''
      } ${isOver ? 'ring-2 ring-blue-300' : ''}`}
    >
      {children}
    </div>
  )
}

// Main component
export default function KanbanComponent() {
  const isMobile = useIsMobile()
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [columnOrder, setColumnOrder] = useState<string[]>([
    "backlog", 
    "todo", 
    "in-progress", 
    "for-checking", 
    "done"
  ])
  const [dragOverIndex] = useState<number | null>(null)
  const [draggedTask] = useState<Task | null>(null)
  const [draggedTaskId] = useState<string | null>(null)
  const [previewTasks, setPreviewTasks] = useState<Record<string, Task[]>>({})
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [filters, setFilters] = useState({
    status: [] as string[],
    priority: [] as string[],
    assignees: [] as string[]
  })
  const [filterSearch, setFilterSearch] = useState("")
  const [assignUsersOpen, setAssignUsersOpen] = useState(false)
  const [assigneeSearch, setAssigneeSearch] = useState("")
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([])

  const availableUsers = [
    { id: "olivia", name: "Olivia Martin", email: "m@example.com", initials: "OM", color: "bg-blue-500" },
    { id: "isabella", name: "Isabella Nguyen", email: "isabella.nguyen@email.com", initials: "IN", color: "bg-purple-500" },
    { id: "emma", name: "Emma Wilson", email: "emma@example.com", initials: "EW", color: "bg-purple-500" },
    { id: "jackson", name: "Jackson Lee", email: "lee@example.com", initials: "JL", color: "bg-orange-500" },
    { id: "william", name: "William Kim", email: "will@email.com", initials: "WK", color: "bg-blue-500" },
    { id: "liam", name: "Liam Johnson", email: "liam@example.com", initials: "LJ", color: "bg-green-500" },
    { id: "sophia", name: "Sophia Davis", email: "sophia@example.com", initials: "SD", color: "bg-pink-500" },
    { id: "noah", name: "Noah Brown", email: "noah@example.com", initials: "NB", color: "bg-indigo-500" }
  ]

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(assigneeSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(assigneeSearch.toLowerCase())
  )

  const handleAssigneeToggle = (userId: string) => {
    setSelectedAssignees(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleAssignUsers = () => {
    console.log("Assigned users:", selectedAssignees)
    setAssignUsersOpen(false)
    setSelectedAssignees([])
    setAssigneeSearch("")
  }

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category as keyof typeof prev], value]
        : prev[category as keyof typeof prev].filter(item => item !== value)
    }))
  }

  const clearFilters = () => {
    setFilters({
      status: [],
      priority: [],
      assignees: []
    })
  }

  const getActiveFiltersCount = () => {
    return filters.status.length + filters.priority.length + filters.assignees.length
  }

  const handleMoveTask = (taskId: string, newStatus: string, insertIndex?: number) => {
    setTasks(prevTasks => {
      const filteredTasks = prevTasks.filter(task => task.id !== taskId)
      const targetColumnTasks = filteredTasks.filter(task => task.status === newStatus)
      const otherTasks = filteredTasks.filter(task => task.status !== newStatus)
      
      const newTask = { ...prevTasks.find(task => task.id === taskId)!, status: newStatus as Task["status"] }
      const insertAt = insertIndex !== undefined ? insertIndex : targetColumnTasks.length
      
      const updatedTargetColumn = [
        ...targetColumnTasks.slice(0, insertAt),
        newTask,
        ...targetColumnTasks.slice(insertAt)
      ]
      
      return [...otherTasks, ...updatedTargetColumn]
    })
  }

  const handleReorderTask = (taskId: string, status: string, insertIndex: number) => {
    setTasks(prevTasks => {
      const filteredTasks = prevTasks.filter(task => task.id !== taskId)
      const targetColumnTasks = filteredTasks.filter(task => task.status === status)
      const otherTasks = filteredTasks.filter(task => task.status !== status)
      
      const newTask = { ...prevTasks.find(task => task.id === taskId)!, status: status as Task["status"] }
      
      const updatedTargetColumn = [
        ...targetColumnTasks.slice(0, insertIndex),
        newTask,
        ...targetColumnTasks.slice(insertIndex)
      ]
      
      return [...otherTasks, ...updatedTargetColumn]
    })
  }

  const handleColumnMove = (draggedColumnId: string, targetColumnId: string) => {
    const newOrder = [...columnOrder]
    const draggedIndex = newOrder.indexOf(draggedColumnId)
    const targetIndex = newOrder.indexOf(targetColumnId)
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      newOrder.splice(draggedIndex, 1)
      newOrder.splice(targetIndex, 0, draggedColumnId)
      setColumnOrder(newOrder)
    }
  }



  // Create preview tasks for real-time feedback
  const createPreviewTasks = () => {
    if (!draggedTask) return {}

    const filteredTasks = tasks.filter(task => task.id !== draggedTask.id)
    const preview: Record<string, Task[]> = {}

    // Create preview for each column
    const statuses = ["backlog", "todo", "in-progress", "for-checking", "done"]
    
    statuses.forEach(status => {
      const columnTasks = filteredTasks.filter(task => task.status === status)
      preview[status] = columnTasks
    })

    return preview
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = []
    }
    acc[task.status].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  const statuses = [
    { key: "backlog", label: "Backlog", count: groupedTasks.backlog?.length || 0 },
    { key: "todo", label: "To-Do", count: groupedTasks.todo?.length || 0 },
    { key: "in-progress", label: "In Progress", count: groupedTasks["in-progress"]?.length || 0 },
    { key: "for-checking", label: "For Checking", count: groupedTasks["for-checking"]?.length || 0 },
    { key: "done", label: "Done", count: groupedTasks.done?.length || 0 }
  ]

  const orderedStatuses = columnOrder.map(key => 
    statuses.find(status => status.key === key)
  ).filter(Boolean) as typeof statuses

  // Update preview tasks when drag state changes
  useEffect(() => {
    if (draggedTask) {
      const preview = createPreviewTasks()
      setPreviewTasks(preview)
    }
  }, [draggedTask])


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedTask) {
        setDragPosition({ x: e.clientX, y: e.clientY })
      }
    }
    if (draggedTask) {
      document.addEventListener('mousemove', handleMouseMove)
      return () => document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [draggedTask])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white">
        <div className={`${isMobile ? '' : 'max-w-[1230px] mx-auto'}`}>
          <div className="mb-8">  
            {isMobile ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">Project 01</h1>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-600 text-white text-sm">TB</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 -ml-2">
                        <AvatarFallback className="bg-gray-600 text-white text-sm">JD</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 -ml-2">
                        <AvatarFallback className="bg-orange-500 text-white text-sm">JS</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex items-center ">
                      <span className="text-sm text-gray-500">+5</span>
                      <Dialog open={assignUsersOpen} onOpenChange={setAssignUsersOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-sm border-gray-300">
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md p-0">
                          <DialogHeader className="sr-only">
                            <DialogTitle>Assign Users</DialogTitle>
                            <DialogDescription>Select users to assign to this task</DialogDescription>
                          </DialogHeader>
                          <div className="p-4 pb-0">
                            <h2 className="text-lg font-semibold text-gray-900">Assign Users</h2>
                          </div>
                          
                          <div className="">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                placeholder="Search user..."
                                value={assigneeSearch}
                                onChange={(e) => setAssigneeSearch(e.target.value)}
                                className="pl-10 w-full border border-gray-200 rounded-none"
                              />
                            </div>
                          </div>
                          
                          <ScrollArea className="h-64">
                            <div>
                              {filteredUsers.map((user) => (
                                <div
                                  key={user.id}
                                  className={`flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                                    selectedAssignees.includes(user.id) ? 'bg-amber-50' : ''
                                  }`}
                                  onClick={() => handleAssigneeToggle(user.id)}
                                >
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className={`${user.color} text-white text-xs`}>
                                      {user.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                      {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {user.email}
                                    </p>
                                  </div>
                                  {selectedAssignees.includes(user.id) && (
                                    <Check className="h-5 w-5 text-blue-600" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          
                          <div className="border-t p-4 flex items-center justify-between">
                            {selectedAssignees.length > 0 ? (
                              <div className="flex items-center">
                                {selectedAssignees.map((userId, index) => {
                                  const user = availableUsers.find(u => u.id === userId)
                                  return user ? (
                                    <Avatar key={userId} className={`h-8 w-8 border-2 border-white ${index > 0 ? '-ml-2' : ''}`}>
                                      <AvatarFallback className={`${user.color} text-white text-xs`}>
                                        {user.initials}
                                      </AvatarFallback>
                                    </Avatar>
                                  ) : null
                                })}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">Select the users to add to this role.</p>
                            )}
                            <Button 
                              onClick={handleAssignUsers} 
                              className={`${selectedAssignees.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'} text-white`}
                              disabled={selectedAssignees.length === 0}
                            >
                              Assign
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Tabs defaultValue="board" className="w-auto">
                    <TabsList className="grid w-auto grid-cols-3 bg-gray-100 h-9 rounded-sm">
                      <TabsTrigger value="board" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm px-4 py-1 text-sm">Board</TabsTrigger>
                      <TabsTrigger value="list" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm px-4 py-1 text-sm">List</TabsTrigger>
                      <TabsTrigger value="table" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm px-4 py-1 text-sm">Table</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-sm border-gray-300">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-sm border-gray-300">
                          <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0" align="end">
                        <div className="p-4">
                          <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Search filters..."
                              value={filterSearch}
                              onChange={(e) => setFilterSearch(e.target.value)}
                              className="pl-10 bg-gray-50 border-gray-200"
                            />
                          </div>
                          
                          <ScrollArea className="h-64">
                            <div className="space-y-1 pr-4">
                              <div>
                                <h4 className="font-medium text-sm text-gray-900 mb-2">Status</h4>
                                <div className="space-y-1 ml-2">
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.status.includes('completed') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('status', 'completed', !filters.status.includes('completed'))}
                                  >
                                    Completed
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.status.includes('in-progress') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('status', 'in-progress', !filters.status.includes('in-progress'))}
                                  >
                                    In Progress
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.status.includes('not-started') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('status', 'not-started', !filters.status.includes('not-started'))}
                                  >
                                    Not Started
                                  </div>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <h4 className="font-medium text-sm text-gray-900 mb-2">Priority</h4>
                                <div className="space-y-1 ml-2">
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.priority.includes('high') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('priority', 'high', !filters.priority.includes('high'))}
                                  >
                                    High
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.priority.includes('medium') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('priority', 'medium', !filters.priority.includes('medium'))}
                                  >
                                    Medium
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.priority.includes('low') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('priority', 'low', !filters.priority.includes('low'))}
                                  >
                                    Low
                                  </div>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <h4 className="font-medium text-sm text-gray-900 mb-2">Assigned To</h4>
                                <div className="space-y-1 ml-2">
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('liam') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'liam', !filters.assignees.includes('liam'))}
                                  >
                                    Liam
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('isabella') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'isabella', !filters.assignees.includes('isabella'))}
                                  >
                                    Isabella
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('noah') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'noah', !filters.assignees.includes('noah'))}
                                  >
                                    Noah
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('ella') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'ella', !filters.assignees.includes('ella'))}
                                  >
                                    Ella
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('ethan') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'ethan', !filters.assignees.includes('ethan'))}
                                  >
                                    Ethan
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('grace') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'grace', !filters.assignees.includes('grace'))}
                                  >
                                    Grace
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('harper') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'harper', !filters.assignees.includes('harper'))}
                                  >
                                    Harper
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('benjamin') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'benjamin', !filters.assignees.includes('benjamin'))}
                                  >
                                    Benjamin
                                  </div>
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                          
                          <Separator className="my-4" />
                          
                          <Button 
                            variant="outline" 
                            className="w-full bg-gray-50 hover:bg-gray-100"
                            onClick={clearFilters}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Button size="sm" className="h-9 w-9 p-0 rounded-sm bg-blue-600 hover:bg-blue-700">
                      <CirclePlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Project 01</h1>
                  <Tabs defaultValue="board" className="w-auto">
                    <TabsList className="grid w-auto grid-cols-3 bg-gray-100 h-9 rounded-sm">
                      <TabsTrigger value="board" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm px-4 py-1 text-sm">Board</TabsTrigger>
                      <TabsTrigger value="list" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm px-4 py-1 text-sm">List</TabsTrigger>
                      <TabsTrigger value="table" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-sm px-4 py-1 text-sm">Table</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-end space-x-3">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-600 text-white text-sm">TB</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 -ml-2">
                        <AvatarFallback className="bg-gray-600 text-white text-sm">JD</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 -ml-2">
                        <AvatarFallback className="bg-orange-500 text-white text-sm">JS</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">+5</span>
                      <Dialog open={assignUsersOpen} onOpenChange={setAssignUsersOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-9 px-3 rounded-sm text-sm border-gray-300">
                            <UserPlus className="h-4 w-4" />
                            Add Assignee
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md p-0">
                          <DialogHeader className="sr-only">
                            <DialogTitle>Assign Users</DialogTitle>
                            <DialogDescription>Select users to assign to this task</DialogDescription>
                          </DialogHeader>
                          <div className="p-4 pb-0">
                            <h2 className="text-lg font-semibold text-gray-900">Assign Users</h2>
                          </div>
                          
                          <div className="">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                placeholder="Search user..."
                                value={assigneeSearch}
                                onChange={(e) => setAssigneeSearch(e.target.value)}
                                className="pl-10 w-full sm:w-80 md:w-96 lg:w-full border border-gray-200 rounded-none"
                              />
                            </div>
                          </div>
                          
                          <ScrollArea className="h-64">
                            <div>
                              {filteredUsers.map((user) => (
                                <div
                                  key={user.id}
                                  className={`flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                                    selectedAssignees.includes(user.id) ? 'bg-amber-50' : ''
                                  }`}
                                  onClick={() => handleAssigneeToggle(user.id)}
                                >
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className={`${user.color} text-white text-xs`}>
                                      {user.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                      {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {user.email}
                                    </p>
                                  </div>
                                  {selectedAssignees.includes(user.id) && (
                                    <Check className="h-5 w-5 text-blue-600" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          
                          <div className="border-t p-4 flex items-center justify-between">
                            {selectedAssignees.length > 0 ? (
                              <div className="flex items-center">
                                {selectedAssignees.map((userId, index) => {
                                  const user = availableUsers.find(u => u.id === userId)
                                  return user ? (
                                    <Avatar key={userId} className={`h-8 w-8 border-2 border-white ${index > 0 ? '-ml-2' : ''}`}>
                                      <AvatarFallback className={`${user.color} text-white text-xs`}>
                                        {user.initials}
                                      </AvatarFallback>
                                    </Avatar>
                                  ) : null
                                })}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">Select the users to add to this role.</p>
                            )}
                            <Button 
                              onClick={handleAssignUsers} 
                              className={`${selectedAssignees.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'} text-white`}
                              disabled={selectedAssignees.length === 0}
                            >
                              Assign
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 h-8 border-gray-300"
                      />
                    </div>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 px-3 rounded-sm text-sm border-gray-300">
                          <SlidersHorizontal className="h-4 w-4" />
                          Filters ({getActiveFiltersCount()})
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0" align="end">
                        <div className="p-4">
                          <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Search filters..."
                              value={filterSearch}
                              onChange={(e) => setFilterSearch(e.target.value)}
                              className="pl-10 bg-gray-50 border-gray-200"
                            />
                          </div>
                          
                          <ScrollArea className="h-64">
                            <div className="space-y-1 pr-4">
                              <div>
                                <h4 className="font-medium text-sm text-gray-900 mb-2">Status</h4>
                                <div className="space-y-1 ml-2">
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.status.includes('completed') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('status', 'completed', !filters.status.includes('completed'))}
                                  >
                                    Completed
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.status.includes('in-progress') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('status', 'in-progress', !filters.status.includes('in-progress'))}
                                  >
                                    In Progress
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.status.includes('not-started') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('status', 'not-started', !filters.status.includes('not-started'))}
                                  >
                                    Not Started
                                  </div>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <h4 className="font-medium text-sm text-gray-900 mb-2">Priority</h4>
                                <div className="space-y-1 ml-2">
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.priority.includes('high') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('priority', 'high', !filters.priority.includes('high'))}
                                  >
                                    High
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.priority.includes('medium') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('priority', 'medium', !filters.priority.includes('medium'))}
                                  >
                                    Medium
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.priority.includes('low') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('priority', 'low', !filters.priority.includes('low'))}
                                  >
                                    Low
                                  </div>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <h4 className="font-medium text-sm text-gray-900 mb-2">Assigned To</h4>
                                <div className="space-y-1 ml-2">
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('liam') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'liam', !filters.assignees.includes('liam'))}
                                  >
                                    Liam
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('isabella') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'isabella', !filters.assignees.includes('isabella'))}
                                  >
                                    Isabella
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('noah') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'noah', !filters.assignees.includes('noah'))}
                                  >
                                    Noah
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('ella') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'ella', !filters.assignees.includes('ella'))}
                                  >
                                    Ella
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('ethan') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'ethan', !filters.assignees.includes('ethan'))}
                                  >
                                    Ethan
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('grace') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'grace', !filters.assignees.includes('grace'))}
                                  >
                                    Grace
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('harper') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'harper', !filters.assignees.includes('harper'))}
                                  >
                                    Harper
                                  </div>
                                  <div 
                                    className={`px-2 py-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded ${
                                      filters.assignees.includes('benjamin') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleFilterChange('assignees', 'benjamin', !filters.assignees.includes('benjamin'))}
                                  >
                                    Benjamin
                                  </div>
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                          
                          <Separator className="my-4" />
                          
                          <Button 
                            variant="outline" 
                            className="w-full bg-gray-50 hover:bg-gray-100"
                            onClick={clearFilters}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Button size="sm" className="h-9 px-3 rounded-sm bg-blue-600 hover:bg-blue-700 text-sm">
                      <CirclePlus className="h-4 w-4" />
                      Add Board
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Blue dragged container that follows mouse */}
          {draggedTask && (
            <div 
              className="fixed z-50 pointer-events-none"
              style={{
                left: dragPosition.x - 160,
                top: dragPosition.y - 100,
              }}
            >
              <Card className="p-4 bg-white rounded-sm border-2 border-blue-400 shadow-2xl opacity-95 transform rotate-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">{draggedTask.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{draggedTask.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {draggedTask.assignees.slice(0, 2).map((assignee: any, index: number) => (
                        <Avatar key={index} className="h-7 w-7 border border-white -ml-4 first:ml-0">
                          <AvatarFallback className="bg-blue-500 text-white text-xs">
                            {assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 border rounded p-1">
                      <div className="relative w-4 h-4">
                        <svg className="w-5 h-5 transform-rotate-90" viewBox="0 0 16 16">
                          <circle
                            cx="7"
                            cy="7"
                            r="6"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="none"
                            className="text-gray-300"
                          />
                          <circle
                            cx="7"
                            cy="7"
                            r="6"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 6}`}
                            strokeDashoffset={`${2 * Math.PI * 6 * (1 - draggedTask.progress / 100)}`}
                            className={`${
                              draggedTask.progress === 100 ? 'text-green-600' :
                              draggedTask.progress >= 75 ? 'text-blue-600' :
                              draggedTask.progress >= 50 ? 'text-yellow-600' :
                              draggedTask.progress >= 25 ? 'text-orange-600' :
                              'text-red-600'
                            }`}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600 font-normal">{draggedTask.progress}%</span>
                    </div>
                  </div>

                  <Separator className="my-2" />
                  
                  <div className="flex items-center justify-between mt-3">
                    <Badge className="text-sm px-2 bg-white text-gray-800 rounded border border-gray-200">
                      {draggedTask.priority}
                    </Badge>
                    
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Paperclip className="h-4 w-4" />
                        <span>{draggedTask.attachments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{draggedTask.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="w-full overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
              {orderedStatuses.map((status) => (
                <div key={status.key} className={`${isMobile ? 'w-72' : 'w-80'} flex-shrink-0`}>
                  <ColumnContainer
                    status={status}
                    onColumnMove={handleColumnMove}
                  >
                    <TaskColumn
                      status={status}
                      tasks={groupedTasks[status.key] || []}
                      onMoveTask={handleMoveTask}
                      onReorderTask={handleReorderTask}
                      dragOverIndex={dragOverIndex}
                      draggedTask={draggedTask}
                      draggedTaskId={draggedTaskId}
                      previewTasks={previewTasks[status.key]}
                    />
                  </ColumnContainer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}