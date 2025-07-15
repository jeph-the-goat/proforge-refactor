'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, Loader2, Rocket } from 'lucide-react';

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

export default function StatusPage({ params }: StatusPageProps) {
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

  const fetchStatus = async () => {
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
  };

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
  }, [instanceId]); // Depend on instanceId

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="h-8 w-8 animate-spin text-blue-500" />;
    if (error) return <AlertCircle className="h-8 w-8 text-red-500" />;
    if (status?.message.includes('ready') || status?.message.includes('complete')) {
      return <CheckCircle className="h-8 w-8 text-green-500" />;
    }
    return <Rocket className="h-8 w-8 text-primary animate-pulse" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-6 p-4 rounded-full bg-primary/10">
                {getStatusIcon()}
              </div>
              <CardTitle className="text-3xl font-bold mb-2">
                Setting Up Your ProForge ERP
              </CardTitle>
              <CardDescription className="text-lg">
                {instanceId ? `Instance ID: ${instanceId}` : 'Loading...'}
              </CardDescription>
              <div className="text-sm text-muted-foreground mt-2">
                Elapsed time: {formatTime(timeElapsed)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Progress Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Setup Progress</span>
                  <span className="text-2xl font-bold text-primary">{progress}%</span>
                </div>
                <Progress value={progress} className="h-4" />
              </div>

              {/* Status Message */}
              <div className="text-center py-6">
                {isLoading && !instanceId ? (
                  <p className="text-xl text-gray-600">Loading instance information...</p>
                ) : isLoading ? (
                  <p className="text-xl text-gray-600">Checking status...</p>
                ) : error ? (
                  <div className="space-y-4">
                    <p className="text-xl text-red-600">{error}</p>
                    <Button onClick={fetchStatus} variant="outline" size="lg">
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-primary">
                      {status?.message}
                    </p>
                    {progress < 100 && (
                      <p className="text-sm text-muted-foreground">
                        Your custom ERP system is being configured with your business settings
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Setup Steps Visualization */}
              {!error && instanceId && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 text-center">Setup Process</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Payment processed & subscription activated</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Business configuration received</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {progress >= 25 ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      )}
                      <span className="text-sm">AWS EC2 instance launching</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {progress >= 60 ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : progress >= 25 ? (
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-sm">ERPNext installation & configuration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {progress >= 80 ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : progress >= 60 ? (
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-sm">Loading your business data & settings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {progress === 100 ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-sm">Final testing & system ready!</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Estimated Time */}
              {!error && progress < 100 && instanceId && (
                <div className="text-center bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                  <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                    ⏱️ Estimated completion time: 10-15 minutes
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    You&apos;ll receive an email confirmation when your ERP system is ready
                  </p>
                </div>
              )}

              {progress === 100 && (
                <div className="text-center bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                    🎉 Your ERP System is Ready!
                  </p>
                  <p className="text-green-700 dark:text-green-300">
                    Redirecting to your dashboard...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}