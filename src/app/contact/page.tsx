import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mt-[120px] mx-auto px-4 py-12 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Email, call, or complete the form to learn how we can help you
              create your culinary journey.
            </p>
            <div className="space-y-2">
              <p className="text-muted-foreground">support@crunchsocial.com</p>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="grid gap-8">
            {/* Customer Support Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Customer Support</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Our support team is available Monday through Friday to assist
                with any questions about recipe sharing or community guidelines.
              </p>
            </div>

            {/* Feedback Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold">
                  Feedback and Suggestions
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                We value your feedback and are always looking to improve. Share
                your ideas at feedback@crunchsocial.com
              </p>
            </div>

            {/* Media Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Media Inquiries</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                For media-related questions or partnership opportunities, please
                contact press@crunchsocial.com
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div>
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
                <p className="text-sm text-muted-foreground">
                  Have questions about our recipe community? Send us a message!
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm">
                      First name
                    </label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm">
                      Last name
                    </label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm">
                    Phone number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your inquiry..."
                    rows={4}
                  />
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Submit
                </Button>

                {/* <p className="text-xs text-center text-muted-foreground">
                  By submitting this form, you agree to our{" "}
                  <a href="/terms" className="underline hover:text-orange-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="underline hover:text-orange-500"
                  >
                    Privacy Policy
                  </a>
                </p> */}
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
