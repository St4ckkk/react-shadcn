import MainLayout from "@/components/layout/main-layout";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileText, Image, Video, File, Star, Calendar, MoreHorizontal, ChevronRight, EllipsisVertical, Download, Share, Trash } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        name?: string;
        dataKey?: string;
    }>;
    label?: string;
}


const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-1 border border-gray-200 rounded-xs">
                <div className="flex items-center gap-1 mb-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-xs"></div>
                    <span className="text-[9px]">Desktop</span>
                    <span className="text-[9px] font-medium ml-auto">{payload[0].value}</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-xs"></div>
                    <span className="text-[9px]">Mobile</span>
                    <span className="text-[9px] font-medium ml-auto">{payload[1].value}</span>
                </div>
            </div>
        );
    }
    return null;
};



export default function FileManager() {

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(2025, 7, 16),
        to: new Date(2025, 8, 12),
    });
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    // Storage data for the top cards
    const storageData = [
        {
            type: "Documents",
            count: 1390,
            used: "2.1 GB",
            percentage: 35,
            color: "bg-blue-500",
            icon: <FileText className="h-5 w-5 text-blue-500" />
        },
        {
            type: "Images",
            count: 5678,
            used: "3.8 GB",
            percentage: 62,
            color: "bg-green-500",
            icon: <Image className="h-5 w-5 text-green-500" />
        },
        {
            type: "Videos",
            count: 901,
            used: "7.5 GB",
            percentage: 89,
            color: "bg-red-500",
            icon: <Video className="h-5 w-5 text-red-500" />
        },
        {
            type: "Others",
            count: 234,
            used: "1.2 GB",
            percentage: 28,
            color: "bg-amber-500",
            icon: <File className="h-5 w-5 text-amber-500" />
        },
    ];


    const fileInputRef = useRef<HTMLInputElement>(null);
    // const [ setIsUploading] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {

            const newFiles = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...newFiles]);


            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files);
            setSelectedFiles(prev => [...prev, ...newFiles]);
        }
    };

    const handleStartUpload = () => {
        // setIsUploading(true);


        setTimeout(() => {
            // setIsUploading(false);
            setSelectedFiles([]);
            setUploadDialogOpen(false);
        }, 2000);
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };
    // Folders data
    const foldersData = [
        { name: "Documents", items: 120, lastUpdate: "10 days ago", starred: true, icon: <FileText className="h-4 w-4 text-orange-500" /> },
        { name: "Images", items: 250, lastUpdate: "2 days ago", starred: false, icon: <Image className="h-4 w-4 text-blue-500" /> },
        { name: "Downloads", items: 80, lastUpdate: "Yesterday", starred: false, icon: <File className="h-4 w-4 text-blue-500" /> },
    ];

    // Files data
    const filesData = [
        { name: "project-proposal.docx", size: "2.38 MB", uploadDate: "Apr 15, 2025", type: "docx", icon: <FileText className="h-4 w-4 text-gray-500" /> },
        { name: "company-logo.png", size: "1.14 MB", uploadDate: "Apr 14, 2025", type: "png", icon: <Image className="h-4 w-4 text-gray-500" /> },
        { name: "presentation.pptx", size: "5.34 MB", uploadDate: "Apr 13, 2025", type: "pptx", icon: <FileText className="h-4 w-4 text-gray-500" /> },
        { name: "budget.xlsx", size: "957.03 KB", uploadDate: "Mar 12, 2025", type: "xlsx", icon: <FileText className="h-4 w-4 text-gray-500" /> },
        { name: "product-video.mp4", size: "150.68 MB", uploadDate: "Apr 11, 2025", type: "mp4", icon: <Video className="h-4 w-4 text-gray-500" /> },
    ];

    // Monthly data for the chart
    const chartData = [
        { name: "Jan", desktop: 10, mobile: 5 },
        { name: "Feb", desktop: 25, mobile: 12 },
        { name: "Mar", desktop: 15, mobile: 8 },
        { name: "Apr", desktop: 8, mobile: 7 },
        { name: "May", desktop: 15, mobile: 10 },
        { name: "Jun", desktop: 18, mobile: 8 },
        { name: "Jul", desktop: 12, mobile: 5 },
        { name: "Aug", desktop: 24, mobile: 14 },
        { name: "Sep", desktop: 14, mobile: 10 },
        { name: "Oct", desktop: 20, mobile: 12 },
        { name: "Nov", desktop: 18, mobile: 10 },
        { name: "Dec", desktop: 22, mobile: 12 },
    ];

    return <MainLayout
        title="File Manager"
        description="Manage your files efficiently with our intuitive file manager."
    >

        {/* Upload Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload Files</DialogTitle>
                    <div className="text-xs text-gray-500">Drag and drop files here or click to select files</div>
                </DialogHeader>

                <div
                    className={`border-2 border-dashed rounded-md p-5 text-center cursor-pointer transition-all duration-200
                     ${isDragging
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <Input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        onChange={handleFileSelect}
                        accept="image/*,video/*,application/*"
                    />
                    <div className="mx-auto flex flex-col items-center">
                        <div className={`transition-colors duration-200  ${isDragging ? 'text-blue-500' : 'text-gray-300'}`}>
                            <Upload className="h-10 w-10" />
                        </div>
                        <p className="mt-2 text-xs font-medium">Upload a file or drag and drop</p>
                        <p className="text-[8px] text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>

                {selectedFiles.length > 0 && (
                    <div className="">
                        <div className="text-xs font-normal text-gray-500">Selected Files</div>
                        <div className="mt-2 border rounded-xs overflow-hidden">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between border-b last:border-b-0 py-2 px-3">
                                    <div className="flex-1 pr-2">
                                        <div className="flex items-center">
                                            <span className="text-xs truncate">{file.name}</span>
                                            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{formatFileSize(file.size)}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 rounded-xs hover:bg-gray-100"
                                        onClick={() => removeFile(index)}
                                    >
                                        <span className="text-lg">×</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <DialogFooter className="flex justify-end gap-3 ">
                    <Button
                        variant="outline"
                        className="border rounded-xs border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                        onClick={() => setUploadDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-blue-500 rounded-xs hover:bg-blue-600 text-white"
                        disabled={selectedFiles.length === 0}
                        onClick={handleStartUpload}
                    >
                        Start Upload
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <div className="space-y-6">
            <div className="flex items-center justify-end">
                <Button className="bg-blue-600 rounded-xs cursor-pointer hover:bg-blue-700" onClick={() => setUploadDialogOpen(true)}>
                    <Upload className="h-4 w-4 mr-2" /> Upload
                </Button>
            </div>

            {/* Storage status cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {storageData.map((item, index) => (
                    <Card key={index} className="border border-gray-200 rounded-sm">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div className="text-sm font-medium">{item.type}</div>
                            {item.icon}
                        </CardHeader>
                        <CardContent className="">
                            <div className="text-xl font-bold">{item.count}</div>
                            <Progress className={`h-[6px] mt-2 ${item.color}`} value={item.percentage} />
                            <div className="mt-2 flex justify-between text-xs text-gray-500">
                                <span>{item.used} used</span>
                                <span>{item.percentage}%</span>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t">
                            <Button variant="ghost" className="text-blue-500 text-xs hover:text-blue-600 ml-auto">
                                View more <ChevronRight className="h-4 w-4 mt-1" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Folders and storage space */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {foldersData.map((folder, index) => (
                    <Card key={index} className="border border-gray-200 rounded-sm">
                        <CardContent className="">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    {folder.icon}
                                    <span className="ml-2 font-medium text-gray-700">{folder.name}</span>
                                </div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                            <EllipsisVertical className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[100px] rounded-xs p-0 shadow-sm" align="end" sideOffset={5}>
                                        <div className="flex flex-col divide-y divide-gray-100">
                                            <Button
                                                variant="ghost"
                                                className="flex items-center justify-start text-xs font-normal border-none rounded-none hover:bg-gray-50 h-7"
                                                onClick={() => console.log(`Downloading file`)}
                                            >
                                                <Download className="h-2 w-2" />
                                                Download
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="flex items-center justify-start  text-xs font-normal border-none rounded-none hover:bg-gray-50 h-7"
                                                onClick={() => console.log(`Sharing file`)}
                                            >
                                                <Share className="h-2 w-2" />
                                                Share
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                className="flex items-center border-t justify-start px-2 py-1 text-xs font-normal text-red-500 rounded-none hover:bg-gray-50 h-7"
                                                onClick={() => console.log(`Deleting file`)}
                                            >
                                                <Trash className="h-2 w-2" />
                                                Delete
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                            </div>
                            <div className="mt-6 px-2 py-1 bg-gray-50 text-xs rounded border border-gray-200">
                                {folder.items} items
                            </div>
                            <div className="mt-1 flex items-center justify-between text-[9px] text-gray-500">
                                <div>Last update: {folder.lastUpdate}</div>
                                {folder.starred && <Star className="h-3 w-3 text-amber-400 fill-amber-400" />}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <Card className="border border-gray-200 rounded-sm col-span-1 md:col-span-3 lg:col-span-2">
                    <CardContent className="">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">Storage Space Used</div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                                <ChevronRight className="h-3 w-3" />
                            </Button>
                        </div>
                        <div className="text-xs text-gray-500">See your remaining file storage</div>


                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-gray-500">1.8 GB used</span>
                            <span className="text-xs text-gray-500">3 GB total</span>
                        </div>
                        <Progress className="h-[6px] mt-3" value={60} />
                    </CardContent>
                </Card>
            </div>

            {/* Monthly file transfer chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card className="border border-gray-200 rounded-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-sm">Monthly File Transfer</div>
                                <div className="text-xs text-gray-500">Last 28 days</div>
                            </div>
                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="h-8 border-gray-200 text-xs text-gray-500 font-normal flex justify-between items-center gap-2 rounded-xs"
                                    >
                                        <Calendar className="h-3.5 w-3.5 " />
                                        {dateRange?.from ? (
                                            dateRange.to ? (
                                                <>
                                                    {format(dateRange.from, "d MMM yyyy")} - {format(dateRange.to, "d MMM yyyy")}
                                                </>
                                            ) : (
                                                format(dateRange.from, "d MMM yyyy")
                                            )
                                        ) : (
                                            <span>Pick a date range</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="end">
                                    <div className="flex">
                                        <div className="border-r p-2 space-y-2 w-[200px]">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start font-normal text-sm"
                                                onClick={() => {
                                                    setDateRange({
                                                        from: new Date(),
                                                        to: new Date()
                                                    });
                                                }}
                                            >
                                                Today
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start font-normal text-sm"
                                                onClick={() => {
                                                    const yesterday = new Date();
                                                    yesterday.setDate(yesterday.getDate() - 1);
                                                    setDateRange({
                                                        from: yesterday,
                                                        to: yesterday
                                                    });
                                                }}
                                            >
                                                Yesterday
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start font-normal text-sm"
                                                onClick={() => {
                                                    const today = new Date();
                                                    const start = new Date(today);
                                                    start.setDate(today.getDate() - today.getDay());
                                                    setDateRange({
                                                        from: start,
                                                        to: today
                                                    });
                                                }}
                                            >
                                                This Week
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start font-normal text-sm"
                                                onClick={() => {
                                                    const today = new Date();
                                                    const start = new Date(today);
                                                    start.setDate(today.getDate() - 7);
                                                    setDateRange({
                                                        from: start,
                                                        to: today
                                                    });
                                                }}
                                            >
                                                Last 7 Days
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start font-normal text-sm"
                                                onClick={() => {
                                                    const today = new Date();
                                                    const start = new Date(today);
                                                    start.setDate(today.getDate() - 28);
                                                    setDateRange({
                                                        from: start,
                                                        to: today
                                                    });
                                                }}
                                            >
                                                Last 28 Days
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start font-normal text-sm"
                                                onClick={() => {
                                                    const today = new Date();
                                                    const start = new Date(today.getFullYear(), today.getMonth(), 1);
                                                    setDateRange({
                                                        from: start,
                                                        to: today
                                                    });
                                                }}
                                            >
                                                This Month
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start font-normal text-sm"
                                                onClick={() => {
                                                    const today = new Date();
                                                    const lastMonth = new Date(today);
                                                    lastMonth.setMonth(lastMonth.getMonth() - 1);
                                                    const start = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
                                                    const end = new Date(today.getFullYear(), today.getMonth(), 0);
                                                    setDateRange({
                                                        from: start,
                                                        to: end
                                                    });
                                                }}
                                            >
                                                Last Month
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start font-normal text-sm"
                                                onClick={() => {
                                                    const today = new Date();
                                                    const start = new Date(today.getFullYear(), 0, 1);
                                                    setDateRange({
                                                        from: start,
                                                        to: today
                                                    });
                                                }}
                                            >
                                                This Year
                                            </Button>
                                        </div>
                                        <div>
                                            <CalendarComponent
                                                initialFocus
                                                mode="range"
                                                defaultMonth={dateRange?.from}
                                                selected={dateRange}
                                                onSelect={(range) => {
                                                    setDateRange(range);
                                                    if (range?.to) {
                                                        setTimeout(() => setCalendarOpen(false), 500);
                                                    }
                                                }}
                                                numberOfMonths={1}
                                            />
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
                                >

                                    <XAxis
                                        dataKey="name"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: '#888888' }}
                                    />
                                    <YAxis
                                        hide
                                    />
                                    <Tooltip
                                        content={<CustomTooltip />}
                                        cursor={{ fill: 'rgba(240, 242, 247, 0.5)' }}
                                        wrapperStyle={{ zIndex: 1000 }}
                                    />
                                    <Bar
                                        dataKey="desktop"
                                        name="Desktop"
                                        fill="#2563EB"
                                        radius={[4, 4, 0, 0]}
                                        barSize={30}
                                    />
                                    <Bar
                                        dataKey="mobile"
                                        name="Mobile"
                                        fill="#6366F1"
                                        radius={[4, 4, 0, 0]}
                                        barSize={30}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        align="center"
                                        iconType="square"
                                        iconSize={8}
                                        wrapperStyle={{
                                            fontSize: '10px',
                                        }}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>


                <Card className="border border-gray-200 rounded-sm">
                    <CardHeader className="">
                        <div className="flex items-center justify-between">
                            <div className="font-medium text-sm">Recently Uploaded Files</div>
                            <div className="">
                                <Button variant="ghost" className="text-blue-500 border border-gray-200 rounded-xs p-1 text-xs font-normal rounded-none hover:text-blue-600 h-auto">
                                    View All <ChevronRight className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className=" pt-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="">
                                    <TableHead className="text-xs text-gray-500 font-normal">Name</TableHead>
                                    <TableHead className="text-xs text-gray-500 font-normal">Size</TableHead>
                                    <TableHead className="text-xs text-gray-500 font-normal">Upload Date</TableHead>
                                    <TableHead className="text-xs text-gray-500 font-normal">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filesData.map((file, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className="flex items-center">
                                                {file.icon}
                                                <span className="ml-2">{file.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{file.size}</TableCell>
                                        <TableCell>{file.uploadDate}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[100px] rounded-xs p-0 shadow-sm" align="end" sideOffset={5}>
                                                        <div className="flex flex-col divide-y divide-gray-100">
                                                            <Button
                                                                variant="ghost"
                                                                className="flex items-center justify-start text-xs font-normal border-none rounded-none hover:bg-gray-50 h-7"
                                                                onClick={() => console.log(`Downloading file`)}
                                                            >
                                                                <Download className="h-2 w-2" />
                                                                Download
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                className="flex items-center justify-start  text-xs font-normal border-none rounded-none hover:bg-gray-50 h-7"
                                                                onClick={() => console.log(`Sharing file`)}
                                                            >
                                                                <Share className="h-2 w-2" />
                                                                Share
                                                            </Button>

                                                            <Button
                                                                variant="ghost"
                                                                className="flex items-center border-t justify-start px-2 py-1 text-xs font-normal text-red-500 rounded-none hover:bg-gray-50 h-7"
                                                                onClick={() => console.log(`Deleting file`)}
                                                            >
                                                                <Trash className="h-2 w-2" />
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    </MainLayout>;
}