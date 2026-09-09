/* =========================================================
   MASTER MIND — NATIVE TOOLS ENGINE
   86 DOMAINS × 3 TOOLS = 258 NATIVE TOOLS
   ========================================================= */

(function () {
  "use strict";

  const NATIVE_TOOLS = [
    {
      domain: "Knowledge & General Intelligence",
      tools: [
        "Live Claim & Debunk Engine",
        "Mental Models Visualizer",
        "Debate Sparring AI"
      ]
    },
    {
      domain: "Education & Learning",
      tools: [
        "Universal Syllabus-to-Roadmap Engine",
        "Feynman Technique Voice Room",
        "Auto-Flashcards & Smart Notes"
      ]
    },
    {
      domain: "Competitive Exams & Certifications",
      tools: [
        "Multi-Exam Simulator",
        "Smart PYQ Vault",
        "Weakness Heatmap"
      ]
    },
    {
      domain: "History & Civilization",
      tools: [
        "Interactive 3D Time-Machine Map",
        "Historical Persona Chat",
        "Artifact & Inscription Decrypter"
      ]
    },
    {
      domain: "Geography & Earth",
      tools: [
        "Interactive Tectonic & Climate Globe",
        "Topography & Map Quiz Engine",
        "Biome & Mineral Scanner"
      ]
    },
    {
      domain: "Languages & Linguistics",
      tools: [
        "Native Accent & Phonetics Trainer",
        "Live Sentence Anatomy Builder",
        "Dialect & Slang Translator"
      ]
    },
    {
      domain: "Literature & Humanities",
      tools: [
        "Poetry & Meter Analyzer",
        "Character Archetype Mapper",
        "Classic Book Condensed Audio"
      ]
    },
    {
      domain: "Philosophy & Ethics",
      tools: [
        "Trolley Problem Dilemma Engine",
        "Philosophical Lens Switcher",
        "Stoic Daily Journal"
      ]
    },
    {
      domain: "Society & Anthropology",
      tools: [
        "Kinship & Culture Tree Visualizer",
        "Cultural Etiquette Simulator",
        "Societal Trend Predictor"
      ]
    },
    {
      domain: "Politics, Government & Public Policy",
      tools: [
        "Policy Impact Simulator",
        "Constitution Article Navigator",
        "Manifesto & Bill Comparator"
      ]
    },

    {
      domain: "Law & Judiciary",
      tools: [
        "Legal Contract & Agreement Auditing",
        "Case Law Precedent Finder",
        "Moot Court AI"
      ]
    },
    {
      domain: "Economics & Finance",
      tools: [
        "Macroeconomic Flow Sandbox",
        "Personal Cash Flow Engine",
        "Economic Concept Explainer"
      ]
    },
    {
      domain: "Business & Management",
      tools: [
        "Business Model Canvas Builder",
        "Crisis Management Simulator",
        "SWOT & Porter’s 5 Forces Analyzer"
      ]
    },
    {
      domain: "Startups & Entrepreneurship",
      tools: [
        "Pitch Deck Reviewer & Generator",
        "Angel / VC Investor Persona",
        "Startup Legal & Compliance Checklist"
      ]
    },
    {
      domain: "Careers, Jobs & Professional Skills",
      tools: [
        "Resume ATS Scorer & Optimizer",
        "Live Mock Interview Voice Bot",
        "Salary Negotiation Script Generator"
      ]
    },
    {
      domain: "Data, Statistics & Analytics",
      tools: [
        "In-App CSV/Excel Analyzer",
        "Interactive Statistical Formula Sandbox",
        "SQL Query Playground"
      ]
    },
    {
      domain: "Computer Science",
      tools: [
        "Data Structures & Algorithms Visualizer",
        "Time & Space Complexity Scanner",
        "CS Fundamentals Concept Maps"
      ]
    },
    {
      domain: "Web & Software Development",
      tools: [
        "In-Browser Code Sandbox",
        "Instant Bug Hunter & Explainer",
        "API Architecture Designer"
      ]
    },
    {
      domain: "Mobile & App Development",
      tools: [
        "UI/UX to Flutter/React Native Converter",
        "App Store Guidelines Auditor",
        "Mobile State Management Sandbox"
      ]
    },
    {
      domain: "Artificial Intelligence & Machine Learning",
      tools: [
        "Neural Network Topology Visualizer",
        "Prompt Engineering Sandbox",
        "Dataset Quality Auditor"
      ]
    },

    {
      domain: "Cybersecurity & Digital Safety",
      tools: [
        "Password & Hash Strength Cracker Simulator",
        "Phishing & Scam Link Detective",
        "Vulnerability & CVE Database"
      ]
    },
    {
      domain: "Cloud, DevOps & Infrastructure",
      tools: [
        "Architecture Diagram to Terraform/Docker Generator",
        "Cloud Cost Estimator AWS/GCP/Azure",
        "CI/CD Pipeline Builder"
      ]
    },
    {
      domain: "Blockchain, Web3 & Cryptography",
      tools: [
        "Smart Contract Vulnerability Auditor",
        "Visual Cryptography Playground",
        "Consensus Simulator PoW vs PoS"
      ]
    },
    {
      domain: "Quantum Computing & Information",
      tools: [
        "Quantum Circuit Builder",
        "Bloch Sphere 3D Visualizer",
        "Quantum Algorithm Explainer"
      ]
    },
    {
      domain: "Robotics, IoT & Embedded Systems",
      tools: [
        "Circuit & Arduino/ESP32 Breadboard Sandbox",
        "Kinematics & Arm Angle Calculator",
        "IoT Protocol Simulator"
      ]
    },
    {
      domain: "Physics",
      tools: [
        "2D Mechanics Sandbox",
        "Optics & Wave Ray Tracer",
        "Relativity & Spacetime Visualizer"
      ]
    },
    {
      domain: "Chemistry",
      tools: [
        "3D Molecular Model Builder",
        "Chemical Reaction & Balancing Engine",
        "Periodic Table Deep Scanner"
      ]
    },
    {
      domain: "Biology & Life Sciences",
      tools: [
        "Interactive 3D Cell Explorer",
        "Evolutionary Tree/Phylogenetics Explorer",
        "Ecosystem Food Web Simulator"
      ]
    },
    {
      domain: "Biotechnology & Genetics",
      tools: [
        "DNA to Protein Sequence Translator",
        "CRISPR Gene Editing Sandbox",
        "Gel Electrophoresis Simulator"
      ]
    },
    {
      domain: "Medicine & Healthcare",
      tools: [
        "3D Human Anatomy Atlas",
        "Clinical Differential Diagnosis Simulator",
        "Lab Test (Blood/Urine) Report Explainer"
      ]
    },

    {
      domain: "Pharmacy & Pharmaceutical Sciences",
      tools: [
        "Drug-Drug Interaction Checker",
        "Pharmacokinetics Curve Visualizer",
        "Mechanism of Action Visualizer"
      ]
    },
    {
      domain: "Psychology & Mental Wellbeing",
      tools: [
        "CBT Thought Record Workspace",
        "Somatic Breathwork & Pacer",
        "Behavioral Habit Loop Tracker"
      ]
    },
    {
      domain: "Engineering & Architecture",
      tools: [
        "Structural Stress & Beam Load Analyzer",
        "CAD/Blueprint 2D-to-3D Floor Planner",
        "Material Strength Comparator"
      ]
    },
    {
      domain: "Mechanical, Automotive & Manufacturing",
      tools: [
        "4-Stroke IC Engine & EV Powertrain Simulator",
        "Gear Ratio & Torque Calculator",
        "CNC & 3D Print Slicer Estimator"
      ]
    },
    {
      domain: "Electrical & Electronics",
      tools: [
        "Interactive SPICE Circuit Simulator",
        "PCB Trace Width & Ohm’s Law Calculator",
        "Logic Gates & Truth Table Builder"
      ]
    },
    {
      domain: "Industrial Systems & Automation",
      tools: [
        "PLC Ladder Logic Simulator",
        "Six Sigma & Lean Defect Calculator",
        "SCADA Workflow Visualizer"
      ]
    },
    {
      domain: "Agriculture & Food Systems",
      tools: [
        "Crop Disease & Pest Leaf Scanner",
        "Soil NPK & Fertilizer Calculator",
        "Drip Irrigation & Solar Pump Planner"
      ]
    },
    {
      domain: "Environment, Climate & Sustainability",
      tools: [
        "Personal & Enterprise Carbon Footprint Tracker",
        "Global Climate Model Visualizer",
        "Waste Audit & Composting Guide"
      ]
    },
    {
      domain: "Energy & Renewables",
      tools: [
        "Solar Rooftop Potential Calculator",
        "Wind Turbine Output Estimator",
        "BESS Planner"
      ]
    },
    {
      domain: "Ocean & Marine Sciences",
      tools: [
        "Tide & Lunar Phase Forecaster",
        "Ocean Depth Zone & Trench Explorer",
        "Coral Reef Health & Bleaching Index"
      ]
    },
    {
      domain: "Space, Aerospace & Astronomy",
      tools: [
        "Orbital Mechanics & Rocket Launch Simulator",
        "Live Interactive Night Sky Planetarium",
        "Exoplanet Habitable Zone Calculator"
      ]
    },

    {
      domain: "Art, Design & Creativity",
      tools: [
        "Color Palette & Contrast Ratio Engine",
        "Golden Ratio & Composition Grid Canvas",
        "Art Style Identifier"
      ]
    },
    {
      domain: "Film, Video & Entertainment",
      tools: [
        "Storyboard & Scene Shot List Generator",
        "Screenplay Formatter & Beat Sheet",
        "Focal Length & Depth of Field Simulator"
      ]
    },
    {
      domain: "Social Media & Creator Economy",
      tools: [
        "Viral Hook & Script Generator",
        "Algorithm Metric Audit & Simulator",
        "Sponsorship Rate Calculator"
      ]
    },
    {
      domain: "Writing, Publishing & Communication",
      tools: [
        "Hemingway-Style Readability Editor",
        "Book Outline & Chapter Flow Architect",
        "Speech Pacing & Teleprompter Voice Tool"
      ]
    },
    {
      domain: "Music & Audio",
      tools: [
        "Interactive Piano / Fretboard Chord Finder",
        "BPM Tap & Metronome Suite",
        "Audio Equalizer & Frequency Spectrum Visualizer"
      ]
    },
    {
      domain: "Gaming & Interactive Media",
      tools: [
        "Game Economy & Loot Balance Simulator",
        "Dialogue Tree & Branching Narrative Builder",
        "Game Mechanics Prototyper"
      ]
    },
    {
      domain: "Photography & Visual Media",
      tools: [
        "Exposure Triangle Simulator",
        "Lighting Diagram Studio",
        "Histogram Reading & Balance Studio"
      ]
    },
    {
      domain: "Fashion, Beauty & Textile",
      tools: [
        "Fabric & GSM Material Selector",
        "Body Proportion & Wardrobe Color Palette Matcher",
        "Costume & Fashion Era Visual Timeline"
      ]
    },
    {
      domain: "Food, Cooking & Culinary Arts",
      tools: [
        "Flavor Pairing & Ingredient Matrix",
        "Recipe Baker’s Percentage Calculator",
        "Food Shelf-Life & Safe Internal Temp Guide"
      ]
    },
    {
      domain: "Sports, Fitness & Performance",
      tools: [
        "1RM & Strength Progression Planner",
        "TDEE & Macro Nutrient Precision Calculator",
        "Biomechanics Exercise Form Checker"
      ]
    },
    {
      domain: "Home, Family & Everyday Life",
      tools: [
        "Home Maintenance Schedule & Budget Tracker",
        "DIY Home Repair Troubleshooter",
        "Family Meal & Grocery Inventory Planner"
      ]
    },
    {
      domain: "Travel, Tourism & Hospitality",
      tools: [
        "Day-by-Day Smart Itinerary Optimizer",
        "Visa Requirement & Transit Radar",
        "Packing Checklist Generator"
      ]
    },
    {
      domain: "Transportation & Mobility",
      tools: [
        "EV Range & Charging Time Estimator",
        "Public Transit Route Multi-Modal Engine",
        "Fleet Fuel Consumption & Maintenance Log"
      ]
    },

    {
      domain: "Retail, E-Commerce & Consumer",
      tools: [
        "E-Commerce Product Margin & Ad ROAS Calculator",
        "Inventory Reorder Point Solver",
        "Customer Review Sentiment Analyzer"
      ]
    },
    {
      domain: "Logistics & Supply Chain",
      tools: [
        "Container Loading & CBM Calculator",
        "Supply Chain Bullwhip Effect Simulator",
        "Incoterms Quick Guide"
      ]
    },
    {
      domain: "Real Estate & Property",
      tools: [
        "Rental Yield & ROI Cap Rate Calculator",
        "Amortization EMI & Prepayment Visualizer",
        "Legal Land & Property Document Verifier"
      ]
    },
    {
      domain: "Banking, Insurance & FinTech",
      tools: [
        "Compound Interest & Wealth SIP Ladder",
        "Life / Health Insurance Coverage Need Calculator",
        "FinTech Payment Flow Architect"
      ]
    },
    {
      domain: "Accounting, Tax & Compliance",
      tools: [
        "Tax Regime Optimizer (Old vs New)",
        "GST & Invoice Generator",
        "Balance Sheet & P&L Statement Engine"
      ]
    },
    {
      domain: "Trades, Repairs & Practical Skills",
      tools: [
        "Electrical Wire Gauge Selector",
        "Woodworking Joint & Cut List Calculator",
        "Plumbing Pipe Pressure Drop Calculator"
      ]
    },
    {
      domain: "Hospitality & Service Industries",
      tools: [
        "Hotel RevPAR & Occupancy Rate Calculator",
        "Table Turn & Restaurant Capacity Planner",
        "Guest Grievance Recovery Script Generator"
      ]
    },
    {
      domain: "News, Current Affairs & World Affairs",
      tools: [
        "Multi-Source Bias & Perspective Comparer",
        "Geopolitical Timeline Tracker",
        "Daily 60-Second Geo-Brief"
      ]
    },
    {
      domain: "International Relations & Diplomacy",
      tools: [
        "Sanctions & Geopolitical Power Matrix",
        "Diplomatic Treaty & Convention Explorer",
        "Bilateral Negotiation Simulator"
      ]
    },
    {
      domain: "Defense, Security & Strategic Studies",
      tools: [
        "Military Doctrine & Tactics Map",
        "Defense Equipment & Specs Arsenal",
        "Intelligence & OSINT Analysis Framework"
      ]
    },
    {
      domain: "Emergency, Disaster & Safety",
      tools: [
        "Disaster Response Protocols",
        "First Aid & CPR Interactive Audio-Pacer",
        "Emergency Go-Bag Weight & Supply Calculator"
      ]
    },

    {
      domain: "Research, Science & Innovation",
      tools: [
        "Literature Review Matrix Builder",
        "Scientific Hypothesis Builder",
        "Citation & Reference Generator"
      ]
    },
    {
      domain: "Advanced & Interdisciplinary Research",
      tools: [
        "Cross-Discipline Concept Mashup Tool",
        "Complex Systems Feedback Loop Simulator",
        "Research Grant Proposal Canvas"
      ]
    },
    {
      domain: "Personal Development & Life Skills",
      tools: [
        "Atomic Habit Stacking Board",
        "Time Audit & Eisenhower Matrix",
        "Active Listening & Negotiation Coach"
      ]
    },
    {
      domain: "Child, Parenting & Family Education",
      tools: [
        "Child Developmental Milestone Tracker",
        "Tantrum De-escalation Script Generator",
        "Screen-Free Creative Activity Generator"
      ]
    },
    {
      domain: "Accessibility & Assistive Technology",
      tools: [
        "WCAG 2.2 Color & Screen Reader Contrast Tester",
        "Text-to-Sign Language Visualizer",
        "Plain Language / Dyslexia Readability Converter"
      ]
    },
    {
      domain: "Religion, Spirituality & Comparative Beliefs",
      tools: [
        "Sacred Texts Parallel Reader",
        "Meditation Technique Selector",
        "Comparative Theology Philosophical Tree"
      ]
    },
    {
      domain: "Archaeology, Heritage & Culture",
      tools: [
        "Carbon-14 Dating & Stratigraphy Simulator",
        "UNESCO World Heritage 3D Explorer",
        "Cultural Rituals & Folklore Archive"
      ]
    },
    {
      domain: "Performing Arts & Cultural Arts",
      tools: [
        "Bharatanatyam & Classical Dance Mudra Guide",
        "Theatre Acting Method Studio",
        "Stage Blocking & Lighting 2D Designer"
      ]
    },
    {
      domain: "Crafts, Handicrafts & Traditional Skills",
      tools: [
        "Pottery, Clay & Glaze Firing Calculator",
        "Origami & Paper Craft Step-by-Step Folding 3D",
        "Traditional Weaving & Embroidery Pattern Grid"
      ]
    },
    {
      domain: "Global Cultures & Communities",
      tools: [
        "Cultural Dimension Comparative Index (Hofstede)",
        "Indigenous Knowledge Archive",
        "Global Festival Calendar & Ritual Explorer"
      ]
    },
    {
      domain: "Public Health & Community Services",
      tools: [
        "Epidemiology R0 & Herd Immunity Simulator",
        "Nutritional Deficiency & Fortification Scanner",
        "WASH Quality Checker"
      ]
    },
    {
      domain: "Urban Planning & Smart Cities",
      tools: [
        "15-Minute City Radius Analyzer",
        "Traffic Flow & Roundabout Simulation",
        "Zoning & FAR Calculator"
      ]
    },
    {
      domain: "Architecture, Construction & Infrastructure",
      tools: [
        "Concrete Mix & Material Quantity Estimator",
        "Rebar Steel Tonnage Calculator",
        "Acoustic & Soundproofing Calculator"
      ]
    },
    {
      domain: "Natural Resources & Forestry",
      tools: [
        "Tree Canopy & Biomass Carbon Calculator",
        "Groundwater Recharge & Rainwater Harvesting Estimator",
        "Forest Fire Risk & Fuel Load Index"
      ]
    },
    {
      domain: "Human Rights & Social Justice",
      tools: [
        "UDHR Case Matcher",
        "Pay Parity & Diversity Audit Calculator",
        "Grassroots Advocacy & Campaign Organizer"
      ]
    },
    {
      domain: "Future Technology & Emerging Fields",
      tools: [
        "Emerging Tech Readiness Level Radar",
        "Technological Singularity & Moore’s Law Curve",
        "Synthetic Biology & Longevity Tech Explorer"
      ]
    },
    {
      domain: "Interdisciplinary Problem Solving",
      tools: [
        "TRIZ Contradiction Matrix Engine",
        "Root Cause Fishbone & 5 Whys Canvas",
        "Cynefin Framework Classifier"
      ]
    },
    {
      domain: "AI Productivity & Personal Automation",
      tools: [
        "Workflow Automation Logic Builder",
        "Advanced Prompt Chaining Studio",
        "Personal Task Automation Script Generator"
      ]
    },
    {
      domain: "Enterprise & Corporate Intelligence",
      tools: [
        "Competitor Intelligence & War Gaming Room",
        "M&A Synergy Calculator",
        "Corporate Governance & ESG Compliance Audit"
      ]
    },
    {
      domain: "Innovation, Invention & Product Design",
      tools: [
        "SCAMPER Innovation Idea Engine",
        "Patent Prior Art & Claim Drafting Assistant",
        "Ergonomics & Human Factors Checklist"
      ]
    },
    {
      domain: "Global Knowledge & Universal Reference",
      tools: [
        "Universal Unit, Currency & Epoch Converter",
        "Interactive Timeline of Everything (Big Bang to Now)",
        "Master Mind Omnisearch: cross-reference all 86 domains"
      ]
    }
  ];

  /* =========================
     TOOL UI
     ========================= */

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function addNativeToolStyles() {

    if (document.getElementById("mmNativeToolStyles")) return;

    const style = document.createElement("style");

    style.id = "mmNativeToolStyles";

    style.textContent = `

      .mm-native-tools {
        margin-top:18px;
        width:100%;
      }

      .mm-native-title {
        font-size:14px;
        font-weight:900;
        margin-bottom:10px;
        color:#111827;
      }

      .mm-native-grid {
        display:grid;
        grid-template-columns:1fr;
        gap:10px;
      }

      .mm-native-card {
        background:#ffffff;
        border:1px solid #e5e7eb;
        border-radius:15px;
        padding:14px;
        cursor:pointer;
        box-shadow:0 4px 12px rgba(0,0,0,.05);
      }

      .mm-native-card:active {
        transform:scale(.98);
      }

     
