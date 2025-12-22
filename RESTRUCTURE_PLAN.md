# Project Restructure Plan

## Current Analysis

### FE Folder (Target Structure)

- ✅ TypeScript-based architecture
- ✅ Modular structure with modules/ (auth, audit, files, sales, etc.)
- ✅ Clean routing with AppShell and ModuleRegistry
- ✅ Shared components (UI, API, types, utils)
- ✅ React Query integration
- ⚠️ Basic UI components only
- ⚠️ Missing module implementations

### SSR_FE Folder (UI Source)

- ✅ Complete UI modules (Dashboard, Production, Warehouse, Sales, Finance, HR, System, Shipping)
- ✅ Layout system (Header, Sidebar)
- ✅ Theme context and dark mode
- ✅ Styled components and SCSS
- ✅ Comprehensive styling
- ❌ JavaScript only (not TypeScript)
- ❌ Different architecture pattern

## Restructure Plan

### Phase 1: Preserve FE Structure & Add Dependencies

- [ ] Update FE package.json with missing dependencies from SSR_FE
- [ ] Add styled-components, fontawesome, react-datepicker
- [ ] Install SCSS support and other missing packages

### Phase 2: Migrate UI Components to FE Structure

- [ ] Move Dashboard component from SSR_FE to FE modules
- [ ] Move module components (Production, Warehouse, Sales, Finance, HR, System, Shipping)
- [ ] Adapt components to TypeScript
- [ ] Update import paths and references

### Phase 3: Integrate Layout System

- [ ] Merge Header/Sidebar from SSR_FE into FE shared/ui
- [ ] Update AppShell to use new layout system
- [ ] Integrate theme context and dark mode functionality
- [ ] Add routing for new modules

### Phase 4: Update Styling Architecture

- [ ] Migrate SCSS structure from SSR_FE
- [ ] Update component styling to use shared styles
- [ ] Ensure responsive design and theme switching

### Phase 5: Complete Interface

- [ ] Connect modules to existing API structure
- [ ] Add proper data integration with React Query
- [ ] Implement navigation and module switching
- [ ] Add missing page implementations

### Phase 6: Testing & Optimization

- [ ] Test all modules and navigation
- [ ] Verify theme switching works
- [ ] Check responsive design
- [ ] Optimize performance

## Expected Result

A TypeScript-based React application with:

- Complete modular architecture from FE folder
- Full UI modules from SSR_FE folder
- Modern styling with theme support
- Proper routing and navigation
- Integrated API layer with React Query
