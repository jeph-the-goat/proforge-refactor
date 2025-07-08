// src/lib/aws/user-data-builder.ts
import type { OnboardingData } from '@/lib/schemas/onboarding';

export interface UserDataContext {
  onboardingData: OnboardingData;
  userId: string;
  instanceId: string;
  callbackUrl: string;
  instanceToken: string;
}

export function buildUserData(context: UserDataContext): string {
  const { userId, instanceId, callbackUrl, instanceToken } = context;
  

  const configUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/provision/config/${instanceId}`;

  return `#!/bin/bash
set -e

exec > >(tee /var/log/proforge-setup.log)
exec 2>&1

echo "Starting ProForge ERP configuration..."
echo "Instance ID: ${instanceId}"
echo "User ID: ${userId}"

mkdir -p /opt/proforge
cd /opt/proforge

# Save instance token (never logged)
echo "${instanceToken}" > /opt/proforge/.instance-token
chmod 600 /opt/proforge/.instance-token

# Fetch configuration from ProForge API
echo "Fetching configuration from ProForge..."
INSTANCE_TOKEN="$(cat /opt/proforge/.instance-token)"

curl -X GET "${configUrl}" \\
  -H "X-Instance-Token: \${INSTANCE_TOKEN}" \\
  -o /opt/proforge/config.json \\
  --retry 5 \\
  --retry-delay 10

if [ ! -f /opt/proforge/config.json ]; then
  echo "Failed to fetch configuration"
  exit 1
fi

echo "Configuration fetched successfully"

# Create health check script
cat > /opt/proforge/health-check.sh << 'SCRIPT'
#!/bin/bash
CALLBACK_URL="${callbackUrl}"
INSTANCE_TOKEN="$(cat /opt/proforge/.instance-token)"
INSTANCE_ID="${instanceId}"

# Send health check
curl -X POST "\${CALLBACK_URL}" \\
  -H "Content-Type: application/json" \\
  -H "X-Instance-Token: \${INSTANCE_TOKEN}" \\
  -d "{
    \\"instanceId\\": \\"\${INSTANCE_ID}\\",
    \\"status\\": \\"running\\",
    \\"timestamp\\": \\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\\",
    \\"publicIp\\": \\"$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 || echo 'unknown')\\"
  }"
SCRIPT

chmod +x /opt/proforge/health-check.sh

# Set up cron job for periodic health checks (every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * /opt/proforge/health-check.sh >> /var/log/proforge-health.log 2>&1") | crontab -

# Initial callback to confirm setup
/opt/proforge/health-check.sh

echo "ProForge ERP ready for configuration!"
echo "Configuration available at /opt/proforge/config.json"
`;
}

export function getDataSize(context: UserDataContext): number {
  const script = buildUserData(context);
  return Buffer.from(script).length;
}

export function validateDataSize(context: UserDataContext): { valid: boolean; size: number; maxSize: number } {
  const size = getDataSize(context);
  const maxSize = 16 * 1024; // 16KB limit
  
  return {
    valid: size <= maxSize,
    size,
    maxSize,
  };
}