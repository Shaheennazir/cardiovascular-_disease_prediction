import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Heart, Activity, FileText, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

const DashboardHome = () => {
  // Mock data for dashboard stats
  const stats = [
    {
      title: "Risk Level",
      value: "Low",
      description: "Based on last assessment",
      icon: <Heart className="h-6 w-6 text-primary" />,
      change: "+2% from last month"
    },
    {
      title: "Last Assessment",
      value: "12 days ago",
      description: "Tabular data prediction",
      icon: <Clock className="h-6 w-6 text-primary" />,
      change: "2 assessments this month"
    },
    {
      title: "ECG Analyses",
      value: "5",
      description: "This month",
      icon: <Activity className="h-6 w-6 text-primary" />,
      change: "+1 from last month"
    },
    {
      title: "Health Score",
      value: "87%",
      description: "Overall cardiovascular health",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      change: "+3% improvement"
    }
  ];

  // Mock recent activity data
  const recentActivity = [
    {
      id: 1,
      title: "Tabular Data Prediction",
      description: "Completed assessment with low risk result",
      time: "2 hours ago",
      icon: <Heart className="h-4 w-4" />
    },
    {
      id: 2,
      title: "ECG Analysis",
      description: "Uploaded ECG file for analysis",
      time: "1 day ago",
      icon: <Activity className="h-4 w-4" />
    },
    {
      id: 3,
      title: "Health Recommendations",
      description: "New personalized recommendations available",
      time: "3 days ago",
      icon: <AlertTriangle className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">Here's what's happening with your cardiovascular health today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="justify-start">
              <Heart className="mr-2 h-4 w-4" />
              New Tabular Prediction
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Upload ECG File
            </Button>
            <Button variant="outline" className="justify-start">
              <Activity className="mr-2 h-4 w-4" />
              View Health History
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-primary/10 p-2">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Health Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Stay Active</h3>
              <p className="text-sm text-muted-foreground">
                Aim for at least 30 minutes of moderate exercise daily to maintain cardiovascular health.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Healthy Diet</h3>
              <p className="text-sm text-muted-foreground">
                Reduce sodium intake and increase consumption of fruits, vegetables, and whole grains.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Regular Checkups</h3>
              <p className="text-sm text-muted-foreground">
                Schedule regular appointments with your healthcare provider for preventive care.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;