"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function WebhookTester() {
  const [testData, setTestData] = useState("example");
  const [apiResponse, setApiResponse] = useState("");
  const [validationUrl, setValidationUrl] = useState("");
  const [email, setEmail] = useState("");
  const [validationResponse, setValidationResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationLoading, setValidationLoading] = useState(false);

  // Use endpoint
  const testApi = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: testData }),
      });

      const result = await response.json();
      setApiResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      setApiResponse(`Error: ${error.message || "Unknown error"}`);
    }
    setLoading(false);
  };

  // Use Validation endpoint
  const testValidationEndpoint = async () => {
    if (!validationUrl || !email) {
      setValidationResponse("Please enter both URL and email address");
      return;
    }

    setValidationLoading(true);
    try {
      const testUrl = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/junior-dev?url=${encodeURIComponent(
        validationUrl
      )}&email=${encodeURIComponent(email)}`;

      const response = await fetch(testUrl);
      const result = await response.text();
      setValidationResponse(result);
    } catch (error) {
      setValidationResponse(`Error: ${error.message || "Unknown error"}`);
    }
    setValidationLoading(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">API Tester</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Test API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="testData">Test String</Label>
              <Input
                id="testData"
                value={testData}
                onChange={(e) => setTestData(e.target.value)}
              />
            </div>

            <Button onClick={testApi} disabled={loading} className="w-full">
              {loading ? "Testing..." : "Test API"}
            </Button>

            {apiResponse && (
              <div>
                <Label>API Response:</Label>
                <Textarea
                  value={apiResponse}
                  readOnly
                  className="font-mono text-sm"
                  rows={6}
                />
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Test with Validation Endpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="validationUrl">Your API Endpoint URL</Label>
              <Input
                id="validationUrl"
                value={validationUrl}
                onChange={(e) => setValidationUrl(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email">Your Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              onClick={testValidationEndpoint}
              disabled={validationLoading}
              className="w-full"
            >
              {validationLoading
                ? "Validating..."
                : "Test with Validation Endpoint"}
            </Button>

            {validationResponse && (
              <div>
                <Label>Validation Response:</Label>
                <Textarea
                  value={validationResponse}
                  readOnly
                  className="font-mono text-sm"
                  rows={4}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
