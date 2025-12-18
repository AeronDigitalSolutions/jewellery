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
      .then(data => setMetals(data))
      .catch(err => console.error("Price fetch failed", err));
  }, []);

  return (
    <>
      {/* ===== PRICE MARQUEE ===== */}
      <div className="priceMarqueeWrapper">
        <div className="priceMarquee">
          {metals.map((m, index) => (
            <span key={m._id} className="priceItem">
              <strong>{m.name}</strong> : ₹{m.price.toLocaleString("en-IN")}
              {m.perGram ? "/gm" : ""}
              {index !== metals.length - 1 && <span className="divider"> | </span>}
            </span>
          ))}
        </div>
      </div>

      {/* ===== INTERNAL CSS ===== */}
      <style jsx>{`
        .priceMarqueeWrapper {
          width: 100%;
          overflow: hidden;
          background: linear-gradient(90deg, #c724b1, #9a248a);
          padding: 10px 0;
        }

        .priceMarquee {
          display: inline-block;
          white-space: nowrap;
          animation: scroll 18s linear infinite;
          padding-left: 100%;
        }

        .priceMarqueeWrapper:hover .priceMarquee {
          animation-play-state: paused;
        }

        .priceItem {
          color: #fff;
          font-size: 16px;
          font-weight: 500;
          margin-right: 20px;
        }

        .priceItem strong {
          font-weight: 700;
        }

        .divider {
          margin: 0 12px;
          color: #ffd6fa;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .priceItem {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
