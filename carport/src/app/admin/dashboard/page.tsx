"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context/GlobalContext";

type Shipment = {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  shipmentDate: string;
  arrivalDate: string;
  clearance: string;
  delivered: boolean;
  buyingPrice: number;
  sellingPrice: number;
};

type ChartData = { name: string; count: number }[];

const CustomLineChart: React.FC<{ data: ChartData }> = ({ data }) => {
  const maxCount = Math.max(...data.map((d) => d.count));
  const width = 600;
  const height = 300;
  const padding = 40;

  const xScale = (index: number) =>
    (width - 2 * padding) * (index / (data.length - 1)) + padding;
  const yScale = (count: number) =>
    height - padding - (height - 2 * padding) * (count / maxCount);

  const points = data
    .map((d, i) => `${xScale(i)},${yScale(d.count)}`)
    .join(" ");

  return (
    <svg width={width} height={height}>
      <polyline fill="none" stroke="#8884d8" strokeWidth="2" points={points} />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={xScale(i)} cy={yScale(d.count)} r="4" fill="#8884d8" />
          <text
            x={xScale(i)}
            y={height - padding / 2}
            textAnchor="middle"
            fontSize="12"
          >
            {d.name}
          </text>
          <text
            x={padding / 2}
            y={yScale(d.count)}
            textAnchor="end"
            fontSize="12"
          >
            {d.count}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default function AdminDashboard() {
  const { shipments, setShipments, inventory, setInventory } =
    useGlobalContext();
  const [activeShipments, setActiveShipments] = useState(0);
  const [pendingClearances, setPendingClearances] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [chartData, setChartData] = useState<ChartData>([]);
  const router = useRouter();

  useEffect(() => {
    setActiveShipments(shipments.length);
    setPendingClearances(
      shipments.filter((s: Shipment) => s.clearance === "Pending").length
    );
    setInStock(inventory.length);

    // Prepare data for the import trend graph
    const importTrend = shipments.reduce((acc, shipment) => {
      const month = new Date(shipment.shipmentDate).toLocaleString("default", {
        month: "short",
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedChartData = Object.entries(importTrend)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return months.indexOf(a.name) - months.indexOf(b.name);
      });

    setChartData(sortedChartData);
  }, [shipments, inventory]);

  const handleDelivery = (id: string) => {
    const updatedShipments = shipments.map((shipment) =>
      shipment.id === id ? { ...shipment, delivered: true } : shipment
    );
    const deliveredShipment = shipments.find((shipment) => shipment.id === id);
    if (deliveredShipment && deliveredShipment.clearance === "Cleared") {
      setInventory([
        ...inventory,
        {
          id: deliveredShipment.id,
          make: deliveredShipment.make,
          model: deliveredShipment.model,
          year: deliveredShipment.year,
          mileage: deliveredShipment.mileage,
          buyingPrice: deliveredShipment.buyingPrice,
          sellingPrice: deliveredShipment.sellingPrice,
          image: deliveredShipment.image,
        },
      ]);
      setShipments(updatedShipments.filter((shipment) => !shipment.delivered));
    } else {
      alert("Vehicle must be cleared by customs before delivery.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userType");
    router.push("/");
  };

  return (
    <div className="p-6">
      <nav className="mb-6 flex justify-between items-center">
        <div>
          <Link
            href="/admin/dashboard"
            className="mr-4 bg-blue-600 p-2 text-white rounded-lg"
          >
            Dashboard
          </Link>
          <Link href="/admin/inventory" className="mr-4">
            Inventory
          </Link>
          <Link href="/admin/import" className="mr-4">
            Import
          </Link>
          <Link href="/admin/notifications" className="mr-4">
            Notifications
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      </nav>
      <h1 className="mb-6 text-2xl font-bold bg-black text-white p-2">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div
          className="relative p-6 rounded-xl 
    bg-blue-400/70 backdrop-blur-lg 
    border border-blue-200/50 
    shadow-2xl 
    transform transition-all duration-300 
    hover:scale-105 hover:shadow-3xl
    flex items-center justify-between"
        >
          <div>
            <h2 className="font-bold text-gray-700">Active Shipments</h2>
            <p className="text-2xl font-extrabold text-blue-600">
              {activeShipments}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
        </div>

        <div
          className="relative p-6 rounded-xl 
    bg-red-400/70 backdrop-blur-lg 
    border border-red-200/50 
    shadow-2xl 
    transform transition-all duration-300 
    hover:scale-105 hover:shadow-3xl
    flex items-center justify-between"
        >
          <div>
            <h2 className="font-bold text-gray-700">Pending Clearances</h2>
            <p className="text-2xl font-extrabold text-red-600">
              {pendingClearances}
            </p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div
          className="relative p-6 rounded-xl 
    bg-green-400/70 backdrop-blur-lg 
    border border-green-200/50 
    shadow-2xl 
    transform transition-all duration-300 
    hover:scale-105 hover:shadow-3xl
    flex items-center justify-between"
        >
          <div>
            <h2 className="font-bold text-gray-700">In Stock</h2>
            <p className="text-2xl font-extrabold text-green-600">{inStock}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="mb-6 bg-white p-4">
        <h3 className="text-xl font-bold mb-4 bg-gray-600 p-2 text-white shadow-lg">
          Import Trend
        </h3>
        <CustomLineChart data={chartData} />
      </div>
      <h2 className="mb-4 text-xl font-bold bg-gray-400 p-4">
        Shipment Summary
      </h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Make</th>
            <th className="p-2 text-left">Model</th>
            <th className="p-2 text-left">Year</th>
            <th className="p-2 text-left">Mileage</th>
            <th className="p-2 text-left">Shipment Date</th>
            <th className="p-2 text-left">Arrival Date</th>
            <th className="p-2 text-left">Clearance</th>
            <th className="p-2 text-left">Delivery</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id} className="border-b">
              <td className="p-2">{shipment.make}</td>
              <td className="p-2">{shipment.model}</td>
              <td className="p-2">{shipment.year}</td>
              <td className="p-2">{shipment.mileage} KM</td>
              <td className="p-2">{shipment.shipmentDate}</td>
              <td className="p-2">{shipment.arrivalDate}</td>
              <td className="p-2">{shipment.clearance}</td>
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={shipment.delivered}
                  onChange={() => handleDelivery(shipment.id)}
                  disabled={shipment.clearance !== "Cleared"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
