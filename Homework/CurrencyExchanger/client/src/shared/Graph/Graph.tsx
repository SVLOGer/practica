import React, { useMemo, useState } from 'react';
import styles from './Graph.module.css'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { RatePointType } from '../../utils/types/types.ts';

interface GraphProps {
  data: RatePointType[],
}

const MINUTES_OPTIONS = [5, 4, 3, 2, 1];

const Graph: React.FC<GraphProps> = ({ data}) => {
  const [minutes, setMinutes] = useState<number>(5);

  // Фильтруем данные по выбранному количеству минут
  const filteredData = useMemo(() => {
    if (!data.length) return [];
    const now = Date.now();
    const minTimestamp = now - minutes * 60 * 1000;
    return data.filter(point => point.timestamp >= minTimestamp);
  }, [data, minutes]);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {MINUTES_OPTIONS.map(option => (
          <button
            key={option}
            onClick={() => setMinutes(option)}
            className={styles.filterButton}
            style={{
              fontWeight: option === minutes ? 'bold' : 'normal'
            }}
          >
            {option} MIN
          </button>
        ))}
      </div>
      <div className={styles.graphContainer}>
        <ResponsiveContainer>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
            />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip
              formatter={(value: number) => value.toFixed(6)}
              labelFormatter={(ts) => new Date(ts).toLocaleTimeString()}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export { Graph }
