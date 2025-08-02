"use client";

import { useState } from "react";
import Section from "../ui/Section";
import Card from "../ui/Card";

const services = {
  "frontend-node": {
    title: "Frontend Service",
    description:
      "The complete user-facing application responsible for rendering the UI and managing client-side state.",
    tech: "Technology: Next.js (React), Tailwind CSS, Node.js",
  },
  "auth-node": {
    title: "Authentication Service",
    description:
      "Uses Clerk for user authentication and authorization. Supports Google, GitHub, and email sign-in.",
    tech: "Technology: Clerk, Next.js (React), Node.js",
  },
  "gateway-node": {
    title: "API Gateway",
    description:
      "Connects the frontend to the python backend, takes in requests -> feed them to the ML model -> sends back responses.",
    tech: "Technology: FastAPI (Python)",
  },

  "profile-node": {
    title: "User Profile Service",
    description:
      "Manages all user-related data, including biometrics, health goals, and dietary preferences.",
    tech: "Technology: FastAPI (Python)",
  },
  "recipe-node": {
    title: "Recipe & Nutrition Service",
    description:
      "Provides access to the comprehensive recipe and nutritional datasets.",
    tech: "Technology: ML Model, FastAPI (Python)",
  },
  "ml-node": {
    title: "ML Inference Service",
    description:
      "Hosts the trained machine learning models for recommendations, predictions, and other AI tasks.",
    tech: "Technology: FastAPI, Scikit-learn, PyTorch",
  },
  "db-node": {
    title: "Database",
    description:
      "The primary data store for the application, holding user profiles, meal history, and interaction data for personalized recommendations.",
    tech: "Technology: Appwrite Databases (Node.js)",
  },
};

type ServiceId = keyof typeof services;

const Architecture = () => {
  const [selectedService, setSelectedService] = useState<ServiceId | null>(
    null
  );

  const handleMouseOver = (id: ServiceId) => {
    setSelectedService(id);
  };

  const currentService = selectedService
    ? services[selectedService]
    : {
        title: "Hover a Service",
        description:
          "Detailed information about the selected service will appear here.",
        tech: "",
      };

  const ServiceNode = ({
    id,
    children,
    className,
  }: {
    id: ServiceId;
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      id={id}
      onMouseOver={() => handleMouseOver(id)}
      className={`service-node font-semibold border-2 rounded-lg p-3 w-full text-center bg-white shadow-sm cursor-pointer transition-transform duration-200 hover:scale-105 ${className}`}
    >
      {children}
    </div>
  );

  return (
    <Section id="architecture">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-neutral-800 flex items-center justify-center">
        <span className="mr-2 md:mr-3 text-2xl">🏛️</span>System Architecture
      </h2>
      <p className="text-center text-neutral-500 max-w-3xl mx-auto mb-12">
        NutriGenius AI uses a microservices architecture for scalability and
        maintainability. Hover over a service in the diagram below to learn more
        about its specific role and technology.
      </p>
      <Card className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 bg-neutral-50 rounded-lg p-6 flex flex-col items-center justify-center space-y-4 border border-dashed border-slate-300">
            <ServiceNode id="frontend-node" className="border-neutral-300">
              👤 Frontend (Next.js)
            </ServiceNode>
            <div className="text-teal-500 font-bold text-2xl">↓</div>
            <ServiceNode id="auth-node" className="border-purple-300 bg-red-50">
              🛡️ User Authentication
            </ServiceNode>
            <div className="text-teal-500 font-bold text-2xl">↓</div>

            <ServiceNode
              id="gateway-node"
              className="border-blue-300 bg-blue-300"
            >
              🚪 API Gateway (FastAPI)
            </ServiceNode>
            <div className="text-teal-500 font-bold text-2xl">↓</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-center">
              <ServiceNode
                id="profile-node"
                className="border-gray-300 bg-sky-50 p-2"
              >
                👤 User Profile
              </ServiceNode>
              <ServiceNode
                id="recipe-node"
                className="border-gray-300 bg-sky-50 p-2"
              >
                👨‍🍳 Recipe Data
              </ServiceNode>
              <ServiceNode
                id="ml-node"
                className="border-gray-300 bg-sky-50 p-2"
              >
                🧠 ML Inference
              </ServiceNode>
            </div>
            <div className="text-teal-500 font-bold text-2xl">↓</div>
            <ServiceNode
              id="db-node"
              className="border-emerald-400 bg-emerald-50"
            >
              💾 Database (Appwrite)
            </ServiceNode>
          </div>
          <div className="bg-teal-50 rounded-lg p-6 border border-teal-200 h-full">
            <h3 className="text-xl font-bold text-teal-800 mb-2">
              {currentService.title}
            </h3>
            <p className="text-neutral-700">{currentService.description}</p>
            <div className="mt-4 font-semibold text-sm text-neutral-600">
              {currentService.tech}
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
};

export default Architecture;
