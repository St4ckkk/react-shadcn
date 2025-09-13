import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Share, 
  Archive, 
  Tag, 
  Calendar, 
  Clock,
  Image as ImageIcon,
  CheckSquare,
  FileText
} from "lucide-react"

type Note = {
  id: number
  title: string
  type: string
  content?: string
  items?: { text: string; checked: boolean }[]
  labels: string[]
  image?: string
  createdAt?: Date
  updatedAt?: Date
}

const mockNotes: Note[] = [
  {
    id: 1,
    title: "Mountain Sunset Photography",
    type: "note",
    content: "Captured this beautiful sunset during our hiking trip. The colors were absolutely stunning! The way the light hit the mountain peaks created this incredible golden hour effect that I've never seen before. We were at about 8,000 feet elevation when I took this shot, and the air was so clear you could see for miles.",
    labels: ["Family", "Personal"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center",
    createdAt: new Date(2024, 11, 15),
    updatedAt: new Date(2024, 11, 15)
  },
  {
    id: 2,
    title: "Weekly Grocery List",
    type: "checklist",
    items: [
      { text: "Organic vegetables", checked: true },
      { text: "Whole grain bread", checked: true },
      { text: "Greek yogurt", checked: false },
      { text: "Fresh fruits", checked: false },
      { text: "Chicken breast", checked: false },
      { text: "Quinoa", checked: true },
      { text: "Almond milk", checked: false }
    ],
    labels: ["Personal", "Meetings"],
    createdAt: new Date(2024, 11, 14),
    updatedAt: new Date(2024, 11, 14)
  },
  {
    id: 3,
    title: "Project Milestones",
    type: "note",
    content: "Q1 Goals:\n- Launch beta version\n- Gather user feedback\n- Implement core features\n- Performance optimization\n- Security audit\n- Documentation update\n\nQ2 Goals:\n- Advanced analytics dashboard\n- Mobile app development\n- API rate limiting\n- Database optimization\n- User authentication system\n- Third-party integrations\n\nQ3 Goals:\n- AI-powered recommendations\n- Real-time notifications\n- Advanced reporting\n- Multi-language support\n- Enterprise features\n- Performance monitoring",
    labels: ["Tasks"],
    createdAt: new Date(2024, 11, 10),
    updatedAt: new Date(2024, 11, 12)
  }
]

const labels = [
  { name: "Family", color: "bg-pink-500" },
  { name: "Tasks", color: "bg-purple-500" },
  { name: "Personal", color: "bg-green-500" },
  { name: "Meetings", color: "bg-cyan-500" },
  { name: "Shopping", color: "bg-orange-500" },
  { name: "Planning", color: "bg-red-500" },
  { name: "Travel", color: "bg-blue-500" }
]

export default function NotesDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [note, setNote] = useState<Note | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")

  useEffect(() => {
    const noteId = parseInt(id || "0")
    const foundNote = mockNotes.find(n => n.id === noteId)
    if (foundNote) {
      setNote(foundNote)
      setEditTitle(foundNote.title)
      setEditContent(foundNote.content || "")
    }
  }, [id])

  const getLabelColor = (labelName: string) => {
    const label = labels.find(l => l.name === labelName)
    return label ? label.color : "bg-gray-500"
  }

  const toggleChecklistItem = (itemIndex: number) => {
    if (!note || !note.items) return
    
    setNote(prevNote => {
      if (!prevNote || !prevNote.items) return prevNote
      
      return {
        ...prevNote,
        items: prevNote.items.map((item, index) =>
          index === itemIndex
            ? { ...item, checked: !item.checked }
            : item
        )
      }
    })
  }

  const handleSave = () => {
    if (!note) return
    
    setNote(prevNote => {
      if (!prevNote) return prevNote
      
      return {
        ...prevNote,
        title: editTitle,
        content: editContent,
        updatedAt: new Date()
      }
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    navigate("/notes")
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Note not found</h2>
          <p className="text-gray-500 mb-4">The note you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/notes")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Notes
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
 
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/notes")}
            className="h-8 w-8 p-0 rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="bg-transparent border-none outline-none text-2xl font-bold rounded-sm"
                  autoFocus
                />
              ) : (
                note.title
              )}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1 rounded-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Created {note.createdAt?.toLocaleDateString()}</span>
              </div>
              {note.updatedAt && note.updatedAt.getTime() !== note.createdAt?.getTime() && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Updated {note.updatedAt.toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} size="sm" className="rounded-sm">
                Save
              </Button>
              <Button 
                onClick={() => {
                  setIsEditing(false)
                  setEditTitle(note.title)
                  setEditContent(note.content || "")
                }} 
                variant="outline" 
                size="sm"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="rounded-sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="rounded-sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="rounded-sm">
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 rounded-sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Note</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{note.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="rounded-sm">
            <CardContent className="px-4 py-2">
              {note.image && (
                <div className="mb-4">
                  <AspectRatio ratio={16/9} className="rounded-sm overflow-hidden">
                    <img 
                      src={note.image} 
                      alt={note.title}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              )}

              {note.type === "checklist" && note.items ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckSquare className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Checklist</h3>
                  </div>
                  {note.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => toggleChecklistItem(index)}
                        className="h-5 w-5"
                      />
                      <span className={`text-sm flex-1 ${item.checked ? "line-through text-gray-500" : "text-gray-700"}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="prose prose-gray max-w-none">
                  {isEditing ? (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full h-64 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your note content..."
                    />
                  ) : (
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {note.content}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

       
        <div className="space-y-4">

          <Card className="rounded-sm">
            <CardHeader className="">
              <CardTitle className="text-sm font-medium text-gray-900 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Labels
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {note.labels.map((label) => (
                  <div key={label} className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getLabelColor(label)}`} />
                    <span className="text-sm text-gray-700">{label}</span>
                  </div>
                ))}
                {note.labels.length === 0 && (
                  <p className="text-sm text-gray-500">No labels</p>
                )}
              </div>
            </CardContent>
          </Card>

        
          <Card className="rounded-sm">
            <CardHeader className="">
              <CardTitle className="text-sm font-medium text-gray-900">Note Info</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Type</span>
                <Badge variant="secondary" className="capitalize">
                  {note.type}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Items</span>
                <span className="text-gray-900">
                  {note.type === "checklist" ? note.items?.length || 0 : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Labels</span>
                <span className="text-gray-900">{note.labels.length}</span>
              </div>
              {note.image && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Has Image</span>
                  <div className="flex items-center space-x-1">
                    <ImageIcon className="w-4 h-4 text-green-500" />
                    <span className="text-green-600">Yes</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          
          <Card className="rounded-sm">
            <CardHeader className="">
              <CardTitle className="text-sm font-medium text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Share className="w-4 h-4 mr-2" />
                Share Note
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Tag className="w-4 h-4 mr-2" />
                Edit Labels
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
        </div>
    )
}