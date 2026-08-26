# **Master Case Study & Ground-Up Re-Engineering Blueprint for the National Cyber Crime Reporting Portal (NCRP)**

## **1\. Executive Overview & Baseline Infrastructure Audit**

The National Cyber Crime Reporting Portal (NCRP), accessible at cybercrime.gov.in, serves as India’s centralized public gateway for digital crime reporting under the Ministry of Home Affairs' (MHA) Indian Cyber Crime Coordination Centre (I4C) initiative1. Designed to address financial cyber fraud, online harassment, child sexual abuse material (CSAM), identity theft, cryptocurrency scams, and digital arrest extortion, NCRP coordinates public intake with police action and banking interventions1.  
NCRP operates as part of an integrated cyber defense network managed by I4C4. The underlying ecosystem comprises six key operational pillars:

* **Public Intake Channels:** The primary web portal (cybercrime.gov.in) for detailed reporting and the 24x7 emergency helpline 1930 for immediate telephonic financial fraud intervention1.  
* **Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS):** The core routing backend connecting state police, commercial banks, payment service providers (PSPs), and payment gateways to execute fund tracking and lien marking4.  
* **Analytical & Geospatial Infrastructure:** The *Suspect Registry* (a centralized database of malicious phone numbers, UPI VPAs, bank accounts, and social media handles), *Samanvay* (a joint investigation and data analytics platform), and *Pratibimb* (a geospatial mapping tool tracking active cybercrime hubs)4.  
* **Telecom Coordination Mesh:** Direct synchronization with the Department of Telecommunications' (DoT) *Sanchar Saathi* and *Chakshu* platforms for blocking malicious mobile connections, fraudulent SMS templates, and spoofed handsets2.  
* **Remediation & Account Unfreezing Modules:** The *Grievance Redressal Module (GRM)* (ncrp-grievanceredressal.mha.gov.in) for processing account unfreezing requests, alongside the *Money Restoration Module* for returning frozen funds to victims4.  
* **Law Enforcement System Integration:** Automated and manual data transfers to state police Crime and Criminal Tracking Network & Systems (CCTNS) for First Information Report (FIR) filing and judicial processing9.

## **2\. Empirical Growth Trajectory, Operational Metrics, & Bottlenecks**

The expansion of India's digital payments ecosystem has coincided with a surge in cyber fraud volume, testing NCRP's existing intake and processing capacity4.

| Metric | Calendar Year 2021 | Calendar Year 2023 | Calendar Year 2025 | Systemic Operational Impact |
| :---- | :---- | :---- | :---- | :---- |
| **Annual Reported Complaints** | 2,62,8467 | 13,10,3577 | 24,02,5797 | Case volume expanded by over 800%, overwhelming manual police verification workflows7. |
| **Direct Reported Financial Loss** | ₹551 Crore7 | Not Disclosed | ₹22,495 Crore7 | Average loss per incident grew sharply due to structured investment, crypto, and digital arrest scams7. |
| **Prevented / Frozen Defrauded Funds** | Baseline | Cumulative ₹8,690 Cr (Jan 2026\)7 | Cumulative ₹11,158 Cr+4 | CFCFRMS holds funds in transit, though long-term victim recovery rates remain constrained by judicial delays4. |
| **Telco Infrastructure Enforcement** | Baseline | \~10 Lakh Lines Blocked | 39.43 Lakh Mobile Lines; 2.27 Lakh Handsets Blocked4 | Cross-portal blocking via Sanchar Saathi and Chakshu integration expanded significantly2. |

This high case volume highlights critical vulnerabilities: intake friction, delayed fund tracking, collateral account freezes on innocent users, and minimal status visibility for citizens6.

## **3\. Comprehensive Problem Audit of Current Subsystems**

### **1\. Citizen Web Intake Subsystem (cybercrime.gov.in)**

* **Excessive Form Complexity:** Requires navigating multi-page forms with complex fields during critical reporting windows1.  
* **Session Instability & Timeouts:** High latency and aggressive server session timeouts frequently drop unsaved data16.  
* **OTP Throttling:** SMS gateway delays lead to expired One-Time Passwords during authentication16.  
* **Lack of Local Offline Caching:** Browser crashes force users to restart data entry from scratch16.

