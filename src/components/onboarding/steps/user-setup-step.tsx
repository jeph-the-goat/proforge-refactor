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

  const addDepartment = () => {
    const watchedDepartments = watch('departments') || [];
    if (newDepartment && !watchedDepartments.includes(newDepartment)) {
      setValue('departments', [...watchedDepartments, newDepartment]);
      setNewDepartment('');
    }
  };

  const handleRemoveDepartment = (department: string) => {
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
    const formData = new FormData(event.currentTarget);
    const newUser = {
      name: formData.get('newUserName') as string,
      email: formData.get('newUserEmail') as string,
      role: formData.get('newUserRole') as string,
    };

    if (newUser.name && newUser.email && newUser.role) {
      append(newUser);
      event.currentTarget.reset();
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
          <h3>Administrator Account</h3>
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
          <h3>Additional Users</h3>
          {/* Add User Form */}
          <form onSubmit={(e) => handleAddUser(e)}>
            <div className="c-additional-users-form-grid">
              <Input
                type="text"
                name="newUserName"
                labelText="Full Name"
                placeholder="Jane Smith"
                required
              />
              <Input
                type="email"
                name="newUserEmail"
                labelText="Email Address"
                placeholder="user@company.com"
                required
              />
              <Controller
                name="additionalUsers.0.role"
                control={control}
                render={({field}) => (
                  <InputSelect
                    name="newUserRole"
                    labelText="Role"
                    placeholder="Select distribution method"
                    options={USER_ROLES.map((role) => {
                      return {value: role, label: role}
                    })}
                    value={field.value || ''}
                    onValueChange={field.onChange}
                  >
                  </InputSelect>
                )}/>
            </div>
            <Button
              type="submit"
              btnText="Add User"
              icon={<UserPlus />}
              extraClassName="c-add-user-btn"
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
                    <div className="c-additional-users-list-item-actions">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="c-remove-user-button"
                        title="Remove user"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </section>

        {/* Department Structure */}
        <section className="c-onboarding-section c-departments-section">
          <h3>Department Structure</h3>
            {/* Default Departments */}
            <div className="c-departments-grid">
              {DEFAULT_DEPARTMENTS.map((dept) => (
                <Button
                  key={dept}
                  className={cn(
                    "c-department-button",
                    (watch('departments') || []).includes(dept) && "is-selected"
                  )}
                  onClick={() => handleToggleDepartment(dept)}
                >
                  {dept}
                </Button>
              ))}
            </div>

            {/* Custom Department Form */}
            <div className="c-custom-department-form">
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
                extraClassName="c-user-setup-department-input"
              />
              <Button
                btnText="Add"
                icon={<Plus />}
                btnVariant="icon"
                onClick={addDepartment}
                disabled={!newDepartment}
                extraClassName="c-custom-department-button"
              />
            </div>

            {/* Custom Departments List */}
            {customDepartments.length > 0 && (
              <div className="c-custom-departments-list">
                {customDepartments.map((dept) => (
                  <div key={dept} className="c-custom-departments-list-item">
                    <span>{dept}</span>
                    <button
                      type="button"
                      className="c-department-remove"
                      onClick={() => handleRemoveDepartment(dept || '')}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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