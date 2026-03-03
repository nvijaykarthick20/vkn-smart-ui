# VKN Smart - Interactive Learning Platform

A modern React application for interactive math and language learning with a focus on practice and progress tracking.

## 🚀 Features

### Arithmetic Operations Module
- **Multi-step form workflow** for selecting operation type and difficulty level
- **Dynamic question generation** with 50 customizable practice problems
- **Flexible difficulty levels**: 1-digit, 2-digit, 3-digit, and 4-digit numbers
- **Supported operations**: Addition, Subtraction, Multiplication, Division
- **Score calculation** system: 2 marks per correct answer, out of 100 total
- **Answer validation** using React Hook Form + Zod schema validation
- **Performance metrics** displaying accuracy percentage and detailed feedback
- **Skip-free constraint** - all questions must be answered before submission
- **Loading skeletons** for better UX during question generation
- **Results review** showing first 10 questions with answer feedback

### Tamil Worksheet Module
- Placeholder for future Tamil language learning content

### Modern UI/UX
- **Clean, minimal design** using CSS Modules (no external CSS frameworks)
- **Responsive layout** optimized for desktop and mobile devices
- **Gradient backgrounds** with modern color scheme (purple/indigo)
- **Smooth animations** and transitions throughout the app
- **Accessibility-focused** semantic HTML and keyboard navigation
- **Card-based layout** with consistent spacing and typography

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite (for fast development and production builds)
- **Routing**: React Router v6 (for multi-page navigation)
- **Form Management**: React Hook Form (for efficient form handling)
- **Validation**: Zod (for runtime schema validation)
- **State Management**: Zustand (lightweight global state)
- **Styling**: CSS Modules (modular, scoped styling)

## 📁 Project Structure

```
src/
├── features/              # Feature-based modules
│   ├── arithmetic/        # Arithmetic operations feature
│   │   ├── components/    # Reusable components
│   │   │   ├── OperationSelector.tsx
│   │   │   ├── QuestionList.tsx
│   │   │   ├── QuestionItem.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   └── LoadingSkeleton.tsx
│   │   ├── pages/         # Page components
│   │   │   └── ArithmeticOperation.tsx
│   │   ├── store/         # Zustand state management
│   │   │   └── arithmeticStore.ts
│   │   ├── utils/         # Utility functions
│   │   │   ├── questionGenerator.ts
│   │   │   └── scoreCalculator.ts
│   │   ├── types/         # TypeScript type definitions
│   │   │   └── index.ts
│   │   └── arithmetic.module.css
│   └── tamil/             # Tamil sheet feature (coming soon)
│       ├── pages/
│       │   └── TamilWorksheet.tsx
│       └── tamil.module.css
├── shared/                # Shared across features
│   ├── components/        # Reusable layout components
│   │   ├── Layout.tsx
│   │   ├── Layout.module.css
│   │   ├── Card.tsx
│   │   └── Card.module.css
│   └── utils/             # Shared utilities
│       └── validators.ts
├── pages/                 # Root pages
│   ├── Home.tsx
│   └── Home.module.css
├── App.tsx                # Root component
├── App.module.css
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173/`

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📖 How to Use

### Arithmetic Operations
1. Navigate to "Arithmetic Operations" from the home page
2. **Step 1**: Select an operation type (Addition, Subtraction, Multiplication, Division) and difficulty level (1-4 digits)
3. Click "Generate Questions" to create 50 practice problems
4. **Step 2**: Answer all 50 questions (validation prevents submission if any are empty)
5. Review your score and performance metrics
6. Option to retry or return home

### Answer Validation
- All 50 questions must be answered before submission
- Answers must be valid integers
- Form validation provides clear feedback on missing answers

### Scoring System
- Each correct answer: 2 points
- Total possible score: 100 points
- Accuracy percentage and correct answer count displayed after submission

## 🎨 Design Principles

- **Modularity**: Components are small, focused, and reusable
- **Type Safety**: Full TypeScript coverage for reliability
- **Performance**: Lazy loading, optimized rendering, no unnecessary re-renders
- **Accessibility**: Semantic HTML, keyboard navigation support
- **Scalability**: Feature-based structure allows easy expansion
- **Maintainability**: Clear naming, consistent patterns, well-organized code

## 🔄 State Management with Zustand

The arithmetic store manages:
- Selected operation type and difficulty
- Generated questions
- User answers
- Score and results
- Loading states

Simple, single-file store with no boilerplate required.

## 📋 Form Validation

Using Zod schemas for:
- **Operation Selection**: Validates operation type and digit selection
- **Answer Submission**: Ensures all 50 questions are answered with valid numeric values

## 🎯 Question Generation

- **Smart random generation** with configurable digit ranges
- **Division-specific handling** to ensure whole number results
- **Subtraction safeguards** to prevent negative results
- **Consistent question structure** with proper formatting

## 🔧 Customization

### Add New Operations
1. Update the `OperationType` type in `types/index.ts`
2. Add logic to `questionGenerator.ts`
3. Update UI elements in `OperationSelector.tsx`

### Modify Question Count
Change the `count` parameter in `useArithmeticStore.generateQuestions()` calls

### Adjust Scoring
Modify the `marksPerQuestion` constant in `scoreCalculator.ts`

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "zustand": "^4.x",
  "@hookform/resolvers": "^3.x"
}
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

Built with modern React best practices and a focus on user experience.
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
