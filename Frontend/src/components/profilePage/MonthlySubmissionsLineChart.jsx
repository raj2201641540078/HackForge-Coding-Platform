import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const MonthlySubmissionsLineChart = ({ activity }) => {
  const formattedActivity = activity.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={formattedActivity}
          margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            strokeOpacity={0.2}
            className="stroke-slate-300 dark:stroke-slate-600"
          />
          <XAxis
            dataKey="date"
            tick={{ fill: 'currentColor', fontSize: 10 }}
            className="text-slate-500 dark:text-slate-400"
            interval="preserveStartEnd"
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: 'currentColor', fontSize: 12 }}
            className="text-slate-500 dark:text-slate-400"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              color: '#334155',
              border: '1px solid #E2E8F0',
              borderRadius: '0.375rem',
              boxShadow:
                '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}
            labelStyle={{
              color: '#334155',
              fontWeight: 'bold',
              marginBottom: '4px',
              display: 'block'
            }}
            itemStyle={{ color: '#FF7F00' }}
            formatter={(value, name) => [`${value}`, "Accepted Submissions"]}
            cursor={{ stroke: '#FF7F00', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          <Legend
            wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
            formatter={value => (
              <span className="text-slate-600 dark:text-slate-300">{"Accepted Submissions"}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="count"
            name="Submissions"
            stroke="#FF7F00"
            strokeWidth={2}
            dot={{
              r: 3,
              fill: '#FF7F00',
              strokeWidth: 1,
              stroke: '#FFFFFF'
            }}
            activeDot={{
              r: 5,
              fill: '#FF7F00',
              stroke: '#FFFFFF',
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySubmissionsLineChart;
