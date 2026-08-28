/**
 * projects-data.js
 * Single source of truth for all project data.
 * Stored as a JS variable so it works on file:// (no fetch/CORS needed).
 *
 * TO ADD A NEW PROJECT: append one object to the array below.
 * Schema:
 *   id           — unique number
 *   slug         — URL-safe string, used in ?slug= query param
 *   pagename     — folder name inside assets/project-images/
 *   project_title — display title
 *   tagline      — one-line card description
 *   thumbnail    — filename of card image (inside the pagename folder)
 *   techStackUsed — array of technology strings
 *   problem      — string (paragraph)
 *   process      — array of step strings (rendered as numbered list)
 *   result       — string (paragraph)
 *   gallery      — ordered array of image filenames (inside the pagename folder)
 */

window.PROJECTS_DATA = [
  {
    id: 9,
    slug: "job-hunterz-n18",
    pagename: "JobHunterzN18",
    project_title: "Job Hunterz N18 — AI Job Search & Application Automation Engine",
    banner_title: "Job Hunterz N18",
    tagline: "Four job platforms and a slow, tab-by-tab search, turned into one auto-apply pipeline.",
    thumbnail: "",
    embed: "",
    techStackUsed: ["HTML / CSS / JS", "Supabase", "Vercel", "Google Sheets API", "Chrome Extension API", "LLM Autofill"],
    banner_tags: ["Supabase", "Vercel", "Chrome Extension API", "LLM Autofill"],
    problem: "Job hunting across multiple platforms meant manually checking LinkedIn, Naukri, Instahyre, and Internshala every day, then applying to each listing one form at a time — a process too slow to keep pace with a real, high-volume job search.",
    process: [
      "Built a full-stack AI job search engine from scratch, integrating APIs across four major job platforms into a single website.",
      "Built filter logic for job title, experience level, and location, so results narrow to exactly what's relevant.",
      "Added a one-click 'Push to Sheet' feature that sends selected listings straight into a connected Google Sheet — with the option to deselect any jobs before they're pushed.",
      "Built a companion Chrome extension (OneClick N18) that auto-fills job applications using an LLM for field-matching, turning the sheet of curated jobs into actual submitted applications with a click.",
      "Connected the application workflow with the job-search engine to create an end-to-end pipeline from job discovery → filtering → tracking → application.",
      "Built the entire system independently from the ground up, including the platform architecture, integrations, automation workflow, filtering system, database connection, and deployment: frontend in HTML, CSS, and JS, Supabase as the database layer, and Vercel for deployment."
    ],
    result: "Replaced a slow, manual, tab-by-tab job hunt with one end-to-end automated pipeline — from discovery to shortlisting to application — cutting the time to apply to a single job from minutes to seconds and making it possible to apply at a volume no manual process could match. Built entirely solo, end to end: sourcing, filtering, storage, and automation in one live product.",
    gallery: []
  },

  {
    id: 1,
    slug: "product-trend-intelligence-dashboard",
    pagename: "ProductTrendDashboard",
    project_title: "Product Trend Intelligence Dashboard",
    tagline: "Turned days of manual trend research into a live intelligence tool tracking 17M+ real-time search records.",
    thumbnail: "dashboard-1.png",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiZWZjMjA2MzQtMGRlOS00YWY0LTk5MGYtMjIzN2RiOWE2YjNmIiwidCI6IjFiM2Y4N2MyLTA1M2MtNDliZS1iYjA4LWRlZDMxN2ViNzcwZSJ9",
    techStackUsed: ["Google Trends API", "Power BI", "DAX"],
    problem: "Tracking product and market trends manually was slow, and by the time patterns showed up, the opportunity had often passed.",
    process: [
      "Connected the Google Trends API to Power BI to pull real-time search data across 69+ countries and multiple product categories.",
      "Built interactive visuals tracking rising keywords, top search terms, and category-level demand shifts.",
      "Automated data refresh so the dashboard updates itself with zero manual pulls.",
      "Added filters by keyword, geography, and time period for deeper drill-down."
    ],
    result: "Turned a slow, manual research process into a live intelligence tool. The dashboard surfaces patterns across 17M+ real-time search records the moment they emerge, cutting trend research time from days to minutes and giving clearer, faster input for product and marketing calls.",
    gallery: [
      "dashboard-1.png",
      "dashboard-2.png",
      "dashboard-3.png",
      "dashboard-4.png"
    ]
  },

  {
    id: 2,
    slug: "coffee-cafe-finance-analytics",
    pagename: "CoffeeCafeAnalytics",
    project_title: "Coffee Café Finance Analytics",
    tagline: "Turned messy café transaction data into a live dashboard that uncovered a 29% weekend sales spike.",
    thumbnail: "",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiZmMwNmJkOWMtZGY1Yi00YTBmLWJiZWUtYWMyMTc2ZTc3NDVjIiwidCI6IjFiM2Y4N2MyLTA1M2MtNDliZS1iYjA4LWRlZDMxN2ViNzcwZSJ9",
    techStackUsed: ["MySQL", "Power BI", "DAX"],
    problem: "The café's sales data was unclean and unstructured, so the owner had no way to use it for business decisions.",
    process: [
      "Cleaned and structured raw transactional data in MySQL to make it analysis-ready.",
      "Built a Power BI dashboard covering sales trends, product category performance, and store-location comparisons.",
      "Used DAX to calculate weekday vs. weekend sales splits and pinpoint peak sales hours.",
      "Added month-level and location-level filters for easy, self-serve analysis."
    ],
    result: "Uncovered a 29% weekend sales spike hidden inside messy raw data, and gave the owner an always-on view of inventory, profit margins, and peak hours by location. What was unusable data became a direct input into staffing, inventory, and marketing decisions.",
    gallery: []
  },

  {
    id: 3,
    slug: "atliq-technologies-hr-analytics",
    pagename: "AtliQHRAnalytics",
    project_title: "AtliQ Technologies HR Analytics",
    tagline: "Gave leadership a single source of truth on workforce behavior — lifting data quality by 33% and surfacing hidden leave patterns.",
    thumbnail: "",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiYjU1NTU4Y2UtOTdlOS00Njk4LThjYTItY2I4Y2QyZDVmMWMyIiwidCI6IjFiM2Y4N2MyLTA1M2MtNDliZS1iYjA4LWRlZDMxN2ViNzcwZSJ9",
    techStackUsed: ["Power BI", "DAX"],
    problem: "HR had years of employee data but no way to see patterns in leave, work-from-home usage, or attrition across departments.",
    process: [
      "Cleaned and validated raw HR datasets to remove inconsistencies and missing records.",
      "Built a Power BI dashboard tracking present %, WFH %, and sick-leave % by day, month, and quarter.",
      "Analyzed attendance by day of week to flag recurring high-absence days.",
      "Structured views by employee and department for quick leadership review."
    ],
    result: "Lifted data quality by 33% and gave leadership a single, reliable source of truth on workforce behavior. Recurring leave and WFH patterns became visible for the first time, enabling smarter staffing decisions and more realistic project scheduling around predictable absence.",
    gallery: []
  },

  {
    id: 4,
    slug: "ecommerce-sales-revenue-dashboard",
    pagename: "EcommerceSalesDashboard",
    project_title: "E-commerce Sales & Revenue Dashboard",
    tagline: "Replaced scattered spreadsheets with one decision-ready dashboard covering $438K+ in tracked sales.",
    thumbnail: "",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiYjc4MWYzMDUtYzBiOS00MWI0LTgyZWUtMDJmZGE0MjRkOGY2IiwidCI6IjFiM2Y4N2MyLTA1M2MtNDliZS1iYjA4LWRlZDMxN2ViNzcwZSJ9",
    techStackUsed: ["Power BI", "DAX"],
    problem: "The business lacked a clear, unified view of its customers, products, and revenue, making it hard to see where growth was actually coming from.",
    process: [
      "Consolidated sales, customer, and product data into one Power BI model.",
      "Built KPI dashboards tracking revenue, profit, quantity sold, and average order value (AOV).",
      "Analyzed payment mode and sub-category profitability to flag high-margin segments.",
      "Tracked monthly profit trends to spot seasonal dips and opportunities."
    ],
    result: "Replaced scattered spreadsheets with one decision-ready dashboard covering $438K+ in tracked sales. High-margin categories and payment-mode trends became visible at a glance, letting the business fine-tune pricing and marketing spend with real numbers instead of guesswork.",
    gallery: []
  },

  {
    id: 5,
    slug: "car-sales-performance-dashboard",
    pagename: "CarSalesDashboard",
    project_title: "Car Sales Performance Dashboard",
    tagline: "Gave the business a real-time, region-by-region view of a $371M+ sales book with YoY growth of 23.6% tracked automatically.",
    thumbnail: "",
    embed: "https://public.tableau.com/views/MyTableauBookofCarSales/Dashboard1?:embed=y&:showVizHome=no&:display_count=yes&:language=en-US&:toolbar=yes&:animate_transition=yes",
    techStackUsed: ["Tableau"],
    problem: "Dealer and regional sales data lived in separate reports, making it hard to track year-over-year growth and dealer productivity in one place.",
    process: [
      "Built a Tableau dashboard consolidating YTD sales, YoY growth, and average price trends.",
      "Tracked performance by dealer region and by manual vs. automatic transmission.",
      "Built a company-wise sales leaderboard comparing units sold, average price, and revenue share.",
      "Added weekly trend tracking to support ongoing forecasting."
    ],
    result: "Gave the business a real-time, region-by-region view of a $371M+ sales book, with YoY growth of 23.6% tracked automatically. Dealer performance and pricing gaps that were previously buried in reports became visible at a glance, speeding up financial decision-making.",
    gallery: []
  },

  {
    id: 6,
    slug: "virat-kohli-career-performance-dashboard",
    pagename: "ViratKohliDashboard",
    project_title: "Virat Kohli Career Performance Dashboard",
    tagline: "Turned over a decade of cricket stats into a clean, explorable visual story — built out of personal interest and used to sharpen real dashboard skills.",
    thumbnail: "",
    embed: "https://app.powerbi.com/view?r=eyJrIjoiNmQ5NGE4YzMtMTBlZS00YmE0LTg5NTUtZjcyMzQyZWMyNjRlIiwidCI6IjFiM2Y4N2MyLTA1M2MtNDliZS1iYjA4LWRlZDMxN2ViNzcwZSJ9",
    techStackUsed: ["Power BI", "DAX"],
    problem: "",
    process: [
      "Analyzed match-level stats across Virat Kohli's career from 2008 to 2022.",
      "Built Power BI visuals breaking down runs by opposition, by year, and by match format.",
      "Compared performance trends across different phases of his career."
    ],
    result: "Turned over a decade of cricket stats into a clean, explorable visual story. Built purely out of personal interest in the sport, it doubled as a way to sharpen the same dashboard and storytelling skills used on professional projects.",
    gallery: []
  },

  {
    id: 7,
    slug: "wfm-workforce-intelligence-dashboard",
    pagename: "WFMDashboard",
    project_title: "WFM Workforce Intelligence Dashboard",
    tagline: "Replaced scattered, file-by-file reporting with one consolidated view of every core WFM metric for leadership, planners, and business partners.",
    thumbnail: "",
    embed: "",
    techStackUsed: ["Power BI", "Excel"],
    problem: "Critical workforce metrics — attrition trends, shrinkage, headcount, and real-time staffing — were spread across separate files with no single place to review them.",
    process: [
      "Consolidated attrition, shrinkage, headcount, and staffing data from multiple capacity plan sources into one file.",
      "Built a Power BI dashboard tracking 8/12-week attrition and 4/6-week shrinkage trends.",
      "Added real-time staffing and training-attrition views for daily monitoring.",
      "Structured the dashboard for three audiences: leadership, business partners, and planners."
    ],
    result: "Replaced scattered, file-by-file reporting with one consolidated view of every core WFM metric. Leadership and planners can now catch attrition and shrinkage shifts early, plan staffing with more confidence, and forecast with far less guesswork.",
    gallery: []
  },

  {
    id: 8,
    slug: "automated-volume-aht-forecasting-model",
    pagename: "ForecastingModel",
    project_title: "Automated Volume & AHT Forecasting Model",
    tagline: "Cut forecasting time dramatically while pushing accuracy above 93% — a self-learning model that adapts to shifting business trends on its own.",
    thumbnail: "",
    embed: "",
    techStackUsed: ["BigQuery", "Google Sheets", "Apps Script"],
    problem: "Manually building volume and AHT forecasts was time-consuming and prone to error, making planning less reliable.",
    process: [
      "Connected BigQuery to Google Sheets to automate historical data collection.",
      "Built an auto-refreshing pipeline feeding cleaned data into the forecasting model.",
      "Designed the model to predict volume and AHT at daily, weekly, and monthly levels.",
      "Tuned the model to learn trend patterns with minimal manual input."
    ],
    result: "Cut forecasting time dramatically while pushing accuracy above 93%. What used to be a slow, error-prone manual task is now a self-learning model that adapts to shifting business trends on its own, freeing up hours every week for higher-value planning work.",
    gallery: []
  }
  // ↑ Add new projects above this comment, separated by a comma.
];
