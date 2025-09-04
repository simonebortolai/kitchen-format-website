"use client";

import { useState } from "react";

const tabs = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" }
];

const tabContent = {
  home: {
    title: "Welcome Home",
    content: "This is the home page content. Here you can find the latest updates and featured information about our website."
  },
  about: {
    title: "About Us",
    content: "Learn more about our company, our mission, and our team. We are dedicated to providing excellent service and innovative solutions."
  },
  services: {
    title: "Our Services",
    content: "Discover the range of services we offer. From web development to consulting, we have the expertise to help you achieve your goals."
  },
  contact: {
    title: "Contact Us",
    content: "Get in touch with us today. We'd love to hear from you and discuss how we can help with your next project."
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Your Website
              </h1>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {tabContent[activeTab].title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {tabContent[activeTab].content}
          </p>
          
          {/* Additional content area */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Featured Section
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This content changes based on the selected tab: {activeTab}
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                    Learn More
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