### **2\. 1930 Emergency Helpline Tele-Intake**

* **Telephony Congestion:** High call volume leads to busy lines, causing delays during the critical "Golden Hour" (the first 30–60 minutes post-fraud)5.  
* **Manual Data Entry Errors:** Operators manually log spoken transaction details into CFCFRMS dashboards, introducing potential typos in account numbers or transaction references5.  
* **Redundant Web Filing Requirements:** Telephonic reports create temporary tickets; complainants must submit a full online report within 24 hours to prevent ticket invalidation5.

### **3\. Financial Interception Engine (CFCFRMS)**

* **Indiscriminate Account Freezing:** When disputed funds enter a target bank account, the system often triggers a total debit freeze on the entire balance rather than holding only the disputed amount6.  
* **Cascading Collateral Damage:** Fraudulent transactions routed quickly across multiple accounts (Layer 1 to Layer 2 to Layer 3\) trigger automated debit freezes on accounts belonging to legitimate merchants, gig workers, and P2P traders6.  
* **Unsynchronized Banking APIs:** Uneven API maturity across public, private, and cooperative banks leads to delayed freeze execution, allowing bad actors time to siphon funds4.

### **4\. Police Jurisdiction Dispatch & CCTNS Integration**

* **Manual Data Re-Entry:** Central portal complaints do not auto-populate state CCTNS databases, requiring manual transcription by local police staff9.  
* **FIR Conversion Delays:** Complaints often sit in unassigned queues without being converted into First Information Reports under IT Act Sections 66C/66D or BNS Section 3189.  
* **Jurisdictional Hand-off Disputes:** Uncertainty over whether jurisdiction rests at the victim's location or the beneficiary bank's branch leads to inter-station transfers5.

### **5\. Evidence Intake & Verification Subsystem**

* **Unvalidated Uploads:** Accepts flat image files without verifying image clarity or legibility3.  
* **Absence of Automated OCR:** Bank statements and payment receipts are stored as flat images without automated extraction of transaction reference numbers9.  
* **Evidentiary Compliance Deficits:** Uploads lack cryptographic hashing or timestamping at intake, creating verification steps under Bharatiya Sakshya Adhiniyam (BSA) Section 639.

### **6\. Status Tracking & Visibility Interface**

* **Static Status Labels:** Displays opaque progress markers (e.g., "Under Process") for long periods6.  
* **Missing Officer Details:** Rarely displays the assigned Investigating Officer's (IO) contact information or station location6.  
* **Opaque Financial Tracking:** Complainants cannot view whether funds were successfully frozen or track the progress of legal recovery6.

### **7\. Grievance Redressal & Account Unfreezing (GRM)**

* **High Bureaucratic Friction:** Account holders must physically visit bank branches to submit paper KYC documents and statements6.  
* **Judicial Dependency:** Unfreezing funds or securing No Objection Certificates (NOCs) often requires filing formal applications in magistrate courts6.  
* **Inter-State Delays:** Investigating officers in distant jurisdictions often experience delays in reviewing digital unfreezing requests6.

## **4\. Ground-Up Functional Mapping: Zero-Omission Feature Baseline**

To ensure zero loss of functionality, all current capabilities across NCRP, I4C, CFCFRMS, and DoT modules are consolidated into the re-engineered platform:

                            RE-ENGINEERED NCRP 3.0 ECOSYSTEM  
                                           |  
    \+-------------------+------------------+-------------------+-------------------+  
    |                   |                  |                   |                   |  
    v                   v                  v                   v                   v  
