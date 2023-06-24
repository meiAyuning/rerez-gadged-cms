import NDTitle from "@/components/NDTitle";
import "./style.scss";
import { months } from "@/constant/month";
import { useState } from "react";
import DashboardAPI from "../../api/dahsboard";
import { QuantityChart } from "@/components/Chart";

export default function Dahboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data: resGraph } = await DashboardAPI.getGraph();
      setData(resGraph.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useState(() => {
    fetchData();
  }, []);

  const date = new Date();
  const monthNow = `${months[date.getMonth()]} ${date.getFullYear()}`;

  return (
    <div className="dashboard">
      <NDTitle type="Page" level={1}>
        Dashboard
      </NDTitle>
      <div className="graph">
        <div className="title">Grafik Penjualan Bulan {monthNow}</div>
        <QuantityChart data={data} loading={loading} />
      </div>
    </div>
  );
}
