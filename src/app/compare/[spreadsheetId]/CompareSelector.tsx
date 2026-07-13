"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Commit {
  id: string;
  message: string;
  createdAt: Date;
}

export default function CompareSelector({
  sheetId,
  commits,
}: {
  sheetId: string;
  commits: Commit[];
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const router = useRouter();

  function handleCompare() {
    if (!from || !to) {
      return;
    }

    router.push(
      `/compare/${sheetId}?from=${from}&to=${to}`
    );
  }

  return (
    <div className="mt-8 border rounded p-5">
      <h2 className="font-bold mb-4">
        Select versions
      </h2>

      <div className="flex gap-5">
        <select
          className="border p-2"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          <option value="">
            From
          </option>

          {commits.map((commit, index) => (
            <option
              key={commit.id}
              value={commit.id}
            >
              v{index + 1}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          <option value="">
            To
          </option>

          {commits.map((commit, index) => (
            <option
              key={commit.id}
              value={commit.id}
            >
              v{index + 1}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleCompare}
        className="mt-5 bg-black text-white px-4 py-2 rounded"
      >
        Compare
      </button>
    </div>
  );
}