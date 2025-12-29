# Phase 01 – Web Scraping & CRUD APIs (Completed ✅)

## Overview
In **Phase 01** of the assignment, the goal was to scrape blog articles from **BeyondChats**, store them in a database, and expose **CRUD APIs** to manage those articles.

This phase focuses on backend fundamentals such as data scraping, database storage, and REST API development.

---

## Phase 01 Objectives
✔ Scrape articles from the **last page** of the BeyondChats blogs section  
✔ Fetch the **5 oldest articles**  
✔ Store scraped articles in a database  
✔ Create **CRUD APIs** for managing articles  

---

## Data Source
- **Website:** BeyondChats  
- **Blogs URL:** https://beyondchats.com/blogs/

The scraper targets the **last page of the blogs section** to extract the **oldest articles available**.

---

## Scraping Logic
- Identified the last page of the blogs listing
- Extracted details for **5 oldest blog articles**
- Scraped key fields such as:
  - Article Title
  - Blog URL / Slug
  - Published Date
  - Short Description / Content Preview (if available)

---

## Database Storage
- Scraped articles are stored in the database
- Each article record contains:
  - `title`
  - `slug / url`
  - `content / description`
  - `publishedAt`
  - `createdAt`

This ensures data persistence and easy retrieval via APIs.

---

## CRUD APIs Implemented
The following RESTful APIs were created for managing articles:

### Create Article
- Adds a new article to the database

### Read Articles
- Fetch all stored articles
- Fetch a single article by ID

### Update Article
- Update article details such as title or content

### Delete Article
- Remove an article from the database

---

## Tech Stack Used
- **Backend:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Scraping:** Axios + Cheerio (or equivalent)
- **API Type:** REST APIs

---

## Outcome
✅ Successfully scraped the 5 oldest articles  
✅ Data stored securely in the database  
✅ Fully functional CRUD APIs implemented  
✅ Phase 01 completed as per assignment requirements  

---

## Next Steps
Proceeding to **Phase 02**, which will build upon this foundation with more advanced features and logic.
