# Playwright Test Suite

This project contains end-to-end tests written using [Playwright](https://playwright.dev/) for a technical assignment.

## Prerequisites

* [Node.js](https://nodejs.org/) (v14 or later recommended)
* npm (comes with Node.js)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run Playwright tests**

   ```bash
   npx playwright test
   ```

## Additional Commands

* **Open HTML report**

  ```bash
  npx playwright show-report
  ```

* **Run tests in headed mode (with browser UI)**

  ```bash
  npx playwright test --headed
  ```

* **Run specific test file**

  ```bash
  npx playwright test path/to/test.spec.ts
  ```

## Notes

* If this is your first time using Playwright in the project, install the required browsers:

  ```bash
  npx playwright install
  ```

