import React, { createContext, useContext, useState, useEffect } from 'react';
import { localDataService, BENCHMARK_KAVYA } from '../services/localDataService';
import { calculateGrowthDiagnostic } from '../scoring/scoringEngine';
import { detectBottlenecksAndActions } from '../scoring/recommendationEngine';

const FounderContext = createContext();

export const FounderProvider = ({ children }) => {
  const [activeFounder, setActiveFounder] = useState(() => localDataService.getFounder());
  const [roadmapTasks, setRoadmapTasks] = useState(() => localDataService.getRoadmapTasks());
  const [mentors, setMentors] = useState(() => localDataService.getMentors());
  const [fundingOpportunities, setFundingOpportunities] = useState(() => localDataService.getFundingOpportunities());
  const [products, setProducts] = useState(() => localDataService.getProducts());
  const [campaigns, setCampaigns] = useState(() => localDataService.getCampaigns());
  const [notifications, setNotifications] = useState(() => localDataService.getNotifications());
  const [unreadCount, setUnreadCount] = useState(() => localDataService.getNotifications().filter(n => !n.read).length);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Sync / refresh all local data
  const refreshAllData = () => {
    setIsLoading(true);
    try {
      const founder = localDataService.getFounder();
      setActiveFounder(founder);
      setRoadmapTasks(localDataService.getRoadmapTasks());
      setMentors(localDataService.getMentors());
      setFundingOpportunities(localDataService.getFundingOpportunities());
      setProducts(localDataService.getProducts());
      setCampaigns(localDataService.getCampaigns());
      const notifs = localDataService.getNotifications();
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read).length);
    } catch (err) {
      console.warn("Local data load error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  // Action: Load demo persona Kavya (Reset to baseline benchmark)
  const loadDemoKavya = async () => {
    setIsLoading(true);
    try {
      const resetFounder = localDataService.resetDemo();
      setActiveFounder(resetFounder);
      setRoadmapTasks(localDataService.getRoadmapTasks());
      setMentors(localDataService.getMentors());
      setFundingOpportunities(localDataService.getFundingOpportunities());
      setProducts(localDataService.getProducts());
      setCampaigns(localDataService.getCampaigns());
      const notifs = localDataService.getNotifications();
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read).length);
    } finally {
      setIsLoading(false);
    }
  };

  // Action: Update single diagnostic answer dynamically (50 -> 100 -> 50 test behavior)
  const updateDiagnosticAnswer = (questionId, score) => {
    const result = localDataService.updateDiagnosticAnswer(questionId, score, activeFounder);
    setActiveFounder(result.founder);
    const notifs = localDataService.getNotifications();
    setNotifications(notifs);
    setUnreadCount(notifs.filter(n => !n.read).length);
    return result;
  };

  // Action: Onboard new founder
  const onboardFounder = async (formData) => {
    setIsLoading(true);
    try {
      const diag = calculateGrowthDiagnostic(
        formData.diagnosticAnswers,
        formData.businessStage || 'Early traction'
      );
      const bottlenecks = detectBottlenecksAndActions(diag.factors);

      const newFounder = {
        ...BENCHMARK_KAVYA,
        ...formData,
        growthScore: diag.overallScore,
        scoreStatus: diag.maturity,
        categoryScores: {
          product: diag.factors.product?.score || 80,
          sales: diag.factors.sales?.score || 70,
          branding: diag.factors.branding?.score || 60,
          marketing: diag.factors.marketing?.score || 52,
          customerReach: diag.factors.reach?.score || 64,
          fundingReadiness: diag.factors.funding?.score || 60
        },
        topGaps: bottlenecks.topGaps
      };

      localDataService.saveFounder(newFounder);
      setActiveFounder(newFounder);
      return newFounder;
    } finally {
      setIsLoading(false);
    }
  };

  // Action: Toggle Roadmap Task
  const toggleRoadmapTask = (taskId) => {
    const updated = localDataService.toggleRoadmapTask(taskId);
    setRoadmapTasks(updated);
  };

  // Action: Book Consultation
  const bookConsultation = async (mentorId, bookingData) => {
    const booking = localDataService.bookMentor(mentorId, bookingData);
    const notifs = localDataService.getNotifications();
    setNotifications(notifs);
    setUnreadCount(notifs.filter(n => !n.read).length);
    return booking;
  };

  // Action: Create Campaign
  const createCampaign = async (campaignData) => {
    const updated = localDataService.createCampaign(campaignData);
    setCampaigns(updated);
    const notifs = localDataService.getNotifications();
    setNotifications(notifs);
    setUnreadCount(notifs.filter(n => !n.read).length);
    return updated[0];
  };

  // Action: List Product
  const listProduct = async (productData) => {
    const updated = localDataService.listProduct(productData);
    setProducts(updated);
    const notifs = localDataService.getNotifications();
    setNotifications(notifs);
    setUnreadCount(notifs.filter(n => !n.read).length);
    return updated[0];
  };

  // Notification actions
  const markNotificationRead = (notifId) => {
    const updated = localDataService.markNotificationRead(notifId);
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
  };

  const markAllNotificationsRead = () => {
    const updated = localDataService.markAllNotificationsRead();
    setNotifications(updated);
    setUnreadCount(0);
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
        updateDiagnosticAnswer,
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
