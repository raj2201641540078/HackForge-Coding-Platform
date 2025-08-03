import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { DAILY_PROBLEMS_CHART_COLORS } from '../../utils/constants';

const DailySubmissionsChart = ({ activity }) => {
  const formattedActivity = activity.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
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
            tick={{ fill: 'currentColor', fontSize: 12 }}
            className="text-slate-500 dark:text-slate-400"
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: 'currentColor', fontSize: 12 }}
            className="text-slate-500 dark:text-slate-400"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF', // hf-light-card
              color: '#334155', // slate-700 fallback
              border: '1px solid #E2E8F0',
              borderRadius: '0.375rem',
              boxShadow:
                '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}
            labelStyle={{
              color: '#334155', // slate-700 fallback
              fontWeight: 'bold',
              marginBottom: '4px',
              display: 'block'
            }}
            formatter={(value, name) => [`${value}`, name]}
            cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }}
          />
          <Legend
            wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
            formatter={value => (
              <span className="text-slate-600 dark:text-slate-300">{value}</span>
            )}
          />
          <Bar
            dataKey="basicCount"
            name="Basic"
            stackId="problems"
            fill={DAILY_PROBLEMS_CHART_COLORS.basic}
            barSize={20}
          />
          <Bar
            dataKey="easyCount"
            name="Easy"
            stackId="problems"
            fill={DAILY_PROBLEMS_CHART_COLORS.easy}
            barSize={20}
          />
          <Bar
            dataKey="mediumCount"
            name="Medium"
            stackId="problems"
            fill={DAILY_PROBLEMS_CHART_COLORS.medium}
            barSize={20}
          />
          <Bar
            dataKey="hardCount"
            name="Hard"
            stackId="problems"
            fill={DAILY_PROBLEMS_CHART_COLORS.hard}
            barSize={20}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailySubmissionsChart;
