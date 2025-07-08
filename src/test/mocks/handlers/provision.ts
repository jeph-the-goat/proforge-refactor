import { http, HttpResponse } from "msw";

// Generate mock instance IDs
const generateInstanceId = () => `i-${Math.random().toString(36).substring(2, 17)}`;

// Mock ProForge provisioning API endpoints
export const provisionHandlers = [
  // Mock POST /api/provision/start
  http.post("/api/provision/start", async ({ request }) => {
    const body = await request.json();
    const instanceId = generateInstanceId();
    
    return HttpResponse.json({
      success: true,
      instanceId,
      status: "initializing",
      message: "Provisioning started successfully",
      data: {
        awsInstanceId: instanceId,
        region: "us-east-1",
        instanceType: "t3.medium",
        estimatedTime: "15 minutes",
      },
    }, { status: 201 });
  }),

  // Mock GET /api/provision/status
  http.get("/api/provision/status", async ({ request }) => {
    const url = new URL(request.url);
    const instanceId = url.searchParams.get("instanceId");
    
    if (!instanceId) {
      return HttpResponse.json({
        success: false,
        error: "Instance ID is required",
      }, { status: 400 });
    }

    // Simulate different status states based on time or instance ID
    const statusStates = [
      { status: "initializing", progress: 10, message: "Starting EC2 instance..." },
      { status: "configuring", progress: 45, message: "Installing ERPNext dependencies..." },
      { status: "deploying", progress: 75, message: "Configuring business data..." },
      { status: "completed", progress: 100, message: "Your ERP system is ready!" },
    ];

    // Use instance ID hash to determine consistent status for testing
    const statusIndex = Math.abs(instanceId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % statusStates.length;
    const currentStatus = statusStates[statusIndex];

    return HttpResponse.json({
      success: true,
      instanceId,
      ...currentStatus,
      publicIp: currentStatus.status === "completed" ? "203.0.113.12" : null,
      accessUrl: currentStatus.status === "completed" ? `https://${instanceId}.proforge-erp.com` : null,
      credentials: currentStatus.status === "completed" ? {
        username: "administrator",
        password: "temp-password-123",
      } : null,
    });
  }),

  // Mock POST /api/provision/callback
  http.post("/api/provision/callback", async ({ request }) => {
    const body = await request.json();
    
    return HttpResponse.json({
      success: true,
      message: "Status updated successfully",
      receivedData: body,
    });
  }),

  // Mock error scenarios
  http.post("/api/provision/start-error", async () => {
    return HttpResponse.json({
      success: false,
      error: "Failed to launch EC2 instance",
      details: "Insufficient capacity in availability zone",
    }, { status: 500 });
  }),
];
