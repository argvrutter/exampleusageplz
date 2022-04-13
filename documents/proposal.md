# **exampleusageplz**
### **Team Members: Aiden Rutter, Justin Langston, Racheal Dylewski**

## **Introduction**
### Project  
  API documentation often will have examples for commonly used calls, or some but not others. Documentation sites are often generated from javadocs or otherwise, describing the function and parameters. Often times this is not enough context to answer the question, ‘is this appropriate for my specific use case.’ Collection of forks of documentation for popular APIs/frameworks organized into a website with relatively simple search functionality that returns usage examples across publicly available source code with a specific API call. Users can rate and submit example usage. A reach goal would enable easy integration of the sample usage by the original maintainers.

### Motivation
Consider the following scenario. I am developing a VSCode extension and referencing their documentation. The documentation has given me some useful examples and a high level understanding of where and how to make use of their API. I have an idea of what I want to accomplish, and I’m diving into implementation details. I’m looking at a piece of API documentation, for instance, maybe
https://code.visualstudio.com/api/references/vscode-api#TextEditor.set Decorations

The documentation tells me precisely what the parameters and what the call accomplishes. However, what I really want to know is ‘is this appropriate for my specific use case.’ I know what I want to do, and after browsing the API docs this sounds like something that could help me and/or save me time, but I can’t say how it would fit into my code without more background information. I’m looking for example usage. 

### Contribution

This project is related to foraging for information when coding. Some such tools are Github, StackOverflow and API or framework documentation for their tools. Github is very useful for finding similar projects or getting a jumping off point. Stackoverflow is very useful for finding solutions related to a specific problem. API documentation gives you information on tools to tackle a wide range of problems. It's not novel in the sense that example code usage already exists. However, it's novel the sense that it provides context for specific API usage and it's user curated. 

### Team Members
Aiden Rutter is a masters student in Computer Science at the University of Tennessee, Knoxville. 
He's had internship and research experiences at places like Amazon and Oak Ridge National Lab, applying git workflow, agile, and test-driven development. Justin Langston is a masters student in Computer Science at the University of Tennessee, Knoxville. He's had two internships at mastercard applying the agile methodology and techniques for the processing of large transaction batch files. Racheal Dylewski is also a master's student in computer science at the University of Tennessee, Knoxville.  She has had internships and research experience at AT&T, Discovery, and UTK working with various subjects such as software defined networks, web and mobile development, and creating tools for developer productivity.

## Customer Value
### Customer Need
The primary customer is other developers. Primarily, those who are working with unfamiliar libraries, API packages, etc. This reaches a broad audience and may include novices or more experienced programmers. In using an unfamiliar package or tool, someone would want an easy to use system where they can clearly find examples posted by other people or relevant snippets from open source projects. For many packages, documentation can be limited, difficult to understand, or complicated to figure out how to actually apply it. Real examples of these tools being used are often the most helpful resource in application. However, these can be hard to find, particularly for a one's specific use case. This is particularly true when documentation is automatically generated and does not include example usage.
  
### Proposed Solution
This project will help developers by providing usage context of specific Library/API calls that may not be present in documentation. This will improve the information foraging process for specific library/API questions, which is critical for properly integrating other APIs/libraries effectively. The ability to get example usage is not novel in of itself, but is unique in the way it is organized to provide user curated usage context at the most detailed level of library documentation.

### Measures of Success
Developers can choose the most appropriate API/Library call for a given situation in less time. This can be measured in the time spent information foraging.

## Technology
### System
Exampleusageplz will be composed of a web front that enables navigation and/or searching of example usage for invocations of libraries, as well as submission. To facilitate features like user curation and submission, users can create accounts. There will be Github mining for relevant snippets. The backend will employ a NoSQL database for retrieving and storing content.

### Block Diagram
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
 
### Minimum Viable Product
A site with examples organized by the library/API as well as the specific invocations. Syntax highlighted code snippets. User curation features (ie, upvote)
    If full functionality of the project can't be completed in by the end of the semester deadline, the team will reduce the scale of the tool to focus on one specific task. This task may be providing code examples for a select few APIs that are stored statically or in a similar fashion. This is a minimum viable product and can still be functional as a proof of concept for the purpose of this project.


    
### Proposed Enhancements
* Allow embedding into other documentation provider sites. 
* Allow use of externally hosted Github blobs or gists.
* Track version information 

### Testing
We intend to incorporate Unit testing, functional tests, continuous integration as codebase enters a maintainable state.
    
### Tools
Tools such as Python, flask, mongodb, React.js will be used. WorldOfCode can be leveraged for mining of projects to document.

## Team
### Skills
Aiden and Racheal has front end / full stack development background working with PAIRS lab, and from coursework (COSC340). Aiden has experience with repository mining and devops as well as REST APIs. Justin has a back end focused background with some full stack experience. All team members are proficient in Python.

### Roles
Aiden will the be project manager for the entirety of the project.
Roles will be primarily fixed, however, if needed we may branch out and help eachother with specific parts of the project. Aiden will focus primarily on the repository mining, Racheal will focus primarily on front end implementation, and Justin will focus primarily on back end implementation. 

## Project Management
The completion on a minimum viable working version of this project seems feasible. The team plans to meet once to twice a week

### Roadmap
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

### Process
The team will be using Agile methodology using 2 week sprints. Agile is an itterative approach that makes use of incremental improvement through small and frequent sprints or releases. It is important for the team to use an itterative approach as it allows more flexibility. As our needs may change throughout the course of the semesters, it is important to gain feedback from our target customer and make modifications accordingly. This is more suitable than common choices such as the waterfall method, which focuses on developement all at once. Because our requirements may change, this was not suitable for the project. Something like pair programming was also not suitable; because the development timeframe for this project is so short, it is necessary that our resources are maximized across all functions of the project.
