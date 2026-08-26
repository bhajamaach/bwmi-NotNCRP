export type Locale = "en" | "hi";

export const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" }
];

/**
 * Translations are keyed by the English source string itself, not an
 * abstract id — components call t("English sentence") and get back the
 * Hindi version if one exists, or the English string unchanged. This keeps
 * the English copy authoritative and makes a missing translation visibly
 * obvious (it just renders in English) rather than a broken key.
 *
 * Deliberately scoped to English + Hindi, done carefully, rather than many
 * languages done by guesswork — a fraud-reporting flow is the wrong place
 * for a shaky machine translation to introduce a misunderstanding.
 */
export const hi: Record<string, string> = {
  // AppShell
  "NotNCRP": "नॉटएनसीआरपी",
  "Cybercrime reporting, urgency-first": "साइबर अपराध रिपोर्टिंग, तात्कालिकता सबसे पहले",
  "Track": "ट्रैक करें",
  "Unfreeze account": "खाता अनफ्रीज़ करें",
  "Check a suspect": "संदिग्ध की जांच करें",
  "Cyber Cell": "साइबर सेल",
  "Login": "लॉगिन",
  "Sign out": "साइन आउट",
  "Report & track": "रिपोर्ट और ट्रैक",
  "Report active fraud": "सक्रिय धोखाधड़ी की रिपोर्ट करें",
  "Report a cybercrime": "साइबर अपराध की रिपोर्ट करें",
  "Track a complaint": "शिकायत ट्रैक करें",
  "Unfreeze an account": "खाता अनफ्रीज़ करें",
  "Resources": "संसाधन",
  "Calling 1930": "1930 पर कॉल करना",
  "Cyber safety tips": "साइबर सुरक्षा सुझाव",
  "FAQ": "सामान्य प्रश्न",
  "About": "जानकारी",
  "How this works": "यह कैसे काम करता है",
  "Login, bank contact, 1930, evidence review, and fund liens run against a local session rather than live banking or government systems. Evidence fingerprints are real SHA-256 hashes, computed in your browser. English only for now.":
    "लॉगिन, बैंक संपर्क, 1930, साक्ष्य समीक्षा, और फंड लियन इस डिवाइस के सत्र पर काम करते हैं, न कि लाइव बैंकिंग या सरकारी सिस्टम पर। साक्ष्य फिंगरप्रिंट असली SHA-256 हैश हैं, जो आपके ब्राउज़र में बनाए जाते हैं।",
  "NotNCRP is an independent project, not affiliated with or endorsed by cybercrime.gov.in or any government body.":
    "नॉटएनसीआरपी एक स्वतंत्र परियोजना है, यह cybercrime.gov.in या किसी भी सरकारी संस्था से संबद्ध या अनुमोदित नहीं है।",

  // Home
  "Is this happening right now, or did you just lose money?": "क्या यह अभी हो रहा है, या आपके पैसे अभी-अभी गए हैं?",
  "Financial fraud can often still be slowed if you act quickly. We ask about urgency first, then guide reporting and tracking with less uncertainty than a single long form.":
    "अगर आप जल्दी कार्रवाई करें तो वित्तीय धोखाधड़ी को अक्सर रोका जा सकता है। हम पहले तात्कालिकता पूछते हैं, फिर रिपोर्टिंग और ट्रैकिंग में आपका मार्गदर्शन करते हैं।",
  "Yes — help me now": "हां — अभी मदद करें",
  "Financial fraud in progress. Opens the Golden Hour fast-track flow.": "धोखाधड़ी अभी हो रही है। यह गोल्डन ऑवर फास्ट-ट्रैक फ़्लो खोलता है।",
  "No — I want to report something that already happened": "नहीं — मुझे कुछ ऐसा रिपोर्ट करना है जो पहले ही हो चुका है",
  "Use a plain-language guided complaint flow.": "सरल भाषा में मार्गदर्शित शिकायत फ़्लो का उपयोग करें।",
  "Not sure": "पक्का नहीं है",
  "Start with the guided questions; there is a path forward either way.": "मार्गदर्शित प्रश्नों से शुरू करें; दोनों ही स्थितियों में आगे का रास्ता है।",
  "Recognize urgency": "तात्कालिकता को पहचानें",
  "The first decision is time sensitivity, not government taxonomy.": "पहला निर्णय समय-संवेदनशीलता का है, सरकारी वर्गीकरण का नहीं।",
  "Act in parallel": "समानांतर में कार्रवाई करें",
  "1930 guidance, bank contact, and filing sit together.": "1930 मार्गदर्शन, बैंक संपर्क, और शिकायत दर्ज करना — सब एक साथ।",
  "Track clearly": "स्पष्ट रूप से ट्रैक करें",
  "A staged timeline with SLA escalation replaces a silent pending state.": "चरणबद्ध समयरेखा और SLA एस्केलेशन खामोश प्रतीक्षा-स्थिति की जगह लेते हैं।",

  // Login
  "Use one of the sample numbers below and any six-digit code, such as 123456.":
    "नीचे दिए गए नमूना नंबरों में से एक और कोई भी छह अंकों का कोड, जैसे 123456, उपयोग करें।",
  "Sample accounts": "नमूना खाते",
  "Mobile number": "मोबाइल नंबर",
  "OTP": "ओटीपी",
  "Send code": "कोड भेजें",
  "Or skip the code entirely": "या कोड को पूरी तरह छोड़ें",
  "Aadhaar e-KYC authenticates instantly instead of waiting on an OTP. No Aadhaar data is collected or stored anywhere here.":
    "आधार ई-केवाईसी ओटीपी की प्रतीक्षा किए बिना तुरंत प्रमाणित करता है। यहां कोई आधार डेटा एकत्र या संग्रहीत नहीं किया जाता।",
  "Continue with Aadhaar e-KYC": "आधार ई-केवाईसी के साथ जारी रखें"
};

export const translations: Record<Locale, Record<string, string>> = { en: {}, hi };
