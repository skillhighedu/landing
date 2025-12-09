export interface Bounty {
  id: string;
  name: string;
  link: string;
  description: string;
  slots: number;
  isSlotsAvailable: boolean;
  courseId: string;
  amount: number;
  status: "OPEN" | "CLOSED";
  type: "FEATURE" | "NORMAL";
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface BountyDetails {
  id: string;
  courseId: string;
  name: string;
  description: string;
  type: "FEATURE" | string;
  status: "OPEN" | "CLOSED" | string;
  link: string;
  slots: number;
  isSlotsAvailable: boolean;
  amount: number;
  expiryDate: string;
}

export interface AppliedBounty {
  id: string;
  name: string;
  description: string;
  type: string;
  expiryDate: string;
  status: string;
  amount: number;
  link: string;
  isBountyAwarded: boolean;
  bountyId: string;
  courseId: string;
  userId: string;
  bounty: BountyDetails;
  submittedLink: string;
}

// Sample bounties data
export const courseBountiesData: { [key: string]: Bounty[] } = {
  // AI Course bounties
  "67691eb73f409fe0a9890a04": [
    {
      id: "1",
      name: "Build an AI Chatbot",
      link: "https://github.com/skillhighedu/bounty-ai-chatbot",
      description: "Create a conversational AI chatbot using RAG architecture with Bedrock or OpenAI",
      slots: 5,
      isSlotsAvailable: true,
      courseId: "67691eb73f409fe0a9890a04",
      amount: 5000,
      status: "OPEN",
      type: "FEATURE",
      expiryDate: "2025-12-31T23:59:59Z",
      createdAt: "2025-12-01T00:00:00Z",
      updatedAt: "2025-12-01T00:00:00Z",
    },
    {
      id: "2",
      name: "Develop a Sentiment Analysis Tool",
      link: "https://github.com/skillhighedu/bounty-sentiment-analysis",
      description: "Build a sentiment analysis tool for social media posts using NLP techniques",
      slots: 3,
      isSlotsAvailable: true,
      courseId: "67691eb73f409fe0a9890a04",
      amount: 3000,
      status: "OPEN",
      type: "NORMAL",
      expiryDate: "2025-12-25T23:59:59Z",
      createdAt: "2025-12-01T00:00:00Z",
      updatedAt: "2025-12-01T00:00:00Z",
    },
    {
      id: "3",
      name: "Create Image Classification Model",
      link: "https://github.com/skillhighedu/bounty-image-classification",
      description: "Implement a CNN-based image classifier with 90%+ accuracy on test dataset",
      slots: 2,
      isSlotsAvailable: false,
      courseId: "67691eb73f409fe0a9890a04",
      amount: 4000,
      status: "OPEN",
      type: "FEATURE",
      expiryDate: "2025-12-20T23:59:59Z",
      createdAt: "2025-12-01T00:00:00Z",
      updatedAt: "2025-12-01T00:00:00Z",
    },
    {
      id: "4",
      name: "Build a Recommendation System",
      link: "https://github.com/skillhighedu/bounty-recommendation-system",
      description: "Create a collaborative filtering recommendation engine for e-commerce products",
      slots: 4,
      isSlotsAvailable: true,
      courseId: "67691eb73f409fe0a9890a04",
      amount: 4500,
      status: "OPEN",
      type: "NORMAL",
      expiryDate: "2025-12-28T23:59:59Z",
      createdAt: "2025-12-01T00:00:00Z",
      updatedAt: "2025-12-01T00:00:00Z",
    },
  ],
  // Default course bounties
  default: [
    {
      id: "5",
      name: "Design a Landing Page",
      link: "https://github.com/skillhighedu/bounty-landing-page",
      description: "Create a modern, responsive landing page with animations and dark mode",
      slots: 10,
      isSlotsAvailable: true,
      courseId: "default",
      amount: 2000,
      status: "OPEN",
      type: "NORMAL",
      expiryDate: "2025-12-30T23:59:59Z",
      createdAt: "2025-12-01T00:00:00Z",
      updatedAt: "2025-12-01T00:00:00Z",
    },
    {
      id: "6",
      name: "Build a REST API",
      link: "https://github.com/skillhighedu/bounty-rest-api",
      description: "Develop a RESTful API with authentication, CRUD operations, and proper documentation",
      slots: 8,
      isSlotsAvailable: true,
      courseId: "default",
      amount: 3500,
      status: "OPEN",
      type: "FEATURE",
      expiryDate: "2025-12-27T23:59:59Z",
      createdAt: "2025-12-01T00:00:00Z",
      updatedAt: "2025-12-01T00:00:00Z",
    },
  ],
};

// Sample applied bounties (for demonstration)
export const appliedBountiesData: AppliedBounty[] = [];
