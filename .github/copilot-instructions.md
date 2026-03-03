# VKN Smart - Project Development Guidelines

## Project Overview
VKN Smart is a modern React application for interactive math and language learning, built with Vite, TypeScript, React Router, React Hook Form, Zod, and Zustand.

## Tech Stack
- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand
- **Styling**: CSS Modules only (no Tailwind or external CSS frameworks)

## Project Structure
- `src/features/` - Feature modules (arithmetic, tamil, etc.)
- `src/shared/` - Shared components and utilities
- `src/pages/` - Root-level pages
- Feature-based structure for scalability and maintainability

## Code Standards
1. **TypeScript**: Use strict type checking, avoid `any` types
2. **Type-only imports**: Use `import type` for type imports
3. **CSS Modules**: All component styles in separate `.module.css` files
4. **Component naming**: PascalCase for component files and exports
5. **Props typing**: Always define explicit prop interfaces
6. **Error handling**: Use Zod for validation, provide user-friendly error messages

## Development Workflow
1. Run `npm run dev` to start the development server
2. Development server runs at `http://localhost:5173/`
3. TypeScript compilation happens automatically
4. HMR (Hot Module Replacement) enabled for instant feedback
5. Build for production: `npm run build`

## Feature Development Guidelines
1. Create feature folders under `src/features/`
2. Organize into: `components/`, `pages/`, `store/`, `utils/`, `types/`
3. Use Zustand for state management (lightweight, no boilerplate)
4. Share components via `src/shared/` folder
5. Keep logic reusable and modular

## Styling Rules
- Use CSS Modules for all styling (`.module.css` files)
- No inline styles except for dynamic values
- Use CSS Variables in global styles if needed
- Responsive design with media queries
- Focus on accessibility (keyboard navigation, color contrast)

## Form Validation
- Use React Hook Form for form state management
- Create Zod schemas in `shared/utils/validators.ts`
- Provide schema-based validation with clear error messages
- Always validate before submission

## State Management with Zustand
- Keep stores focused on single features
- Use descriptive action names
- Avoid overly complex state structures
- Export store and custom hooks for component usage

## Git Commit Messages
- Be descriptive and concise
- Use imperative mood: "Add feature" not "Added feature"
- Include feature area: "feat(arithmetic): add loading skeleton"

## Testing
- Component logic should be easily testable
- All validation schemas should have corresponding tests
- Question generation should be validated for correctness

## Performance Considerations
1. Use React.memo for heavy components if needed
2. Lazy load routes with React.lazy()
3. Minimize bundle size by tree-shaking unused code
4. Profile with React DevTools before optimization

## Accessibility
- Use semantic HTML tags
- Add ARIA labels where necessary
- Ensure keyboard navigation works throughout
- Maintain sufficient color contrast ratios
- Support screen readers

## Future Expansion
The project is structured to easily accommodate:
- New worksheet types (Tamil, Science, etc.)
- Additional math operations and difficulty levels
- User authentication and progress tracking
- Test score history and analytics
- Mobile app version

## Common Tasks

### Adding a New Feature
1. Create folder in `src/features/[feature-name]/`
2. Structure: pages, components, store, utils, types
3. Export main component from pages/
4. Add route in `App.tsx`

### Adding Form Validation
1. Create Zod schema in `src/shared/utils/validators.ts`
2. Use with React Hook Form's zodResolver
3. Display errors from form state

### Adding State
1. Create Zustand store in `features/[name]/store/`
2. Define state interface and actions
3. Use `useStore()` hook in components

### Styling Components
1. Create `.module.css` file alongside component
2. Import styles: `import styles from './Component.module.css'`
3. Apply classes: `className={styles.className}`
4. Use CSS variables for dynamic values if needed

## Dependencies
- Core: react, react-dom, react-router-dom
- Forms: react-hook-form, zod, @hookform/resolvers
- State: zustand
- No CSS framework installed - use CSS Modules

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS Grid and Flexbox for layouts
