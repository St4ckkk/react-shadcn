import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Search, 
  MoreHorizontal, 
  Folder, 
  FileText, 
  Download,
  Share,
  Trash,
  Star,
  User,
  Settings
} from "lucide-react"

type FileItem = {
  id: string
  name: string
  type: 'file' | 'folder'
  fileType?: string
  size: string
  sizeBytes: number
  date: string
  owner: string
  icon: React.ReactNode
  starred?: boolean
  shared?: boolean
}

type FolderData = {
  id: string
  name: string
  totalFiles: number
  totalSize: string
  lastModified: string
  owner: string
  files: FileItem[]
}

const mockFolders: Record<string, FolderData> = {
  'design': {
    id: 'design',
    name: 'Design',
    totalFiles: 45,
    totalSize: '5.8 GB',
    lastModified: 'Sep 17, 2020',
    owner: 'ArtTemplate',
    files: [
      {
        id: '1',
        name: 'Arion - Admin Dashboard & UI Kit',
        type: 'file',
        fileType: 'sketch',
        size: '1.2 MB',
        sizeBytes: 1258291,
        date: '12.09.20',
        owner: 'ArtTemplate',
        icon: <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center text-white font-bold text-xs">S</div>,
        starred: true,
        shared: true
      },
      {
        id: '2',
        name: 'Brand Styles Guide',
        type: 'file',
        fileType: 'figma',
        size: '4.5 MB',
        sizeBytes: 4718592,
        date: '12.09.20',
        owner: 'ArtTemplate',
        icon: <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white font-bold text-xs">B</div>,
        starred: false,
        shared: false
      },
      {
        id: '3',
        name: 'Design',
        type: 'file',
        fileType: 'ai',
        size: '1.9 GB',
        sizeBytes: 2040109466,
        date: '12.09.20',
        owner: 'ArtTemplate',
        icon: <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xs">AI</div>,
        starred: false,
        shared: true
      },
      {
        id: '4',
        name: 'Project Brief',
        type: 'file',
        fileType: 'figma',
        size: '1.4 MB',
        sizeBytes: 1468006,
        date: '12.09.20',
        owner: 'ArtTemplate',
        icon: <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center text-white font-bold text-xs">F</div>,
        starred: false,
        shared: false
      },
      {
        id: '5',
        name: 'Project Brief',
        type: 'file',
        fileType: 'docx',
        size: '1.2 MB',
        sizeBytes: 1258291,
        date: '12.09.20',
        owner: 'ArtTemplate',
        icon: <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">W</div>,
        starred: false,
        shared: false
      }
    ]
  },
  'documents': {
    id: 'documents',
    name: 'Documents',
    totalFiles: 120,
    totalSize: '2.1 GB',
    lastModified: 'Sep 15, 2020',
    owner: 'ArtTemplate',
    files: [
      {
        id: '6',
        name: 'Project Proposal.docx',
        type: 'file',
        fileType: 'docx',
        size: '2.38 MB',
        sizeBytes: 2495610,
        date: '15.09.20',
        owner: 'ArtTemplate',
        icon: <FileText className="w-6 h-6 text-blue-500" />,
        starred: false,
        shared: false
      },
      {
        id: '7',
        name: 'Meeting Notes.pdf',
        type: 'file',
        fileType: 'pdf',
        size: '856 KB',
        sizeBytes: 876544,
        date: '14.09.20',
        owner: 'ArtTemplate',
        icon: <FileText className="w-6 h-6 text-red-500" />,
        starred: true,
        shared: true
      }
    ]
  }
}


export default function FolderDetails() {
  const { folderId } = useParams<{ folderId: string }>()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [isFileSheetOpen, setIsFileSheetOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const folder = folderId ? mockFolders[folderId] : null

  if (!folder) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Folder not found</h2>
          <p className="text-gray-500 mb-4">The folder you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/file-manager")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to File Manager
          </Button>
        </div>
      </div>
    )
  }

  const filteredFiles = folder.files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
        break
      case 'size':
        comparison = a.sizeBytes - b.sizeBytes
        break
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file)
    setIsFileSheetOpen(true)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(sortedFiles.map(file => file.id))
    } else {
      setSelectedFiles([])
    }
  }

  const handleFileSelect = (fileId: string, checked: boolean) => {
    if (checked) {
      setSelectedFiles(prev => [...prev, fileId])
    } else {
      setSelectedFiles(prev => prev.filter(id => id !== fileId))
    }
  }

  const toggleSort = (field: 'name' | 'date' | 'size') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/file-manager")}
                className="h-8 w-8 p-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{folder.name}</h1>
                <p className="text-sm text-gray-500">{folder.totalFiles} files • {folder.totalSize}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search for files and folders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSort('name')}
                className="text-sm"
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-auto">
          <div className="bg-white">
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedFiles.length === sortedFiles.length && sortedFiles.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <div className="flex-1 grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
                  <div className="col-span-1">Icon</div>
                  <div className="col-span-4">Name</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-1">Owner</div>
                  <div className="col-span-2">Actions</div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {sortedFiles.map((file) => (
                <div
                  key={file.id}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedFile?.id === file.id ? 'bg-yellow-50' : ''
                  }`}
                  onClick={() => handleFileClick(file)}
                >
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={selectedFiles.includes(file.id)}
                      onCheckedChange={(checked) => handleFileSelect(file.id, checked as boolean)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        {file.icon}
                      </div>
                      <div className="col-span-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{file.name}</span>
                          {file.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-500">
                        {file.date}
                      </div>
                      <div className="col-span-2 text-sm text-gray-500">
                        {file.size}
                      </div>
                      <div className="col-span-1">
                        {file.shared ? (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">U</span>
                        )}
                      </div>
                      <div className="col-span-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* File Details Sheet */}
      <Sheet open={isFileSheetOpen} onOpenChange={setIsFileSheetOpen}>
        <SheetContent side="right" className="w-96 p-0">
          {selectedFile && (
            <>
              <SheetHeader className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {selectedFile.icon}
                    <div>
                      <SheetTitle className="text-lg font-semibold text-gray-900">
                        {selectedFile.name}
                      </SheetTitle>
                      <p className="text-sm text-gray-500">{selectedFile.fileType?.toUpperCase()} File</p>
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <div className="p-6 space-y-6">
                {/* File Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">File Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Type</span>
                      <span className="text-gray-900">{selectedFile.fileType?.toUpperCase() || 'File'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Size</span>
                      <span className="text-gray-900">{selectedFile.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Owner</span>
                      <span className="text-gray-900">{selectedFile.owner}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Location</span>
                      <span className="text-gray-900">My Files</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Modified</span>
                      <span className="text-gray-900">Sep 17, 2020 4:25</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Created</span>
                      <span className="text-gray-900">Sep 10, 2020 2:25</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">File Sharing</p>
                        <p className="text-xs text-gray-500">Allow others to access this file</p>
                      </div>
                      <Switch defaultChecked={selectedFile.shared} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Backup</p>
                        <p className="text-xs text-gray-500">Automatically backup this file</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Sync</p>
                        <p className="text-xs text-gray-500">Sync across all devices</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />
       
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Star className="w-4 h-4 mr-2" />
                    {selectedFile.starred ? 'Remove from Starred' : 'Add to Starred'}
                  </Button>
                  <Button className="w-full text-red-600 hover:text-red-700" variant="outline">
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}