import React, { createContext, useContext, useState, useEffect } from 'react';
import { KAVYA_DEMO_ANSWERS } from '../scoring/demoAnswers';

const FounderContext = createContext();

// Default fallback demo data in case backend is loading
const defaultKavyaFounder = {
  id: "founder-kavya-1",
  founderName: "Kavya",
  brandName: "Namma Crunch",
  location: "Madurai, Tamil Nadu",
  industry: "Food & Beverages",
  productCategory: "Healthy snacks",
  websiteUrl: "https://nammacrunch.in",
  instagramHandle: "@nammacrunch",
  businessModel: "D2C + Regional Retail",
  businessStage: "Early traction",
  monthlyRevenue: "₹50K–₹2L",
  actualMonthlyRevenue: "₹1.8L",
  salesTrend: "Unpredictable",
  challenges: ["Marketing", "Sales", "Branding", "Distribution"],
  isSeekingFunding: true,
  fundingRequirement: "₹5L–₹10L",
  actualFundingRequirement: "₹7L",
  fundingPurpose: ["Marketing", "Expansion", "Inventory"],
  preferredLanguage: "Tamil / English",
  preferredMentorExpertise: "Performance Marketing & Brand Positioning",
  mentorshipMode: "Online",
  targetCustomer: "Health-conscious families, urban professionals, college students",
  primaryMarket: "Tamil Nadu & Tier 2/3 South India",
  brandStory: "Namma Crunch started in a home kitchen in Madurai, reviving heirloom millet recipes into crispy, wholesome baked snacks with zero palm oil or preservatives.",
  verified: true,
  proofOfWork: true,
  certifications: ["FSSAI Certified", "100% Roasted Not Fried", "Locally Sourced Millets"],
  achievements: [
    "Over 12,000 packs sold across South India",
    "Selected for Madurai Agri-Tech Showcase 2025",
    "4.9/5 customer satisfaction rating across 450+ reviews"
  ],
  growthScore: 68,
  scoreStatus: "Growth Potential: High",
  diagnosticAnswers: KAVYA_DEMO_ANSWERS,
  categoryScores: {
    product: 85,
    sales: 70,
    branding: 60,
    marketing: 50,
    customerReach: 70,
    fundingReadiness: 75
  },
  topGaps: [
    {
      id: "gap-1",
      dimension: "Marketing",
      score: 50,
      diagnosis: "Your product has traction, but your customer acquisition strategy is underdeveloped and relies on erratic organic posts.",
      actionText: "Fix this",
      actionUrl: "/marketing"
    },
    {
      id: "gap-2",
      dimension: "Branding",
      score: 60,
      diagnosis: "Your brand positioning is unclear compared with competing national D2C healthy snack brands.",
      actionText: "Improve branding",
      actionUrl: "/roadmap"
    },
    {
      id: "gap-3",
      dimension: "Sales Growth",
      score: 70,
      diagnosis: "Revenue exists (₹1.8L), but growth has been inconsistent month-on-month without recurring retention funnels.",
      actionText: "View strategy",
      actionUrl: "/roadmap"
    }
  ]
};

