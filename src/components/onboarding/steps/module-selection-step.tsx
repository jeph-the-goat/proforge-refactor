// src/components/onboarding/steps/ModuleSelectionStep.tsx
'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Check, Zap, Calendar, BarChart3, Truck, Bot, ShoppingCart } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Switch } from '@/components/form-elements/Switch';
import { cn } from '@/lib/utils';
import { ModuleSelectionSchema, type ModuleSelection } from '@/lib/schemas/onboarding/module-selection.schema';
import {StepContentSection} from "@/components/onboarding/StepContentSection";
import {Subsection} from "@/components/form-elements/Subsection";
import styles from '@/styles/onboarding/steps/ModuleSelectionStep.module.scss';

interface ModuleSelectionStepProps {
  data: ModuleSelection;
  onUpdate: (data: { moduleSelection: ModuleSelection }) => void;
}

interface Module {
  id: keyof ModuleSelection | 'accounting';
  name: string;
  description: string;
  icon: LucideIcon;
  required?: boolean;
  price?: number;
  category?: 'core' | 'standard' | 'commerce' | 'ai';
}

const MODULES: Module[] = [
  {
    id: 'accounting',
    name: 'Accounting',
    description: 'Core financial management and accounting features',
    icon: BarChart3,
    required: true,
    category: 'core',
  },
  {
    id: 'inventory',
    name: 'Inventory Management',
    description: 'Track stock levels, movements, and valuations',
    icon: Check,
    price: 10,
    category: 'standard',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Production planning, BOM management, and work orders',
    icon: Zap,
    price: 25,
    category: 'standard',
  },
  {
    id: 'hrPayroll',
    name: 'HR & Payroll',
    description: 'Employee management, payroll, and benefits administration',
    icon: Bot,
    price: 20,
    category: 'standard',
  },
  {
    id: 'crm',
    name: 'CRM',
    description: 'Customer relationship management and sales pipeline',
    icon: Check,
    price: 15,
    category: 'standard',
  },
  {
    id: 'projectManagement',
    name: 'Project Management',
    description: 'Project planning, tracking, and resource allocation',
    icon: Zap,
    price: 20,
    category: 'standard',
  },
  {
    id: 'assetManagement',
    name: 'Asset Management',
    description: 'Track and manage company assets and maintenance',
    icon: Bot,
    price: 15,
    category: 'standard',
  },
  {
    id: 'qualityManagement',
    name: 'Quality Management',
    description: 'Quality control processes and compliance tracking',
    icon: Check,
    price: 20,
    category: 'standard',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online store integration and management',
    icon: ShoppingCart,
    price: 30,
    category: 'commerce',
  },
  {
    id: 'pointOfSale',
    name: 'Point of Sale',
    description: 'In-store sales and payment processing',
    icon: Check,
    price: 25,
    category: 'commerce',
  },
  {
    id: 'aiFleet',
    name: 'AI Fleet Management',
    description: 'Advanced AI-powered fleet tracking and optimization',
    icon: Truck,
    price: 50,
    category: 'ai',
  },
  {
    id: 'serviceScheduling',
    name: 'Service Scheduling',
    description: 'Intelligent service dispatch and scheduling system',
    icon: Calendar,
    price: 40,
    category: 'ai',
  },
  {
    id: 'aiAnalytics',
    name: 'AI Analytics',
    description: 'Comprehensive AI-driven business analytics platform',
    icon: Zap,
    price: 60,
    category: 'ai',
  },
];

export function ModuleSelectionStep({ data, onUpdate }: ModuleSelectionStepProps) {
  const {
    control,
    watch
  } = useForm<ModuleSelection>({
    resolver: yupResolver(ModuleSelectionSchema),
    defaultValues: data,
    mode: 'onChange',
  });

  // Watch all values for real-time updates
  const watchedValues = watch();

  // Calculate total price
  const totalPrice = MODULES.reduce((total, module) => {
    if (module.id === 'accounting' || !module.price) return total;
    if (watchedValues[module.id as keyof ModuleSelection]) {
      return total + module.price;
    }
    return total;
  }, 0);

  // Count selected modules
  const selectedCount = Object.values(watchedValues).filter(Boolean).length;

  // Update parent on changes
  useEffect(() => {
    const subscription = watch((value) => {
      onUpdate({ moduleSelection: value as ModuleSelection });
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  // Group modules by category
  const modulesByCategory = {
    standard: MODULES.filter(m => m.category === 'standard'),
    commerce: MODULES.filter(m => m.category === 'commerce'),
    ai: MODULES.filter(m => m.category === 'ai'),
  };

  const renderModule = (module: Module) => {
    const isSelected = module.required || watchedValues[module.id as keyof ModuleSelection];
    const Icon = module.icon;

    return (
      <div
        key={module.id}
        className={cn(
          "c-module-card",
          isSelected && "is-selected",
          module.required && "is-required"
        )}
      >
        <div className="c-module-card-header">
          <div className="c-module-card-info">
            <div className="c-module-card-icon">
              <Icon />
            </div>
            <div className="c-module-card-text">
              <h4>{module.name}</h4>
              {module.required ? (
                <p className="c-module-card-required">Required</p>
              ) : (
                <p className="c-module-card-price">${module.price}/user/month</p>
              )}
            </div>
          </div>
          
          {!module.required && (
            <div className="c-module-card-switch">
              <Controller
                name={module.id as keyof ModuleSelection}
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          )}
        </div>
        
        <p className="c-module-card-description">{module.description}</p>
      </div>
    );
  };

  return (
    <StepContentSection extraClassName={cn(styles.cModuleSelectionStep, "c-module-selection-step")}>
      <Subsection
      noTitle
      >
        <div className="c-module-selection-summary-hero">
          <div className="c-module-selection-summary-hero-title">
            <h3 className="c-module-selection-summary-hero-title-count">
              {selectedCount} {" "}
              <span>Modules Selected</span>
            </h3>
            <p>Core accounting module is included by default</p>
          </div>
          {totalPrice > 0 && (
            <div className="c-module-selection-summary-hero-price">
              <div className="c-price">
                ${totalPrice}
                <span className="c-price-period">/user/month</span>
              </div>
              <p className="c-price-label">Additional modules cost</p>
            </div>
          )}
        </div>
      </Subsection>

      <Subsection
        title="Core Module"
        extraClassName="c-module-category">
          <div className="c-module-grid single-column">
            {MODULES.filter(m => m.category === 'core').map(renderModule)}
          </div>
      </Subsection>

      <Subsection
        title="Standard Modules"
        extraClassName="c-module-category">
          <div className="c-module-grid">
            {modulesByCategory.standard.map(renderModule)}
          </div>
      </Subsection>

      <Subsection
        title="Commerce Modules"
        extraClassName="c-module-category">
          <div className="c-module-grid">
            {modulesByCategory.commerce.map(renderModule)}
          </div>
      </Subsection>

      <Subsection
        title="AI-Powered Modules"
        last
        extraClassName="c-module-category">
          <div className="c-module-grid">
            {modulesByCategory.ai.map(renderModule)}
          </div>
      </Subsection>
    </StepContentSection>
  );
}