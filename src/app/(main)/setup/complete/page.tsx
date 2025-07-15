'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { useRouter } from 'next/navigation';

export default function SetupCompletePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const router = useRouter();

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Celebratory background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header Celebration */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3 mb-6">
              <Sparkles className="h-5 w-5 text-emerald-500 animate-pulse" />
              <span className="font-medium text-emerald-700 dark:text-emerald-300">Deployment Complete</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                🚀 Welcome to Your ProForge ERP!
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
              Your enterprise ERP system has been successfully forged and is ready for action. 
              Time to transform your business operations!
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Deployed in {systemInfo.setupTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Enterprise Security Enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-purple-500" />
                <span>Business Ready</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* System Access Card */}
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <ExternalLink className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Your ERP System Access</CardTitle>
                    <CardDescription>Login credentials for your new system</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* System URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">System URL</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <code className="flex-1 text-sm font-mono text-blue-600 dark:text-blue-400">
                      {systemInfo.url}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(systemInfo.url, 'url')}
                      className="h-8 w-8 p-0"
                    >
                      {copiedField === 'url' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Admin Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin Email</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <code className="flex-1 text-sm font-mono">
                      {systemInfo.adminEmail}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(systemInfo.adminEmail, 'email')}
                      className="h-8 w-8 p-0"
                    >
                      {copiedField === 'email' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Admin Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Temporary Password</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <code className="flex-1 text-sm font-mono">
                      {systemInfo.adminPassword}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(systemInfo.adminPassword, 'password')}
                      className="h-8 w-8 p-0"
                    >
                      {copiedField === 'password' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    ⚠️ Please change this password after your first login
                  </p>
                </div>

                {/* Launch Button */}
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
                  onClick={() => window.open(systemInfo.url, '_blank')}
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Launch Your ERP System
                </Button>
              </CardContent>
            </Card>

            {/* System Info Card */}
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Settings className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">System Information</CardTitle>
                    <CardDescription>Technical details about your deployment</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Instance ID</label>
                    <p className="text-sm font-mono mt-1">{systemInfo.instanceId}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Region</label>
                    <p className="text-sm mt-1">{systemInfo.region}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Setup Time</label>
                    <p className="text-sm mt-1">{systemInfo.setupTime}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
                    <Badge variant="secondary" className="mt-1 bg-emerald-100 text-emerald-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Included Features</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
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
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Here&apos;s how to make the most of your new ProForge ERP system
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nextSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className={`text-center p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                      step.primary 
                        ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20' 
                        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
                    }`}>
                      <div className={`mx-auto mb-4 p-3 rounded-full w-fit ${
                        step.primary 
                          ? 'bg-emerald-500/10 text-emerald-600' 
                          : 'bg-gray-500/10 text-gray-600'
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {step.description}
                      </p>
                      <Button 
                        size="sm" 
                        variant={step.primary ? "default" : "outline"}
                        className={step.primary ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                      >
                        {step.action}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Need Help Getting Started?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our success team is here to help you make the most of your ProForge ERP system
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}