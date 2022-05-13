# **exampleusageplz**
### **Team Members: Aiden Rutter, Justin Langston, Racheal Dylewski**

## **Introduction**
### Project  
  API documentation often will have examples for commonly used calls, or some but not others. Documentation sites are often generated from javadocs or otherwise, describing the function and parameters. Often times this is not enough context to answer the question, ‘is this appropriate for my specific use case.’ Example usage instances associated with libraries / APIs are exposed via a web API with a SQL backend enabling relatively simple search functionality. Users can rate and submit example usage. Finding and submitting relevant documentation is integrated unobtrusively into the IDE. Sample usage can also be integrated by the original maintainers by extension of the existing web API.

### Motivation
Consider the following scenario. I am developing a VSCode extension and referencing their documentation. The documentation has given me some useful examples and a high level understanding of where and how to make use of their API. I have an idea of what I want to accomplish, and I’m diving into implementation details. I’m looking at a piece of API documentation, for instance, maybe
https://code.visualstudio.com/api/references/vscode-api#TextEditor.set Decorations.

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
Exampleusageplz is composed of a VSCode extension that contextually allows the developer to display and submit sample usage. 
There is Github mining for relevant code snippets. The mining is currently set up for demonstration purposes only. See future work for further comments on mining.
The backend employs a MySQL database for retrieving and storing content.

### Block Diagram
![](diagram.png)

### Minimum Viable Product
Backend that allows for CRUD (Create, Read, Update, Delete) operations on example usage posts. These routes manage interaction with a MySQL database. Furthermore, the backend has basic search endpoints so that the VSCode client can retrieve any posts corresponding to a particular method and API.

The frontend is a VSCode extension that identifies eligible method calls as the user types, in this case, methods that are defined in a non-standard library. The minimum viable product focuses on typescript, but the approach should generalize to other languages. Of the eligible methods, a few will have code lens's appear to avoid being distracting. Programmers can interact with this to see a list of examples via 'peek mode'. See the figures below. 

![](see_examples.gif)

Finally, users can make usage posts with the extension's 'quick post' feature. Users select a region of text and use a context (right click) menu and submit a brief form via the VSCode 'quick input' feature.

![](post.gif)
    
### Proposed Enhancements