1\. Citizen Intake   2\. Dynamic Lien    3\. Evidence &       4\. Police & Legal   5\. Self-Service  
   Subsystem           & Escrow Grid      Analytics Hub       Bridge              Grievance Module  
   \- 60s Panic UI      \- Partial Liens    \- Automated OCR     \- Bi-directional    \- Direct Web App  
   \- Women/Child Hub   \- Auto-Escrow      \- SHA-256 Hashing     CCTNS Sync        \- Video-KYC Desk  
   \- Non-Financial     \- Layer Risk       \- Suspect Registry  \- Auto-FIR Drafts   \- Automated API  
     Reporting           Scoring            Lookup            \- SLA Escalations     NOC Broadcast

### **Consolidated Functional Catalog**

> 1. **Specialized Women & Children Intake Hub:** Anonymous and authenticated pathways for reporting Child Sexual Abuse Material (CSAM), sexually explicit content, cyberstalking, and online harassment3.  
> 2. **General & Financial Cyber Crime Intake:** Modular workflows covering unauthorized UPI, debit/credit card, net banking, crypto scams, identity theft, ransomware, hacking, and digital arrest extortion3.  
> 3. **1930 Helpline Tele-Intake Integration:** Real-time bi-directional synchronization connecting phone call intakes directly with the web platform4.  
> 4. **Public Suspect Registry & Lookup Module:** Citizen tools to search and report malicious website URLs, WhatsApp numbers, Telegram handles, email IDs, SMS headers, UPI VPAs, and bank accounts1.  
> 5. **Grievance Redressal Module (GRM):** Self-service pathways for innocent bank account holders to petition for lien removal and account unfreezing4.  
> 6. **Money Restoration Module:** Workflows for returning frozen funds back to victims following legal guidelines4.  
> 7. **Telecom Defense Mesh (Chakshu / Sanchar Saathi):** Cross-platform integration to trigger automated SIM and IMEI disconnections2.  
> 8. **Police Analytics & Investigation Integration:** Backend connections to Samanvay for joint analytics and Pratibimb for geospatial tracking of cyber syndicates4.

## **5\. UI/UX Overhaul: The "Kavach" Design System**

The rebuilt interface replaces bureaucratic complexity with an accessible, high-performance user experience.

### **Visual Architecture & Interface Design**

* **Focused Action Layout:** The homepage removes decorative banners, minister portraits, and unorganized link menus. It focuses on four primary cards: **Report Emergency Fraud**, **Track Case Status**, **Unfreeze Account**, and **Report Suspect**1.  
* **Design Tokens:** Built on high-contrast accessibility standards (light/dark mode toggle) using clear status indicators: Panic Red (Urgent Action), Caution Amber (Pending Input), Safe Green (Lien/NOC Secured), and Info Blue (General Guidance).  
* **Progressive Disclosure:** Forms render input fields dynamically based on user selections, avoiding long single-page layouts6.

### **Emergency "Golden Hour" Panic UI**

* **60-Second Express Workflow:** A specialized interface designed for victims actively experiencing ongoing fraud5.  
* **Four-Field Emergency Input:** Requires only **Phone Number**, **Disputed Amount**, **Payment Channel** (UPI/Bank/Wallet), and **Transaction Reference (UTR/ARN)** to initiate immediate banking freezes5.

                     EMERGENCY GOLDEN-HOUR INTAKE FLOW  
                                     |  
    \+--------------------------------+--------------------------------+  
    |                                                                 |  
    v                                                                 v  
Step 1: Citizen Input                                  Step 2: Instant Automated Action  
  \- Phone Number                                         \- Live NPCI/Bank API Lookup  
  \- Disputed Amount                                      \- Partial Lien Placed on Beneficiary  
  \- Payment Channel                                      \- Auto-SMS Parsing Verification  
  \- UTR / ARN Reference                                  \- Ticket Dispatched to CFCFRMS

### **Multilingual & Inclusive Accessibility (WCAG 2.2 AAA Compliance)**

* **22 Official Indian Languages:** Native language options with contextual translation tailored for each region rather than automated text conversion.  
* **AI Voice Guided Intake:** Integrated voice response enabling users to state incident details naturally in regional dialects.  
* **Accessibility Controls:** Built-in screen-reader optimization, text scaling, high-contrast toggles, and lightweight layouts for low-bandwidth connections.

