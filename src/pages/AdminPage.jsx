import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { ArrowDownUp, Download, Search, UserRound } from 'lucide-react'
import { Input } from "../components/ui/input"
import { useState } from "react"

// Simple Table components since we don't have them
function Table({ children, ...props }) {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full caption-bottom text-sm" {...props}>
        {children}
      </table>
    </div>
  )
}

function TableHeader({ children, ...props }) {
  return <thead className="[&_tr]:border-b" {...props}>{children}</thead>
}

function TableBody({ children, ...props }) {
  return <tbody className="[&_tr:last-child]:border-0" {...props}>{children}</tbody>
}

function TableRow({ children, ...props }) {
  return <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" {...props}>{children}</tr>
}

function TableHead({ children, ...props }) {
  return (
    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" {...props}>
      {children}
    </th>
  )
}

function TableCell({ children, ...props }) {
  return <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0" {...props}>{children}</td>
}

// Simple Tabs components
function Tabs({ children, defaultValue, ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  
  return (
    <div {...props}>
      {children.map(child => 
        child.type.name === 'TabsList' 
          ? { ...child, props: { ...child.props, activeTab, setActiveTab } }
          : child.type.name === 'TabsContent' && child.props.value === activeTab
          ? child
          : child.type.name === 'TabsContent'
          ? null
          : child
      )}
    </div>
  )
}

function TabsList({ children, activeTab, setActiveTab, ...props }) {
  return (
    <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground" {...props}>
      {children.map(child => ({
        ...child,
        props: {
          ...child.props,
          isActive: child.props.value === activeTab,
          onClick: () => setActiveTab(child.props.value)
        }
      }))}
    </div>
  )
}

function TabsTrigger({ children, value, isActive, onClick, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive ? 'bg-background text-foreground shadow-sm' : ''
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

function TabsContent({ children, value, ...props }) {
  return <div {...props}>{children}</div>
}

const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    phone: "+1 234 567 890",
    orders: 5,
    notes: "Prefers delivery on weekends",
  },
  {
    id: 2,
    name: "Michael Chen",
    phone: "+1 345 678 901",
    orders: 3,
    notes: "Allergic to synthetic fabrics",
  },
  {
    id: 3,
    name: "Aisha Patel",
    phone: "+1 456 789 012",
    orders: 8,
    notes: "VIP customer, offer discounts",
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    phone: "+1 567 890 123",
    orders: 2,
    notes: "New customer",
  },
  {
    id: 5,
    name: "Emma Wilson",
    phone: "+1 678 901 234",
    orders: 6,
    notes: "Prefers Viber for communication",
  },
]

export default function AdminPage() {
  return (
    <div className="container p-4 mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Manage your store</p>
      </div>

      <div className="mb-6">
        <Card className="border-none shadow-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-30"></div>
          <CardHeader className="pb-2 relative">
            <CardTitle>Overview</CardTitle>
            <CardDescription>Manage your store and customers</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-none shadow-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 opacity-50"></div>
                <CardContent className="flex flex-col items-center justify-center p-6 relative">
                  <UserRound className="w-8 h-8 mb-2 text-pink-500" />
                  <p className="text-sm font-medium">Total Customers</p>
                  <h3 className="text-2xl font-bold">128</h3>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 opacity-50"></div>
                <CardContent className="flex flex-col items-center justify-center p-6 relative">
                  <ArrowDownUp className="w-8 h-8 mb-2 text-purple-500" />
                  <p className="text-sm font-medium">Total Orders</p>
                  <h3 className="text-2xl font-bold">256</h3>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-1 bg-gradient-to-r from-pink-100 to-purple-100">
          <TabsTrigger value="customers">
            Customers
          </TabsTrigger>
          <TabsTrigger value="orders">
            Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="customers" className="mt-4">
          <Card className="border-none shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-30"></div>
            <CardHeader className="pb-2 relative">
              <CardTitle>Customer List</CardTitle>
              <CardDescription>Manage your customers and their information</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search customers..." className="pl-8 bg-white/80" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-pink-50/50">
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.orders}</TableCell>
                        <TableCell className="max-w-[150px] truncate">{user.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="outline" className="gap-2 bg-white/80">
                  <Download className="w-4 h-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="mt-4">
          <Card className="border-none shadow-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-30"></div>
            <CardHeader className="relative">
              <CardTitle>Orders</CardTitle>
              <CardDescription>View and manage all customer orders</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-center text-gray-500">Order management coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}