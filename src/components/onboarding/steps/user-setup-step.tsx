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
      <div className="c-user-setup-step-header">
        <h2 className="h2">User Setup</h2>
        <p>Configure your team members and organizational structure.</p>
      </div>

      <div className="c-user-setup-step-content">
        {/* Admin User Setup */}
        <div className="c-user-setup-section">
          <h3 className="c-user-setup-section-title">Administrator Account</h3>
          <div className="c-user-setup-section-content">
            <div className="c-admin-user-form">
              <div className="c-form-grid">
                <Controller
                  name="adminUser.name"
                  control={control}
                  render={({ field }) => (
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
                  render={({ field }) => (
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
              </div>
            </div>
          </div>
        </div>

        {/* Additional Users */}
        <div className="c-user-setup-section">
          <h3 className="c-user-setup-section-title">Additional Users</h3>
          <div className="c-user-setup-section-content">
            <div className="c-additional-users-section">
              {/* Add User Form */}
              <form onSubmit={handleAddUser} className="c-additional-users-form">
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
                  <div className="c-select-wrapper">
                    <label htmlFor="newUserRole" className="c-form-label">Role</label>
                    <select
                      id="newUserRole"
                      name="newUserRole"
                      className="c-select"
                      required
                    >
                      <option value="">Select role</option>
                      {USER_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <Button
                  type="submit"
                  btnText="Add User"
                  icon={<UserPlus />}
                  extraClassName="c-additional-users-form-button"
                />
              </form>

              {/* Additional Users List */}
              {fields.length > 0 && (
                <div className="c-additional-users-list">
                  {fields.map((field, index) => (
                    <div key={field.id} className="c-additional-users-list-item">
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Department Structure */}
        <div className="c-user-setup-section">
          <h3 className="c-user-setup-section-title">Department Structure</h3>
          <div className="c-user-setup-section-content">
            <div className="c-departments-section">
              {/* Default Departments */}
              <div className="c-departments-grid">
                {DEFAULT_DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    type="button"
                    className={cn(
                      "c-department-button",
                      (watch('departments') || []).includes(dept) && "is-selected"
                    )}
                    onClick={() => handleToggleDepartment(dept)}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Custom Department Form */}
              <div className="c-custom-department-form">
                <Input
                  type="text"
                  name="newDepartment"
                  labelText="Department Name"
                  placeholder="Enter department name"
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
            </div>
          </div>
        </div>
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