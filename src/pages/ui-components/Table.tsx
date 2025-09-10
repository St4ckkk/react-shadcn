import DataTable from "@/components/table/data-table"
import ExpandableTable from "@/components/table/expendable-table"
import EditableTable from "@/components/table/editable-table"
import GroupedTable from "@/components/table/grouped-table"
import KanbanTable from "@/components/table/kanban-table"
import TimelineTable from "@/components/table/timeline-table"
import MatrixTable from "@/components/table/matrix-table"
import CardViewTable from "@/components/table/card-view-table"
import AnalyticsTable from "@/components/table/analytics-table"

export default function Table() {
  return (
    <div className="container mx-auto p-6 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Advanced Table Components</h1>
        <p className="text-gray-600">Comprehensive collection of table designs and functionalities using shadcn/ui</p>
      </div>
      
      {/* Main Featured Table */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Main Data Table</h2>
          <p className="text-gray-600">Employee management with search, pagination, and expandable rows</p>
        </div>
        <DataTable />
      </div>

      {/* All Other Table Components */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Specialized Table Components</h2>
          <p className="text-gray-600">Various table designs for different use cases</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpandableTable />
          <EditableTable />
          <GroupedTable />
          <KanbanTable />
          <TimelineTable />
          <MatrixTable />
          <CardViewTable />
          <AnalyticsTable />
        </div>
      </div>
    </div>
  )
}