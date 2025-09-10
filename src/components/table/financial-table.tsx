import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

const financialData = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.25,
    change: 2.45,
    changePercent: 1.31,
    volume: "45.2M",
    marketCap: "2.95T"
  },
  {
    id: 2,
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.18,
    change: -1.23,
    changePercent: -0.86,
    volume: "28.7M",
    marketCap: "1.78T"
  },
  {
    id: 3,
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 378.91,
    change: 5.67,
    changePercent: 1.52,
    volume: "32.1M",
    marketCap: "2.81T"
  },
  {
    id: 4,
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.42,
    change: -3.21,
    changePercent: -1.27,
    volume: "67.8M",
    marketCap: "789.2B"
  }
]

export default function FinancialTable() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Financial Data Table</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financialData.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell className="font-mono font-bold">{stock.symbol}</TableCell>
                <TableCell className="font-medium">{stock.name}</TableCell>
                <TableCell className="font-mono">
                  <DollarSign className="inline h-3 w-3 mr-1" />
                  {stock.price}
                </TableCell>
                <TableCell>
                  <div className={`flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    <span className="font-mono">
                      {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{stock.volume}</TableCell>
                <TableCell className="font-mono text-sm">{stock.marketCap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}