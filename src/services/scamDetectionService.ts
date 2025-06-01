// This is a mock implementation of scam detection service
// In a real application, this would connect to an actual AI model or API

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
}

// Common scam phrases and patterns for demo purposes
const scamPhrases = [
  "urgent action required",
  "you've won",
  "lottery winner",
  "million dollars",
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
      score += 0.5;
      detectedFlags.push(`Contains suspicious phrase: "${phrase}"`);
    }
  });
  
  // Check for urgency language
  if (/urgent|immediate|quickly|limited time|act now/i.test(textLower)) {
    score += 1;
    detectedFlags.push("Uses urgency tactics to pressure quick action");
  }

  // Check for requests for personal information
  if (/password|credit card|social security|bank account|address|ssn/i.test(textLower)) {
    score += 1.5;
    detectedFlags.push("Requests sensitive personal or financial information");
  }

  // Check for suspicious requests
  if (/western union|wire transfer|money gram|gift card|bitcoin|cryptocurrency|payment/i.test(textLower)) {
    score += 1.5;
    detectedFlags.push("Requests payment via methods commonly used in scams");
  }

  // Check for poor grammar/spelling (simplified check)
  const grammarErrors = (/your the|you're account|there account|to received/i.test(textLower));
  if (grammarErrors) {
    score += 1;
    detectedFlags.push("Contains grammar or spelling errors typical of scam messages");
  }

  // Check for excessive promises
  if (/guarantee|guaranteed|100%|risk-free|double your|triple your|amazing opportunity/i.test(textLower)) {
    score += 1;
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
    redFlags: topFlags
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
      score += 1;
      detectedFlags.push("Uses insecure HTTP instead of HTTPS");
    }
    
    // Check for suspicious TLDs
    if (/\.(xyz|tk|ml|ga|cf|gq)$/.test(domain)) {
      score += 1.5;
      detectedFlags.push("Uses a TLD commonly associated with free domains and scams");
    }
    
    // Check for IP address as domain
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(domain)) {
      score += 2;
      detectedFlags.push("Uses an IP address instead of a domain name");
    }
    
    // Check for excessive subdomains
    const subdomainCount = (domain.match(/\./g) || []).length;
    if (subdomainCount > 2) {
      score += 1;
      detectedFlags.push("Uses an unusually complex subdomain structure");
    }
    
    // Check for misspelled popular domains (simplified check)
    if (/googl(?!e\.com)|facebo(?!ok\.com)|amaz(?!on\.com)|paypa(?!l\.com)|micros(?!oft\.com)/i.test(domain)) {
      score += 2.5;
      detectedFlags.push("Domain appears to mimic a popular website with slight misspelling");
    }
    
    // Check for unusual URL paths
    if (/login|account|verify|secure|signin/.test(parsedUrl.pathname) && 
        !/^(google\.com|facebook\.com|amazon\.com|paypal\.com|microsoft\.com)$/.test(domain)) {
      score += 1.5;
      detectedFlags.push("URL path suggests login or account verification on a suspicious domain");
    }
    
    // Check for excessive hyphens in domain
    if ((domain.match(/-/g) || []).length > 2) {
      score += 1;
      detectedFlags.push("Domain contains an unusual number of hyphens");
    }
    
  } catch (error) {
    score += 1;
    detectedFlags.push("Invalid URL format");
  }
  
  // Add some randomization for demo purposes
  if (detectedFlags.length === 0) {
    // If we haven't detected anything but want to show variety in the demo
    if (Math.random() > 0.7) {
      const randomFlag = urlRedFlags[Math.floor(Math.random() * urlRedFlags.length)];
      detectedFlags.push(randomFlag);
      score += 1.5;
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
    redFlags: detectedFlags
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
    // Look for mismatched sender domains
    if (sender.includes('@') && 
        /paypal|amazon|microsoft|apple|google|facebook|bank|chase|wellsfargo|citi/i.test(sender) && 
        !/@(paypal|amazon|microsoft|apple|google|facebook|chase|wellsfargo|citi)\.(com|net|org)$/i.test(sender)) {
      score += 2;
      detectedFlags.push("Sender email claims to be from a major company but uses an incorrect domain");
    }
    
    // Check for random-looking sender addresses
    if (/[a-z0-9]{10,}@/.test(sender)) {
      score += 1;
      detectedFlags.push("Sender address contains random-looking characters");
    }
  }
  
  // Check subject line
  if (subject) {
    // Check for urgency in subject
    if (/urgent|immediate|alert|action required|security|verify|suspended|unauthorized|unusual/i.test(subjectLower)) {
      score += 1;
      detectedFlags.push("Subject line creates false urgency or concern");
    }
    
    // Check for reward/prize language in subject
    if (/congratulations|won|winner|selected|prize|reward|gift|free|discount/i.test(subjectLower)) {
      score += 1;
      detectedFlags.push("Subject promises rewards or prizes unexpectedly");
    }
  }
  
  // Run the text analysis on the content
  const textResult = analyzeText(content);
  score += textResult.score * 0.7; // Weight the content analysis at 70%
  
  // Add any flags from the text analysis
  textResult.redFlags.forEach(flag => {
    if (!detectedFlags.includes(flag)) {
      detectedFlags.push(flag);
    }
  });
  
  // Check for generic greetings
  if (/^(dear user|dear customer|dear sir|dear madam|hello)/i.test(contentLower)) {
    score += 1;
    detectedFlags.push("Uses generic greeting rather than your actual name");
  }
  
  // Check for attachments mention
  if (/attached|attachment|open the attached|see attached/i.test(contentLower)) {
    score += 1;
    detectedFlags.push("Mentions attachments which could contain malware");
  }
  
  // Check for mismatched URLs (simplified)
  if (/click here|click this link/i.test(contentLower)) {
    score += 1;
    detectedFlags.push("Uses vague 'click here' links that may hide actual destinations");
  }
  
  // Add some randomization for demo purposes
  if (detectedFlags.length === 0) {
    // If we haven't detected anything but want to show variety in the demo
    if (Math.random() > 0.7) {
      const randomFlag = emailRedFlags[Math.floor(Math.random() * emailRedFlags.length)];
      detectedFlags.push(randomFlag);
      score += 1.5;
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
    redFlags: topFlags
  };
};