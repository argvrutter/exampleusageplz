# **exampleusageplz**
### **Team Members: Aiden Rutter, Justin Langston, Racheal Dylewski**

## **Introduction**
- Overview
  - What is the project?
  

  API documentation often will have examples for commonly used calls, or some but not others. Documentation sites are often generated from javadocs or otherwise, describing the function and parameters. Often times this is not enough context to answer the question, ‘is this appropriate for my specific use case.’ Collection of forks of documentation for popular APIs/frameworks organized into a website with relatively simple search functionality that returns usage examples across publicly available source code with a specific API call. Users can rate and submit example usage. A reach goal would enable easy integration of the sample usage by the original maintainers.


  - What is the motivation for the project?

Consider the following scenario. I am developing a VSCode extension and referencing their documentation. The documentation has given me some useful examples and a high level understanding of where and how to make use of their API. I have an idea of what I want to accomplish, and I’m diving into implementation details. I’m looking at a piece of API documentation, for instance, maybe
https://code.visualstudio.com/api/references/vscode-api#TextEditor.set Decorations

The documentation tells me precisely what the parameters and what the call accomplishes. However, what I really want to know is ‘is this appropriate for my specific use case.’ I know what I want to do, and after browsing the API docs this sounds like something that could help me and/or save me time, but I can’t say how it would fit into my code without more background information. I’m looking for example usage. 

  - Place your project in the context of the market
  This project is relating to foraging for information when coding. Some such tools are Github, StackOverflow and API or framework documentation for their tools. Github is very useful for finding similar projects or getting a jumping off point. Stackoverflow is very useful for finding solutions related to a specific problem. API documentation gives you information on tools to tackle a wide range of problems. However, when you're new to an API there's a gap in context without example usage.
  
    - Is your project idea novel. If so, what need does it fill?

  It's not novel in the sense that example code usage already exists. However, it's novel the sense that it provides context for specific API usage and it's user curated.

    - If not novel, what existing software does it resemble? How is it different?
    
    GitHub projects has code snippets available that are related to API/library calls. However, there's no established relationship between code blobs and the corresponding methods invocations.

  - What are the backgrounds of the team members?
That is a very personal, innappropriate question.

# Project Proposal: Customer Value
- Customer Need
  - The primary customer is other developers. Primarily, those who are working with unfamiliar libraries, API packages, etc. This reaches a broad audience and may include novices or more experienced programmers.
  
  - What does the customer want?
  - In using an unfamiliar package or tool, someone would want an easy to use system where they can clearly find examples posted by other people, scraped from the internet, or be able to post their own specific questions.
  
  - Why? What is their underlying problem to solve or experience to have?
  - For many packages, documentation can be limited, difficult to understand, or complicated to figure out how to actually apply it. Real examples of these tools being used are often the most helpful resource in application. However, these can be hard to find, particularly for a one's specific use case.
  
  - Place your software in the context of the market.
  
- Proposed Solution
  - From the customer’s POV, what will your solution deliver?

  Provide usage context of specific Library/API calls that may not be present in documentation.
  - How will the customer benefit from your proposed solution?
  
  Improve the information foraging process for specific library/API questions without resorting to stack overflow posts.

  - Does it provide a new capability or is it much better, easier, faster …?

The capabilities themselves are not novel, but offer tools to improve the information foraging process for developers

  - Have you tested the idea on anyone?

  No, we will need to develop a prototype.

- Measures of Success
  - How will you know if customers got the benefits you want to provide?
  Customers (ie, developers) can choose the most appropriate API/Library call for their use case for a given tool in less time.
  - What are your customer-centric measures of success?

Reduced time spent information foraging

# Project Proposal: Technology
- System: technology you deliver
    - From the developer’s POV, what will your software do?
    Provide a web front end with a backend to organize users and code submissions based on the library. Github mining for relevant snippets if there is no user curatede content.

    - What are the main components of your system? What do they do?
    Frontend: Web frontend to render code submissions as well as allow submissions and user curation of content.
    - What is a high-level block diagram of the architecture of the system?
    <!-- use the new mermaid feature -->
    <!-- https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/ -->
    ```mermaid
    graph TD
    A[Web Client] --> B(Web service)
    B --> C(Content Service)
    B --> D(User Service)
    E[Repository Miner] --> C(Content Service)
    C --> F[Mongo]
    F --> B[Web Service]
    
    ```
    - What is a minimal system that would have some value to the customer?

    A site with examples organized by the library/API as well as the specific invocations. Syntax highlighted code snippets. User curation features (ie, upvote)
    
    - What are some possible enhancements that customers would value?
    Allow embedding into other documentation providers
    - How will you test your system?
    Unit testing, functional tests, continuous integration.
    
- Tools: technology you use to build what you deliver
    - What will you use to build the system?  
    Python, flask, mongodb, React.js, 
    - Are there available tools you can leverage?
    



# Project Proposal: Team
- Skills
    - Has anyone on the team built something like this before?  
    No
    - Are the tools known or new to the team?
    We are all familiar with python.

- Roles
    - What are the roles of the team members?  
    Aiden will the be project manager for the entirety of the project. 
    - Will the roles be fixed or rotating?  
    Roles will be primarily fixed, however, if needed we may branch out and help eachother with specific parts of the project. 

# Project Proposal: Project Management
- Schedule
    - Is completion of the system feasible?
    The completion on a minimum viable working version of this project seems very feasible.
    - When and how often will you meet? Face to face?
    Plan to meet once to twice a week
    - Write a (tentative) week-by-week schedule for project tasks and deadlines
    
    | Week        | Description|
    | ----------- | -----------|
    | 02/21       | Sprint 1 - Primarily fimiliarize ourselves with the technologies that we are going to be using. 
    | 02/28       | Sprint 1 - Keep familizarizing ourselves with the technologies. Work on setting up framework for the front end and back end. 
    | 03/07       | Sprint 2 - Mockup(s) for views on frontend
    | 03/14       | Sprint 2 - Development of database schemas
    | 03/21       | Sprint 3 - Implement prototype main page with search
    | 03/28       | Sprint 3 - Implement prototype content schema and usage mining service
    | 04/04       | Sprint 4 - Add user service, user registration & so on for frontend
    | 04/11       | Sprint 4 - Render and Integrate with content (curation)
    | 04/18       | Sprint 5 - Add repos
    | 04/25       | Sprint 5 - Finalize our proof of concept. 
    | 05/02       | Final week of class, present project.
- Constraints
    - Are there any regulatory, or legal constraints?
    There are no regulatory or legal constraints for this project. 
    - Are there any ethical or social concerns?
    There are no ethical or social concerns with this project. 
- Resources
    - Get data from WoC
- Descoping
    - If full functionality of the project can't be completed in by the end of the semester deadline, the team will reduce the scale of the tool to focus on one specific task. This task may be providing code examples for a select few APIs that are stored statically or in a similar fashion. This is a minimum viable product and can still be functional as a proof of concept for the purpose of this project.


# Choice of Process
The team will be using Agile methodology using 2 week sprints. Agile is an itterative approach that makes use of incremental improvement through small and frequent sprints or releases. It is important for the team to use an itterative approach as it allows more flexibility. As our needs may change throughout the course of the semesters, it is important to gain feedback from our target customer and make modifications accordingly. This is more suitable than common choices such as the waterfall method, which focuses on developement all at once. Because our requirements may change, this was not suitable for the project. Something like pair programming was also not suitable; because the development timeframe for this project is so short, it is necessary that our resources are maximized across all functions of the project.
