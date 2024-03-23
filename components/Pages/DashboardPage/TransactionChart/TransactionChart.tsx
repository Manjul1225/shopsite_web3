import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { useMeasure } from "react-use"
import { useMemo } from "react"
import XAxisTick from "./XAxisTick"
import YAxisTick from "./YAxisTick"

const TransactionChart = ({ chartData }) => {
  const [containerRef, { height }] = useMeasure()
  const yMaxValue = Math.max(...chartData.map((d) => d.uv))
  const yAxisCount = 4

  const ticks = useMemo(() => {
    if (yMaxValue)
      return [
        ...Array(yAxisCount + 1)
          .fill(0)
          .map((_, index) => parseInt(Number((yMaxValue / yAxisCount) * index).toFixed(2), 10)),
      ]
    return []
  }, [yMaxValue])

  return (
    <div className="h-[350px] w-full mt-[20px]" ref={containerRef}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          height={height - 40}
          data={chartData}
          margin={{ top: 5, right: 45, bottom: 5, left: 55 }}
        >
          <defs>
            <linearGradient id="color-gradient-uv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CFF2D8" />
              <stop offset="141.68%" stopColor="#ffffff00" />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#CFF2D8"
            strokeWidth={2}
            dot={null}
            fill="url(#color-gradient-uv)"
          />
          <CartesianGrid stroke="#ECE9F1" vertical={false} />
          <XAxis
            interval={0}
            axisLine={false}
            tick={<XAxisTick data={chartData} />}
            tickLine={false}
          />
          <YAxis
            tickCount={yAxisCount}
            domain={[0, yMaxValue]}
            tickMargin={0}
            padding={{ top: 0, bottom: 0 }}
            axisLine={false}
            tickLine={false}
            ticks={ticks}
            tick={<YAxisTick data={yMaxValue} />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TransactionChart
