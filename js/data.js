/*
 * Content that changes often lives here so index.html stays small.
 *
 * CERTIFICATES
 *   Add a real certificate by dropping the image into images/certificates/
 *   and listing it below with an `image` path. Entries without an image are
 *   drawn as a certificate card from the fields below. Set placeholder: true
 *   for an empty slot; delete those entries once you have real ones.
 *
 * PROJECTS
 *   `links` is a list of { label, href }. Add GitHub or live-demo links here
 *   and they appear in the case study window automatically.
 */

window.CERTIFICATES = [
  {
    id: "ujenius",
    title: "Top 1%, UJenius Programme",
    issuer: "University of Johannesburg",
    status: "Achievement",
    image: ""
  },
  {
    id: "powerpoint",
    title: "Designing and Formatting a Presentation in PowerPoint",
    issuer: "Coursera",
    status: "Certificate",
    image: "images/Powerpoint.png"
  },
  {
    id: "4ir",
    title: "Artificial Intelligence in the 4IR",
    issuer: "University of Johannesburg",
    status: "Achievement",
    image: "images/4IR.png"
  },
   {
    id: "star",
    title: "Accomplishment STAR Techniques for Job Interviews",
    issuer: "Coursera",
    status: "Certificate",
    image: "images/star.png"
  },
  { id: "microsoft", 
   title: "Getting started with Microsoft 365", 
   issuer: "Coursera", 
   status: "Certificate" ,
   image:"images/micro.png"}
];

window.PROJECTS = {
  maintenant: {
    title: "MainTenant",
    subtitle: "Residence maintenance and compliance platform",
    meta: "Final-year project, University of Johannesburg. Lead and backend developer in a team of four. Result: 74%.",
    problem:
      "Maintenance for 4,800 student units (about 11,000 residents) ran on WhatsApp messages, phone calls and paper logs. Reports got lost, nobody could see who was responsible for a fix, and safety equipment was only serviced after it failed.",
    built: [
      "Led the backend and database: fault reporting with duplicate detection, task creation, and the PostgreSQL data model behind them.",
      "Automatic task allocation by technician specialisation and workload, with a cap on open jobs per technician.",
      "Overdue-job tracking that escalates to supervisors, plus scheduled preventive maintenance for safety assets.",
      "Smart part-replacement recommendations for technicians.",
      "An interactive compliance floor map that shows the safety status of assets in each building.",
      "Role-based access for residents, technicians and administrators. Residents scan an NFC or QR tag to report a fault."
    ],
    stack: ["Next.js", "React Native", "PostgreSQL"],
    practice:
      "Worked in Agile sprints, from requirements, feasibility study and UML design through to a verification and validation plan.",
    links: []
  },

  bugs: {
    title: "Bug Management System",
    subtitle: "Bug tracking with automated API tests",
    meta: "Full-stack project built with Java, Spring Boot, PostgreSQL and React.",
    problem:
      "A team needs one place to report bugs, follow each one through to a fix, and control who is allowed to change what.",
    built: [
      "Secure user authentication and role-based access control.",
      "Bug reporting and status management from first report to resolution.",
      "Automated REST API test suites with Rest Assured, JUnit and Postman covering CRUD operations, authentication flows, response codes and data integrity.",
      "Backend validation and database integration checked through the same test suites."
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "React", "Rest Assured", "JUnit", "Postman"],
    practice: "",
    links: []
  },

  ats: {
    title: "ATS CV Screening Pipeline",
    subtitle: "Resume parsing into a searchable database",
    meta: "Built for classmates to show how automated hiring screens read a CV.",
    problem:
      "Most graduates never see how applicant tracking systems scan and filter CVs, so they miss the skills that get a CV past the first screen.",
    built: [
      "A script-driven pipeline that reads raw, unformatted text CVs.",
      "Extraction of technical stacks and academic marks from each CV.",
      "Inserts into organised PostgreSQL tables, so CVs can be searched and filtered instantly."
    ],
    stack: ["R", "PostgreSQL", "SQL"],
    practice: "",
    links: []
  },

  blisscrafted: {
    title: "BlissCrafted",
    subtitle: "Event planning marketplace",
    meta: "Second-year team project built with Next.js, React and Supabase.",
    problem:
      "Planning an event means juggling separate vendors for venues, cakes, flowers and decor. There was no single platform that joined vendor shopping with coordination.",
    built: [
      "An e-commerce app where users book venues, order custom cakes, choose flower arrangements and manage invitations.",
      "Complete decor packages for corporate, birthday and wedding events."
    ],
    stack: ["Next.js", "React", "Supabase"],
    practice: "Built within a team to practise a real-world workflow.",
    links: []
  },

  graph: {
    title: "Recursive Hardware Graph Classifier",
    subtitle: "Sorting hardware components with graphs",
    meta: "Individual project built in R.",
    problem:
      "Sorting messy lists of hardware components with plain arrays is slow and leads to components landing in the wrong group.",
    built: [
      "Classification trees built from graph and matrix structures.",
      "Components grouped by their profile signatures instead of by position in a list."
    ],
    stack: ["R", "igraph", "Matrix algebra"],
    practice: "",
    links: []
  }
};
