import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactNotification, sendContactConfirmation } from "./email";
import { contactFormSchema } from "../shared/contact-schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Test endpoint to verify routes are working
  app.get("/api/test", (req: Request, res: Response) => {
    res.json({ message: "API is working!", timestamp: new Date().toISOString() });
  });

  // Contact form endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    console.log('[API] Contact form endpoint hit', req.method, req.path);
    console.log('[API] Request body:', req.body);
    
    try {
      // Validate input
      const validatedData = contactFormSchema.parse(req.body);
      console.log('Form data validated:', { name: validatedData.name, email: validatedData.email, subject: validatedData.subject });

      // Send emails (non-blocking - don't fail if email fails)
      try {
        await Promise.all([
          sendContactNotification(validatedData),
          sendContactConfirmation(validatedData),
        ]);
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error('Email sending failed (but form submission succeeded):', emailError);
      }

      res.status(200).json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you soon!" 
      });
    } catch (error: any) {
      console.error('Contact form error:', error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid form data', 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to send message. Please try again later." 
      });
    }
  });

  return httpServer;
}
