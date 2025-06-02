// This is a mock implementation of scam detection service
// In a real application, this would connect to an actual AI model or API

import * as tf from '@tensorflow/tfjs';

interface EmailContent {
  sender: string;
  subject: string;
  content: string;
}

interface AnalysisResult {
  score: number;
  risk: string;
  explanation: string;
  redFlags: string[];
  confidence: number;
  languageDetected?: string;
  deepfakeDetected?: boolean;
}

interface ScammerProfile {
  id: string;
  platform: string;
  reportCount: number;
  lastReported: Date;
  status: 'confirmed' | 'suspected' | 'cleared';
}

// Sensitivity levels
export const SensitivityLevels = {
  LOW: 0.5,
  MEDIUM: 1.0,
  HIGH: 1.5
};

let currentSensitivity = SensitivityLevels.MEDIUM;

export const setSensitivity = (level: number) => {
  currentSensitivity = level;
};

// Language detection (mock implementation)
const detectLanguage = (text: string): string => {
  const languages = ['en', 'fr', 'es', 'de'];
  // In a real implementation, this would use the langdetect library
  return languages[Math.floor(Math.random() * languages.length)];
};

// Deepfake detection (mock implementation)
const detectDeepfake = async (videoUrl: string): Promise<boolean> => {
  // In a real implementation, this would use TensorFlow.js for video analysis
  await tf.ready();
  return Math.random() > 0.8; // Mock result
};

// Mock database of reported scammers
const scammerDatabase: ScammerProfile[] = [];

export const reportScammer = (platform: string, profileId: string) => {
  const existingProfile = scammerDatabase.find(
    profile => profile.id === profileId && profile.platform === platform
  );

  if (existingProfile) {
    existingProfile.reportCount++;
    existingProfile.lastReported = new Date();
    if (existingProfile.reportCount > 5) {
      existingProfile.status = 'confirmed';
    }
  } else {
    scammerDatabase.push({
      id: profileId,
      platform,
      reportCount: 1,
      lastReported: new Date(),
      status: 'suspected'
    });
  }
};

export const checkScammerProfile = (platform: string, profileId: string): ScammerProfile | null => {
  return scammerDatabase.find(
    profile => profile.id === profileId && profile.platform === platform
  ) || null;
};

// Common scam phrases and patterns
const scamPhrases = [
  "urgent action required",
  "vous avez gagné", // French
  "loterie gagnant", // French
  "million d'euros", // French
  "bitcoin investment",
  "cryptocurrency opportunity",
  "verify your account",
  "suspicious activity",
  "gift card",
  "wire transfer",
  "secret investment",
  "government grant",
  "tax refund",
  "inheritance",
  "prince",
  "nigeria",
  "kindly",
  "bank details",
  "western union",
  "money gram",
  "password expired",
  "claim your prize",
  "bank account access",
  "immediate action",
  "failure to comply",
  "legal action",
  "social security number",
  "amazon prime",
  "netflix account",
  "freelance payment",
  "upfront fee",
  "business opportunity",
];

const urlRedFlags = [
  "unusual domain names",
  "misspelled company names",
  "urls with lots of numbers and special characters",
  "unexpected subdomains",
  "http instead of https",
  "recently registered domains",
  "suspicious TLDs (.xyz, .tk, etc.)",
  "urls that look like legitimate sites but with small changes",
  "urls with random strings",
];

const emailRedFlags = [
  "sender address doesn't match the claimed organization",
  "generic greetings like 'Dear User' or 'Dear Customer'",
  "poor grammar and spelling errors",
  "request for personal information",
  "urgent or threatening language",
  "suspicious attachments",
  "mismatched links (text says one thing, but link goes elsewhere)",
  "unexpected emails about accounts or transactions",
];

// Helper function to calculate risk level based on score
const getRiskLevel = (score: number): string => {
  if (score >= 7) return "High Risk";
  if (score >= 4) return "Medium Risk";
  if (score >= 2) return "Low Risk";
  return "Safe";
};

// Helper function to get explanation based on risk level
const getExplanation = (risk: string): string => {
  switch (risk) {
    case "High Risk":
      return "This content contains multiple strong indicators of being a scam. It's highly recommended to avoid engaging with it.";
    case "Medium Risk":
      return "This content has several concerning elements that are common in scams. Proceed with extreme caution.";
    case "Low Risk":
      return "This content has a few suspicious elements but isn't definitively a scam. Exercise normal caution.";
    case "Safe":
      return "No obvious scam indicators were detected in this content, but always remain vigilant online.";
    default:
      return "Analysis complete. See details below.";
  }
};

