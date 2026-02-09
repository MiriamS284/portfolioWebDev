# Developer Portfolio with Digital Garden

A modern, minimalist portfolio built with Next.js 15 and Sanity CMS, featuring a digital garden for sharing thoughts, code snippets, and technical insights.

## Concept

This portfolio goes beyond a traditional showcase—it's a **digital garden** where ideas grow and evolve. It combines project presentations with a living collection of technical learnings, code snippets, and development insights.

### Key Features

**Portfolio Showcase**

- Project presentations with live demos and source code
- Case studies highlighting technical challenges and solutions
- Skills and technology overview

**Digital Garden**

- Growing collection of technical notes and insights
- Code snippets with syntax highlighting
- Thoughts on development practices and patterns
- Evolving content that gets refined over time

**Modern Architecture**

- Next.js 15 with App Router for optimal performance
- Sanity CMS as headless backend for flexible content management
- Server Components for fast page loads
- Responsive, minimalist design

## 🛠 Tech Stack

### Frontend

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

### Backend & CMS

- **CMS:** Sanity Studio (separate repository)
- **Content Delivery:** Sanity Client with CDN
- **Real-time Preview:** Live editing capabilities

## Architecture

This project uses a **decoupled architecture** with two separate repositories:

1. **Frontend (this repo):** Next.js application for presentation
2. **[CMS Backend](https://github.com/MiriamS284/portfolio-sanity-cms):** Sanity Studio for content management

Benefits of this approach:

- Independent deployment and scaling
- Clear separation of concerns
- CMS can be managed independently from the frontend
- Easy to extend with additional content types

## Project Structure

```
portfolioWebDev/
├── app/                   # Next.js App Router
│   ├── (routes)/          # Route groups
│   ├── components/        # React components
│   └── layout.js          # Root layout
├── lib/                   # Utilities & helpers
│   ├── sanity.client.js   # Sanity client config
│   └── queries/           # GROQ queries
└── public/                # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account (free tier available)

### Installation

1. Clone the repository

```bash
git clone https://github.com/MiriamS284/portfolioWebDev.git
cd portfolioWebDev
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Add your Sanity credentials:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design Philosophy

**Minimalism & Focus**

- Clean, distraction-free interface
- Content-first approach
- Thoughtful use of white space

**Progressive Disclosure**

- Information revealed as needed
- Smooth animations and transitions
- Intuitive navigation

**Accessibility**

- Semantic HTML
- Keyboard navigation support
- ARIA labels where needed

## Content Management

Content is managed through [Sanity Studio](https://github.com/MiriamS284/portfolio-sanity-cms), allowing for:

- Real-time content updates
- Rich text editing with code snippets
- Image optimization and CDN delivery
- Version history and content drafts

## Digital Garden Philosophy

The digital garden section embraces:

- **Learning in public:** Sharing work-in-progress thoughts
- **Interconnected ideas:** Linking related concepts
- **Continuous refinement:** Content evolves over time
- **Non-linear exploration:** Browse by topic, not chronology

## Development Status

This portfolio is actively being developed. Current focus areas:

- [ ] Project showcase section
- [ ] Digital garden implementation
- [ ] Code snippet syntax highlighting
- [ ] Dark mode support - toggle coming soon!
- [ ] Performance optimization

## Technologies & Inspiration

Inspired by modern developer portfolios that emphasize clarity and craftsmanship:

- Clean, typography-focused design
- Smooth animations and micro-interactions
- Fast loading times and optimal Core Web Vitals

## Connect

- Portfolio: [Coming Soon]
- LinkedIn: [linkedin.com/in/miriam-sparbrod](https://www.linkedin.com/in/miriam-sparbrod/)
- GitHub: [@MiriamS284](https://github.com/MiriamS284)
