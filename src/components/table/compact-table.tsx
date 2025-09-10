import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageCircle, Heart } from "lucide-react"

const socialData = [
  {
    id: 1,
    user: {
      name: "Sarah Wilson",
      avatar: "https://github.com/shadcn.png",
      handle: "@sarahw"
    },
    post: "Just launched our new product! ��",
    likes: 124,
    comments: 23,
    shares: 8,
    time: "2h ago"
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "https://github.com/vercel.png",
      handle: "@mikec"
    },
    post: "Amazing sunset from my office window today",
    likes: 89,
    comments: 12,
    shares: 3,
    time: "4h ago"
  },
  {
    id: 3,
    user: {
      name: "Emma Davis",
      avatar: "https://github.com/nextjs.png",
      handle: "@emmad"
    },
    post: "Working on some exciting new features for our app",
    likes: 156,
    comments: 34,
    shares: 12,
    time: "6h ago"
  }
]

export default function CompactTable() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Compact Social Feed Table</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Post</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {socialData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.user.avatar} />
                      <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{item.user.name}</div>
                      <div className="text-xs text-gray-500">{item.user.handle}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-sm truncate">{item.post}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{item.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{item.shares}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-gray-500">{item.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}