import type { Metadata } from "next";

import {
  notFound,
} from "next/navigation";

import ArticleReader, {
  type ArticleData,
} from "./ArticleReader";

const articles: Record<
  string,
  ArticleData
> = {
  "smarter-property-maintenance-routine": {
    slug:
      "smarter-property-maintenance-routine",

    category:
      "Property Care",

    title:
      "Smarter Property Maintenance Starts With the Right Routine",

    description:
      "A practical property maintenance framework for identifying issues early, organising routine checks and making better repair and service decisions.",

    intro:
      "A well-kept property rarely stays that way by accident. The strongest maintenance routines make small changes visible early, help you decide what actually needs attention and prevent everyday defects from turning into expensive interruptions.",

    readTime:
      "8 min read",

    serviceHref:
      "/services",

    serviceLabel:
      "Book Property Service",

    keywords: [
      "property maintenance",
      "property care",
      "home maintenance checklist",
      "preventive property maintenance",
      "professional property services",
    ],

    sections: [
      {
        eyebrow:
          "A Better Maintenance Mindset",

        heading:
          "Treat maintenance as a system, not a reaction.",

        paragraphs: [
          "Reactive maintenance begins after something has already failed. A better approach starts earlier: notice changes, record them, understand their likely impact and decide whether the issue needs observation, routine service or immediate professional attention.",

          "This does not mean repairing everything at once. It means creating visibility. A stain that has not changed for months is a different maintenance decision from an active leak. A loose switch plate is different from overheating, sparking or a burning smell. The quality of the decision improves when the condition is noticed and described clearly.",
        ],

        bullets: [
          "Observe changes before deciding on work.",
          "Separate cosmetic defects from functional or safety-related issues.",
          "Record recurring problems instead of repeatedly treating the symptom.",
          "Use qualified professionals where electrical, structural or specialist work is involved.",
        ],
      },

      {
        eyebrow:
          "Routine Inspection",

        heading:
          "Build your checks around the parts of a property that change fastest.",

        paragraphs: [
          "A useful inspection routine does not require a complicated checklist with hundreds of items. Focus on areas where water, movement, heat, weather exposure and daily use can gradually create damage.",

          "Walk through the property with the same sequence each time. Consistency makes changes easier to notice and reduces the chance that important areas are repeatedly missed.",
        ],

        bullets: [
          "Wet areas: taps, traps, joints, sealants, drainage flow and visible moisture.",
          "Electrical points: switches, sockets, distribution boards and unusual heat or smell.",
          "Walls and ceilings: cracks, damp marks, peeling finishes and recurring discoloration.",
          "Doors and windows: alignment, hardware, gaps, locks and water entry.",
          "External areas: exposed metal, drainage paths, surface deterioration and weathered finishes.",
        ],

        highlight:
          "The goal is not to diagnose every defect yourself. The goal is to recognise when a condition has changed enough to deserve professional assessment.",
      },

      {
        eyebrow:
          "Priority Framework",

        heading:
          "Decide what comes first before you start spending.",

        paragraphs: [
          "Maintenance budgets are easier to control when work is prioritised by consequence rather than appearance. Start with safety and active damage, then protect the building fabric and essential systems, and only then move to appearance-led improvements.",

          "For example, repainting a damp wall before resolving the moisture source usually creates repeat work. Replacing a decorative finish while a plumbing joint is leaking solves the visible symptom but not the maintenance problem.",
        ],

        bullets: [
          "Priority 1 — Safety: electrical hazards, unstable elements or conditions that may cause injury.",
          "Priority 2 — Active damage: leaks, drainage problems, water entry or rapidly worsening defects.",
          "Priority 3 — Function: doors, fixtures, plumbing points and services that are no longer working properly.",
          "Priority 4 — Protection: sealing, coating, corrosion control and preventive repairs.",
          "Priority 5 — Appearance: painting, finishing and cosmetic improvement after underlying defects are resolved.",
        ],
      },

      {
        eyebrow:
          "Maintenance Records",

        heading:
          "A simple service history can prevent expensive guesswork.",

        paragraphs: [
          "Keep a basic record of what was observed, when work was completed, what material or component was changed and whether the problem returned. Over time, this becomes one of the most useful tools for managing a property.",

          "Repeated repairs in the same location often indicate that the root cause has not been addressed. A service history helps a future technician or contractor see that pattern instead of treating every visit as an isolated event.",
        ],

        bullets: [
          "Save invoices and service dates.",
          "Photograph important defects before and after work.",
          "Record recurring leaks, cracks or electrical issues.",
          "Keep product or material details for major replacements.",
        ],
      },

      {
        eyebrow:
          "Professional Support",

        heading:
          "Know when routine care should become a professional inspection.",

        paragraphs: [
          "Some maintenance work is suitable for ordinary observation and cleaning. Other conditions should not be delayed or investigated through trial and error. Electrical faults, persistent water ingress, major cracks, repeated drainage problems and suspected structural defects deserve appropriate professional assessment.",

          "A strong maintenance routine gives the professional better information: where the issue appears, when it started, whether it changes after rain or usage, and what previous work has already been attempted. Better information usually leads to a better scope of work.",
        ],

        highlight:
          "Property maintenance works best when observation, prioritisation and professional execution are connected.",
      },
    ],
  },

  "regular-property-cleaning": {
    slug:
      "regular-property-cleaning",

    category:
      "Cleaning & Maintenance",

    title:
      "A Better Way to Think About Regular Property Cleaning",

    description:
      "Learn how routine cleaning and periodic deep cleaning can support property upkeep, improve visibility of maintenance issues and create a healthier service routine.",

    intro:
      "The best cleaning routines do more than make a property look fresh. They make surfaces easier to inspect, expose early signs of wear and create a cleaner baseline for smarter long-term maintenance.",

    readTime:
      "7 min read",

    serviceHref:
      "/services/deep-cleaning",

    serviceLabel:
      "Book Deep Cleaning",

    keywords: [
      "deep cleaning",
      "property cleaning",
      "home cleaning",
      "professional cleaning service",
      "property maintenance cleaning",
    ],

    sections: [
      {
        eyebrow:
          "Cleaning With Purpose",

        heading:
          "Clean for visibility, hygiene and preservation — not only appearance.",

        paragraphs: [
          "A clean surface is easier to inspect. Moisture marks, failed sealant, damaged grout, corrosion, loose fittings and surface wear are easier to identify when dirt and residue are not hiding the condition underneath.",

          "This is where cleaning and maintenance overlap. Cleaning does not repair a failed joint or a damaged finish, but it can expose the condition early enough for the correct work to be planned.",
        ],

        bullets: [
          "Use routine cleaning to keep frequently used areas manageable.",
          "Use periodic deep cleaning for accumulated soil, corners, edges and less-accessible surfaces.",
          "Do not use cleaning as a substitute for repairing leaks, damaged finishes or failed sealants.",
        ],
      },

      {
        eyebrow:
          "Zone-Based Planning",

        heading:
          "Different areas need different cleaning logic.",

        paragraphs: [
          "A single frequency for an entire property is rarely efficient. Kitchens, washrooms, entrances, utility areas and high-touch surfaces experience different types of soil and usage. Bedrooms, storage areas and low-traffic rooms usually behave differently.",

          "A zone-based plan concentrates effort where it creates the most value instead of applying the same intensity everywhere.",
        ],

        bullets: [
          "High-touch zones: handles, switches, commonly used surfaces and shared areas.",
          "Wet zones: bathrooms, sinks, drainage surrounds and moisture-prone corners.",
          "Grease-prone zones: kitchens, exhaust-adjacent areas and cooking surfaces.",
          "Dust-collecting zones: fans, ledges, grills, high surfaces and inaccessible edges.",
          "Entry zones: floors and surfaces exposed to outdoor dust and frequent movement.",
        ],
      },

      {
        eyebrow:
          "Deep Cleaning",

        heading:
          "Deep cleaning should reset the property, not simply repeat daily cleaning for longer.",

        paragraphs: [
          "A useful deep-cleaning scope focuses on areas that normal routines do not adequately reach. The objective is to remove accumulated soil, clean edges and interfaces, and return surfaces to a condition that is easier to maintain afterward.",

          "Before professional cleaning begins, the scope should distinguish cleaning from restoration. Permanent stains, damaged paint, corroded metal, cracked tiles and deteriorated sealants may require repair or replacement rather than more aggressive cleaning.",
        ],

        highlight:
          "A professional scope is clearer when everyone agrees beforehand which conditions are cleanable and which are actually maintenance defects.",
      },

      {
        eyebrow:
          "Protecting Surfaces",

        heading:
          "More aggressive cleaning is not automatically better cleaning.",

        paragraphs: [
          "Different materials respond differently to chemicals, abrasion, moisture and heat. A method that works well on one surface may damage another. This is especially important with polished finishes, natural stone, coated metal, wood, delicate fixtures and specialist surfaces.",

          "When the material or finish is uncertain, a careful test area and product guidance are better than increasing chemical strength or scrubbing pressure.",
        ],

        bullets: [
          "Identify the surface before choosing a method.",
          "Follow product instructions and dilution guidance.",
          "Avoid mixing cleaning chemicals.",
          "Use suitable protective equipment where required.",
          "Escalate damaged or unfamiliar surfaces instead of experimenting.",
        ],
      },

      {
        eyebrow:
          "When to Book",

        heading:
          "Use professional deep cleaning when the scope becomes larger than routine upkeep.",

        paragraphs: [
          "Professional help is useful when accumulated dirt covers many rooms, when access requires specialist equipment, when the property needs a coordinated reset before occupancy or handover, or when the time and labour required exceeds what routine cleaning can reasonably achieve.",

          "The most efficient booking starts with a clear description of property type, approximate scope, important problem areas and any surfaces that may need special care.",
        ],

        highlight:
          "A good cleaning plan should make the next cleaning easier, not simply make today look better.",
      },
    ],
  },

  "renovation-planning-before-work": {
    slug:
      "renovation-planning-before-work",

    category:
      "Renovation Planning",

    title:
      "Plan Property Improvements Before the Work Begins",

    description:
      "A structured guide to renovation planning, scope definition, sequencing, service coordination, quality checkpoints and smarter project decisions before site work starts.",

    intro:
      "A successful renovation starts long before the first tile comes off or the first wall is opened. Clear priorities, a realistic scope and the right sequence of work turn a collection of ideas into a project that is easier to control, price and execute.",

    readTime:
      "9 min read",

    serviceHref:
      "/services/renovation",

    serviceLabel:
      "Book Renovation Service",

    keywords: [
      "property renovation",
      "home renovation planning",
      "renovation checklist",
      "renovation services",
      "property improvement planning",
    ],

    sections: [
      {
        eyebrow:
          "Define the Outcome",

        heading:
          "Start with what the property must achieve, not with finishes.",

        paragraphs: [
          "Renovation discussions often begin with colours, tiles or fixtures. Those decisions matter, but they should follow the functional objective. First decide what is changing: capacity, layout, appearance, durability, services, accessibility or a combination of these.",

          "A clear outcome prevents individual choices from pulling the project in different directions. It also makes quotation comparison more meaningful because contractors are responding to a defined need rather than a vague request to 'renovate the space.'",
        ],

        bullets: [
          "List the problems the renovation must solve.",
          "Separate essential work from optional upgrades.",
          "Record items that must remain unchanged.",
          "Identify any future use that should influence today's layout or services.",
        ],
      },

      {
        eyebrow:
          "Build the Scope",

        heading:
          "Convert ideas into a scope that can actually be priced and executed.",

        paragraphs: [
          "A useful scope identifies location, quantity, material expectation, removal work, new work and finishing responsibility. The more clearly interfaces are described, the fewer assumptions remain during execution.",

          "For example, 'renovate bathroom' is not a complete scope. The work may include demolition, plumbing changes, waterproofing, tile work, electrical points, sanitary installation, ceiling work, painting, debris removal and final cleaning. Each interface affects cost and sequence.",
        ],

        highlight:
          "A premium renovation is not defined by expensive finishes alone. It is defined by coordinated work underneath those finishes.",
      },

      {
        eyebrow:
          "Sequence the Work",

        heading:
          "Correct sequencing protects completed work from the work that follows.",

        paragraphs: [
          "Renovation is a chain of dependent activities. Demolition exposes conditions. Service changes affect walls and floors. Waterproofing must be protected. Finishes depend on surfaces being ready. Fixtures should not be installed too early and then damaged by later work.",

          "The exact sequence varies by project, but the principle is consistent: complete disruptive and concealed work before delicate finishes wherever practical.",
        ],

        bullets: [
          "Survey and confirm existing conditions.",
          "Complete necessary demolition and opening work.",
          "Coordinate plumbing, electrical and other concealed services.",
          "Complete substrate repair and waterproofing where applicable.",
          "Proceed with flooring, wall finishes and ceilings in the correct dependency order.",
          "Install fixtures, accessories and final finishes.",
          "Inspect, test, clean and hand over.",
        ],
      },

      {
        eyebrow:
          "Control Changes",

        heading:
          "Small decisions made late can create large consequences.",

        paragraphs: [
          "Changing a fixture, moving an electrical point or altering a layout may appear minor in isolation. If the change happens after waterproofing, tiling, ceiling closure or finishing, the same decision can trigger demolition and rework.",

          "Agree on a simple change-control process: describe the change, identify affected work, understand cost and time impact, then approve before execution. This keeps site decisions visible instead of allowing informal changes to accumulate.",
        ],

        bullets: [
          "Freeze high-impact layout decisions early.",
          "Confirm critical fixtures before related concealed work.",
          "Record variations instead of relying on verbal memory.",
          "Assess the effect on completed and upcoming trades.",
        ],
      },

      {
        eyebrow:
          "Quality & Handover",

        heading:
          "Inspection should happen during the work, not only after everything is covered.",

        paragraphs: [
          "Some of the most important renovation work becomes invisible after completion. Concealed services, waterproofing preparation, substrate repairs and internal supports should be checked at the appropriate stage before they are closed or covered.",

          "At handover, review functionality as well as appearance. Test relevant fixtures and services, note outstanding corrections, understand care requirements for new finishes and keep records of important products or components used.",
        ],

        highlight:
          "The best time to find a hidden problem is before it becomes hidden.",
      },
    ],
  },
};

