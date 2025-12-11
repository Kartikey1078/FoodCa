import React, { useState } from "react";

const FAQs = () => {
  const [activeQuestion, setActiveQuestion] = useState(null); // Removed TS type

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: "What is your return policy?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order using the tracking number provided in the confirmation email.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we offer international shipping to most countries.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and various online payment platforms.",
    },
  ];

  return (
    <section className="py-8 px-6 sm:px-10 lg:px-11 w-full bg-white">
      <div className="mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-8 lg:space-y-0">
        {/* Left side: Heading and text */}
        <div className="lg:w-1/2 w-full">
          <img
            src="/About/glass.svg"
            alt="faqs"
            className="my-3 pl-0 lg:pl-1"
          />
          <h2 className="text-2xl sm:text-[40px] font-redHatDisplay font-black tracking-wide mb-4 text-gray-800">
            General FAQs
          </h2>
          <p className="text-body2 sm:text-lg text-gray-700 tracking-wide font-redHatDisplay font-medium">
            Everything you need to know about us and <br /> how we work. Can't
            find an answer?
          </p>
          <a
            href="https://wa.me/16477393348"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="flex gap-2 mt-4 text-base sm:text-lg font-redHatDisplay text-[#38754E] sm:text-[#555555] font-semibold">
              <img src="/comment-alt 1.svg" alt="comments" />
              Chat with us
            </p>
          </a>
        </div>

        {/* Right side: Questions with dropdown */}
        <div className="lg:w-1/2 w-full font-redHatDisplay">
          <div className="space-y-4">
            <div className="border-b border-[#DDDDDD] mt-2"></div>

            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border-b border-[#DDDDDD] pb-4 cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <div className="flex justify-between items-center">
                  <h3
                    className={`text-sm md:text-[16px] tracking-wide text-[#000000] ${
                      activeQuestion === index ? "font-black" : "font-medium"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 transition-transform duration-300 ${
                      activeQuestion === index ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {activeQuestion === index && (
                  <p className="mt-2 text-sm sm:text-[16px] lg:text-body2 tracking-wide font-semibold sm:text-base text-gray-700">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
