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
  "Login, bank contact, 1930, evidence review, and fund liens run against a local session rather than live banking or government systems. Evidence fingerprints are real SHA-256 hashes, computed in your browser. Hindi coverage is deliberately scoped to the screens where translation accuracy matters most.":
    "लॉगिन, बैंक संपर्क, 1930, साक्ष्य समीक्षा, और फंड लियन इस डिवाइस के स्थानीय सत्र पर काम करते हैं, न कि लाइव बैंकिंग या सरकारी सिस्टम पर। साक्ष्य फिंगरप्रिंट असली SHA-256 हैश हैं, जो आपके ब्राउज़र में बनाए जाते हैं। हिंदी अनुवाद जानबूझकर उन्हीं स्क्रीन तक सीमित रखा गया है जहां सटीकता सबसे ज़्यादा मायने रखती है।",
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
  "Continue with Aadhaar e-KYC": "आधार ई-केवाईसी के साथ जारी रखें",

  // Golden Hour urgent flow (UrgencyBanner, ChecklistCard, shared ComplaintForm)
  "Golden Hour Fast Track": "गोल्डन ऑवर फास्ट ट्रैक",
  "Acting quickly can improve the chances of stopping further movement of funds. Call 1930, contact your bank, and file your complaint together instead of one after another.":
    "जल्दी कार्रवाई करने से धन की आगे की आवाजाही रोकने की संभावना बढ़ सकती है। 1930 पर कॉल करें, अपने बैंक से संपर्क करें, और अपनी शिकायत एक के बाद एक करने के बजाय साथ में दर्ज करें।",
  "Do these in parallel": "इन्हें एक साथ करें",
  "This app doesn't place calls or contact anyone for you — these are the actions to take yourself, right now.":
    "यह ऐप आपके लिए कॉल नहीं करता या किसी से संपर्क नहीं करता — ये कार्य आपको अभी स्वयं करने हैं।",
  "Call 1930": "1930 पर कॉल करें",
  "India’s national cyber fraud helpline.": "भारत की राष्ट्रीय साइबर धोखाधड़ी हेल्पलाइन।",
  "Marked called": "कॉल चिह्नित",
  "Mark call attempted": "कॉल के प्रयास को चिह्नित करें",
  "Contact your bank": "अपने बैंक से संपर्क करें",
  "I know my IFSC": "मुझे अपना IFSC पता है",
  "Just my bank name": "सिर्फ़ मेरे बैंक का नाम",
  "Look up the receiving branch by IFSC code": "IFSC कोड से प्राप्तकर्ता शाखा खोजें",
  "Looking up…": "खोजा जा रहा है…",
  "Look up": "खोजें",
  "Which bank is this?": "यह कौन-सा बैंक है?",
  "Select a bank": "एक बैंक चुनें",
  "Marked contacted": "संपर्क चिह्नित",
  "Mark bank contacted": "बैंक से संपर्क को चिह्नित करें",
  "Keep transaction ID / UTR ready": "लेन-देन आईडी / यूटीआर तैयार रखें",
  "Type once; form uses it": "एक बार टाइप करें; फ़ॉर्म इसका उपयोग करता है",
  "Complaint details": "शिकायत का विवरण",
  "Required fields are marked. Validation appears beside each field before submission.":
    "आवश्यक फ़ील्ड चिह्नित हैं। सबमिट करने से पहले हर फ़ील्ड के बगल में सत्यापन दिखाई देता है।",
  "Filed anonymously — no name, account, or login is attached. Save your acknowledgement number after submitting; it’s the only way to check this report’s status later.":
    "गुमनाम रूप से दर्ज — कोई नाम, खाता, या लॉगिन जुड़ा नहीं है। सबमिट करने के बाद अपना पावती नंबर सहेज लें; बाद में इस रिपोर्ट की स्थिति जांचने का यही एकमात्र तरीका है।",
  "Category": "श्रेणी",
  "Subcategory": "उप-श्रेणी",
  "Amount lost": "गंवाई गई राशि",
  "Transaction ID / UTR": "लेन-देन आईडी / यूटीआर",
  "Incident date and time": "घटना की तारीख और समय",
  "Description": "विवरण",
  "Explain what happened, who contacted you, what changed in your account, and what evidence you have.":
    "बताएं कि क्या हुआ, किसने आपसे संपर्क किया, आपके खाते में क्या बदला, और आपके पास क्या सबूत है।",
  "Minimum 45 characters.": "न्यूनतम 45 अक्षर।",
  "Submitting...": "सबमिट हो रहा है...",
  "Submit complaint": "शिकायत सबमिट करें",

  // Standard guided report (CategoryQA)
  "What happened?": "क्या हुआ?",
  "Choose the plain-language description closest to your situation. We map it to a complaint category in the background.":
    "अपनी स्थिति से सबसे मिलता-जुलता सरल विवरण चुनें। हम इसे पृष्ठभूमि में एक शिकायत श्रेणी से जोड़ देते हैं।",
  "Someone took money or accessed my account": "किसी ने पैसे निकाल लिए या मेरे खाते तक पहुंच बना ली",
  "UPI, card, wallet, banking, or suspicious account access.": "UPI, कार्ड, वॉलेट, बैंकिंग, या संदिग्ध खाता पहुंच।",
  "Someone shared or threatened to share private content": "किसी ने निजी सामग्री साझा की या साझा करने की धमकी दी",
  "Intimate images, blackmail, stalking, or threats involving private material.":
    "अंतरंग तस्वीरें, ब्लैकमेल, पीछा करना, या निजी सामग्री से जुड़ी धमकियां।",
  "My account or device was hacked": "मेरा खाता या डिवाइस हैक हो गया",
  "Email, social account, phone, laptop, or cloud account compromise.": "ईमेल, सोशल खाता, फ़ोन, लैपटॉप, या क्लाउड खाता समझौता।",
  "I am being harassed or impersonated": "मुझे परेशान किया जा रहा है या मेरी पहचान का दुरुपयोग हो रहा है",
  "Fake profile, repeated threats, abusive messages, or identity misuse.": "फ़र्ज़ी प्रोफ़ाइल, बार-बार धमकियां, अपमानजनक संदेश, या पहचान का दुरुपयोग।",
  "Something else": "कुछ और",
  "Continue with a general complaint when none of these fit.": "अगर इनमें से कोई भी लागू न हो तो सामान्य शिकायत के साथ आगे बढ़ें।",
  "UPI fraud": "UPI धोखाधड़ी",
  "Card fraud": "कार्ड धोखाधड़ी",
  "Investment scam": "निवेश घोटाला",
  "Bank impersonation or phishing": "बैंक की नकल या फ़िशिंग",
  "Email or social media account": "ईमेल या सोशल मीडिया खाता",
  "Phone or laptop compromise": "फ़ोन या लैपटॉप समझौता",
  "Cloud account compromise": "क्लाउड खाता समझौता",
  "Fake profile impersonating me": "मेरी नकल करती फ़र्ज़ी प्रोफ़ाइल",
  "Repeated threats or abuse": "बार-बार धमकियां या दुर्व्यवहार",
  "Identity misuse elsewhere": "कहीं और पहचान का दुरुपयोग",
  "Which of these best matches?": "इनमें से कौन सबसे उपयुक्त है?",
  "Brief category name": "संक्षिप्त श्रेणी नाम",
  "Example: fake job offer": "उदाहरण: फर्जी नौकरी का प्रस्ताव",
  "Report anonymously": "गुमनाम रूप से रिपोर्ट करें",
  "No name, account, or login is attached to this report. You’ll get an acknowledgement number to check its status — that’s the only way to find it again, since it won’t appear in any dashboard.":
    "इस रिपोर्ट से कोई नाम, खाता, या लॉगिन जुड़ा नहीं है। आपको इसकी स्थिति जांचने के लिए एक पावती नंबर मिलेगा — इसे दोबारा खोजने का यही एकमात्र तरीका है, क्योंकि यह किसी भी डैशबोर्ड पर नहीं दिखेगी।",
  "Complaint form": "शिकायत फ़ॉर्म",
  "Choose the closest match above to open the guided form.": "मार्गदर्शित फ़ॉर्म खोलने के लिए ऊपर सबसे नज़दीकी विकल्प चुनें।",
  "Select what happened to open the guided form. There is always a valid path forward, including \"Something else.\"":
    "मार्गदर्शित फ़ॉर्म खोलने के लिए जो हुआ उसे चुनें। हमेशा आगे बढ़ने का एक वैध रास्ता है, \"कुछ और\" सहित।",

  // Track dashboard, complaint card, timeline
  "Login to view complaints": "शिकायतें देखने के लिए लॉगिन करें",
  "Reporting is open to anyone, but tracking your complaints requires signing in.":
    "रिपोर्ट करना किसी के लिए भी खुला है, लेकिन अपनी शिकायतें ट्रैक करने के लिए साइन इन करना आवश्यक है।",
  "Complaint tracking": "शिकायत ट्रैकिंग",
  "Signed in as": "इस रूप में साइन इन है",
  "New report": "नई रिपोर्ट",
  "All": "सभी",
  "Active": "सक्रिय",
  "Resolved": "समाधान हो गया",
  "Escalated": "एस्केलेटेड",
  "No complaints match this filter.": "इस फ़िल्टर से कोई शिकायत मेल नहीं खाती।",
  "Nothing to report — and that's the good outcome": "रिपोर्ट करने के लिए कुछ नहीं — और यही अच्छी बात है",
  "Anything you file will show up here, tracked from the moment it's received.":
    "आप जो भी दर्ज करेंगे वह यहां दिखेगा, प्राप्त होने के क्षण से ट्रैक किया जाएगा।",
  "Start a report": "रिपोर्ट शुरू करें",
  "Filed": "दर्ज",
  "Escalation available": "एस्केलेशन उपलब्ध",
  "Received": "प्राप्त",
  "Your complaint is logged and an acknowledgement number is issued.": "आपकी शिकायत दर्ज हो गई है और एक पावती नंबर जारी किया गया है।",
  "Complaint acknowledgement created": "शिकायत पावती बन गई",
  "Assigned to Cyber Cell": "साइबर सेल को सौंपा गया",
  "The complaint is routed to a cyber cell officer for review.": "शिकायत समीक्षा के लिए साइबर सेल अधिकारी को भेजी गई है।",
  "Awaiting assignment": "असाइनमेंट की प्रतीक्षा में",
  "Bank / PSP Notified": "बैंक / PSP को सूचित किया गया",
  "Relevant banks or payment providers are alerted where applicable.": "जहां लागू हो, संबंधित बैंकों या भुगतान प्रदाताओं को सतर्क किया जाता है।",
  "Applies when financial channels need alerting": "जब वित्तीय चैनलों को सतर्क करने की ज़रूरत हो तब लागू",
  "Under Investigation": "जांच के अधीन",
  "The assigned officer is reviewing evidence and following up.": "नियुक्त अधिकारी साक्ष्य की समीक्षा कर रहा है और आगे की कार्रवाई कर रहा है।",
  "Review and follow-up in progress": "समीक्षा और अनुवर्ती कार्रवाई जारी",
  "The complaint has reached a resolution or final update.": "शिकायत का समाधान हो गया है या अंतिम अपडेट आ गया है।",
  "Resolution update pending": "समाधान अपडेट लंबित",

  // Complaint detail (unfreeze-side pieces shared with GrievanceTimeline)
  "Back to dashboard": "डैशबोर्ड पर वापस जाएं",

  // Admin / Cyber Cell dashboard
  "Internal view": "आंतरिक दृश्य",
  "Cyber Cell dashboard": "साइबर सेल डैशबोर्ड",
  "Advance a complaint's status and it updates immediately on the citizen's tracking page.":
    "किसी शिकायत की स्थिति आगे बढ़ाएं और यह तुरंत नागरिक के ट्रैकिंग पृष्ठ पर अपडेट हो जाती है।",
  "Total": "कुल",
  "Pattern by category": "श्रेणी के अनुसार पैटर्न",
  "This session’s complaints only — a local stand-in for the kind of cross-case pattern view a real Samanvay-style analytics layer would run over the full national caseload.":
    "केवल इस सत्र की शिकायतें — एक वास्तविक समन्वय-शैली विश्लेषण परत जो पूरे राष्ट्रीय केसलोड पर चलती, उसके लिए एक स्थानीय स्थानापन्न।",
  "Search by acknowledgement number": "पावती नंबर से खोजें",
  "Filter by status": "स्थिति के अनुसार फ़िल्टर करें",
  "All statuses": "सभी स्थितियां",
  "Complaint": "शिकायत",
  "Status": "स्थिति",
  "Action": "कार्रवाई",
  "No complaints match this search or filter.": "इस खोज या फ़िल्टर से कोई शिकायत मेल नहीं खाती।",
  "SLA exceeded": "SLA पार हो गया",
  "Within SLA window": "SLA विंडो के भीतर",
  "Done": "पूर्ण",
  "Advance": "आगे बढ़ाएं",
  "Status updated.": "स्थिति अपडेट हुई।",
  "Self-service grievance queue": "स्व-सेवा शिकायत निवारण कतार",
  "Unfreezing petitions": "अनफ्रीज़िंग याचिकाएं",
  "Petitions move to \"Video-KYC scheduled\" on their own once the citizen books a slot. The remaining steps — review and NOC issuance — are officer actions from here, and mutate the same state the citizen sees on their petition page.":
    "जब नागरिक कोई स्लॉट बुक करता है तो याचिकाएं अपने आप \"वीडियो-केवाईसी शेड्यूल्ड\" चरण में चली जाती हैं। बाकी चरण — समीक्षा और NOC जारी करना — यहां से अधिकारी की कार्रवाई हैं, और वही स्थिति बदलते हैं जो नागरिक अपने याचिका पृष्ठ पर देखता है।",
  "Petition": "याचिका",
  "Account": "खाता",
  "Stage": "चरण",
  "No unfreezing petitions yet.": "अभी तक कोई अनफ्रीज़ याचिका नहीं है।",
  "Waiting on citizen to book KYC": "नागरिक के केवाईसी बुक करने की प्रतीक्षा",
  "Mark review complete": "समीक्षा पूर्ण चिह्नित करें",
  "Issue NOC": "NOC जारी करें",
  "Updated.": "अपडेट हो गया।",

  // Suspect check
  "Public suspect registry": "सार्वजनिक संदिग्ध रजिस्ट्री",
  "Search a UPI VPA, phone number, bank account, or email before you pay or share information. This checks a small starter list, not the live I4C Suspect Registry.":
    "भुगतान करने या जानकारी साझा करने से पहले UPI VPA, फ़ोन नंबर, बैंक खाता, या ईमेल खोजें। यह केवल एक छोटी शुरुआती सूची जांचता है, लाइव I4C संदिग्ध रजिस्ट्री नहीं।",
  "UPI VPA, phone number, bank account, or email": "UPI VPA, फ़ोन नंबर, बैंक खाता, या ईमेल",
  "Check": "जांचें",
  "Flagged": "फ़्लैग किया गया",
  "Phone number": "फ़ोन नंबर",
  "Bank account": "बैंक खाता",
  "Email": "ईमेल",
  "Flagged on": "फ़्लैग तिथि",
  "Report this number on Sanchar Saathi (Chakshu) ↗": "इस नंबर की संचार साथी (चक्षु) पर रिपोर्ट करें ↗",
  "Not found": "नहीं मिला",
  "No match on this list. That's not a guarantee of legitimacy — stay cautious with unfamiliar payment requests regardless.":
    "इस सूची में कोई मेल नहीं मिला। यह वैधता की गारंटी नहीं है — फिर भी अपरिचित भुगतान अनुरोधों से सावधान रहें।",
  "Try one of these flagged identifiers:": "इनमें से किसी फ़्लैग किए गए पहचानकर्ता को आज़माएं:",

  // Unfreeze account flow
  "Self-service grievance": "स्व-सेवा शिकायत निवारण",
  "Unfreeze my account": "मेरा खाता अनफ्रीज़ करें",
  "If your account was frozen because it received funds later flagged as part of someone else’s fraud case, petition here instead of visiting a bank branch. You’ll book a remote video-KYC slot yourself once this is submitted.":
    "अगर आपका खाता इसलिए फ्रीज़ हुआ क्योंकि इसमें ऐसा धन प्राप्त हुआ जिसे बाद में किसी और के धोखाधड़ी मामले में फ़्लैग किया गया, तो बैंक शाखा जाने के बजाय यहां याचिका दायर करें। सबमिट करने के बाद आप स्वयं एक रिमोट वीडियो-केवाईसी स्लॉट बुक करेंगे।",
  "Frozen account number": "फ्रीज़ किया गया खाता नंबर",
  "Why should this account be released?": "यह खाता क्यों जारी किया जाना चाहिए?",
  "Example: I received this payment for a legitimate sale on a marketplace and had no involvement in the fraud complaint.":
    "उदाहरण: मुझे यह भुगतान एक मार्केटप्लेस पर वैध बिक्री के लिए मिला था और धोखाधड़ी की शिकायत में मेरी कोई संलिप्तता नहीं है।",
  "Minimum 30 characters.": "न्यूनतम 30 अक्षर।",
  "Submit petition": "याचिका सबमिट करें",
  "Petition not found": "याचिका नहीं मिली",
  "This can happen if your browser data was cleared, or the link is from a different browser or device.":
    "ऐसा तब हो सकता है जब आपके ब्राउज़र का डेटा साफ़ हो गया हो, या लिंक किसी अन्य ब्राउज़र या डिवाइस से हो।",
  "Start a new petition": "नई याचिका शुरू करें",
  "Account ending": "खाता — अंतिम अंक",
  "Book your video-KYC slot": "अपना वीडियो-केवाईसी स्लॉट बुक करें",
  "Pick a remote verification time with an investigating officer to move your petition forward.":
    "अपनी याचिका को आगे बढ़ाने के लिए जांच अधिकारी के साथ एक रिमोट सत्यापन समय चुनें।",
  "Video-KYC booked": "वीडियो-केवाईसी बुक हो गया",
  "Slot:": "स्लॉट:",
  "An officer will review your case afterward — no further action needed from you here.":
    "इसके बाद एक अधिकारी आपके मामले की समीक्षा करेगा — यहां आपकी ओर से किसी और कार्रवाई की आवश्यकता नहीं है।",
  "Under officer review": "अधिकारी की समीक्षा में",
  "Your video-KYC session is complete. The investigating officer is reviewing your evidence.":
    "आपका वीडियो-केवाईसी सत्र पूरा हो गया है। जांच अधिकारी आपके साक्ष्य की समीक्षा कर रहा है।",
  "NOC issued — lien released": "NOC जारी — लियन हटाया गया",
  "A digitally signed No Objection Certificate was sent to your bank via API. The hold on this account has been released.":
    "एक डिजिटल हस्ताक्षरित अनापत्ति प्रमाणपत्र (NOC) API के माध्यम से आपके बैंक को भेजा गया है। इस खाते पर लगी रोक हटा दी गई है।",
  "Evidence submitted": "प्रस्तुत साक्ष्य",
  "Petition submitted": "याचिका सबमिट की गई",
  "Your proof of legitimacy has been logged against the frozen account.": "फ्रीज़ किए गए खाते के विरुद्ध आपकी वैधता का प्रमाण दर्ज कर लिया गया है।",
  "Petition acknowledgement created": "याचिका पावती बन गई",
  "Video-KYC scheduled": "वीडियो-केवाईसी शेड्यूल्ड",
  "A remote verification slot is booked with an investigating officer.": "जांच अधिकारी के साथ एक रिमोट सत्यापन स्लॉट बुक किया गया है।",
  "Book a slot below": "नीचे एक स्लॉट बुक करें",
  "Investigating officer review": "जांच अधिकारी समीक्षा",
  "The officer is reviewing your evidence and the video-KYC session.": "अधिकारी आपके साक्ष्य और वीडियो-केवाईसी सत्र की समीक्षा कर रहा है।",
  "Awaiting officer review": "अधिकारी समीक्षा की प्रतीक्षा में",
  "NOC issued": "NOC जारी",
  "Released once the officer approves": "अधिकारी की मंजूरी मिलते ही जारी",

  // Help pages
  "Calling the 1930 helpline": "1930 हेल्पलाइन पर कॉल करना",
  "1930 is the national helpline for reporting financial cyber fraud. Calling it quickly, alongside contacting your bank, can improve the chance of stopping further movement of funds — this is why the Golden Hour flow surfaces it as a parallel action rather than a step to finish before filing.":
    "1930 वित्तीय साइबर धोखाधड़ी की रिपोर्ट करने के लिए राष्ट्रीय हेल्पलाइन है। इसे तुरंत कॉल करना, साथ ही अपने बैंक से संपर्क करना, धन की आगे की आवाजाही रोकने की संभावना बढ़ा सकता है — इसीलिए गोल्डन ऑवर फ़्लो इसे शिकायत दर्ज करने से पहले पूरा करने वाले चरण के बजाय एक समानांतर कार्रवाई के रूप में दिखाता है।",
  "Before you call": "कॉल करने से पहले",
  "Keep ready: the transaction ID / UTR, the approximate amount, and the date and time of the transaction.":
    "तैयार रखें: लेन-देन आईडी / यूटीआर, अनुमानित राशि, और लेन-देन की तारीख व समय।",
  "What the helpline can do": "हेल्पलाइन क्या कर सकती है",
  "Flag the transaction to the payment channel involved so it can attempt to hold or trace the funds. It does not replace filing a complaint — you still need to file one, in parallel.":
    "लेन-देन को संबंधित भुगतान चैनल तक फ़्लैग करता है ताकि वह धनराशि रोकने या ट्रेस करने का प्रयास कर सके। यह शिकायत दर्ज करने का विकल्प नहीं है — आपको समानांतर रूप से शिकायत दर्ज करनी ही होगी।",
  "One thing to know": "एक बात जान लें",
  "Marking \"Call 1930\" as done in the Golden Hour checklist only tracks the step for you — you still need to dial 1930 yourself.":
    "गोल्डन ऑवर चेकलिस्ट में \"1930 पर कॉल करें\" को पूर्ण के रूप में चिह्नित करना केवल आपके लिए इस चरण को ट्रैक करता है — आपको फिर भी स्वयं 1930 डायल करना होगा।",
  "Go to the Golden Hour flow": "गोल्डन ऑवर फ़्लो पर जाएं",
  "Frequently asked questions": "अक्सर पूछे जाने वाले प्रश्न",
  "Is this the official cybercrime reporting portal?": "क्या यह आधिकारिक साइबर अपराध रिपोर्टिंग पोर्टल है?",
  "Why does the app ask about urgency before anything else?": "ऐप सबसे पहले तात्कालिकता के बारे में क्यों पूछता है?",
  "Active financial fraud and an older complaint need different handling. Recognizing urgency first routes you to the Golden Hour flow, where guidance and filing happen in parallel instead of one long form.":
    "सक्रिय वित्तीय धोखाधड़ी और पुरानी शिकायत को अलग तरह से संभालने की ज़रूरत होती है। पहले तात्कालिकता पहचानना आपको गोल्डन ऑवर फ़्लो पर ले जाता है, जहां मार्गदर्शन और शिकायत दर्ज करना एक लंबे फ़ॉर्म के बजाय साथ-साथ होता है।",
  "What happens after I submit a complaint?": "शिकायत सबमिट करने के बाद क्या होता है?",
  "You get an acknowledgement number immediately and are taken straight to the complaint's timeline, where you can see its current stage and any escalation.":
    "आपको तुरंत एक पावती नंबर मिलता है और आप सीधे शिकायत की समयरेखा पर पहुंच जाते हैं, जहां आप इसका मौजूदा चरण और किसी भी एस्केलेशन को देख सकते हैं।",
  "What does the SLA and escalation mean?": "SLA और एस्केलेशन का क्या मतलब है?",
  "Each complaint has an expected resolution window for its category. If that window passes without the complaint moving forward, an escalation option appears on the complaint's detail page.":
    "हर शिकायत की अपनी श्रेणी के अनुसार एक अपेक्षित समाधान अवधि होती है। अगर वह अवधि बिना शिकायत आगे बढ़े निकल जाती है, तो शिकायत के विवरण पृष्ठ पर एक एस्केलेशन विकल्प दिखाई देता है।",
  "Where is my data stored?": "मेरा डेटा कहां संग्रहीत है?",
  "Locally, in your browser. Login, bank contact, 1930, and complaint data stay on this device and aren't sent anywhere.":
    "स्थानीय रूप से, आपके ब्राउज़र में। लॉगिन, बैंक संपर्क, 1930, और शिकायत डेटा इसी डिवाइस पर रहते हैं और कहीं नहीं भेजे जाते।",
  "General, plain-language guidance to reduce the chance of financial fraud and account compromise.":
    "वित्तीय धोखाधड़ी और खाता समझौता होने की संभावना कम करने के लिए सामान्य, सरल भाषा में मार्गदर्शन।",
  "Banks never ask for your OTP or PIN": "बैंक कभी आपका OTP या PIN नहीं मांगते",
  "No genuine bank, UPI app, or payment provider will call, message, or email you asking for your OTP, PIN, or card CVV. Treat any such request as fraud.":
    "कोई भी असली बैंक, UPI ऐप, या भुगतान प्रदाता आपको कॉल, मैसेज, या ईमेल करके आपका OTP, PIN, या कार्ड CVV नहीं मांगेगा। ऐसे किसी भी अनुरोध को धोखाधड़ी मानें।",
  "Verify before you pay": "भुगतान करने से पहले सत्यापित करें",
  "Before sending money for a job offer, refund, or investment, independently verify the requester through an official number or website you looked up yourself — not one they gave you.":
    "नौकरी के प्रस्ताव, रिफ़ंड, या निवेश के लिए पैसे भेजने से पहले, अनुरोधकर्ता को स्वयं खोजे गए आधिकारिक नंबर या वेबसाइट से स्वतंत्र रूप से सत्यापित करें — उनके द्वारा दिए गए से नहीं।",
  "Unknown links and QR codes": "अनजान लिंक और QR कोड",
  "Scanning a QR code or opening a link to 'receive' money is a common trick — QR codes and payment links are for sending money, not receiving it.":
    "पैसे 'प्राप्त करने' के लिए QR कोड स्कैन करना या लिंक खोलना एक आम चाल है — QR कोड और भुगतान लिंक पैसे भेजने के लिए हैं, प्राप्त करने के लिए नहीं।",
  "Screenshot and note details immediately": "तुरंत स्क्रीनशॉट लें और विवरण नोट करें",
  "If something looks wrong, screenshot the chat, note the transaction ID / UTR, and the exact time. This makes both the 1930 call and the complaint faster to act on.":
    "अगर कुछ गड़बड़ लगे, तो चैट का स्क्रीनशॉट लें, लेन-देन आईडी / यूटीआर, और सटीक समय नोट करें। इससे 1930 कॉल और शिकायत दोनों पर तेज़ी से कार्रवाई हो पाती है।",
  "Slow down on urgency and authority": "तात्कालिकता और अधिकार के दबाव में जल्दबाज़ी न करें",
  "Scams often combine a fake deadline with a fake authority (police, bank, court). Real institutions do not pressure you to act within minutes over chat or call.":
    "धोखाधड़ी अक्सर एक फ़र्ज़ी समय-सीमा को फ़र्ज़ी अधिकार (पुलिस, बैंक, अदालत) के साथ जोड़ती है। असली संस्थाएं आपको चैट या कॉल पर मिनटों में कार्रवाई करने का दबाव नहीं डालतीं।"
};

export const translations: Record<Locale, Record<string, string>> = { en: {}, hi };
