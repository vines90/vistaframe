"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";

const steps = [
  { id: 1, title: "Company Info" },
  { id: 2, title: "Project Details" },
  { id: 3, title: "Products" },
  { id: 4, title: "Contact" },
];

export function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    country: "",
    businessType: "",
    projectType: "",
    quantity: "",
    timeline: "",
    productInterest: "",
    specifications: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-[#e2e8f0]">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-[#1a202c] mb-2">
            Thank You!
          </h3>
          <p className="text-[#718096]">
            Your inquiry has been submitted. We&apos;ll get back to you within 24
            hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.id <= currentStep
                  ? "bg-[#1a365d] text-white"
                  : "bg-[#e2e8f0] text-[#718096]"
              }`}
            >
              {step.id < currentStep ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                step.id
              )}
            </div>
            <span
              className={`ml-2 text-sm hidden sm:inline ${
                step.id <= currentStep ? "text-[#1a202c]" : "text-[#718096]"
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 mx-2 sm:mx-4 ${
                  step.id < currentStep ? "bg-[#1a365d]" : "bg-[#e2e8f0]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Company Info */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="Your company name"
                required
                className="rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => updateField("country", value)}
              >
                <SelectTrigger className="rounded-sm">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="ae">UAE</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type *</Label>
            <Select
              value={formData.businessType}
              onValueChange={(value) => updateField("businessType", value)}
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contractor">General Contractor</SelectItem>
                <SelectItem value="developer">Property Developer</SelectItem>
                <SelectItem value="distributor">Distributor/Dealer</SelectItem>
                <SelectItem value="architect">Architect/Designer</SelectItem>
                <SelectItem value="homeowner">Homeowner</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Step 2: Project Details */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type *</Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => updateField("projectType", value)}
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="hotel">Hotel/Resort</SelectItem>
                <SelectItem value="hospital">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Estimated Quantity</Label>
              <Select
                value={formData.quantity}
                onValueChange={(value) => updateField("quantity", value)}
              >
                <SelectTrigger className="rounded-sm">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 units</SelectItem>
                  <SelectItem value="11-50">11-50 units</SelectItem>
                  <SelectItem value="51-100">51-100 units</SelectItem>
                  <SelectItem value="100+">100+ units</SelectItem>
                  <SelectItem value="custom">Custom project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Project Timeline</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => updateField("timeline", value)}
              >
                <SelectTrigger className="rounded-sm">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="1-3months">1-3 months</SelectItem>
                  <SelectItem value="3-6months">3-6 months</SelectItem>
                  <SelectItem value="6-12months">6-12 months</SelectItem>
                  <SelectItem value="planning">Planning phase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Products */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="productInterest">Product Interest *</Label>
            <Select
              value={formData.productInterest}
              onValueChange={(value) => updateField("productInterest", value)}
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Select product category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="windows">Aluminum Windows</SelectItem>
                <SelectItem value="doors">Aluminum Doors</SelectItem>
                <SelectItem value="sunroom">Sunroom/Conservatory</SelectItem>
                <SelectItem value="wooden-doors">Wooden Doors</SelectItem>
                <SelectItem value="multiple">Multiple Products</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="specifications">Specifications / Requirements</Label>
            <Textarea
              id="specifications"
              value={formData.specifications}
              onChange={(e) => updateField("specifications", e.target.value)}
              placeholder="Describe any specific requirements: dimensions, certifications (NFRC, CE, AS2047), performance needs, etc."
              rows={4}
              className="rounded-sm"
            />
          </div>
        </div>
      )}

      {/* Step 4: Contact */}
      {currentStep === 4 && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Contact Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your full name"
                required
                className="rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="your@email.com"
                required
                className="rounded-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone / WhatsApp</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="Any additional information you'd like to share..."
              rows={3}
              className="rounded-sm"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-[#e2e8f0]">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="rounded-sm border-[#e2e8f0]"
          >
            Previous
          </Button>
        ) : (
          <div />
        )}

        {currentStep < steps.length ? (
          <Button
            type="button"
            onClick={nextStep}
            className="rounded-sm bg-[#1a365d] hover:bg-[#2c5282] text-white"
          >
            Next Step
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-sm bg-[#c05621] hover:bg-[#dd6b20] text-white px-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Inquiry"
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
