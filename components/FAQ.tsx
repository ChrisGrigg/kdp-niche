"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "How does KDP Seek find profitable niches?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          KDP Seek automatically scans Amazon&apos;s data to analyze thousands
          of book categories. We track competition levels (book count, quality
          metrics), demand signals (search volume, sales rank trends),
          publishing velocity, price points, review patterns, and seasonal
          trends. Our algorithm scores and ranks niches based on profitability
          potential, giving you actionable intelligence like &quot;pet training
          for senior dogs&quot; has only 47 quality books but growing search
          volume.
        </p>
      </div>
    ),
  },
  {
    question: "What data do you analyze?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          We analyze publishing velocity (how many books are published per
          category over time), price points, review patterns, seasonal trends,
          competition metrics (book count, average ratings, review counts), and
          revenue potential based on search volume and historical sales data
          patterns. This goes far beyond basic keyword research.
        </p>
      </div>
    ),
  },
  {
    question: "How much does it cost?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          Pricing ranges from $29-99/month depending on features. Our plans are
          designed for the 2+ million active KDP publishers who treat this as a
          business, not a hobby. Each tier offers different levels of niche
          searches, detailed analytics, and export capabilities.
        </p>
      </div>
    ),
  },
  {
    question: "Can I see examples of successful niches?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          Yes! Every successful book published using KDP Seek becomes a case
          study. We showcase these with before/after metrics and testimonials to
          show how automated niche discovery led to bestsellers. In a market
          projected to hit $12 billion by 2027, we help you find the niches that
          separate profitable publishers from the wannabes.
        </p>
      </div>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-200" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