See [open issues](https://github.com/CS540-22/exampleusageplz/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement)

Proposed enhancements are related to features not related to the minimum viable product. As it stands, there are still some bugs and features desired that relate to the minimum viable product. These include:

- improving current documentation, including README.md for eventual publication to users
- expanding unit testing to cover VSCode extension
- publishing initial release to VSCode extension marketplace
- Filtering codelens's to only display near the cursor
- Improving performance relating to parsing

### Testing
21 backend tests are currently passing via CI and currently exist for all the backend endpoints. To run the backend tests, enter the backend directory and type `python -m unittest` to automatically discover and run all backend tests.

There is testing infrastructure in place for the frontend but tests for the frontend have yet to be implemented.

GitHub actions currently runs tests as a part of a continuous integration pipeline.

### Tools

Python, Flask, Flask-SQLAlchemy & MySQL, VSCode extension development.
WorldOfCode can be leveraged for mining of projects to document.
Flake8 and pyunittest is used to test and ensure coding standards on backend code (python.
Mocha and ESLint is used to similar ends on frontend code (typescript). GitHub actions will be used to use these tools as a part of a continuous integration pipeline.

## Team
### Skills
Aiden and Racheal have front end / full stack development background working with PAIRS lab, and from coursework (COSC340). Aiden has experience with repository mining and devops as well as REST APIs. Justin has a back end focused background with some full stack experience. All team members are proficient in Python.

### Roles

Aiden performed project management and devops related tasks such as setting up CI, managing issues, but also led discussions about defining project scope, setting and adjusting goals between sprints, and reviewing code. Aiden also worked with Rachael and Justin to integrate the VSCode extension with the backend via axios requests. Aiden provided boilerplate and defined stubs, schema and serialization, and route specifications for the backend. Aiden implemented the 'quick post' feature of the frontend.

Justin was primarily responsible for implementing the backend routes and CRUD (create, read, update, delete) methods for each schema related to a table. CRUD methods define the interaction between the backend web service and the SQL database. These had to be defined for posts, calls, and APIs. Justin implemented unit tests to test each of these endpoints. Additionally, Justin implemented search endpoints.

Racheal was primarily responsible for developing the VSCode extension.
This including extension activation, document parsing for methods and retrieval of their defining APIs, and implementing a codeLensProvider. Additionally, Racheal developed code to 'preview' posts received by the API using the peek functionality.

## Project Management


### Schedule 

    | Week        | Description|
    | ----------- | -----------|
    | 02/21       | Sprint 1 - Familiarize ourselves with the technologies that we are going to be using. 
    | 02/28       | Sprint 1 - Keep familiarizing ourselves with the technologies. Work on setting up framework for the front end and back end. 
    | 03/07       | Sprint 2 - Mockup(s) for views on frontend
    | 03/14       | Sprint 2 - Development of database schemas
    | 03/21       | Sprint 3 - Implement prototype main page with search
    | 03/28       | Sprint 3 - Implement prototype content schema and usage mining service. Unit Tests.
    | 04/04       | Sprint 4 - Refine prototypes and conduct more tests.
    | 04/11       | Sprint 4 - Render and Integrate with content (curation)
    | 04/18       | Sprint 5 - Add repos
    | 04/25       | Sprint 5 - Finalize our proof of concept. 
    | 05/02       | Final week of class, present project.

### Process
The team utilized the Agile methodology using 2 week sprints. Agile is an itterative approach that makes use of incremental improvement through small and frequent sprints or releases. It is important for the team to use an itterative approach as it allows more flexibility. As our needs may have changed throughout the course of the semesters, it is important to gain feedback from our target customer and make modifications accordingly. This is more suitable than common choices such as the waterfall method, which focuses on developement all at once. Because our requirements may change, this was not suitable for the project. Due to the multiple distinct facets of the project, we were able to work on relatively distinct parts, until later in the semester when we had to integrate it. We employed a github workflow. At the start of a sprint, we discussed the project and spring goals and refined those into github issues that represent deliverable, incremental features. Development branches were created to track and address each issue as they were addressed. We created pull requests and asked for review. As the project was in its early stages the PRs did not go under much scrutiny but as the project became more stable and interdependent we spent more time on the code review process.


## Lessons Learned

Despite the initial effort expenditure, using `docker-compose` helped accelerate the development of the frontend by making it easy to run it and use it.

Using simple tools (in this case flask) that can be expanded as needed is useful for deliberate and incremental development, and reducing the time it takes to produce a minimum viable product.

Each language comes with unique challenges in terms of parsing, particularly in how they manage dependencies. Having access to a standard `package.json` and `node_modules` folder made it much easier to parse dependencies in a project. Additionally, static parsers aren't always enough to define complex dependency trees.

## Future Work
* User Authentification - Create user database models, allow for signing in via GitHub OAuth, link specific posts to users when a user posts them. Additionally, add authentification (ie, users can read any post, but not update or delete others posts) as well as rate limiting. 
* Like/Dislike on posts: Users can help 'curate' relevant usage examples. Given a large number of usage instances, users should see the most relevant posts first. 
* Compute relevancy scores based on users workspace, the originating source of the example, and the content of the example.
* Expand the project to work for languages other than typescript.
* Investigate [doctree](https://github.com/sourcegraph/doctree) to be used in the language agnostic indexing and mining of examples.
* Provide a frontend for users to manage their posts (ie, update or delete) within VSCode or otherwise user friendly interface.
* With the end goal of providing usage examples for virtually all libraries, support deployment to a distributed database.
