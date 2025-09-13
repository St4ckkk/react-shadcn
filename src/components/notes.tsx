import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Plus, Search, Grid, List, FileText, Archive, Tag, Menu, Edit, Image, Trash2, Bold, Italic, UnderlineIcon, MoreHorizontal, FileX } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'

type Note = {
    id: number
    title: string
    type: string
    content?: string
    items?: { text: string; checked: boolean }[]
    labels: string[]
    image?: string
}

export default function NotesComponent() {
    const navigate = useNavigate()
    const isMobile = useIsMobile()
    const [viewMode, setViewMode] = useState("grid")
    const [searchTerm, setSearchTerm] = useState("")
    const [noteTitle, setNoteTitle] = useState("")
    const [pressedButtons, setPressedButtons] = useState({
        bold: false,
        italic: false,
        underline: false,
        bulletList: false,
        orderedList: false
    })

    useEffect(() => {
        const style = document.createElement('style')
        style.textContent = `
            .ProseMirror ol {
                list-style-type: decimal !important;
                list-style-position: inside !important;
                padding-left: 0 !important;
                margin-left: 0 !important;
            }
            .ProseMirror ul {
                list-style-type: disc !important;
                list-style-position: inside !important;
                padding-left: 0 !important;
                margin-left: 0 !important;
            }
            .ProseMirror li {
                display: list-item !important;
                margin-left: 0 !important;
                padding-left: 0 !important;
                list-style-position: inside !important;
            }
            .ProseMirror li p {
                display: inline !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .ProseMirror li p:before {
                content: "" !important;
            }
            .ProseMirror li p:after {
                content: "" !important;
            }
        `
        document.head.appendChild(style)
        
        return () => {
            document.head.removeChild(style)
        }
    }, [])
    
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
                listItem: false,
            }),
            BulletList.configure({
                HTMLAttributes: {
                    style: 'list-style-type: disc; list-style-position: inside; padding-left: 0; margin-left: 0;',
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    style: 'list-style-type: decimal; list-style-position: inside; padding-left: 0; margin-left: 0;',
                },
            }),
            ListItem.configure({
                HTMLAttributes: {
                    style: 'display: list-item; list-style-position: inside;',
                },
            }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-3',
                style: 'white-space: pre-wrap;',
            },
        },
        onUpdate: ({ editor }) => {
            if (editor.getText().trim() === '') {
                setPressedButtons({
                    bold: false,
                    italic: false,
                    underline: false,
                    bulletList: false,
                    orderedList: false
                })
            }
        },
    })
    const [notes, setNotes] = useState<Note[]>([
        {
            id: 1,
            title: "Mountain Sunset Photography",
            type: "note",
            content: "Captured this beautiful sunset during our hiking trip. The colors were absolutely stunning!",
            labels: ["Family", "Personal"],
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&crop=center"
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
            labels: ["Personal", "Meetings"]
        },
        {
            id: 3,
            title: "Project Milestones",
            type: "note",
            content: "Q1 Goals:\n- Launch beta version\n- Gather user feedback\n- Implement core features\n- Performance optimization\n- Security audit\n- Documentation update\n\nQ2 Goals:\n- Advanced analytics dashboard\n- Mobile app development\n- API rate limiting\n- Database optimization\n- User authentication system\n- Third-party integrations\n\nQ3 Goals:\n- AI-powered recommendations\n- Real-time notifications\n- Advanced reporting\n- Multi-language support\n- Enterprise features\n- Performance monitoring",
            labels: ["Tasks"]
        },
        {
            id: 4,
            title: "Desert Road Trip Ideas",
            type: "note",
            content: "Potential routes for our upcoming desert adventure. Need to plan stops and accommodation.",
            labels: ["Personal"],
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop&crop=center"
        },
        {
            id: 5,
            title: "Home Renovation Tasks",
            type: "checklist",
            items: [
                { text: "Paint living room", checked: false },
                { text: "Replace kitchen faucet", checked: true },
                { text: "Fix bathroom tiles", checked: false },
                { text: "Install new light fixtures", checked: false }
            ],
            
            labels: ["Tasks"]
        },
        {
            id: 6,
            title: "Meeting Notes",
            type: "note",
            content: "Team standup meeting - discussed progress on Q1 deliverables, identified blockers, and planned next sprint priorities.",
            labels: ["Meetings", "Work"]
        },
        {
            id: 7,
            title: "Travel Packing List",
            type: "checklist",
            items: [
                { text: "Passport and tickets", checked: true },
                { text: "Clothes for 5 days", checked: true },
                { text: "Toiletries", checked: false },
                { text: "Camera and charger", checked: true },
                { text: "Travel adapter", checked: false },
                { text: "Emergency contacts", checked: true },
                { text: "Travel insurance", checked: false },
                { text: "Snacks for flight", checked: false }
            ],
            labels: ["Travel", "Personal"]
        },
        {
            id: 8,
            title: "Recipe Collection",
            type: "note",
            content: "Favorite pasta recipe:\n- 500g spaghetti\n- 4 cloves garlic\n- Cherry tomatoes\n- Fresh basil\n- Olive oil\n- Parmesan cheese\n\nCook pasta, sauté garlic, add tomatoes, toss with pasta and basil. Serve with parmesan.",
            labels: ["Personal", "Cooking"]
        },
        {
            id: 9,
            title: "Book Recommendations",
            type: "note",
            content: "Must-read books for this year:\n1. Atomic Habits by James Clear\n2. The Lean Startup by Eric Ries\n3. Thinking Fast and Slow by Daniel Kahneman\n4. Sapiens by Yuval Noah Harari\n5. The Psychology of Money by Morgan Housel",
            labels: ["Personal", "Learning"]
        },
        {
            id: 10,
            title: "Workout Routine",
            type: "checklist",
            items: [
                { text: "Morning jog (30 min)", checked: true },
                { text: "Push-ups (3 sets)", checked: true },
                { text: "Squats (3 sets)", checked: false },
                { text: "Plank (1 min)", checked: true },
                { text: "Stretching (15 min)", checked: false }
            ],
            labels: ["Personal", "Health"]
        },
        {
            id: 11,
            title: "Code Snippets",
            type: "note",
            content: "Useful React hooks:\n\nuseState - for state management\nuseEffect - for side effects\nuseContext - for context API\nuseReducer - for complex state\nuseMemo - for memoization\nuseCallback - for function memoization\n\nCustom hooks:\nuseLocalStorage\nuseDebounce\nuseToggle",
            labels: ["Tasks", "Development"]
        },
        {
            id: 12,
            title: "Weekend Plans",
            type: "checklist",
            items: [
                { text: "Grocery shopping", checked: false },
                { text: "Visit parents", checked: true },
                { text: "Movie night", checked: false },
                { text: "Garden cleanup", checked: false },
                { text: "Read book", checked: true }
            ],
            labels: ["Personal", "Family"]
        }
    ])

    const labels = [
        { name: "Family", color: "bg-pink-500" },
        { name: "Tasks", color: "bg-purple-500" },
        { name: "Personal", color: "bg-green-500" },
        { name: "Meetings", color: "bg-cyan-500" },
        { name: "Shopping", color: "bg-orange-500" },
        { name: "Planning", color: "bg-red-500" },
        { name: "Travel", color: "bg-blue-500" }
    ]

    const getLabelColor = (labelName: string) => {
        const label = labels.find(l => l.name === labelName)
        return label ? label.color : "bg-gray-500"
    }

    const toggleChecklistItem = (noteId: number, itemIndex: number) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === noteId && note.items
                    ? {
                        ...note,
                        items: note.items.map((item, index) =>
                            index === itemIndex
                                ? { ...item, checked: !item.checked }
                                : item
                        )
                    }
                    : note
            )
        )
    }

    const filteredNotes = notes.filter(note => {
        if (!searchTerm.trim()) return true
        
        const searchLower = searchTerm.toLowerCase()
        return (
            note.title.toLowerCase().includes(searchLower) ||
            (note.content && note.content.toLowerCase().includes(searchLower)) ||
            note.labels.some(label => label.toLowerCase().includes(searchLower)) ||
            (note.items && note.items.some(item => item.text.toLowerCase().includes(searchLower)))
        )
    })

    const handleNoteClick = (noteId: number) => {
        navigate(`/notes/${noteId}`)
    }

    const NoSearchResults = () => (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileX className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes found</h3>
            <p className="text-sm text-gray-500 text-center mb-4">
                We couldn't find any notes matching "{searchTerm}".
            </p>
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSearchTerm("")}
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
            >
                Clear search
            </Button>
        </div>
    )

    const handleFormat = (format: string) => {
        if (!editor) return

        // Toggle the pressed state immediately
        setPressedButtons(prev => ({
            ...prev,
            [format]: !prev[format as keyof typeof prev]
        }))

        switch (format) {
            case 'bold':
                editor.chain().focus().toggleBold().run()
                break
            case 'italic':
                editor.chain().focus().toggleItalic().run()
                break
            case 'underline':
                editor.chain().focus().toggleUnderline().run()
                break
            case 'bulletList':
                editor.chain().focus().toggleBulletList().run()
                break
            case 'orderedList':
                editor.chain().focus().toggleOrderedList().run()
                break
            default:
                return
        }
        
        // Force focus back to editor after command
        setTimeout(() => {
            editor.commands.focus()
        }, 0)
    }

    return (
        <div className="flex bg-white max-w-7xl">
            {!isMobile && (
                <div className="w-60 bg-white border-gray-200 sticky top-3 h-[calc(100vh-100px)]  overflow-y-auto mr-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xs">
                            <Plus className="w-4 h-4" />
                            Add Note
                        </Button>
                    </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>Add New Note</DialogTitle>
                                        <DialogDescription>
                                            Create a new note with title and rich text content.
                                        </DialogDescription>
                                    </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Input 
                                    placeholder="Title" 
                                    className="mt-1 border-none rounded-xs"
                                    value={noteTitle}
                                    onChange={(e) => setNoteTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="mt-1 border border-gray-200 rounded-xs">
                                    <div className="flex items-center space-x-2 p-2 border-b border-gray-200">
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className={`h-8 w-8 p-0 rounded-xs transition-colors ${pressedButtons.bold ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100'}`}
                                            onClick={() => handleFormat('bold')}
                                        >
                                            <Bold className="w-4 h-4" />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className={`h-8 w-8 p-0 rounded-xs transition-colors ${pressedButtons.italic ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100'}`}
                                            onClick={() => handleFormat('italic')}
                                        >
                                            <Italic className="w-4 h-4" />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className={`h-8 w-8 p-0 rounded-xs transition-colors ${pressedButtons.underline ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100'}`}
                                            onClick={() => handleFormat('underline')}
                                        >
                                            <UnderlineIcon className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xs hover:bg-gray-100">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className={`h-8 w-8 p-0 rounded-xs transition-colors ${pressedButtons.bulletList || pressedButtons.orderedList ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100'}`}
                                                >
                                                    <List className="w-4 h-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-48 p-2" align="start">
                                                <div className="space-y-1">
                                                    <button
                                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-sm flex items-center justify-between"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleFormat('orderedList')
                                                        }}
                                                    >
                                                        <span>Numbered list</span>
                                                        <span className="text-xs text-gray-500">Ctrl Shift 7</span>
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-sm flex items-center justify-between"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleFormat('bulletList')
                                                        }}
                                                    >
                                                        <span>Bullet list</span>
                                                        <span className="text-xs text-gray-500">Ctrl Shift 8</span>
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="min-h-[200px]">
                                        <EditorContent 
                                            editor={editor} 
                                            className="prose prose-sm max-w-none focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Image className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Tag className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Archive className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xs">
                    Add Note
                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <Card className="rounded-xs">
                    <CardContent className="mb-6">

                        <div className="space-y-1">
                            <Button variant="ghost" className="w-full justify-start text-sm font-medium" size="sm">
                                <FileText className="w-3 h-3" />
                        Notes
                    </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm font-medium" size="sm">
                                <Archive className="w-3 h-3" />
                        Archive
                    </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm font-medium" size="sm">
                                <Tag className="w-3 h-3" />
                        Edit Labels
                    </Button>
                </div>

                        <Separator className="my-4" />

                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Labels</h3>
                    <div className="space-y-1">
                        {labels.map((label) => (
                                    <div key={label.name} className="flex items-center space-x-2 py-1 px-2">
                                        <div className={`w-2 h-2 rounded-full ${label.color}`} />
                                        <span className="text-sm font-normal text-gray-700">{label.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                    </CardContent>
                </Card>

            </div>
            )}

            <div className="flex-1 flex flex-col">
                <div className="bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            {isMobile && (
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xs border border-gray-200">
                                            <Menu className="w-4 h-4" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="w-80 p-3">
                                        <div className="">
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xs cursor-pointer">
                                                    <Edit className="w-4 h-4 text-gray-600" />
                                                    <span className="text-sm font-medium">Notes</span>
                                                </div>
                                                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xs cursor-pointer">
                                                    <Archive className="w-4 h-4 text-gray-600" />
                                                    <span className="text-sm font-medium">Archive</span>
                                                </div>
                                                <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xs cursor-pointer">
                                                    <Edit className="w-4 h-4 text-gray-600" />
                                                    <span className="text-sm font-medium">Edit Labels</span>
                                                </div>
                                            </div>
                                            
                                            <Separator className="my-4" />
                                            
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-medium text-gray-900 mb-2">Labels</h3>
                                                <div className="space-y-1">
                                                    {labels.map((label) => (
                                                        <div key={label.name} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xs cursor-pointer">
                                                            <div className={`w-2 h-2 rounded-full ${getLabelColor(label.name)}`} />
                                                            <span className="text-sm">{label.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            )}
                            
                            <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search notes"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-gray-200 rounded-xs w-50"
                            />
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            {!isMobile && (
                                <div className="flex items-center">
                            <Button
                                variant={viewMode === "grid" ? "default" : "ghost"}
                                size="sm"
                                        className="h-8 w-8 p-0 rounded-xs border border-gray-200"
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "ghost"}
                                size="sm"
                                        className="h-8 w-8 p-0 rounded-xs border border-gray-200"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                                </div>
                            )}
                            
                        {isMobile && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xs">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>Add New Note</DialogTitle>
                                        <DialogDescription>
                                            Create a new note with title and rich text content.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Input 
                                                placeholder="Title" 
                                                className="mt-1 border-none rounded-xs"
                                                value={noteTitle}
                                                onChange={(e) => setNoteTitle(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <div className="mt-1 border border-gray-200 rounded-xs">
                                                <div className="flex items-center space-x-2 p-2 border-b border-gray-200">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className={`h-8 w-8 p-0 rounded-xs transition-colors ${pressedButtons.bold ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100'}`}
                                                        onClick={() => handleFormat('bold')}
                                                    >
                                                        <Bold className="w-4 h-4" />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className={`h-8 w-8 p-0 rounded-xs transition-colors ${pressedButtons.italic ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100'}`}
                                                        onClick={() => handleFormat('italic')}
                                                    >
                                                        <Italic className="w-4 h-4" />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className={`h-8 w-8 p-0 rounded-xs transition-colors ${pressedButtons.underline ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100'}`}
                                                        onClick={() => handleFormat('underline')}
                                                    >
                                                        <UnderlineIcon className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xs hover:bg-gray-100">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="sm" 
                                                                className={`h-8 w-8 p-0 rounded-xs transition-colors ${pressedButtons.bulletList || pressedButtons.orderedList ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-100'}`}
                                                            >
                                                                <List className="w-4 h-4" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-48 p-2" align="start">
                                                            <div className="space-y-1">
                                                                <button
                                                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-sm flex items-center justify-between"
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        handleFormat('orderedList')
                                                                    }}
                                                                >
                                                                    <span>Numbered list</span>
                                                                    <span className="text-xs text-gray-500">Ctrl Shift 7</span>
                                                                </button>
                                                                <button
                                                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-sm flex items-center justify-between"
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        handleFormat('bulletList')
                                                                    }}
                                                                >
                                                                    <span>Bullet list</span>
                                                                    <span className="text-xs text-gray-500">Ctrl Shift 8</span>
                                                                </button>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <div className="min-h-[200px]">
                                                    <EditorContent 
                                                        editor={editor} 
                                                        className="prose prose-sm max-w-none focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <Image className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <Tag className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <Archive className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xs">
                                                Add Note
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                        </div>
                    </div>
                </div>

                <ScrollArea className="flex">
                    {filteredNotes.length === 0 && searchTerm.trim() ? (
                        <NoSearchResults />
                    ) : (
                        <div className={isMobile ? "space-y-4" : viewMode === "grid" ? "columns-1 md:columns-2 lg:columns-4 gap-2 space-y-2" : "space-y-4"}>
                            {filteredNotes.map((note) => (
                            <Card 
                                key={note.id} 
                                className={`cursor-pointer border border-gray-200 rounded-xs hover:shadow-sm transition-shadow break-inside-avoid mb-4 ${isMobile ? "w-full" : viewMode === "grid" ? "w-57" : "w-full"}`}
                                onClick={() => handleNoteClick(note.id)}
                            >
                                {viewMode === "grid" ? (
                                    <>
                                {note.image && (
                                            <AspectRatio ratio={16/9} className="rounded-t-xs overflow-hidden -mt-4">
                                                <img 
                                                    src={note.image} 
                                                    alt={note.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </AspectRatio>
                                        )}
                                        <CardContent className="px-2">
                                            <h3 className="font-bold text-xl text-gray-900 mb-3">{note.title}</h3>
                                    
                                            {note.type === "checklist" && note.items ? (
                                                <div className="space-y-2 mb-4">
                                                    {note.items?.map((item, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        checked={item.checked}
                                                        onCheckedChange={() => toggleChecklistItem(note.id, index)}
                                                        className="h-4 w-4"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    <span className={`text-sm ${item.checked ? "line-through text-gray-500" : "text-gray-700"}`}>
                                                        {item.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{note.content}</p>
                                    )}

                                    {note.labels.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                            {note.labels.map((label) => (
                                                        <div key={label} className="flex items-center space-x-1 border border-gray-200 rounded-xs px-1 py-0.5">
                                                    <div className={`w-2 h-2 rounded-full ${getLabelColor(label)}`} />
                                                    <span className="text-xs text-gray-600">{label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                                    </>
                                ) : (
                                    <div className="flex">
                                        {note.image && (
                                            <div className="w-60 h-[155px] rounded-l-xs overflow-hidden flex-shrink-0 -ml-4 -my-4">
                                                <img 
                                                    src={note.image} 
                                                    alt={note.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 p-4">
                                            <h3 className="font-bold text-2xl text-gray-900 mb-2">{note.title}</h3>
                                            
                                            {note.type === "checklist" && note.items ? (
                                                <div className="space-y-1 mb-3">
                                                    {note.items?.map((item, index) => (
                                                        <div key={index} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                checked={item.checked}
                                                                onCheckedChange={() => toggleChecklistItem(note.id, index)}
                                                                className="h-4 w-4"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                            <span className={`text-sm ${item.checked ? "line-through text-gray-500" : "text-gray-700"}`}>
                                                                {item.text}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{note.content}</p>
                                            )}

                                            {note.labels.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {note.labels.map((label) => (
                                                        <div key={label} className="flex items-center space-x-1 border border-gray-200 rounded-xs px-1 py-1">
                                                            <div className={`w-2 h-2 rounded-full ${getLabelColor(label)}`} />
                                                            <span className="text-xs text-gray-600">{label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Card>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    )
}