import * as c3 from "c3";
import "c3/c3.css";
import { useEffect, useRef } from "react";
export default function C3PieChart({ data }) {
  const chartRef = useRef(null);
  useEffect(() => {
    const chart = c3.generate({
      bindto: chartRef.current,
      size: {
        width: 350,
        height: 350, 
      },
      data: {
        columns: data,
        type: "pie",
      },
      color: {
        pattern: ['#301E5F', '#5434A7', '#9D7FEA', '#DACBFF']
      }
    });

    return () => {
      chart.destroy();
    };
  }, [data]);
  return (
    <div ref={chartRef} />
  )
}
