                              Task Dashboard App



   A Task Management Dashboard built using React, TypeScript, and Tailwind CSS.This application allows users to create, edit, delete, filter, import, and export tasks efficiently.   

   The Task Manager application uses React’s component-based architecture to manage tasks efficiently. Tasks are stored in application state and passed to child components via props. Users can add new tasks through a form, which validates input before adding it to the task list. Each task can be edited, deleted, or have its status updated using interactive controls. Search functionality is implemented with debouncing to optimize performance by reducing unnecessary filtering while typing. Filtering allows users to view tasks based on status and priority, improving task organization. The UI is fully responsive, adapting to different screen sizes, and uses Tailwind CSS for styling. All task data is persisted with local storage.


## Features:

   * Add new tasks

   * Edit existing tasks

   * Delete tasks

   * Update task status

   * Filter by status and priority

   * Import tasks from JSON file

   * Export tasks as JSON file

   * Form validation

   * Responsive UI



## Tech Stack:

  * React

  * TypeScript

  * Tailwind CSS

  * React Hooks (useState, useEffect)


 


## Installation: 

* Clone the repository

  git clone https://github.com/your-username/task-manager-app.git

* Navigate into the project

  cd task-manager-app

* Install dependencies

   npm install

* Start development server

   npm run dev



## Component Overview:
### TaskForm

   * Handles adding and editing tasks

   * Prefills form when editing

   * Validates user input

   * Supports cancel functionality

### TaskList

   * Displays list of tasks

   * Passes actions to TaskItem

### TaskItem

   * Displays task details

   * Allows status change

   * Supports delete and edit actions

### TaskFilter

   * Filters tasks by status and priority

   * Displays active filter indicators

### Dashboard

   * Central state management

   * Connects all components



## Reflection questions:

1. How you implemented React and TypeScript features?

I used React functional components for state and side effects. TypeScript was used to define types for tasks and props, ensuring type safety and reducing runtime errors. Interfaces and type definitions helped structure data and component communication clearly.


2. The challenges you encountered and how you overcame them?

I faced challenges with responsive layout and component reusability. Fixed-width elements broke mobile responsiveness, so I replaced them with flexible layouts using Tailwind CSS. I also handled task filtering and search efficiently by optimizing state updates and debouncing input.

3. Your approach to component composition and state management?

I followed a component-based architecture where each component handles a specific responsibility (task form, list, filter, etc.). State is managed at the parent level and passed down via props, ensuring data consistency. localStorage is used for persistence so tasks remain available after page reloads.