### **Progressive Web App (PWA) & Offline Reliability**

* **Client-Side Draft Caching:** Browser-level IndexedDB caching stores form progress locally, preventing data loss during network drops16.  
* **Background Upload Management:** Uploaded screenshots and documents queue locally and sync automatically when internet connectivity stabilizes.

## **6\. Detailed Technical Architecture: NCRP 3.0**

The rebuilt platform uses an event-driven microservices architecture hosted on multi-region cloud infrastructure.

                               NCRP 3.0 TECHNICAL INFRASTRUCTURE  
                                               |  
       \+-----------------------+---------------+---------------+-----------------------+  
       |                       |               |               |                       |  
       v                       v               v               v                       v  
PWA Front-End Engine    API Gateway & Auth   Core Processing  Integrations Grid       Data Storage Layer  
  \- Offline PWA          \- Rate Limiting     Microservices    \- Banking/NPCI APIs     \- Encrypted DB  
  \- Voice AI Assistant   \- Aadhaar e-KYC     \- Lien Engine    \- State CCTNS APIs      \- Cryptographic Vault  
  \- Multi-Language UI    \- OAuth 2.0 / JWT   \- OCR Pipeline   \- Sanchar Saathi Mesh   \- Graph Intelligence

### **Key Re-Engineered Subsystems**

#### **1\. Express Golden-Hour Intake Engine**

* **Aadhaar-Based Authentication:** Native e-KYC integration enables instant login, eliminating traditional SMS OTP delays16.  
* **Automated SMS Extraction:** With user authorization, a secure utility parses transaction details directly from bank SMS notifications5.

#### **2\. Dynamic Lien & Escrow Management Engine**

* **Proportional Lien Placement:** Mandates that financial institutions lock *only* the specific disputed amount rather than freezing total account balances6.  
* **Downstream Account Risk Scoring:** Evaluates receiver accounts based on age, transaction patterns, and tax history. Low-risk merchant accounts receive targeted partial holds rather than operational suspensions6.  
* **Automated Digital Escrow Staging:** Frozen funds are moved to an interest-bearing escrow account after 30 days of non-contest, removing hold management from commercial bank ledgers4.

#### **3\. Evidence Enrichment & Cryptographic Verification Pipeline**

* **Real-Time API Lookup:** Direct connections with NPCI and Core Banking Systems (CBS) validate transaction references instantly during intake5.  
* **Client-Side OCR Extraction:** Scans uploaded bank statements or chat screenshots to automatically extract transaction IDs, dates, and account details5.  
* **Cryptographic Evidence Hashing:** Generates SHA-256 hashes and timestamp certificates upon submission to maintain chain-of-custody requirements under Section 63 of the Bharatiya Sakshya Adhiniyam, 20239.

#### **4\. Bi-Directional CCTNS Bridge & Automated FIR Engine**

* **Direct Database Synchronization:** Transfers intake data into state police CCTNS instances via secure APIs, eliminating manual transcription9.  
* **Automated FIR Drafting:** Cases exceeding designated financial thresholds automatically generate draft FIRs pre-filled with legal classifications (IT Act 66C/66D, BNS §318) for IO review9.  
* **SLA Escalation Rules:** Automatically flags and escalates unassigned or delayed cases to District Superintendents after designated timeframes13.

#### **5\. Self-Service Grievance & Remote Unfreezing Engine**

* **Direct Public Portal:** Upgrades the backend grievance tool into a public web app (ncrp-grievanceredressal.mha.gov.in)13.  
* **Remote Video-KYC Verification:** Allows account holders to upload legitimacy proof (e.g., business invoices) and complete remote video verifications with investigating officers6.  
* **Automated API NOC Issuance:** Upon IO approval, the system issues a digitally signed NOC directly to the bank via API to release account holds6.

#### **6\. Transparent Multi-Tenant Tracking Visualizer**

