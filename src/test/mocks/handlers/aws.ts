import { http, HttpResponse } from "msw";

// Mock AWS EC2 API responses
export const awsHandlers = [
  // Mock EC2 RunInstances
  http.post("https://ec2.us-east-1.amazonaws.com/", async ({ request }) => {
    const body = await request.text();
    
    // Check if this is a RunInstances request
    if (body.includes("Action=RunInstances")) {
      return HttpResponse.xml(`<?xml version="1.0" encoding="UTF-8"?>
        <RunInstancesResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">
          <requestId>59dbff89-35bd-4eac-99ed-be587EXAMPLE</requestId>
          <ownerId>111122223333</ownerId>
          <reservationId>r-1234567890abcdef0</reservationId>
          <instances>
            <item>
              <instanceId>i-1234567890abcdef0</instanceId>
              <imageId>ami-0abcdef1234567890</imageId>
              <state>
                <code>0</code>
                <name>pending</name>
              </state>
              <privateDnsName/>
              <publicDnsName/>
              <dnsName/>
              <reason/>
              <keyName>my-key-pair</keyName>
              <instanceType>t3.medium</instanceType>
              <launchTime>2023-05-10T09:47:20.000Z</launchTime>
              <placement>
                <availabilityZone>us-east-1c</availabilityZone>
                <groupName/>
                <tenancy>default</tenancy>
              </placement>
              <monitoring>
                <state>disabled</state>
              </monitoring>
              <subnetId>subnet-1234567890abcdef0</subnetId>
              <vpcId>vpc-1234567890abcdef0</vpcId>
              <privateIpAddress>10.0.1.12</privateIpAddress>
              <sourceDestCheck>true</sourceDestCheck>
              <groupSet>
                <item>
                  <groupId>sg-1234567890abcdef0</groupId>
                  <groupName>my-security-group</groupName>
                </item>
              </groupSet>
              <architecture>x86_64</architecture>
              <rootDeviceType>ebs</rootDeviceType>
              <rootDeviceName>/dev/sda1</rootDeviceName>
              <virtualizationType>hvm</virtualizationType>
              <hypervisor>xen</hypervisor>
              <clientToken/>
            </item>
          </instances>
        </RunInstancesResponse>`, {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
        },
      });
    }
    
    // Mock DescribeInstances
    if (body.includes("Action=DescribeInstances")) {
      return HttpResponse.xml(`<?xml version="1.0" encoding="UTF-8"?>
        <DescribeInstancesResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">
          <requestId>fdcdcab1-ae5c-489e-9c33-4637c5dda355</requestId>
          <reservationSet>
            <item>
              <reservationId>r-1234567890abcdef0</reservationId>
              <ownerId>111122223333</ownerId>
              <instances>
                <item>
                  <instanceId>i-1234567890abcdef0</instanceId>
                  <imageId>ami-0abcdef1234567890</imageId>
                  <state>
                    <code>16</code>
                    <name>running</name>
                  </state>
                  <privateDnsName>ip-10-0-1-12.ec2.internal</privateDnsName>
                  <publicDnsName>ec2-203-0-113-12.compute-1.amazonaws.com</publicDnsName>
                  <dnsName>ec2-203-0-113-12.compute-1.amazonaws.com</dnsName>
                  <reason/>
                  <keyName>my-key-pair</keyName>
                  <instanceType>t3.medium</instanceType>
                  <launchTime>2023-05-10T09:47:20.000Z</launchTime>
                  <placement>
                    <availabilityZone>us-east-1c</availabilityZone>
                    <groupName/>
                    <tenancy>default</tenancy>
                  </placement>
                  <monitoring>
                    <state>disabled</state>
                  </monitoring>
                  <subnetId>subnet-1234567890abcdef0</subnetId>
                  <vpcId>vpc-1234567890abcdef0</vpcId>
                  <privateIpAddress>10.0.1.12</privateIpAddress>
                  <ipAddress>203.0.113.12</ipAddress>
                  <sourceDestCheck>true</sourceDestCheck>
                  <groupSet>
                    <item>
                      <groupId>sg-1234567890abcdef0</groupId>
                      <groupName>my-security-group</groupName>
                    </item>
                  </groupSet>
                  <architecture>x86_64</architecture>
                  <rootDeviceType>ebs</rootDeviceType>
                  <rootDeviceName>/dev/sda1</rootDeviceName>
                  <virtualizationType>hvm</virtualizationType>
                  <hypervisor>xen</hypervisor>
                  <clientToken/>
                </item>
              </instances>
            </item>
          </reservationSet>
        </DescribeInstancesResponse>`, {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
        },
      });
    }

    // Default response for unhandled AWS requests
    return HttpResponse.xml(`<?xml version="1.0" encoding="UTF-8"?>
      <ErrorResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">
        <Errors>
          <Error>
            <Code>InvalidAction</Code>
            <Message>The action specified is not valid.</Message>
          </Error>
        </Errors>
        <RequestId>ea966190-f445-4f05-9abc-c04a12345678</RequestId>
      </ErrorResponse>`, {
      status: 400,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }),
];