// Text analysis function
export const analyzeText = (text: string): AnalysisResult => {
  const textLower = text.toLowerCase();
  let score = 0;
  const detectedFlags: string[] = [];

  // Check for common scam phrases
  scamPhrases.forEach(phrase => {
    if (textLower.includes(phrase.toLowerCase())) {
      score += 0.5 * currentSensitivity;
      detectedFlags.push(`Contains suspicious phrase: "${phrase}"`);
    }
  });
  
  // Check for urgency language
  if (/urgent|immediate|quickly|limited time|act now/i.test(textLower)) {
    score += 1 * currentSensitivity;
    detectedFlags.push("Uses urgency tactics to pressure quick action");
  }

  // Check for requests for personal information
  if (/password|credit card|social security|bank account|address|ssn/i.test(textLower)) {
    score += 1.5 * currentSensitivity;
    detectedFlags.push("Requests sensitive personal or financial information");
  }

  // Check for suspicious requests
  if (/western union|wire transfer|money gram|gift card|bitcoin|cryptocurrency|payment/i.test(textLower)) {
    score += 1.5 * currentSensitivity;
    detectedFlags.push("Requests payment via methods commonly used in scams");
  }

  // Check for poor grammar/spelling (simplified check)
  const grammarErrors = (/your the|you're account|there account|to received/i.test(textLower));
  if (grammarErrors) {
    score += 1 * currentSensitivity;
    detectedFlags.push("Contains grammar or spelling errors typical of scam messages");
  }

  // Check for excessive promises
  if (/guarantee|guaranteed|100%|risk-free|double your|triple your|amazing opportunity/i.test(textLower)) {
    score += 1 * currentSensitivity;
    detectedFlags.push("Makes unrealistic promises or guarantees");
  }
  
  // Random minor adjustments for demo variety
  score = Math.min(10, Math.max(0, score + (Math.random() * 0.5 - 0.25)));
  
  const risk = getRiskLevel(score);
  const explanation = getExplanation(risk);
  
  // Cap the number of red flags to show
  const topFlags = detectedFlags.slice(0, 5);

  return {
    score,
    risk,
    explanation,
    redFlags: topFlags,
    confidence: 0.85,
    languageDetected: detectLanguage(text)
  };
};

// URL analysis function
export const analyzeUrl = (url: string): AnalysisResult => {
  let score = 0;
  const detectedFlags: string[] = [];
  
  try {
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;
    
    // Check for HTTP instead of HTTPS
    if (parsedUrl.protocol === 'http:') {
      score += 1 * currentSensitivity;
      detectedFlags.push("Uses insecure HTTP instead of HTTPS");
    }
    
    // Check for suspicious TLDs
    if (/\.(xyz|tk|ml|ga|cf|gq)$/.test(domain)) {
      score += 1.5 * currentSensitivity;
      detectedFlags.push("Uses a TLD commonly associated with free domains and scams");
    }
    
    // Check for IP address as domain
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(domain)) {
      score += 2 * currentSensitivity;
      detectedFlags.push("Uses an IP address instead of a domain name");
    }
    
    // Check for excessive subdomains
    const subdomainCount = (domain.match(/\./g) || []).length;
    if (subdomainCount > 2) {
      score += 1 * currentSensitivity;
      detectedFlags.push("Uses an unusually complex subdomain structure");
    }
    
    // Check for misspelled popular domains
    if (/googl(?!e\.com)|facebo(?!ok\.com)|amaz(?!on\.com)|paypa(?!l\.com)|micros(?!oft\.com)/i.test(domain)) {
      score += 2.5 * currentSensitivity;
      detectedFlags.push("Domain appears to mimic a popular website with slight misspelling");
    }
    
    // Check for unusual URL paths
    if (/login|account|verify|secure|signin/.test(parsedUrl.pathname) && 
        !/^(google\.com|facebook\.com|amazon\.com|paypal\.com|microsoft\.com)$/.test(domain)) {
      score += 1.5 * currentSensitivity;
      detectedFlags.push("URL path suggests login or account verification on a suspicious domain");
    }
    
    // Check for excessive hyphens in domain
    if ((domain.match(/-/g) || []).length > 2) {
      score += 1 * currentSensitivity;
      detectedFlags.push("Domain contains an unusual number of hyphens");
    }
    
  } catch (error) {
    score += 1 * currentSensitivity;
    detectedFlags.push("Invalid URL format");
  }
  
  // Add some randomization for demo purposes
  if (detectedFlags.length === 0) {
    if (Math.random() > 0.7) {
      const randomFlag = urlRedFlags[Math.floor(Math.random() * urlRedFlags.length)];
      detectedFlags.push(randomFlag);
      score += 1.5 * currentSensitivity;
    }
  }
  
  // Random minor adjustments for demo variety
  score = Math.min(10, Math.max(0, score + (Math.random() * 0.5 - 0.25)));
  
  const risk = getRiskLevel(score);
  const explanation = getExplanation(risk);
  
  return {
    score,
    risk,
    explanation,
    redFlags: detectedFlags,
    confidence: 0.9
  };
};

