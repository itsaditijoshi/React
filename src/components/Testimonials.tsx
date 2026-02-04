import { useState, useRef } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mohit Gupta",
    role: "Data Analyst",
    image: "download.jpg",
    text:
      "Thank you, Classbot, for providing an affordable application with excellent student data management and fee management features perfect for our coaching institute!"
  },
  {
    id: 2,
    name: "Aditi Joshi",
    role: "Frontend Developer",
    image: "images.jpg",
    text:
      "The platform helped us manage students efficiently with minimal effort and maximum clarity."
  },
  {
    id: 3,
    name: "Rahul Sharma",
    role: "Instructor",
    image: "download (1).jpg",
    text:
      "An intuitive system that simplifies daily operations and saves time."
  },
  {
    id: 4,
    name: "Neha Verma",
    role: "Mentor",
    image: "images (1).jpg",
    text:
      "A reliable solution that scales beautifully for growing teams."
  }
];

const CARD_WIDTH = 520;
const GAP = 32;

// We FIX dots to 4 (UX choice)
const DOT_COUNT = 4;

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const timeoutRef = useRef<number | null>(null);
  const hasSlidRef = useRef(false);

  const maxIndex = testimonials.length - 2;

  // Hover → slide ONCE after 3s
  const startAutoSlide = () => {
    if (hasSlidRef.current) return;

    timeoutRef.current = window.setTimeout(() => {
      setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
      hasSlidRef.current = true;
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    hasSlidRef.current = false;
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-10 py-24">
      
      {/* HEADING ON TOP */}
      <h2 className="text-5xl font-bold mb-12">
        Why People Choose Us
      </h2>

      {/* CAROUSEL */}
      <div
        onMouseEnter={startAutoSlide}
        onMouseLeave={stopAutoSlide}
      >
        {/* VIEWPORT */}
        <div className="overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`
            }}
          >
            {testimonials.map((item, i) => (
              <div
                key={item.id}
                className={`relative w-[520px] px-6 py-5 rounded-2xl border bg-white flex-shrink-0
                  ${i === index ? "border-blue-500" : "border-gray-300"}`}
              >
                {/* QUOTE */}
                <span className="absolute top-5 left-5 text-4xl text-gray-300">
                  “
                </span>

                <div className="flex gap-5 mt-8">
                  <img
                    src={item.image}
                    alt="profile"
                    className="w-14 h-14 rounded-full"
                  />

                  <div className="flex flex-col justify-between w-full">
                    <p className="italic text-gray-700 leading-relaxed mb-6">
                      {item.text}
                    </p>

                    <div className="text-right">
                      <p className="font-semibold">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS (3–4 FIXED) */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: DOT_COUNT }).map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i <= maxIndex ? i : maxIndex)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer
                ${i === index ? "bg-black" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