export const FounderProvider = ({ children }) => {
  const [activeFounder, setActiveFounder] = useState(defaultKavyaFounder);
  const [roadmapTasks, setRoadmapTasks] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [fundingOpportunities, setFundingOpportunities] = useState([]);
  const [products, setProducts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(3);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Fetch initial data
  const refreshAllData = async (founderId = "founder-kavya-1") => {
    setIsLoading(true);
    try {
      // Mentors
      const mentorsRes = await fetch(`/api/mentors?founderId=${founderId}`);
      if (mentorsRes.ok) {
        const data = await mentorsRes.json();
        setMentors(data.mentors || []);
      }

      // Funding
      const fundingRes = await fetch(`/api/funding?founderId=${founderId}`);
      if (fundingRes.ok) {
        const data = await fundingRes.json();
        setFundingOpportunities(data.opportunities || []);
      }

      // Roadmap
      const roadmapRes = await fetch(`/api/roadmap/${founderId}`);
      if (roadmapRes.ok) {
        const data = await roadmapRes.json();
        setRoadmapTasks(data.tasks || []);
      }

      // Products
      const prodRes = await fetch(`/api/marketplace`);
      if (prodRes.ok) {
        const data = await prodRes.json();
        setProducts(data.products || []);
      }

      // Campaigns
      const campRes = await fetch(`/api/campaigns`);
      if (campRes.ok) {
        const data = await campRes.json();
        setCampaigns(data.campaigns || []);
      }

      // Notifications
      const notifRes = await fetch(`/api/notifications`);
      if (notifRes.ok) {
        const data = await notifRes.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.warn("Backend API not reachable yet, using client state defaults:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAllData(activeFounder.id);
  }, []);

  // Action: Load demo persona Kavya
  const loadDemoKavya = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/demo/kavya');
      if (res.ok) {
        const data = await res.json();
        setActiveFounder(data.founder);
        await refreshAllData(data.founder.id);
      } else {
        setActiveFounder(defaultKavyaFounder);
      }
    } catch (e) {
      setActiveFounder(defaultKavyaFounder);
    } finally {
      setIsLoading(false);
    }
  };

  // Action: Onboard new founder
  const onboardFounder = async (formData) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const result = await res.json();
        setActiveFounder(result.founder);
        setRoadmapTasks(result.roadmap || []);
        await refreshAllData(result.founder.id);
        return result.founder;
      }
    } catch (err) {
      console.error("Onboard API error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Action: Toggle Roadmap Task
  const toggleRoadmapTask = async (taskId) => {
    // Optimistic UI update
    setRoadmapTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" }
          : t
      )
    );

    try {
      const target = roadmapTasks.find(t => t.id === taskId);
      const nextStatus = target?.status === "Completed" ? "Pending" : "Completed";
      await fetch(`/api/roadmap/${activeFounder.id}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
    } catch (e) {
      console.error("Task toggle failed:", e);
    }
  };

  // Action: Book Consultation
  const bookConsultation = async (mentorId, bookingData) => {
    try {
      const res = await fetch(`/api/mentors/${mentorId}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          founderId: activeFounder.id,
          ...bookingData
        })
      });
      if (res.ok) {
        const data = await res.json();
        // Refresh notifications
        const notifRes = await fetch('/api/notifications');
        if (notifRes.ok) {
          const nData = await notifRes.json();
          setNotifications(nData.notifications);
          setUnreadCount(nData.unreadCount);
        }
        return data.booking;
      }
    } catch (e) {
      console.error("Booking error:", e);
    }
  };

  // Action: Create Campaign
  const createCampaign = async (campaignData) => {
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          founderId: activeFounder.id,
          ...campaignData
        })
      });
      if (res.ok) {
        const data = await res.json();
        setCampaigns(prev => [data.campaign, ...prev]);
        return data.campaign;
      }
    } catch (e) {
      console.error("Create campaign error:", e);
    }
  };

  // Action: List Product
  const listProduct = async (productData) => {
    try {
      const res = await fetch('/api/marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          founderId: activeFounder.id,
          founderName: activeFounder.founderName,
          brand: activeFounder.brandName,
          location: activeFounder.location,
          ...productData
        })
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(prev => [data.product, ...prev]);
        return data.product;
      }
    } catch (e) {
      console.error("List product error:", e);
    }
  };

  // Notification actions
  const markNotificationRead = async (notifId) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, read: true } : n))
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
    fetch(`/api/notifications/${notifId}/read`, { method: 'PATCH' }).catch(() => {});
  };

  const markAllNotificationsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
    fetch('/api/notifications/mark-all-read', { method: 'POST' }).catch(() => {});
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <FounderContext.Provider
      value={{
        activeFounder,
        setActiveFounder,
        roadmapTasks,
        mentors,
        fundingOpportunities,
        products,
        campaigns,
        notifications,
        unreadCount,
        cart,
        isLoading,
        isNotificationOpen,
        setIsNotificationOpen,
        loadDemoKavya,
        onboardFounder,
        toggleRoadmapTask,
        bookConsultation,
        createCampaign,
        listProduct,
        markNotificationRead,
        markAllNotificationsRead,
        addToCart,
        refreshAllData
      }}
    >
      {children}
    </FounderContext.Provider>
  );
};

export const useFounder = () => useContext(FounderContext);
