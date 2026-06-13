const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { createLeadRoutes } = require("./routes/leadRoutes");
const contactRoutes = require("./routes/contactRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const websiteSettingsRoutes = require("./routes/websiteSettingsRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const createApp = () => {
  const app = express();

  const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("CORS origin not allowed"));
      },
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true, limit: "5mb" }));
  app.disable("x-powered-by");

  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  app.get("/api/health", (req, res) => {
    res.json({
      success: true,
      message: "API healthy",
      data: { timestamp: new Date().toISOString() },
    });
  });

  app.use("/api/admin", authRoutes);
  app.use(["/api/leads", "/api/inquiries"], createLeadRoutes());
  app.use("/api/contacts", contactRoutes);
  app.use("/api/analytics", analyticsRoutes);
  app.use("/api/pricing", pricingRoutes);
  app.use("/api/settings", websiteSettingsRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

module.exports = { createApp };