* **Detailed Status Pipeline:** Displays clear case milestones: Reported ![][image1] Lien Placed ![][image1] Bank Confirmed ![][image1] Police Assigned ![][image1] IO Appointed ![][image1] FIR Registered ![][image1] Refund Disbursed6.  
* **Investigating Officer Contact Details:** Displays assigned officer contact information, station location, and scheduled virtual meeting options6.  
* **Financial Tracking Updates:** Provides clear updates on frozen amounts, their current staging location, and estimated disbursement timelines6.

## **7\. Comparative System Architecture**

| System Feature | Present NCRP (cybercrime.gov.in) | Re-Engineered NCRP 3.0 |
| :---- | :---- | :---- |
| **Intake Portal** | Multi-page static forms, slow session timeouts, manual OTP entry1. | Lightweight PWA, single-screen 60s emergency mode, Aadhaar e-KYC login5. |
| **User Experience (UX)** | Complex navigation, crowded layouts, bureaucratic text1. | "Kavach" Design System, clean component cards, dark/light modes, voice AI assistant. |
| **Accessibility** | Basic text options focusing primarily on English/Hindi1. | Native 22-language support, WCAG 2.2 AAA compliance, full voice-guided input. |
| **Evidence Handling** | Unvalidated image uploads requiring manual verification3. | Client-side OCR parsing, instant NPCI API validation, SHA-256 evidence hashing5. |
| **Bank Lien Marking** | Blanket account debit freezes affecting total balances6. | Dynamic partial amount-based liens; automated digital escrow staging6. |
| **Account Unfreezing** | Physical bank visits, paper applications, magistrate court petitions6. | Self-service web portal, remote Video-KYC verification, automated API NOC releases6. |
| **Police Integration** | Manual data transcription into state CCTNS instances9. | Bi-directional API sync, automated FIR drafting, system-enforced SLA escalations9. |
| **Case Visibility** | Static status updates ("Under Process"), missing officer contact details6. | Step-by-step progress tracking pipeline, assigned IO contact card, financial updates6. |

## **8\. Service Level Agreements (SLAs) & Legal Framework**

### **Enforceable Operational SLAs**

| System Node | Required Operational Action | Enforced SLA Target | System Escalation Trigger |
| :---- | :---- | :---- | :---- |
| **Banking / PSP Nodes** | Execute API-driven lien placement on disputed funds | ![][image2] Minutes | Alert sent to Nodal Officer of Beneficiary Bank5. |
| **Local Cyber Cell** | Initial complaint review and IO assignment | 48 Hours | Automatic escalation to District Cyber Cell Head13. |
| **Investigating Officer** | Review and conversion of eligible complaints into FIRs | 7 Calendar Days | System notification to State CCTNS Nodal Authority9. |
| **Grievance Module / IO** | Adjudication of unfreezing requests for verified accounts | 7 Calendar Days | Transfer of petition to District Grievance Officer13. |
| **Judicial / IO Node** | Disbursement of undisputed escrowed funds to victims | 30 Calendar Days | Alert sent to District Legal Services Authority4. |

### **Legal & Regulatory Alignment**

> 1. **Standardized Lien SOPs:** Codify digital lien protocols under the Bharatiya Nagarik Suraksha Sanhita (BNSS) to allow targeted amount-based holds via platform APIs6.  
> 2. **RBI Zero-Liability Synchronization:** Connect directly with Reserve Bank of India (RBI) customer protection workflows. Valid complaints submitted within 3 working days automatically trigger zero-liability notices for affected users19.  
> 3. **Cross-Platform Telecom Enforcement:** Link directly with DoT Sanchar Saathi and Chakshu platforms to automate mobile line and device disconnections upon report verification2.

## **9\. Implementation Roadmap**

> 1. **Phase 1: API Core & Express Intake (Months 1–3):** Deploy the unified PWA front-end, establish real-time NPCI/banking lookup APIs, and integrate client-side OCR parsing5.  
> 2. **Phase 2: Dynamic Lien & Escrow Staging (Months 4–6):** Roll out partial lien protocols across commercial banks and implement 30-day digital escrow staging for undisputed funds6.  
> 3. **Phase 3: CCTNS Bridge & Self-Service Unfreezing (Months 7–9):** Enable bi-directional CCTNS database synchronization, auto-FIR generation, and the remote Video-KYC unfreezing engine9.  
> 4. **Phase 4: Full Deployment & Telco Integration (Months 10–12):** Integrate real-time cross-blocking with DoT Sanchar Saathi / Chakshu, launch public suspect repository lookups nationwide, and deploy full multi-language voice AI support1.

