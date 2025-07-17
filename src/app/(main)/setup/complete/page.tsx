'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  Mail, 
  Shield, 
  BookOpen,
  Users,
  Settings,
  Sparkles,
  Rocket,
  Building2
} from 'lucide-react';
import { clsx } from 'clsx';
import styles from '@/styles/setup/complete.module.scss';

export default function SetupCompletePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Mock data - in real implementation, this would come from API/database
  const systemInfo = {
    url: 'https://your-company.proforge-erp.com',
    adminEmail: 'admin@your-company.com',
    adminPassword: 'ProForge2024!',
    instanceId: 'i-0123456789abcdef0',
    region: 'US East (N. Virginia)',
    setupTime: '12 minutes',
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const nextSteps = [
    {
      icon: ExternalLink,
      title: 'Access Your ERP System',
      description: 'Log in to your new ProForge ERP system and explore',
      action: 'Open ERP',
      primary: true,
    },
    {
      icon: Users,
      title: 'Invite Your Team',
      description: 'Add team members and set up user permissions',
      action: 'Manage Users',
    },
    {
      icon: Settings,
      title: 'Configure Settings',
      description: 'Customize modules and business processes',
      action: 'Settings',
    },
    {
      icon: BookOpen,
      title: 'Learn & Training',
      description: 'Access tutorials and best practices',
      action: 'Documentation',
    },
  ];

  return (
    <div className={clsx(styles.cSetupComplete, 'c-setup-complete')}>
      {/* Celebratory background elements */}
      <div className="c-setup-complete-bg">
        <div className="c-setup-complete-bg-element c-setup-complete-bg-element-1"></div>
        <div className="c-setup-complete-bg-element c-setup-complete-bg-element-2"></div>
        <div className="c-setup-complete-bg-element c-setup-complete-bg-element-3"></div>
      </div>

      <div className="c-setup-complete-container">
        <div className="c-setup-complete-content">
          {/* Header Celebration */}
          <div className="c-setup-complete-header">
            <div className="c-setup-complete-badge">
              <Sparkles className="c-setup-complete-badge-icon" />
              <span className="c-setup-complete-badge-text">Deployment Complete</span>
            </div>
            
            <h1 className="c-setup-complete-title">
              <span className="c-setup-complete-title-gradient">
                🚀 Welcome to Your ProForge ERP!
              </span>
            </h1>
            
            <p className="c-setup-complete-description">
              Your enterprise ERP system has been successfully forged and is ready for action. 
              Time to transform your business operations!
            </p>

            <div className="c-setup-complete-stats">
              <div className="c-setup-complete-stat">
                <CheckCircle className="c-setup-complete-stat-icon c-setup-complete-stat-icon-success" />
                <span>Deployed in {systemInfo.setupTime}</span>
              </div>
              <div className="c-setup-complete-stat">
                <Shield className="c-setup-complete-stat-icon c-setup-complete-stat-icon-security" />
                <span>Enterprise Security Enabled</span>
              </div>
              <div className="c-setup-complete-stat">
                <Building2 className="c-setup-complete-stat-icon c-setup-complete-stat-icon-business" />
                <span>Business Ready</span>
              </div>
            </div>
          </div>

          <div className="c-setup-complete-cards">
            {/* System Access Card */}
            <div className="c-setup-complete-card">
              <div className="c-setup-complete-card-header">
                <div className="c-setup-complete-card-icon-wrapper c-setup-complete-card-icon-wrapper-access">
                  <ExternalLink className="c-setup-complete-card-icon" />
                </div>
                <div className="c-setup-complete-card-header-text">
                  <h3 className="c-setup-complete-card-title">Your ERP System Access</h3>
                  <p className="c-setup-complete-card-description">Login credentials for your new system</p>
                </div>
              </div>
              
              <div className="c-setup-complete-card-content">
                {/* System URL */}
                <div className="c-setup-complete-credential">
                  <label className="c-setup-complete-credential-label">System URL</label>
                  <div className="c-setup-complete-credential-field">
                    <code className="c-setup-complete-credential-value c-setup-complete-credential-value-url">
                      {systemInfo.url}
                    </code>
                    <Button
                      onClick={() => copyToClipboard(systemInfo.url, 'url')}
                      className="c-setup-complete-copy-btn"
                    >
                      {copiedField === 'url' ? (
                        <CheckCircle className="c-setup-complete-copy-icon c-setup-complete-copy-icon-success" />
                      ) : (
                        <Copy className="c-setup-complete-copy-icon" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Admin Email */}
                <div className="c-setup-complete-credential">
                  <label className="c-setup-complete-credential-label">Admin Email</label>
                  <div className="c-setup-complete-credential-field">
                    <code className="c-setup-complete-credential-value">
                      {systemInfo.adminEmail}
                    </code>
                    <Button
                      onClick={() => copyToClipboard(systemInfo.adminEmail, 'email')}
                      className="c-setup-complete-copy-btn"
                    >
                      {copiedField === 'email' ? (
                        <CheckCircle className="c-setup-complete-copy-icon c-setup-complete-copy-icon-success" />
                      ) : (
                        <Copy className="c-setup-complete-copy-icon" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Admin Password */}
                <div className="c-setup-complete-credential">
                  <label className="c-setup-complete-credential-label">Temporary Password</label>
                  <div className="c-setup-complete-credential-field">
                    <code className="c-setup-complete-credential-value">
                      {systemInfo.adminPassword}
                    </code>
                    <Button
                      onClick={() => copyToClipboard(systemInfo.adminPassword, 'password')}
                      className="c-setup-complete-copy-btn"
                    >
                      {copiedField === 'password' ? (
                        <CheckCircle className="c-setup-complete-copy-icon c-setup-complete-copy-icon-success" />
                      ) : (
                        <Copy className="c-setup-complete-copy-icon" />
                      )}
                    </Button>
                  </div>
                  <p className="c-setup-complete-credential-warning">
                    ⚠️ Please change this password after your first login
                  </p>
                </div>

                {/* Launch Button */}
                <Button
                  className="c-setup-complete-launch-btn"
                  onClick={() => window.open(systemInfo.url, '_blank')}
                >
                  <Rocket className="c-setup-complete-launch-icon" />
                  Launch Your ERP System
                </Button>
              </div>
            </div>

            {/* System Info Card */}
            <div className="c-setup-complete-card">
              <div className="c-setup-complete-card-header">
                <div className="c-setup-complete-card-icon-wrapper c-setup-complete-card-icon-wrapper-info">
                  <Settings className="c-setup-complete-card-icon" />
                </div>
                <div className="c-setup-complete-card-header-text">
                  <h3 className="c-setup-complete-card-title">System Information</h3>
                  <p className="c-setup-complete-card-description">Technical details about your deployment</p>
                </div>
              </div>
              
              <div className="c-setup-complete-card-content">
                <div className="c-setup-complete-info-grid">
                  <div className="c-setup-complete-info-item">
                    <label className="c-setup-complete-info-label">Instance ID</label>
                    <p className="c-setup-complete-info-value c-setup-complete-info-value-mono">{systemInfo.instanceId}</p>
                  </div>
                  <div className="c-setup-complete-info-item">
                    <label className="c-setup-complete-info-label">Region</label>
                    <p className="c-setup-complete-info-value">{systemInfo.region}</p>
                  </div>
                  <div className="c-setup-complete-info-item">
                    <label className="c-setup-complete-info-label">Setup Time</label>
                    <p className="c-setup-complete-info-value">{systemInfo.setupTime}</p>
                  </div>
                  <div className="c-setup-complete-info-item">
                    <label className="c-setup-complete-info-label">Status</label>
                    <div className="c-setup-complete-status-badge">
                      <CheckCircle className="c-setup-complete-status-icon" />
                      Live
                    </div>
                  </div>
                </div>

                <div className="c-setup-complete-features">
                  <h4 className="c-setup-complete-features-title">Included Features</h4>
                  <div className="c-setup-complete-features-grid">
                    {[
                      'CRM & Sales',
                      'Inventory Management', 
                      'Financial Accounting',
                      'HR & Payroll',
                      'Project Management',
                      'Manufacturing',
                      'E-commerce Integration',
                      'Reporting & Analytics'
                    ].map((feature, index) => (
                      <div key={index} className="c-setup-complete-feature">
                        <CheckCircle className="c-setup-complete-feature-icon" />
                        <span className="c-setup-complete-feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="c-setup-complete-card c-setup-complete-card-next-steps">
            <div className="c-setup-complete-card-header c-setup-complete-card-header-center">
              <div className="c-setup-complete-card-header-text">
                <h3 className="c-setup-complete-card-title c-setup-complete-card-title-large">Ready to Get Started?</h3>
                <p className="c-setup-complete-card-description c-setup-complete-card-description-large">
                  Here&apos;s how to make the most of your new ProForge ERP system
                </p>
              </div>
            </div>
            
            <div className="c-setup-complete-card-content">
              <div className="c-setup-complete-steps">
                {nextSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className={clsx(
                      'c-setup-complete-step',
                      step.primary && 'c-setup-complete-step-primary'
                    )}>
                      <div className={clsx(
                        'c-setup-complete-step-icon-wrapper',
                        step.primary && 'c-setup-complete-step-icon-wrapper-primary'
                      )}>
                        <Icon className="c-setup-complete-step-icon" />
                      </div>
                      <h4 className="c-setup-complete-step-title">{step.title}</h4>
                      <p className="c-setup-complete-step-description">
                        {step.description}
                      </p>
                      <Button
                        className={clsx(
                          'c-setup-complete-step-btn',
                          step.primary && 'c-setup-complete-step-btn-primary'
                        )}
                      >
                        {step.action}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="c-setup-complete-support">
            <h3 className="c-setup-complete-support-title">Need Help Getting Started?</h3>
            <p className="c-setup-complete-support-description">
              Our success team is here to help you make the most of your ProForge ERP system
            </p>
            <div className="c-setup-complete-support-actions">
              <Button className="c-setup-complete-support-btn">
                <Mail className="c-setup-complete-support-btn-icon" />
                Contact Support
              </Button>
              <Button className="c-setup-complete-support-btn">
                <BookOpen className="c-setup-complete-support-btn-icon" />
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}