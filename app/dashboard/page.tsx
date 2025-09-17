"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DashboardNavBar1 from "../components/DashboardNavbar1";
import { 
  BarChart3, 
  Users, 
  Activity, 
  DollarSign,
  LineChart,
  PieChart,
  Bell,
  Calendar,
  Home,
  Settings,
  User,
  FileText,
  PlusCircle,
  Shield,
  LogOut
} from "lucide-react";
import { IoAdd } from "react-icons/io5";
import Sidebar1 from "../components/Sidebar1";

export default function Dashboard() {
  const { data: sessionData } = useSession({ required: true });
  const user = sessionData?.user;
  
  // State to control sidebar visibility if needed
  const [hideSidebar, setHideSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar - Fixed at the top */}
      <div className="sticky top-0 z-10 border-b bg-white dark:bg-gray-950">
        <DashboardNavBar1 
          leftSection={
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold">SecurePortal</h2>
            </div>
          }
          avatarArea={{
            username: user?.name || "User",
            avatarFallback: user?.name?.[0] || "U",
            avatarUrl: user?.image || "",
            selectOptions: [
              { value: "profile", label: "View Profile", icon: <User className="h-4 w-4" /> },
              { value: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
              { 
                value: "logout", 
                label: "Logout", 
                icon: <LogOut className="h-4 w-4" />,
                onSelect: () => signOut({ redirect: true, callbackUrl: "/login" })
              },
            ],
          }}
          buttonData={{
            text: "New Entry",
            icon: IoAdd,
            onClickedBtn: () => {},
            className: "bg-blue-600 text-white hover:bg-blue-700",
          }}
        />
      </div>
      
      {/* Main Content with Sidebar - Below navbar */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Fixed position, with dynamic width based on collapsed state */}
        <div className="h-full border-r">
          <Sidebar1
            userProfile={{
              name: user?.name || "User",
              email: user?.email || "user@example.com",
              image: user?.image || ""
            }}
            navItemsProp={[
              { icon: <Home className="h-5 w-5" />, name: "Dashboard" },
              { icon: <User className="h-5 w-5" />, name: "Profile" },
              { icon: <FileText className="h-5 w-5" />, name: "Documents" },
              { icon: <Bell className="h-5 w-5" />, name: "Notifications" },
              { icon: <Settings className="h-5 w-5" />, name: "Settings" }
            ]}
            domainObject={{ 
              name: "SecurePortal",
              icon: <Shield className="h-5 w-5 text-white" />
            }}
            hideSideBar={hideSidebar}
            setHideSideBar={setHideSidebar}
            className="h-full shadow-none pt-4"
          />
        </div>
        
        {/* Main Content Area - Automatically adjusts width based on sidebar state */}
        <main className="flex-1 p-8 overflow-y-auto transition-all duration-300">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome to SecurePortal</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Hello, {user?.name || "User"}! Your secure dashboard is ready.</p>
          </div>
          
          {/* Stats Cards - Simple Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Security Status" 
              value="Protected" 
              trend="100%" 
              trendUp={true} 
              icon={<Users className="h-8 w-8 text-blue-500" />}
            />
            <StatCard 
              title="Account Type" 
              value="Premium" 
              trend="Active" 
              trendUp={true}
              icon={<Activity className="h-8 w-8 text-green-500" />}
            />
            <StatCard 
              title="Last Login" 
              value="Today" 
              trend="Secure" 
              trendUp={true}
              icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
            />
          </div>
          
          {/* Content Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Secure Portal</CardTitle>
              <CardDescription>Everything you need in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  This is your personal secure dashboard where you can manage all your account settings,
                  view your security status, and access your protected resources.
                </p>
                <p className="mt-4">
                  With SecurePortal, your data is always protected with industry-leading encryption and
                  security measures. Feel free to explore the features available to you.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button>Explore Features</Button>
              <Button variant="outline">Security Settings</Button>
            </CardFooter>
          </Card>
          
          {/* Recent Activity - Simplified */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem 
                  title="Login Successful"
                  description="You logged in successfully from your usual device"
                  time="Just now"
                />
                <ActivityItem 
                  title="Profile Updated"
                  description="Your profile information was updated"
                  time="Yesterday"
                />
                <ActivityItem 
                  title="Security Scan"
                  description="Automatic security scan completed"
                  time="2 days ago"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}



function StatCard({ 
  title, 
  value, 
  trend, 
  trendUp, 
  icon 
}: { 
  title: string; 
  value: string; 
  trend: string; 
  trendUp: boolean; 
  icon: React.ReactNode; 
}) {
  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className={`text-xs mt-1 flex items-center gap-1 font-medium ${
              trendUp ? "text-green-500" : "text-red-500"
            }`}>
              {trend} {trendUp ? "↑" : "↓"}
            </p>
          </div>
          <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ title, description, time }: { title: string; description: string; time: string }) {
  return (
    <div className="flex items-start py-2 border-b last:border-0 border-gray-100 dark:border-gray-800">
      <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
        <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}
