import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"

const orderData = [
  {
    id: "ORD-001",
    customer: {
      name: "Alice Johnson",
      avatar: "https://github.com/shadcn.png"
    },
    items: 3,
    total: 89.99,
    status: "Shipped",
    date: "2024-01-15",
    tracking: "1Z999AA1234567890"
  },
  {
    id: "ORD-002",
    customer: {
      name: "Bob Smith",
      avatar: "https://github.com/vercel.png"
    },
    items: 1,
    total: 24.99,
    status: "Processing",
    date: "2024-01-16",
    tracking: null
  },
  {
    id: "ORD-003",
    customer: {
      name: "Carol Davis",
      avatar: "https://github.com/nextjs.png"
    },
    items: 5,
    total: 156.75,
    status: "Delivered",
    date: "2024-01-14",
    tracking: "1Z999BB9876543210"
  },
  {
    id: "ORD-004",
    customer: {
      name: "David Wilson",
      avatar: "https://github.com/react.png"
    },
    items: 2,
    total: 67.50,
    status: "Cancelled",
    date: "2024-01-13",
    tracking: null
  }
]

export default function OrderTable() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Shipped":
        return <Truck className="h-4 w-4 text-blue-500" />
      case "Processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Cancelled":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Shipped":
        return "default"
      case "Processing":
        return "secondary"
      case "Delivered":
        return "default"
      case "Cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">E-commerce Orders Table</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={order.customer.avatar} />
                      <AvatarFallback>{order.customer.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{order.customer.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span>{order.items}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono font-medium">${order.total}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{order.date}</TableCell>
                <TableCell>
                  {order.tracking ? (
                    <Button variant="outline" size="sm">
                      Track
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" disabled>
                      No Tracking
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}