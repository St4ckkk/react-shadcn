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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

const salesData = [
  {
    id: 1,
    product: "Laptop Pro",
    sales: 125000,
    growth: 12.5,
    target: 150000,
    region: "North America",
    trend: [100, 120, 110, 125, 130, 125]
  },
  {
    id: 2,
    product: "Wireless Mouse",
    sales: 45000,
    growth: -5.2,
    target: 50000,
    region: "Europe",
    trend: [50, 48, 52, 45, 47, 45]
  },
  {
    id: 3,
    product: "Mechanical Keyboard",
    sales: 78000,
    growth: 8.3,
    target: 80000,
    region: "Asia",
    trend: [70, 72, 75, 78, 76, 78]
  }
]

export default function AnalyticsTable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const getMiniChart = (trend: number[]) => {
    const max = Math.max(...trend)
    const min = Math.min(...trend)
    const range = max - min
    
    return (
      <div className="flex items-end space-x-1 h-8">
        {trend.map((value, index) => (
          <div
            key={index}
            className="bg-blue-500 rounded-sm"
            style={{
              width: '4px',
              height: `${((value - min) / range) * 100}%`,
              minHeight: '2px'
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Analytics Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Growth</TableHead>
                <TableHead>Target Progress</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((item) => (
                <TableRow 
                  key={item.id}
                  onMouseEnter={() => setHoveredRow(item.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell className="font-mono">${item.sales.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className={`flex items-center space-x-1 ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.growth >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-medium">{item.growth >= 0 ? '+' : ''}{item.growth}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={(item.sales / item.target) * 100} className="w-20" />
                      <span className="text-sm text-gray-600">
                        {Math.round((item.sales / item.target) * 100)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.region}</Badge>
                  </TableCell>
                  <TableCell>
                    {hoveredRow === item.id ? (
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-blue-600">Monthly Trend</span>
                      </div>
                    ) : (
                      getMiniChart(item.trend)
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