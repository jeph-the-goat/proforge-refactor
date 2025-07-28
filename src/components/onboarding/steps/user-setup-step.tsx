// src/components/onboarding/steps/UserSetupStep.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Plus, Trash2, UserPlus, AlertCircle } from 'lucide-react';
import { Input } from '@/components/form-elements/Input';
import { Button } from '@/components/common/Button';
import { UserSetupSchema, type UserSetup } from '@/lib/schemas/onboarding/user-setup.schema';
import { cn } from '@/lib/utils';
import styles from '@/styles/onboarding/UserSetupStep.module.scss';
import {InputSelect, Section} from "@/components";

type UserSetupStepProps = {
  data: UserSetup;
  onUpdate: (data: { userSetup: UserSetup }) => void;
};

const USER_ROLES = [
  'Administrator',
  'Manager',
  'Accountant',
  'Sales Representative',
  'Inventory Manager',
  'HR Manager',
  'Project Manager',
  'Quality Control',
  'General Staff',
] as const;

const DEFAULT_DEPARTMENTS = [
  'Executive',
  'Finance',
  'Sales',
  'Operations',
  'Human Resources',
  'IT',
  'Customer Service',
];

export function UserSetupStep({ data, onUpdate }: UserSetupStepProps) {
  const [newDepartment, setNewDepartment] = useState('');
  // Add separate state for new user form
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: ''
  });
  
  const {
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(UserSetupSchema),
    defaultValues: {
      adminUser: {
        name: data.adminUser?.name || '',
        email: data.adminUser?.email || '',
      },
      additionalUsers: data.additionalUsers || [],
      departments: data.departments?.length > 0 ? data.departments : [],
      permissions: data.permissions || {},
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalUsers',
  });

  // Watch for changes and update parent
  useEffect(() => {
    const subscription = watch((value) => {
      // Ensure permissions is always included in the update
      const updateData = {
        ...value,
        permissions: value.permissions || {},
      } as UserSetup;
      
      onUpdate({ userSetup: updateData });
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  const addDepartment = (): void => {
    const watchedDepartments = watch('departments') || [];
    if (newDepartment && !watchedDepartments.includes(newDepartment)) {
      setValue('departments', [...watchedDepartments, newDepartment]);
      setNewDepartment('');
    }
  };

  const removeDepartment = (department: string | undefined): void => {
    const watchedDepartments = watch('departments') || [];
    setValue('departments', watchedDepartments.filter((d) => d !== department));
  };

  const handleToggleDepartment = (department: string) => {
    const watchedDepartments = watch('departments') || [];
    if (watchedDepartments.includes(department)) {
      setValue('departments', watchedDepartments.filter((d) => d !== department));
    } else {
      setValue('departments', [...watchedDepartments, department]);
    }
  };

  const getInitials = (name: string | undefined): string => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const customDepartments = (watch('departments') || []).filter(
    (dept) => dept && !DEFAULT_DEPARTMENTS.includes(dept)
  );

  const handleAddUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (newUser.name && newUser.email && newUser.role) {
      append({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      });
      
      // Reset the form
      setNewUser({
        name: '',
        email: '',
        role: ''
      });
    }
  };

  return (
    <div className={cn(styles.cUserSetupStep, "c-user-setup-step")}>
      <Section
        title="User Setup"
        paragraph="Configure your team members and organizational structure."
      >
      </Section>

      <div className="c-onboarding-content-inner c-user-setup-step-content">
        {/* Admin User Setup */}
        <section className="c-onboarding-section">
          <h3 className="c-section-title">Administrator Account</h3>
          <Controller
            name="adminUser.name"
            control={control}
            render={({field}) => (
              <Input
                type="text"
                name={field.name}
                labelText="Full Name"
                placeholder="Your full name"
                value={field.value}
                onChange={field.onChange}
                hasErrors={!!errors.adminUser?.name}
                errorText={errors.adminUser?.name?.message}
              />
            )}
          />
          <Controller
            name="adminUser.email"
            control={control}
            render={({field}) => (
              <Input
                type="email"
                name={field.name}
                labelText="Email Address"
                placeholder="your.email@company.com"
                value={field.value}
                onChange={field.onChange}
                hasErrors={!!errors.adminUser?.email}
                errorText={errors.adminUser?.email?.message}
              />
            )}
          />
        </section>

        {/* Additional Users */}
        <section className="c-onboarding-section c-additional-users-section">
          <h3 className="c-section-title">Additional Users</h3>
          {/* Add User Form */}
          <form onSubmit={(e) => handleAddUser(e)}>
            <div className="c-additional-users-form-grid">
              <Input
                type="text"
                name="newUserName"
                labelText="Full Name"
                placeholder="Jane Smith"
                value={newUser.name}
                required
                onChange={(e) => setNewUser(prev => ({ ...prev, name: (e.target as HTMLInputElement).value }))}
              />
              <Input
                type="email"
                name="newUserEmail"
                labelText="Email Address"
                placeholder="user@company.com"
                value={newUser.email}
                required
                onChange={(e) => setNewUser(prev => ({ ...prev, email: (e.target as HTMLInputElement).value }))}
              />
              <InputSelect
                name="newUserRole"
                labelText="Role"
                placeholder="Select role"
                options={USER_ROLES.map((role) => ({
                  value: role, 
                  label: role
                }))}
                value={newUser.role}
                onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}
              />
            </div>
            <Button
              type="submit"
              btnText="Add User"
              icon={<UserPlus />}
              disabled={!newUser.name || !newUser.email || !newUser.role}
              extraClassName="c-add-btn"
            />
          </form>

            {/* Additional Users List */}
            {fields.length > 0 && (
              <ul className="c-additional-users-list">
                {fields.map((field, index) => (
                  <li key={field.id} className="c-additional-users-list-item">
                    <div className="c-additional-users-list-item-info">
                      <div className="c-additional-users-list-item-avatar">
                        {getInitials(field.name || '')}
                      </div>
                      <div className="c-additional-users-list-item-text">
                        <h4>{field.name}</h4>
                        <div className="c-additional-users-list-item-details">
                          <span className="c-email">{field.email}</span>
                          <span className="c-role">{field.role}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      icon={<Trash2/>}
                        onClick={() => remove(index)}
                      extraClassName="c-trash-btn"
                        title="Remove user"
                      >
                    </Button>
                  </li>
                ))}
              </ul>
            )}
        </section>

        {/* Department Structure */}
        <section className="c-onboarding-section c-departments-section">
          <h3 className="c-section-title">Department Structure</h3>
            {/* Default Departments */}
            <div className="c-departments-grid">
              {DEFAULT_DEPARTMENTS.map((dept) => {
                const isSelected = (watch('departments') || []).includes(dept);
                return (
                  <div
                    key={dept}
                    className={cn(
                      "c-department-item",
                      isSelected && "is-selected"
                    )}
                    onClick={() => handleToggleDepartment(dept)}
                  >
                    <span className="c-department-name">{dept}</span>
                  </div>
                );
              })}
            </div>

            {/* Custom Department Form */}
          <div className="c-custom-department-section">
              <Input
                type="text"
                name="newDepartment"
                labelText="Custom Department Name"
                placeholder="Enter custom department name"
                value={newDepartment}
                onChange={(e) => setNewDepartment((e.target as HTMLInputElement).value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addDepartment();
                  }
                }}
              />
              <Button
                btnText="Add Department"
                icon={<Plus />}
                onClick={addDepartment}
                disabled={!newDepartment}
                extraClassName="c-add-btn"
              />

            {/* Custom Departments List */}
            {customDepartments.length > 0 && (
              <ol className="c-custom-departments-list">
                {customDepartments.map((dept) => (
                  <li key={dept} className="c-custom-department-list-item">
                    <span>{dept}</span>
                    <Button
                      icon={<Trash2/>}
                      onClick={() => removeDepartment(dept)}
                      title="Remove department"
                      extraClassName="c-trash-btn"
                    >
                    </Button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      </div>

      {/* Validation Errors */}
      {errors.root && (
        <div className="c-alert">
          <AlertCircle />
          <p>{errors.root.message}</p>
        </div>
      )}
    </div>
  );
}