#### **Works cited**

> 1. Cyber Crime Portal, [https://cybercrime.gov.in/](https://cybercrime.gov.in/)  
> 2. Multimodal AI-Powered Incident Reporting: Leveraging ... \- IJNIET, [http://www.ijniet.org/wp-content/uploads/2026/03/1.pdf](http://www.ijniet.org/wp-content/uploads/2026/03/1.pdf)  
> 3. National Cyber Crime Reporting Portal, [https://www.india.gov.in/services/details/national-cyber-crime-reporting-portal](https://www.india.gov.in/services/details/national-cyber-crime-reporting-portal)  
> 4. India’s Digital Shield: How I4C is winning the war against cybercrime, [https://organiser.org/2026/08/26/377008/bharat/indias-digital-shield-how-i4c-is-winning-the-war-against-cybercrime/](https://organiser.org/2026/08/26/377008/bharat/indias-digital-shield-how-i4c-is-winning-the-war-against-cybercrime/)  
> 5. Instagram Seller Took Money and Blocked You: Recovery Steps 2026, [https://righttoinformation.wiki/instagram-seller-money-blocked-recovery-india](https://righttoinformation.wiki/instagram-seller-money-blocked-recovery-india)  
> 6. Report a Cyber Crime \- End Now Foundation, [https://endnowfoundation.org/report-a-cyber-crime/](https://endnowfoundation.org/report-a-cyber-crime/)  
> 7. The New Face of Cyber Fraud: The Scams Every Indian Should, [https://www.hindustantimes.com/genesis/the-new-face-of-cyber-fraud-the-scams-every-indian-should-know-about-101785392673937.html](https://www.hindustantimes.com/genesis/the-new-face-of-cyber-fraud-the-scams-every-indian-should-know-about-101785392673937.html)  
> 8. Shri Amit Shah Launches Key Initiatives to Tackle Cybercrime, [https://cyberpeace.org/resources/blogs/i4c-foundation-day-celebration-shri-amit-shah-launches-key-initiatives-to-tackle-cybercrime](https://cyberpeace.org/resources/blogs/i4c-foundation-day-celebration-shri-amit-shah-launches-key-initiatives-to-tackle-cybercrime)  
> 9. How can victims recover money from cyber fraud in India, [https://www.vidhikarya.com/legal-blog/how-to-recover-money-cyber-fraud-india](https://www.vidhikarya.com/legal-blog/how-to-recover-money-cyber-fraud-india)  
> 10. How India's CFCFRMS (1930) and the FBI's Recovery Asset Team, [https://ministryofcyberaffairs.com/news/how-india-s-cfcfrms-1930-and-the-fbi-s-recovery-asset-team-handle-online-financial-crimes-b1261410-d687-47ed-b3fb-fa76d5acfb2c](https://ministryofcyberaffairs.com/news/how-india-s-cfcfrms-1930-and-the-fbi-s-recovery-asset-team-handle-online-financial-crimes-b1261410-d687-47ed-b3fb-fa76d5acfb2c)  
> 11. T.N. police arrest 837 cyber criminals in two days, [https://www.thehindu.com/news/national/tamil-nadu/tn-police-arrest-837-cyber-criminals-in-two-days/article71324604.ece](https://www.thehindu.com/news/national/tamil-nadu/tn-police-arrest-837-cyber-criminals-in-two-days/article71324604.ece)  
> 12. Annual Report 2024-25 \- Ministry of Home Affairs, [https://www.mha.gov.in/sites/default/files/AREnglish\_24032026.pdf](https://www.mha.gov.in/sites/default/files/AREnglish_24032026.pdf)  
> 13. How to Get Your Bank Account Unfrozen \- The420.in, [https://the420.in/i4c-grievance-redressal-module-bank-account-freeze-unfreezing-guide/](https://the420.in/i4c-grievance-redressal-module-bank-account-freeze-unfreezing-guide/)  
> 14. MHA Annual Report 2020-21 Overview | PDF | Government \- Scribd, [https://www.scribd.com/document/612186835/FCRA](https://www.scribd.com/document/612186835/FCRA)  
> 15. Track the Status of Your Cyber Crime Complaints, [https://www.india.gov.in/services/details/track-the-status-of-your-cyber-crime-complaints](https://www.india.gov.in/services/details/track-the-status-of-your-cyber-crime-complaints)  
> 16. Parth Sukhija — ParthXD3 | Founder, XDCyberTech Pvt. Ltd., [https://www.parthxd7.in/](https://www.parthxd7.in/)  
> 17. ARTIFICIAL INTELLIGENCE, DATA ANALYTICS AND CYBER ... \- ICSI, [https://www.icsi.edu/media/webmodules/Academics/Artificial\_Intelligence\_Data\_Analytics\_And\_Cyber\_Security\_Laws\_&\_Practice.pdf](https://www.icsi.edu/media/webmodules/Academics/Artificial_Intelligence_Data_Analytics_And_Cyber_Security_Laws_&_Practice.pdf)  
> 18. Digital Arrest Scam in India: Follow Steps to Recover Your Money, [https://www.legalraasta.com/blog/digital-arrest-scam-recovery-india/](https://www.legalraasta.com/blog/digital-arrest-scam-recovery-india/)  
> 19. Golden-hour zero liability: the exact RBI math for cyber fraud \- RTI Wiki, [https://righttoinformation.wiki/golden-hour-zero-liability-cyber-fraud-rbi-india](https://righttoinformation.wiki/golden-hour-zero-liability-cyber-fraud-rbi-india)  
> 20. Aadhaar Card Misused or Stolen? Here's What to Do Right Now, [https://www.iifl.com/blogs/other/what-to-do-if-aadhaar-card-is-misused-or-stolen](https://www.iifl.com/blogs/other/what-to-do-if-aadhaar-card-is-misused-or-stolen)  
> 21. Sell Old Phone Safely in India: Scam-Proof Checklist | InstaCash, [https://getinstacash.in/blog/sell-old-phone-safely-india/](https://getinstacash.in/blog/sell-old-phone-safely-india/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAwElEQVR4Xr2S0Q3CMAxEnS/W4QOJH+ZiDhaCERiAVRCFNK2EnXNsJ4I+yUpyOV+ttkSJCmXhe5OEHhAMfK90sFOrNTK6ebk14WE0o6Y16LBaDMT4LcJx5YcGTiT+BNN3u4IRUsF74JTrXIszrJfHBCKpuO55Odb6wpJxKJXWNV6PXDccA99XDy8abtV5i1OJFvnd7/SSa1eLA4gHP3EwBe9+hnn2quqm9HhNWn8CCH9n+ydW/GyA8McJGz1ksxX1AWs9C99ZTx42AAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAWCAYAAABHcFUAAAABEElEQVR4Xu2SOwoCMRiEN2qhIDaCjRfwLp7DO4m30NoTiGBnKxYWNoKFlRbOPtxs/vx57CY+Cj8YhJn5k2xMknwVQQ0dj8ofhvze2Nsjpt7Rnfi8cw/z2lwiWLcWwn8NY88YqEw9ex9hAd1xoAkNXLg/wthQH3altoau0EhaDMWAnDNulFgzS9RBusfvEerR0JdyfctGjjBjAJ2hLdSStnuwFsJvvTF0g1aqrQ/rTn3Uh2ImfbwPaE6DcNyb88i5140tSycCTY9F6UMnaCOca1Zjvao74bShHXSAuiQLItZh07/0Ag1pQAnasOHwjBo/SMNPi03QMWzDWVYU+B7jMpaOVymHq3KeH9wk56m4GzlPJhMSYEBedkgAAAAASUVORK5CYII=>