"use client";

import React, { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Metal = {
  _id: string;
  name: string;
  price: number;
  perGram: boolean;
};

export default function Price() {
  const [metals, setMetals] = useState<Metal[]>([]);

  useEffect(() => {
    fetch(`${API}/api/metals`)
      .then(res => res.json())
      .then(setMetals)
      .catch(err => console.error("Price fetch failed", err));
  }, []);

  if (!metals.length) return null;

  return (
    <>
      <div className="marqueeWrapper">
        <div className="marqueeTrack">
          {/* FIRST COPY */}
          {metals.map(m => (
            <span key={m._id} className="item">
              <strong>{m.name}</strong> ₹{m.price.toLocaleString("en-IN")}
              {m.perGram ? "/gm" : ""}
            </span>
          ))}

          {/* SECOND COPY (DUPLICATE) */}
          {metals.map(m => (
            <span key={`${m._id}-dup`} className="item">
              <strong>{m.name}</strong> ₹{m.price.toLocaleString("en-IN")}
              {m.perGram ? "/gm" : ""}
            </span>
          ))}
        </div>
      </div>

      {/* ✅ INTERNAL CSS */}
      <style jsx>{`
        .marqueeWrapper {
          width: 100%;
          overflow: hidden;
          background: linear-gradient(90deg, #c724b1, #9a248a);
        }

        .marqueeTrack {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }

        .marqueeWrapper:hover .marqueeTrack {
          animation-play-state: paused;
        }

        .item {
          white-space: nowrap;
          padding: 10px 24px;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
        }

        .item strong {
          font-weight: 700;
          margin-right: 4px;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .item {
            font-size: 14px;
            padding: 8px 16px;
          }
        }
      `}</style>
    </>
  );
}
