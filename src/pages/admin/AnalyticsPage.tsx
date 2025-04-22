import { useState } from 'react';
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
  Users,
  MessageSquare,
  Star,
  Calendar,
  ArrowUp,
  ArrowDown,
  Clock,
  Activity,
  Filter
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Mock data for charts
const satisfactionTrends = [
  { month: 'Jan', rating: 4.5, guests: 120 },
  { month: 'Feb', rating: 4.6, guests: 135 },
  { month: 'Mar', rating: 4.8, guests: 145 },
  { month: 'Apr', rating: 4.7, guests: 140 },
  { month: 'May', rating: 4.9, guests: 160 },
  { month: 'Jun', rating: 4.8, guests: 155 }
];

const serviceUsage = [
  { name: 'Spa Services', count: 150, revenue: 15000 },
  { name: 'Room Service', count: 280, revenue: 8400 },
  { name: 'Restaurant', count: 200, revenue: 12000 },
  { name: 'Activities', count: 120, revenue: 6000 },
  { name: 'Transport', count: 90, revenue: 4500 }
];

const responseTimes = [
  { hour: '00:00', time: 3, requests: 15 },
  { hour: '04:00', time: 4, requests: 10 },
  { hour: '08:00', time: 2, requests: 45 },
  { hour: '12:00', time: 1.5, requests: 60 },
  { hour: '16:00', time: 2, requests: 55 },
  { hour: '20:00', time: 2.5, requests: 40 }
];

const issueCategories = [
  { name: 'Room Related', value: 35, resolved: 32 },
  { name: 'Service', value: 25, resolved: 23 },
  { name: 'Dining', value: 20, resolved: 19 },
  { name: 'Amenities', value: 15, resolved: 15 },
  { name: 'Others', value: 5, resolved: 4 }
];

const COLORS = ['#a18072', '#bfa094', '#d2bab0', '#e0cec7', '#f2e8e5'];

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartView, setChartView] = useState<'count' | 'revenue'>('count');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-brand-100">
          <p className="font-serif text-brand-900">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-serif text-brand-600">
              {`${entry.name}: ${entry.value}${entry.name.includes('Rating') ? '/5' : 
                entry.name.includes('Revenue') ? ' $' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-serif font-light text-brand-900">Analytics Dashboard</h1>
          <p className="text-brand-600 font-serif mt-1">Monitor guest satisfaction and service performance</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Time Range and View Selector */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-brand-600" />
            <select 
              value={chartView}
              onChange={(e) => setChartView(e.target.value as 'count' | 'revenue')}
              className="border border-brand-200 rounded-lg px-4 py-2 font-serif text-brand-600 bg-white"
            >
              <option value="count">Usage Count</option>
              <option value="revenue">Revenue</option>
            </select>
          </div>
          <div className="inline-flex rounded-lg border border-brand-200 bg-white">
            {[
              { value: '7d', label: '7 Days' },
              { value: '30d', label: '30 Days' },
              { value: '90d', label: '90 Days' },
              { value: '1y', label: 'Year' }
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-4 py-2 font-serif text-sm transition-colors ${
                  timeRange === range.value
                    ? 'bg-brand-600 text-white'
                    : 'text-brand-600 hover:bg-brand-50'
                } ${
                  range.value === '7d' ? 'rounded-l-lg' : ''
                } ${
                  range.value === '1y' ? 'rounded-r-lg' : ''
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Guest Satisfaction',
              value: '94%',
              change: '+2.5%',
              trend: 'up',
              icon: Star
            },
            {
              title: 'Active Guests',
              value: '127',
              change: '+12',
              trend: 'up',
              icon: Users
            },
            {
              title: 'Response Time',
              value: '4.2m',
              change: '-0.8m',
              trend: 'down',
              icon: MessageSquare
            },
            {
              title: 'Occupancy Rate',
              value: '89%',
              change: '+5.3%',
              trend: 'up',
              icon: Calendar
            }
          ].map((metric) => (
            <div key={metric.title} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-brand-50 rounded-full p-3">
                  <metric.icon className="h-6 w-6 text-brand-600" />
                </div>
                <span className={`flex items-center text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {metric.change}
                </span>
              </div>
              <h3 className="text-brand-600 font-serif mb-1">{metric.title}</h3>
              <p className="text-3xl font-serif text-brand-900">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Guest Satisfaction Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-serif text-brand-900">Guest Satisfaction Trends</h3>
                <p className="text-sm text-brand-600">Average ratings and guest count over time</p>
              </div>
              <Activity className="h-6 w-6 text-brand-600" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={satisfactionTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eaddd7" />
                  <XAxis dataKey="month" stroke="#a18072" />
                  <YAxis yAxisId="left" stroke="#a18072" domain={[4, 5]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#bfa094" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="rating"
                    stroke="#a18072"
                    strokeWidth={2}
                    dot={{ fill: '#a18072' }}
                    name="Satisfaction Rating"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="guests"
                    stroke="#bfa094"
                    strokeWidth={2}
                    dot={{ fill: '#bfa094' }}
                    name="Guest Count"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Service Usage */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-serif text-brand-900">Service Usage</h3>
                <p className="text-sm text-brand-600">Most requested services</p>
              </div>
              <BarChartIcon className="h-6 w-6 text-brand-600" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eaddd7" />
                  <XAxis dataKey="name" stroke="#a18072" />
                  <YAxis stroke="#a18072" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey={chartView === 'count' ? 'count' : 'revenue'} 
                    fill="#a18072" 
                    name={chartView === 'count' ? 'Usage Count' : 'Revenue ($)'}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Response Time Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-serif text-brand-900">Response Time Analysis</h3>
                <p className="text-sm text-brand-600">Average response times and request volume by hour</p>
              </div>
              <Clock className="h-6 w-6 text-brand-600" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={responseTimes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eaddd7" />
                  <XAxis dataKey="hour" stroke="#a18072" />
                  <YAxis yAxisId="left" stroke="#a18072" />
                  <YAxis yAxisId="right" orientation="right" stroke="#bfa094" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="requests"
                    fill="#eaddd7"
                    stroke="#bfa094"
                    name="Request Volume"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="time"
                    stroke="#a18072"
                    strokeWidth={2}
                    name="Response Time (min)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Issue Categories */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-serif text-brand-900">Issue Categories</h3>
                <p className="text-sm text-brand-600">Distribution of guest concerns</p>
              </div>
              <PieChartIcon className="h-6 w-6 text-brand-600" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issueCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {issueCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-brand-100">
            <h3 className="text-xl font-serif text-brand-900">Recent Activity</h3>
          </div>
          <div className="divide-y divide-brand-100">
            {[
              {
                event: 'New feedback received',
                details: '5-star rating from Room 301',
                time: '10 minutes ago'
              },
              {
                event: 'Service request completed',
                details: 'Room service delivery to Room 205',
                time: '25 minutes ago'
              },
              {
                event: 'Chat response time alert',
                details: 'Response time exceeded 5 minutes',
                time: '1 hour ago'
              }
            ].map((activity, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-brand-900">{activity.event}</p>
                    <p className="text-sm text-brand-600">{activity.details}</p>
                  </div>
                  <span className="text-sm text-brand-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}