type PageProps = {
  params:
    Promise<{
      slug: string;
    }>;
};

export function generateStaticParams() {
  return Object.keys(
    articles,
  ).map(
    (
      slug,
    ) => ({
      slug,
    }),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    slug,
  } = await params;

  const article =
    articles[slug];

  if (!article) {
    return {};
  }

  return {
    title:
      `${article.title} | City Coolies`,

    description:
      article.description,

    authors: [
      {
        name:
          "City Coolies Editorial Team",
      },
    ],

    alternates: {
      canonical:
        `/blog/${article.slug}`,
    },

    openGraph: {
      type:
        "article",

      title:
        article.title,

      description:
        article.description,

      siteName:
        "City Coolies",
    },

    twitter: {
      card:
        "summary",

      title:
        article.title,

      description:
        article.description,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview":
          "large",
        "max-video-preview":
          -1,
      },
    },
  };
}

export default async function BlogArticlePage({
  params,
}: PageProps) {
  const {
    slug,
  } = await params;

  const article =
    articles[slug];

  if (!article) {
    notFound();
  }

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "BlogPosting",

    headline:
      article.title,

    description:
      article.description,

    datePublished:
      "2026-08-28",

    dateModified:
      "2026-08-28",

    author: {
      "@type":
        "Organization",

      name:
        "City Coolies",
    },

    publisher: {
      "@type":
        "Organization",

      name:
        "City Coolies",
    },

    articleSection:
      article.category,

    keywords:
      article.keywords.join(
        ", ",
      ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData,
            ),
        }}
      />

      <ArticleReader
        article={
          article
        }
      />
    </>
  );
}