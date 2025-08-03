import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
  PolarAngleAxis,
  Label,
} from "recharts";
import { PIE_CHART_COLORS } from "../../utils/constants";

const ProgressBar = ({ label, solved, total }) => {
  const percentage = total > 0 ? (solved / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {solved} / {total}
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full bg-[#FF7F00]"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={solved}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${label} progress`}
        ></div>
      </div>
    </div>
  );
};

const AdvancedSolvedStatsChart = ({ solvedStats }) => {
  const {
    easy,
    totalEasy,
    medium,
    totalMedium,
    hard,
    totalHard,
    total,
    totalOverall,
  } = solvedStats;

  const chartData = [
    {
      name: "Hard",
      uv: totalHard > 0 ? (hard / totalHard) * 100 : 0,
      pv: 100,
      fill: PIE_CHART_COLORS["Hard"],
      displayName: `Hard: ${hard}/${totalHard}`,
    },
    {
      name: "Medium",
      uv: totalMedium > 0 ? (medium / totalMedium) * 100 : 0,
      pv: 100,
      fill: PIE_CHART_COLORS["Medium"],
      displayName: `Medium: ${medium}/${totalMedium}`,
    },
    {
      name: "Easy",
      uv: totalEasy > 0 ? (easy / totalEasy) * 100 : 0,
      pv: 100,
      fill: PIE_CHART_COLORS["Easy"],
      displayName: `Easy: ${easy}/${totalEasy}`,
    },
  ];

  const overallPercentage =
    totalOverall > 0 ? ((total / totalOverall) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6">
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="35%"
            outerRadius="90%"
            barSize={15}
            data={chartData}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar dataKey="uv" angleAxisId={0} background />
            <Label
              content={({ viewBox }) => {
                if (
                  viewBox &&
                  "cx" in viewBox &&
                  "cy" in viewBox &&
                  viewBox.cx != null &&
                  viewBox.cy != null
                ) {
                  const { cx, cy } = viewBox;
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={cx}
                        dy="-0.4em"
                        className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-200"
                      >
                        {overallPercentage}%
                      </tspan>
                      <tspan
                        x={cx}
                        dy="1.5em"
                        className="text-xs sm:text-sm text-slate-500 dark:text-slate-400"
                      >
                        {total} / {totalOverall} Solved
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
            <Legend
              iconSize={10}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
              formatter={(value, entry) => (
                <span style={{ color: entry.color }}>
                  {entry?.payload?.displayName ?? value}
                </span>
              )}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                color: "#334155",
                border: "1px solid #E2E8F0",
                borderRadius: "0.375rem",
              }}
              formatter={(value, name) => [`${value.toFixed(1)}%`, name]}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-sm mx-auto">
          <h4 className="text-md font-semibold mb-3 text-center text-slate-700 dark:text-slate-200">
            Overall Progress
          </h4>
          <ProgressBar
            label="Total Solved"
            solved={total}
            total={totalOverall}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedSolvedStatsChart;
