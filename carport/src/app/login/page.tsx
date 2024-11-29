"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [userType, setUserType] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === "admin" && password === "Admin01") {
      sessionStorage.setItem("userType", "admin");
      router.push("/admin/dashboard");
    } else if (userType === "customs" && password === "Customs01") {
      sessionStorage.setItem("userType", "customs");
      router.push("/customs/dashboard");
    } else if (userType === "customer") {
      const users = JSON.parse(sessionStorage.getItem("users") || "[]");
      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );
      if (user) {
        sessionStorage.setItem("userType", "customer");
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        router.push("/customer/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-xl text-black rounded-xl">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-black"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
          <option value="customs">Customs</option>
        </select>
        {userType === "customer" ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-2 mb-4 border rounded"
              required
            />
          </>
        ) : (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 mb-4 border rounded"
            required
          />
        )}
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