// Email analysis function
export const analyzeEmail = (email: EmailContent): AnalysisResult => {
  let score = 0;
  const detectedFlags: string[] = [];
  
  const { sender, subject, content } = email;
  const contentLower = content.toLowerCase();
  const subjectLower = subject.toLowerCase();
  
  // Check sender address
  if (sender) {
    if (sender.includes('@') && 
        /paypal|amazon|microsoft|apple|google|facebook|bank|chase|wellsfargo|citi/i.test(sender) && 
        !/@(paypal|amazon|microsoft|apple|google|facebook|chase|wellsfargo|citi)\.(com|net|org)$/i.test(sender)) {
      score += 2 * currentSensitivity;
      detectedFlags.push("Sender email claims to be from a major company but uses an incorrect domain");
    }
    
    if (/[a-z0-9]{10,}@/.test(sender)) {
      score += 1 * currentSensitivity;
      detectedFlags.push("Sender address contains random-looking characters");
    }
  }
  
  // Check subject line
  if (subject) {
    if (/urgent|immediate|alert|action required|security|verify|suspended|unauthorized|unusual/i.test(subjectLower)) {
      score += 1 * currentSensitivity;
      detectedFlags.push("Subject line creates false urgency or concern");
    }
    
    if (/congratulations|won|winner|selected|prize|reward|gift|free|discount/i.test(subjectLower)) {
      score += 1 * currentSensitivity;
      detectedFlags.push("Subject promises rewards or prizes unexpectedly");
    }
  }
  
  // Run the text analysis on the content
  const textResult = analyzeText(content);
  score += textResult.score * 0.7; // Weight the content analysis at 70%
  
  textResult.redFlags.forEach(flag => {
    if (!detectedFlags.includes(flag)) {
      detectedFlags.push(flag);
    }
  });
  
  // Check for generic greetings
  if (/^(dear user|dear customer|dear sir|dear madam|hello)/i.test(contentLower)) {
    score += 1 * currentSensitivity;
    detectedFlags.push("Uses generic greeting rather than your actual name");
  }
  
  // Check for attachments mention
  if (/attached|attachment|open the attached|see attached/i.test(contentLower)) {
    score += 1 * currentSensitivity;
    detectedFlags.push("Mentions attachments which could contain malware");
  }
  
  // Check for mismatched URLs
  if (/click here|click this link/i.test(contentLower)) {
    score += 1 * currentSensitivity;
    detectedFlags.push("Uses vague 'click here' links that may hide actual destinations");
  }
  
  // Add some randomization for demo purposes
  if (detectedFlags.length === 0) {
    if (Math.random() > 0.7) {
      const randomFlag = emailRedFlags[Math.floor(Math.random() * emailRedFlags.length)];
      detectedFlags.push(randomFlag);
      score += 1.5 * currentSensitivity;
    }
  }
  
  // Random minor adjustments for demo variety
  score = Math.min(10, Math.max(0, score + (Math.random() * 0.5 - 0.25)));
  
  const risk = getRiskLevel(score);
  const explanation = getExplanation(risk);
  
  // Deduplicate and limit red flags
  const uniqueFlags = [...new Set(detectedFlags)];
  const topFlags = uniqueFlags.slice(0, 5);
  
  return {
    score,
    risk,
    explanation,
    redFlags: topFlags,
    confidence: 0.9,
    languageDetected: detectLanguage(content)
  };
};

export const analyzeVideo = async (videoUrl: string): Promise<AnalysisResult> => {
  const isDeepfake = await detectDeepfake(videoUrl);
  
  return {
    score: isDeepfake ? 9 : 2,
    risk: isDeepfake ? "High Risk" : "Low Risk",
    explanation: isDeepfake 
      ? "This video shows strong indicators of being AI-generated or manipulated."
      : "No clear signs of video manipulation detected.",
    redFlags: isDeepfake ? ["Potential deepfake detected", "Inconsistent facial movements", "Audio-visual mismatches"] : [],
    confidence: 0.85,
    deepfakeDetected: isDeepfake
  };
};

export const analyzeMarketplaceListing = async (
  platform: string,
  sellerId: string,
  listingContent: string
): Promise<AnalysisResult> => {
  const scammerProfile = checkScammerProfile(platform, sellerId);
  const textAnalysis = analyzeText(listingContent);
  
  let score = textAnalysis.score;
  const redFlags = [...textAnalysis.redFlags];
  
  if (scammerProfile) {
    if (scammerProfile.status === 'confirmed') {
      score = 10;
      redFlags.unshift('Seller has been confirmed as a scammer by multiple reports');
    } else if (scammerProfile.status === 'suspected') {
      score += 2;
      redFlags.unshift('Seller has been reported as suspicious by other users');
    }
  }
  
  return {
    score,
    risk: getRiskLevel(score),
    explanation: getExplanation(getRiskLevel(score)),
    redFlags,
    confidence: 0.9,
    languageDetected: detectLanguage(listingContent)
  };
};