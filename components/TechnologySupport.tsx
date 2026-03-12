"use client";

const logos = [
  { src: "./kotlin.png",        alt: "kotlin"        },
  { src: "./android.png",       alt: "Android"       },
  { src: "./react.png",         alt: "React"         },
  { src: "./next.png",          alt: "next"          },
  { src: "./js.png",            alt: "js"            },
  { src: "./java.png",          alt: "Java"          },
  { src: "./swift.png",         alt: "Swift"         },
  { src: "./typescript.png",    alt: "typescript"    },
  { src: "./iOS_Logo.png",      alt: "IOS"           },
  { src: "./nodejs.png",        alt: "Node"          },
  { src: "./express.png",       alt: "express"       },
];

export default function TechnologySupport() {
  const items = [...logos, ...logos];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center gap-4 w-full max-w-6xl mx-auto mb-12 px-4">
        <div className="flex-1 h-px bg-gray-300" />
        <div className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold text-sm md:text-base tracking-wider whitespace-nowrap">
          TECHNOLOGY SUPPORT
        </div>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Marquee */}
      <div className="overflow-hidden">
        <div className="marquee-track">
          {items.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center mx-6 md:mx-10 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              style={{ height: 40 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ height: "36px", width: "auto", objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}