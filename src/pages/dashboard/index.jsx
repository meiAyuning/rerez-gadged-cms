import NDTitle from "@/components/NDTitle";
import { Column } from "@ant-design/charts";
import "./style.scss";
import { months } from "@/constant/month";
import { useState } from "react";
import DashboardAPI from "../../api/dahsboard";

// const data = [
//   {
//     brand: "Samsung",
//     penjualan: 5,
//   },
//   {
//     brand: "Oppo",
//     penjualan: 0,
//   },
//   {
//     brand: "Iphone",
//     penjualan: 0,
//   },
//   {
//     brand: "Vivo",
//     penjualan: 0,
//   },
//   {
//     brand: "Xiomi",
//     penjualan: 0,
//   },
// ];

const config = {
  xField: "brand",

  yField: "penjualan",
  label: {
    position: "middle",
    style: {
      fill: "#FFFFFF",
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
};

export default function Dahboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data: resGraph } = await DashboardAPI.getGraph();
      console.log(resGraph);
      setData(resGraph);
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
        Pesanan
      </NDTitle>
      <div className="graph">
        <div className="title">Grafik Penjualan Bulan {monthNow}</div>
        <Column loading={loading} {...config} data={data} />
      </div>
    </div>
  );
}
