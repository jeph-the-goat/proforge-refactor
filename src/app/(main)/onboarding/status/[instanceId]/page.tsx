'use client';

import {useCallback, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { AlertCircle, CheckCircle, Clock, Loader2, Rocket } from 'lucide-react';
import { clsx } from 'clsx';
import styles from '@/styles/onboarding/Status.module.scss';

interface ProvisioningStatus {
  success: boolean;
  instanceId: string;
  message: string;
  redirectUrl?: string;
}

interface StatusPageProps {
  params: Promise<{
    instanceId: string;
  }>;
}

function StatusPage({ params }: StatusPageProps) {
  const [status, setStatus] = useState<ProvisioningStatus | null>(null);
  const [progress, setProgress] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [instanceId, setInstanceId] = useState<string>('');
  const router = useRouter();

  // Extract instanceId from params
  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setInstanceId(resolvedParams.instanceId);
    }
    getParams();
  }, [params]);

  const fetchStatus = useCallback(async () => {
    if (!instanceId) return; // Don't fetch until we have instanceId
    
    try {
      const response = await fetch(`/api/provision/status?instanceId=${instanceId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch status');
      }

      setStatus(data);
      setError(null);

      // Update progress based on message content
      if (data.message.includes('launching')) {
        setProgress(25);
      } else if (data.message.includes('configuring')) {
        setProgress(60);
      } else if (data.message.includes('Setting up your business data')) {
        setProgress(80);
      } else if (data.message.includes('ready') || data.message.includes('complete')) {
        setProgress(100);
        // Auto-redirect to completion page after 3 seconds
        setTimeout(() => {
          router.push('/setup/complete');
        }, 3000);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [instanceId, router]);

  useEffect(() => {
    if (!instanceId) return; // Don't start polling until we have instanceId
    
    fetchStatus();
    
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchStatus, 10000);
    
    // Timer for elapsed time
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [fetchStatus, instanceId]); // Depend on instanceId

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="c-status-icon c-status-icon-loading" />;
    if (error) return <AlertCircle className="c-status-icon c-status-icon-error" />;
    if (status?.message.includes('ready') || status?.message.includes('complete')) {
      return <CheckCircle className="c-status-icon c-status-icon-success" />;
    }
    return <Rocket className="c-status-icon c-status-icon-progress" />;
  };

  return (
    <div className={clsx(styles.cStatusPage, 'c-status-page')}>
      <div className="c-status-container">
        <div className="c-status-content">
          <div className="c-status-card">
            <div className="c-status-header">
              <div className="c-status-icon-wrapper">
                {getStatusIcon()}
              </div>
              <h1 className="c-status-title">
                Setting Up Your ProForge ERP
              </h1>
              <p className="c-status-subtitle">
                {instanceId ? `Instance ID: ${instanceId}` : 'Loading...'}
              </p>
              <div className="c-status-time">
                Elapsed time: {formatTime(timeElapsed)}
              </div>
            </div>
            
            <div className="c-status-body">
              {/* Progress Section */}
              <div className="c-status-progress-section">
                <div className="c-status-progress-header">
                  <span className="c-status-progress-label">Setup Progress</span>
                  <span className="c-status-progress-percentage">{progress}%</span>
                </div>
                <div className="c-status-progress-bar">
                  <div 
                    className="c-status-progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Status Message */}
              <div className="c-status-message-section">
                {isLoading && !instanceId ? (
                  <p className="c-status-message">Loading instance information...</p>
                ) : isLoading ? (
                  <p className="c-status-message">Checking status...</p>
                ) : error ? (
                  <div className="c-status-error">
                    <p className="c-status-error-message">{error}</p>
                    <Button onClick={fetchStatus} extraClassName="c-status-retry-btn">
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div className="c-status-success">
                    <p className="c-status-success-message">
                      {status?.message}
                    </p>
                    {progress < 100 && (
                      <p className="c-status-success-description">
                        Your custom ERP system is being configured with your business settings
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Setup Steps Visualization */}
              {!error && instanceId && (
                <div className="c-status-steps">
                  <h3 className="c-status-steps-title">Setup Process</h3>
                  <div className="c-status-steps-list">
                    <div className="c-status-step c-status-step-completed">
                      <CheckCircle className="c-status-step-icon c-status-step-icon-success" />
                      <span className="c-status-step-text">Payment processed & subscription activated</span>
                    </div>
                    <div className="c-status-step c-status-step-completed">
                      <CheckCircle className="c-status-step-icon c-status-step-icon-success" />
                      <span className="c-status-step-text">Business configuration received</span>
                    </div>
                    <div className={clsx(
                      'c-status-step',
                      progress >= 25 ? 'c-status-step-completed' : 'c-status-step-active'
                    )}>
                      {progress >= 25 ? (
                        <CheckCircle className="c-status-step-icon c-status-step-icon-success" />
                      ) : (
                        <Loader2 className="c-status-step-icon c-status-step-icon-loading" />
                      )}
                      <span className="c-status-step-text">AWS EC2 instance launching</span>
                    </div>
                    <div className={clsx(
                      'c-status-step',
                      progress >= 60 ? 'c-status-step-completed' : 
                      progress >= 25 ? 'c-status-step-active' : 'c-status-step-pending'
                    )}>
                      {progress >= 60 ? (
                        <CheckCircle className="c-status-step-icon c-status-step-icon-success" />
                      ) : progress >= 25 ? (
                        <Loader2 className="c-status-step-icon c-status-step-icon-loading" />
                      ) : (
                        <Clock className="c-status-step-icon c-status-step-icon-pending" />
                      )}
                      <span className="c-status-step-text">ERPNext installation & configuration</span>
                    </div>
                    <div className={clsx(
                      'c-status-step',
                      progress >= 80 ? 'c-status-step-completed' : 
                      progress >= 60 ? 'c-status-step-active' : 'c-status-step-pending'
                    )}>
                      {progress >= 80 ? (
                        <CheckCircle className="c-status-step-icon c-status-step-icon-success" />
                      ) : progress >= 60 ? (
                        <Loader2 className="c-status-step-icon c-status-step-icon-loading" />
                      ) : (
                        <Clock className="c-status-step-icon c-status-step-icon-pending" />
                      )}
                      <span className="c-status-step-text">Loading your business data & settings</span>
                    </div>
                    <div className={clsx(
                      'c-status-step',
                      progress === 100 ? 'c-status-step-completed' : 'c-status-step-pending'
                    )}>
                      {progress === 100 ? (
                        <CheckCircle className="c-status-step-icon c-status-step-icon-success" />
                      ) : (
                        <Clock className="c-status-step-icon c-status-step-icon-pending" />
                      )}
                      <span className="c-status-step-text">Final testing & system ready!</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Estimated Time */}
              {!error && progress < 100 && instanceId && (
                <div className="c-status-estimate">
                  <p className="c-status-estimate-title">
                    ⏱️ Estimated completion time: 10-15 minutes
                  </p>
                  <p className="c-status-estimate-description">
                    You&apos;ll receive an email confirmation when your ERP system is ready
                  </p>
                </div>
              )}

              {progress === 100 && (
                <div className="c-status-complete">
                  <CheckCircle className="c-status-complete-icon" />
                  <p className="c-status-complete-title">
                    🎉 Your ERP System is Ready!
                  </p>
                  <p className="c-status-complete-description">
                    Redirecting to your dashboard...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusPage;