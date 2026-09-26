/**
 * PORTFOLIO CONFIGURATION DATA — MAN$I VERMA 🦀
 * =============================================================================
 * Real profile information, projects, open-source PRs, hackathons, and certs
 * =============================================================================
 */

const portfolioData = {
  personal: {
    name: "MAN$I VERMA 🦀",
    handle: "mansiverma897993",
    title: "Full Stack Software Developer & Rust Developer",
    taglineQuote: "I love Rust. I write Rust. Rust is lust.",
    avatar: "https://avatars.githubusercontent.com/u/104996923?v=4", // Mansi Verma GitHub Avatar
    location: "Ghaziabad / Delhi NCR, India",
    timezone: "Asia/Kolkata",
    status: "Building Finality Labs & Open Source Rust Systems",
    bio1: "I'm a Systems and Full-Stack Software Developer specializing in Rust, distributed backends, and Solana on-chain architecture with 50+ merged PRs in production open-source codebases including Qualcomm GenieX, rust-lang/libc, Bevy, and GCHQ CyberChef.",
    bio2: "Leading developer at CoE AI Skill Lab as Solana Blockchain Lead. Currently building Finality Labs — autonomous agentic system infrastructure on the Solana blockchain. Passionate about zero-copy architectures, program security, and low-latency systems.",
    email: "ogmansi897@gmail.com",
    resumeUrl: "#resume-modal",
    socials: {
      github: "https://github.com/mansiverma897993",
      twitter: "https://x.com/mansiverma897",
      linkedin: "https://www.linkedin.com/in/mansi-verma-025539249/",
      youtube: "https://www.youtube.com/hashtag/expressbymansi",
      leetcode: "https://leetcode.com/u/mansiverma897993/",
      discord: "https://discordapp.com/users/mansiverma897993"
    }
  },

  highlights: [
    { 
      title: "Official Contributor in Qualcomm GenieX & Nexa AI (16+ high quality merged PRs)", 
      tag: "Qualcomm",
      url: "https://github.com/mansiverma897993?org=qualcomm&year_list=1" 
    },
    { 
      title: "Solana Blockchain Lead at CoE AI Skill Lab KIET", 
      tag: "Leadership",
      url: "https://github.com/mansiverma897993" 
    },
    { 
      title: "Core Rust Ecosystem Contributor (rust-lang/libc, Bevy Engine, Qualcomm GenieX)", 
      tag: "Rust / Systems",
      url: "https://github.com/mansiverma897993" 
    },
    { 
      title: "Building Finality Labs: Autonomous agentic system infra on Solana", 
      tag: "Finality Labs",
      url: "https://github.com/Finality-Labs" 
    },
    { 
      title: "Aspire Institute Alumni (Harvard University Affiliated Leadership Program)", 
      tag: "Harvard / Aspire",
      url: "https://drive.google.com/file/d/1vTYLfPC3M1wXMKg-aH445oNsOGgVKEjB/view" 
    },
    { 
      title: "Graduated Cohort 5 in Rektoff (Advanced Rust Security) & Cohort 3 in 100xdevs", 
      tag: "Rektoff & 100x",
      url: "https://drive.google.com/file/d/1fwDZIDoRx-Ha373JFG9ZcQui4SbkwA7V/view" 
    },
    { 
      title: "Tech YouTuber & Content Creator (#ExpressByMansi — 1.16k+ subscribers)", 
      tag: "YouTube",
      url: "https://www.youtube.com/hashtag/expressbymansi" 
    },
    { 
      title: "50+ Merged Pull Requests across top-tier open source production repos", 
      tag: "Open Source",
      url: "https://github.com/mansiverma897993" 
    }
  ],

  work: [
    {
      company: "Neeyat AI",
      role: "Backend Engineering Intern",
      period: "2025 — Present",
      location: "Remote / Hybrid",
      description: "Building high-performance context-based backend systems and agentic AI pipelines.",
      bullets: [
        "Architecting robust context-retrieval pipelines, optimizing embedding lookup latency, and streaming APIs.",
        "Developing scalable backend microservices, REST/WebSocket APIs, and integration middleware for production workflows.",
        "Collaborating on high-availability cloud infrastructure and deterministic testing regimes."
      ],
      links: [
        { label: "Neeyat AI", url: "https://github.com/mansiverma897993" }
      ],
      technologies: ["Node.js", "Python", "Vector DBs", "FastAPI", "PostgreSQL", "Docker"]
    },
    {
      company: "CoE AI Skill Lab KIET",
      role: "Solana Blockchain Lead",
      period: "2024 — Present",
      location: "Ghaziabad, India",
      description: "Leading Web3 and blockchain research initiatives, mentoring developers, and architecting on-chain programs on Solana.",
      bullets: [
        "Directing Solana development, Anchor program architectures, PDAs, CPIs, and token economics.",
        "Conducting hands-on workshops on Rust systems engineering, smart contract security audits, and decentralized app deployment.",
        "Leading student teams in national and global Web3 hackathons, achieving top podium placements."
      ],
      links: [
        { label: "CoE AI Lab", url: "https://github.com/mansiverma897993" }
      ],
      technologies: ["Solana", "Rust", "Anchor", "web3.js", "SPL Tokens", "Security Auditing"]
    },
    {
      company: "Open Source Ecosystem",
      role: "Core Contributor (Rust, Systems, AI Infrastructure)",
      period: "May 2024 — Present",
      location: "Remote / Global",
      description: "Shipped 50+ merged pull requests into production systems codebases including Qualcomm, rust-lang/libc, Bevy, Floci, SuperteamDAO, and Juspay.",
      bullets: [
        "Qualcomm GenieX: Unblocked cross-origin browser clients in server CORS middleware for OpenAI API and optimized multi-core HTP execution.",
        "rust-lang/libc: Added SOL_LOCAL socket constants for FreeBSD targets directly upstream.",
        "Bevy Game Engine: Linked Propagate structs into hierarchy plugin documentation and core engine docs.",
        "SuperteamDAO Earn & Juspay Neurolink: Built live stats panels, Twitter/X integration, and partial object parsing from truncated LLM outputs."
      ],
      links: [
        { label: "Qualcomm PRs", url: "https://github.com/mansiverma897993?org=qualcomm&year_list=1" },
        { label: "GitHub Profile", url: "https://github.com/mansiverma897993" }
      ],
      technologies: ["Rust", "C++", "CORS Middleware", "Libc", "Bevy", "AI Runtimes"]
    }
  ],

  skills: {
    categories: [
      {
        name: "Languages",
        skills: ["Rust", "TypeScript", "JavaScript (ES6+)", "C/C++", "Python", "Go", "Java", "SQL"]
      },
      {
        name: "Systems & Low-Level",
        skills: ["Systems Programming", "Concurrency (Tokio, async/await)", "Memory Safety", "WASM", "FFI", "Network Programming", "Multithreading", "Linux/WSL", "OS Internals"]
      },
      {
        name: "Web3 & Blockchain",
        skills: ["Solana", "Anchor", "Pinocchio", "SPL Tokens", "PDAs", "CPIs", "Wallet Adapter", "DeFi Protocols", "Metaplex", "MagicBlock Ephemeral Rollups", "web3.js", "Program Security & CU Optimization"]
      },
      {
        name: "Backend & APIs",
        skills: ["Node.js", "Express.js", "Fastify", "Axum", "RESTful APIs", "gRPC", "WebSockets", "JWT/OAuth Auth", "Prisma ORM", "Kafka/Redpanda", "BullMQ", "Microservices", "CQRS", "Event Sourcing"]
      },
      {
        name: "Frontend",
        skills: ["React.js", "Next.js 15", "Tailwind CSS", "TanStack Query", "Shadcn UI", "Responsive Web Design"]
      },
      {
        name: "Databases & DevOps",
        skills: ["PostgreSQL (pgvector)", "MongoDB", "Redis", "MySQL", "Docker", "Kubernetes", "GitHub Actions", "Prometheus/Grafana", "OpenTelemetry", "Cloudflare Workers", "Vercel", "Git", "Postman"]
      }
    ]
  },

  projects: [
    {
      title: "Atlas",
      badge: "Flagship",
      stars: "Rust Core",
      language: "Rust",
      description: "An event-sourced, double-entry ledger and payments backend in Rust, built as a Cargo workspace of 5 service binaries and 6 shared libraries. Uses DDD and hexagonal architecture, Event Sourcing, CQRS, and sagas over a Redpanda event backbone, with a JWT/JWKS auth chain that fails fast on insecure defaults in production. 122 tests pass, including an in-process end-to-end transfer test and a conservation property test over randomized schedules.",
      url: "https://github.com/mansiverma897993/Atlas",
      liveUrl: "https://github.com/mansiverma897993/Atlas",
      tags: ["Rust", "Axum", "Tokio", "Event Sourcing", "CQRS", "PostgreSQL", "Redpanda", "Kubernetes", "OpenTelemetry"]
    },
    {
      title: "noz-in (promcast CLI)",
      badge: "Observability",
      stars: "Go CLI",
      language: "Go",
      description: "A deterministic query-compatibility and migration engine that moves observability estates into SigNoz, shipped as the promcast CLI. Converts Grafana dashboards and Prometheus alerting rules into SigNoz artifacts, validates exact target queries against live SigNoz APIs, and explains every compatibility decision in JSON and self-contained HTML. Migrates Grafana's 140-panel Node Exporter Full dashboard in one command.",
      url: "https://github.com/mansiverma897993/noz-in",
      liveUrl: "https://github.com/mansiverma897993/noz-in",
      tags: ["Go", "PromQL", "Grafana → SigNoz", "Observability CLI", "Query Equivalence"]
    },
    {
      title: "Forge AI",
      badge: "Full Stack AI",
      stars: "Monorepo",
      language: "TypeScript",
      description: "An AI engineering operating system that unifies design, build, review, deploy, and monitor behind one web application backed by autonomous, human-in-the-loop agents. A pnpm monorepo pairing a Next.js 15 frontend with a Fastify REST + WebSocket API, Prisma over PostgreSQL with pgvector, and BullMQ/Kafka workers. Ships GitHub, Slack, Docker, and Kubernetes integrations with enterprise RBAC + audit.",
      url: "https://github.com/mansiverma897993/Forge-AI",
      liveUrl: "https://github.com/mansiverma897993/Forge-AI",
      tags: ["TypeScript", "Next.js 15", "Fastify", "Prisma", "pgvector", "BullMQ", "Autonomous Agents", "RBAC"]
    },
    {
      title: "Robox",
      badge: "Security Auditor",
      stars: "Solana Rust",
      language: "Rust",
      description: "A Rust-native security auditor for Solana and Anchor programs. Parses Rust source with syn, classifies the program, runs deterministic security rules, and maps how instructions, accounts, PDAs, CPIs, and token flows relate. Every finding is explainable and pinned to an exact code location. Usable via web dashboard, CLI for CI gates, and REST/WebSocket API, exporting to PDF, JSON, Markdown, or SARIF 2.1.0.",
      url: "https://github.com/mansiverma897993/Robox",
      liveUrl: "https://github.com/mansiverma897993/Robox",
      tags: ["Rust", "Solana", "Anchor", "syn AST", "SARIF 2.1.0", "Security Rules"]
    },
    {
      title: "Ring: Privacy-First AI Terminal",
      badge: "Desktop App",
      stars: "Local AI",
      language: "Rust / Tauri",
      description: "Open-source AI-native terminal emulator: natural-language-to-command translation, command suggestions, and error explanations running 100% locally via Ollama zero telemetry, no account, localhost-only networking. Features a Rust-to-WASM safety guard that flags dangerous commands before execution across Windows/macOS/Linux.",
      url: "https://github.com/mansiverma897993",
      liveUrl: null,
      tags: ["Rust", "Tauri v2", "WASM", "React", "TypeScript", "Ollama"]
    }
  ],

  moreProjects: [
    {
      title: "SolChit Fund 3.0",
      description: "Decentralized rotating savings and credit association (ROSCA / Chit Fund) on Solana with automated bidding cycles, collateral lockup, and transparent payout distributions.",
      url: "https://github.com/mansiverma897993/solchit-fund-3.0",
      language: "Rust / Anchor",
      stars: "Solana"
    },
    {
      title: "Finality Labs Infra",
      description: "Autonomous agentic system infrastructure on Solana blockchain enabling autonomous agents to coordinate, execute atomic multi-party agreements, and settle instant state finality.",
      url: "https://github.com/Finality-Labs",
      language: "Rust / TypeScript",
      stars: "Organization"
    },
    {
      title: "DNA DAO",
      description: "Decentralized autonomous organization governance protocol with quadratic voting weights, proposal execution timelocks, and treasury multisig on-chain coordination.",
      url: "https://github.com/mansiverma897993/dnadao",
      language: "Solana / Rust",
      stars: "Web3"
    },
    {
      title: "Blockchain Land Registry",
      description: "Tamper-proof distributed property ownership and title deed verification protocol preventing fraudulent double-allocation of land parcels.",
      url: "https://github.com/mansiverma897993/landregistry",
      language: "Solidity / Web3",
      stars: "DeFi / Registry"
    }
  ],

  openSource: {
    summary: "50+ pull requests merged into tier-1 open-source repositories and ecosystems.",
    prs: [
      {
        title: "qualcomm/GenieX: unblock cross-origin browser clients in server CORS middleware OpenAI API",
        repo: "qualcomm/GenieX",
        date: "2024",
        url: "https://github.com/mansiverma897993?org=qualcomm&year_list=1",
        type: "merged"
      },
      {
        title: "qualcomm/geniex-qairt-plugin: request HTP multicore execution via NUMCORESgraphconfig",
        repo: "qualcomm/geniex-qairt-plugin",
        date: "2024",
        url: "https://github.com/mansiverma897993?org=qualcomm&year_list=1",
        type: "merged"
      },
      {
        title: "rust-lang/libc: add SOL_LOCAL socket constant for FreeBSD targets",
        repo: "rust-lang/libc",
        date: "2024",
        url: "https://github.com/rust-lang/libc",
        type: "merged"
      },
      {
        title: "floci-io/floci: 12+ PRs; Eventarc trigger CRUD + Cloud Run event routing",
        repo: "floci-io/floci",
        date: "2024",
        url: "https://github.com/floci-io/floci",
        type: "merged"
      },
      {
        title: "qualcomm/GenieX: fix quant-config sentinel handling in Rust model-manager SDK",
        repo: "qualcomm/GenieX",
        date: "2024",
        url: "https://github.com/mansiverma897993?org=qualcomm&year_list=1",
        type: "merged"
      },
      {
        title: "juspay/neurolink: recover partial object from truncated structured output (5+ PRs)",
        repo: "juspay/neurolink",
        date: "2024",
        url: "https://github.com/juspay/neurolink",
        type: "merged"
      },
      {
        title: "SuperteamDAO/earn: live Twitter/X stats in sponsor submission details panel",
        repo: "SuperteamDAO/earn",
        date: "2024",
        url: "https://github.com/SuperteamDAO/earn",
        type: "merged"
      },
      {
        title: "bevyengine/bevy: link Propagate structs to hierarchy plugin docs",
        repo: "bevyengine/bevy",
        date: "2024",
        url: "https://github.com/bevyengine/bevy",
        type: "merged"
      }
    ]
  },

  hackathons: [
    {
      event: "Qualcomm Snapdragon Hackathon",
      award: "🔥 Selected Finalist (2-Day Onsite)",
      project: "Snapdragon Intelligent Edge Engine",
      description: "Selected among thousands of applicants across India for a prestigious 2-day on-site hackathon stay at Qualcomm. Proposed selected architecture optimizing edge NPU inference with Snapdragon toolkits.",
      date: "2024",
      links: [
        { label: "Qualcomm Ecosystem", url: "https://github.com/mansiverma897993?org=qualcomm&year_list=1" }
      ]
    },
    {
      event: "HackAura by GeekHive",
      award: "🏆 1st Runner-Up Winner",
      project: "VoteX",
      description: "Engineered VoteX — a high-integrity blockchain-based decentralized voting application ensuring transparent ballot immutability, zero-knowledge voter privacy, and real-time verifiable tallying.",
      date: "Sep 2025",
      links: [
        { label: "VoteX Repo", url: "https://github.com/mansiverma897993" }
      ]
    },
    {
      event: "Avalanche Hackathon",
      award: "🥈 1st Runner-Up (Team 1 India)",
      project: "Avalanche Subnet Protocol",
      description: "Secured 1st Runner-Up for Team 1 India at the Avalanche Hackathon, designing scalable custom subnet primitives and cross-chain message passing.",
      date: "2024",
      links: [
        { label: "Project Details", url: "https://github.com/mansiverma897993" }
      ]
    },
    {
      event: "E-Summit IIIT Delhi",
      award: "⭐ National Finalist",
      project: "Decentralized Identity & Infra",
      description: "Selected as National Finalist at IIIT Delhi's flagship annual entrepreneurship and engineering summit, presenting systems-level decentralized identity solutions.",
      date: "2024",
      links: [
        { label: "Showcase", url: "https://github.com/mansiverma897993" }
      ]
    }
  ],

  achievementsAndCerts: [
    {
      title: "AWS Certified Solutions Architect – Associate",
      organization: "Amazon Web Services",
      date: "Aug 2026",
      description: "Designed scalable, secure, and cost-efficient cloud architecture with multi-VPC routing, automated failovers, and cloud-native resilience.",
      badge: "AWS Certified",
      url: "https://drive.google.com/file/d/1lAvHlNHsvUK9gph29lN48jCfNQ13sd_E/view"
    },
    {
      title: "AWS Certified Cloud Practitioner",
      organization: "Amazon Web Services",
      date: "2026",
      description: "Comprehensive validation of AWS core cloud services, identity management, zero-trust security compliance, and economics.",
      badge: "AWS Verified",
      url: "https://drive.google.com/file/d/1AsaEwdliUREmBDpYI_Tif-kZIAhuh6hD/view"
    },
    {
      title: "Advanced Rust & Security Certification",
      organization: "Rektoff (Cohort 5 Graduate)",
      date: "2025",
      description: "Intensive specialization in Rust memory safety, unsafe invariants, formal verification, and Solana smart contract vulnerability exploits.",
      badge: "Rektoff Cohort 5",
      url: "https://drive.google.com/file/d/1fwDZIDoRx-Ha373JFG9ZcQui4SbkwA7V/view"
    },
    {
      title: "Aspire Leadership Program",
      organization: "Aspire Institute (Harvard University Affiliated)",
      date: "2025",
      description: "Prestigious leadership fellowship founded by Harvard Business School faculty, focusing on global leadership, ethics, and community impact.",
      badge: "Harvard Affiliated",
      url: "https://drive.google.com/file/d/1vTYLfPC3M1wXMKg-aH445oNsOGgVKEjB/view"
    },
    {
      title: "Cohort 3 Graduate — Full Stack & Systems",
      organization: "100xdevs (Harkirat Singh)",
      date: "2024 — 2025",
      description: "Completed comprehensive advanced engineering curriculum covering DevOps, Docker, Kubernetes, distributed message queues, and high-scale backends.",
      badge: "100xdevs",
      url: "https://github.com/mansiverma897993"
    },
    {
      title: "Solana Blockchain Lead — CoE AI Skill Lab",
      organization: "KIET Deemed to be University",
      date: "Present",
      description: "Leading Web3 and decentralized systems development, mentoring students, and orchestrating hackathon initiatives.",
      badge: "Lead Position",
      url: "https://github.com/mansiverma897993"
    }
  ],

  education: {
    degree: "Bachelor of Technology (B.Tech) - Computer Science and Engineering",
    period: "Sep 2024 — June 2028",
    institution: "KIET Deemed to be University, Ghaziabad, India",
    sgpa: "8.2 (Till 4th Semester)"
  },

  contributions: {
    totalThisYear: 3942,
    handle: "mansiverma897993",
    weeks: 52
  }
};

// Export to window if in browser
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}
