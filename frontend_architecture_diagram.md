# Frontend Architecture Diagram

## Component Hierarchy

```mermaid
graph TD
    A[App] --> B[Header]
    A --> C[Sidebar]
    A --> D[Main Content]
    
    B --> B1[Logo]
    B --> B2[Navigation]
    B --> B3[User Menu]
    
    C --> C1[Dashboard Link]
    C --> C2[Tabular Prediction Link]
    C --> C3[ECG Analysis Link]
    C --> C4[History Link]
    C --> C5[Settings Link]
    
    D --> E[Landing Page / Dashboard]
    
    E --> E1[Hero Section]
    E --> E2[Features]
    E --> E3[How It Works]
    E --> E4[Testimonials]
    E --> E5[Call to Action]
    
    A --> F[Footer]
    
    subgraph Authenticated Flow
        A --> G[Protected Routes]
        G --> H[Dashboard Layout]
        H --> I[Quick Stats]
        H --> J[Recent Activity]
        H --> K[Prediction Modules]
        
        K --> L[Tabular Prediction]
        K --> M[ECG Analysis]
    end
    
    subgraph Prediction Components
        L --> L1[Patient Form]
        L --> L2[Results Display]
        L --> L3[Explanations]
        
        M --> M1[File Upload]
        M --> M2[Signal Visualization]
        M --> M3[Analysis Results]
    end
```

## Data Flow

```mermaid
graph LR
    A[User Interface] --> B[React State]
    B --> C[API Service]
    C --> D[Backend API]
    D --> E[Database/ML Models]
    E --> D
    D --> C
    C --> B
    B --> A
```

## Folder Structure

```mermaid
graph TB
    A[frontend/] --> B[public/]
    A --> C[src/]
    
    C --> D[components/]
    C --> E[lib/]
    C --> F[hooks/]
    C --> G[contexts/]
    C --> H[styles/]
    C --> I[services/]
    
    D --> J[ui/]
    D --> K[layout/]
    D --> L[auth/]
    D --> M[dashboard/]
    D --> N[predictions/]
    
    J --> J1[Button]
    J --> J2[Card]
    J --> J3[Input]
    J --> J4[Select]
    J --> J5[Dialog]
    J --> J6[Toast]
    
    K --> K1[Header]
    K --> K2[Sidebar]
    K --> K3[Footer]
    K --> K4[Layout]
    
    L --> L1[LoginForm]
    L --> L2[RegisterForm]
    L --> L3[AuthCard]
    
    M --> M1[DashboardStats]
    M --> M2[ActivityFeed]
    M --> M3[QuickActions]
    
    N --> N1[TabularForm]
    N --> N2[EcgUploader]
    N --> N3[ResultDisplay]
    N --> N4[Visualization]