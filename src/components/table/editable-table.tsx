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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, X, Edit3 } from "lucide-react"

const productData = [
  { id: 1, name: "Laptop Pro", category: "Electronics", price: 1299, stock: 50, status: "Active" },
  { id: 2, name: "Wireless Mouse", category: "Accessories", price: 29, stock: 200, status: "Active" },
  { id: 3, name: "Mechanical Keyboard", category: "Accessories", price: 149, stock: 75, status: "Inactive" }
]

export default function EditableTable() {
  const [data, setData] = useState(productData)
  const [editingCell, setEditingCell] = useState<{row: number, field: string} | null>(null)
  const [editValue, setEditValue] = useState("")

  const startEdit = (rowIndex: number, field: string, currentValue: any) => {
    setEditingCell({ row: rowIndex, field })
    setEditValue(currentValue.toString())
  }

  const saveEdit = () => {
    if (editingCell) {
      const newData = [...data]
      const value = editingCell.field === 'price' || editingCell.field === 'stock' 
        ? Number(editValue) 
        : editValue
      newData[editingCell.row] = { ...newData[editingCell.row], [editingCell.field]: value }
      setData(newData)
      setEditingCell(null)
      setEditValue("")
    }
  }

  const cancelEdit = () => {
    setEditingCell(null)
    setEditValue("")
  }

  const isEditing = (rowIndex: number, field: string) => {
    return editingCell?.row === rowIndex && editingCell?.field === field
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inline Editable Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product, rowIndex) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {isEditing(rowIndex, 'name') ? (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-8"
                      />
                    ) : (
                      <span 
                        className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onDoubleClick={() => startEdit(rowIndex, 'name', product.name)}
                      >
                        {product.name}
                      </span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {isEditing(rowIndex, 'category') ? (
                      <Select value={editValue} onValueChange={setEditValue}>
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Accessories">Accessories</SelectItem>
                          <SelectItem value="Software">Software</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span 
                        className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onDoubleClick={() => startEdit(rowIndex, 'category', product.category)}
                      >
                        {product.category}
                      </span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {isEditing(rowIndex, 'price') ? (
                      <Input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-8"
                      />
                    ) : (
                      <span 
                        className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onDoubleClick={() => startEdit(rowIndex, 'price', product.price)}
                      >
                        ${product.price}
                      </span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {isEditing(rowIndex, 'stock') ? (
                      <Input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-8"
                      />
                    ) : (
                      <span 
                        className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onDoubleClick={() => startEdit(rowIndex, 'stock', product.stock)}
                      >
                        {product.stock}
                      </span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {isEditing(rowIndex, 'status') ? (
                      <Select value={editValue} onValueChange={setEditValue}>
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge 
                        variant={product.status === "Active" ? "default" : "secondary"}
                        className="cursor-pointer"
                        onDoubleClick={() => startEdit(rowIndex, 'status', product.status)}
                      >
                        {product.status}
                      </Badge>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {editingCell?.row === rowIndex ? (
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" onClick={saveEdit}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="ghost">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}