import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Divider,
  TextField,
  Button,
  Grid,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`about-tabpanel-${index}`}
      aria-labelledby={`about-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
}

export default function AboutPage() {
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  useEffect(() => {
    if (location.state && typeof location.state.activeTab === "number") {
      setTabValue(location.state.activeTab);
    }
  }, [location]);
  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (
      !contactForm.name ||
      !contactForm.email ||
      !contactForm.subject ||
      !contactForm.message
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.com+/.test(contactForm.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    console.log("Form submitted:", contactForm);
    setFormSubmitted(true);
    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    // In a real application, you would send this data to your backend
  };

  return (
    <Box sx={{ bgcolor: "#121212", color: "white", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: "#1e1e1e",
          py: 6,
          px: 2,
          textAlign: "center",
          borderBottom: "1px solid #333",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" fontWeight={700} mb={2}>
            About SongScore
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: "700px", mx: "auto", color: "#aaa" }}
          >
            Everything you need to know about our platform, policies, and how to
            reach us.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Paper
          elevation={3}
          sx={{
            bgcolor: "#1e1e1e",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              borderBottom: "1px solid #333",
              "& .MuiTab-root": {
                color: "#aaa",
                fontSize: { xs: "0.8rem", sm: "1rem" },
                py: 2,
              },
              "& .Mui-selected": {
                color: "#00C853 !important",
                fontWeight: 600,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#00C853",
              },
            }}
          >
            <Tab label="Terms & Conditions" />
            <Tab label="Privacy Policy" />
            <Tab label="Contact Us" />
          </Tabs>

          {/* Terms & Conditions */}
          <TabPanel value={tabValue} index={0}>
            <Typography
              variant="h5"
              component="h2"
              fontWeight={600}
              mb={3}
              color="#00C853"
            >
              Terms & Conditions
            </Typography>

            <Typography variant="body1" paragraph>
              Welcome to SongScore! These Terms and Conditions govern your use
              of our website and services. By accessing or using SongScore, you
              agree to be bound by these terms.
            </Typography>

            <Accordion
              sx={{ bgcolor: "#252525", mb: 2, border: "1px solid #333" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#00C853" }} />}
                sx={{ borderBottom: "1px solid #333" }}
              >
                <Typography fontWeight={500}>
                  1. Account Registration & Eligibility
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  To use certain features of SongScore, you must create an
                  account. You agree to provide accurate, current, and complete
                  information and to update this information to maintain its
                  accuracy.
                </Typography>
                <Typography variant="body2" paragraph>
                  You must be at least 13 years old to use our service. If you
                  are under 18, you represent that you have your parent or
                  guardian's permission to use the service.
                </Typography>
                <Typography variant="body2">
                  You are responsible for maintaining the confidentiality of
                  your account password and for all activities that occur under
                  your account.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ bgcolor: "#252525", mb: 2, border: "1px solid #333" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#00C853" }} />}
                sx={{ borderBottom: "1px solid #333" }}
              >
                <Typography fontWeight={500}>
                  2. User Content & Conduct
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  You are solely responsible for the content you post, including
                  ratings, reviews, comments, and other materials. You grant
                  SongScore a worldwide, non-exclusive, royalty-free license to
                  use, reproduce, modify, and display your content.
                </Typography>
                <Typography variant="body2" paragraph>
                  You agree not to post content that is illegal, harmful,
                  threatening, abusive, harassing, defamatory, or otherwise
                  objectionable.
                </Typography>
                <Typography variant="body2">
                  SongScore reserves the right to remove any content that
                  violates these terms or that we find objectionable for any
                  reason.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ bgcolor: "#252525", mb: 2, border: "1px solid #333" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#00C853" }} />}
                sx={{ borderBottom: "1px solid #333" }}
              >
                <Typography fontWeight={500}>3. Spotify Integration</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  SongScore uses the Spotify API to provide music data and
                  listening features. By using these features, you agree to
                  comply with Spotify's Terms of Service.
                </Typography>
                <Typography variant="body2" paragraph>
                  We do not store your Spotify login credentials, but instead
                  use OAuth tokens to access your Spotify data with your
                  permission.
                </Typography>
                <Typography variant="body2">
                  You can revoke SongScore's access to your Spotify account at
                  any time through your Spotify account settings.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ bgcolor: "#252525", mb: 2, border: "1px solid #333" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#00C853" }} />}
                sx={{ borderBottom: "1px solid #333" }}
              >
                <Typography fontWeight={500}>
                  4. Intellectual Property
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  The SongScore service and its original content, features, and
                  functionality are owned by SongScore and are protected by
                  international copyright, trademark, and other intellectual
                  property laws.
                </Typography>
                <Typography variant="body2">
                  Music content accessible through our service is owned by the
                  respective rights holders and is protected by applicable
                  intellectual property laws.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ bgcolor: "#252525", mb: 2, border: "1px solid #333" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#00C853" }} />}
                sx={{ borderBottom: "1px solid #333" }}
              >
                <Typography fontWeight={500}>5. Termination</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  We may terminate or suspend your account and access to our
                  services immediately, without prior notice or liability, for
                  any reason, including if you breach these Terms.
                </Typography>
                <Typography variant="body2">
                  Upon termination, your right to use the service will
                  immediately cease. If you wish to terminate your account, you
                  may simply discontinue using the service or contact us for
                  account deletion.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body2" color="#aaa">
                Last updated: May 11, 2025
              </Typography>
            </Box>
          </TabPanel>

          {/* Privacy Policy */}
          <TabPanel value={tabValue} index={1}>
            <Typography
              variant="h5"
              component="h2"
              fontWeight={600}
              mb={3}
              color="#00C853"
            >
              Privacy Policy
            </Typography>

            <Typography variant="body1" paragraph>
              At SongScore, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our service.
            </Typography>

            <Accordion
              sx={{ bgcolor: "#252525", mb: 2, border: "1px solid #333" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#00C853" }} />}
                sx={{ borderBottom: "1px solid #333" }}
              >
                <Typography fontWeight={500}>
                  1. Information We Collect
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph fontWeight={500}>
                  Personal Information:
                </Typography>
                <Typography variant="body2" paragraph>
                  • When you create an account: name, email address, username,
                  and password
                  <br />
                  • Profile information you provide: profile picture, bio,
                  location (optional)
                  <br />• Authentication data when you connect to third-party
                  services like Spotify
                </Typography>

                <Typography variant="body2" paragraph fontWeight={500}>
                  Usage Information:
                </Typography>
                <Typography variant="body2">
                  • Music you rate, review, or add to lists
                  <br />
                  • Interaction data such as likes, comments, and follows
                  <br />• Log data, including IP address, browser type, pages
                  visited, and time spent
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ bgcolor: "#252525", mb: 2, border: "1px solid #333" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#00C853" }} />}
                sx={{ borderBottom: "1px solid #333" }}
              >
                <Typography fontWeight={500}>
                  2. How We Use Your Information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  We use the information we collect to:
                </Typography>
                <Typography variant="body2" paragraph>
                  • Provide, maintain, and improve our services
                  <br />
                  • Process and customize your music recommendations
                  <br />
                  • Communicate with you about updates, security alerts, and
                  support
                  <br />
                  • Analyze usage patterns to enhance user experience
                  <br />• Prevent fraudulent activities and ensure security
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ bgcolor: "#252525", mb: 2, border: "1px solid #333" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#00C853" }} />}
                sx={{ borderBottom: "1px solid #333" }}
              >
                <Typography fontWeight={500}>
                  3. Sharing Your Information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  We may share your information with:
                </Typography>
                <Typography variant="body2" paragraph>
                  • Other users according to your privacy settings (ratings,
                  reviews, profile information)
                  <br />
                  • Service providers who perform services on our behalf
                  <br />
                  • Third-party music services (like Spotify) in accordance with
                  your authorization
                  <br />• Legal authorities when required by law or to protect
                  our rights
                </Typography>
                <Typography variant="body2">
                  We will never sell your personal information to advertisers or
                  other third parties.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ bgcolor: "#252525", mb: 2, border: "1px solid #333" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#00C853" }} />}
                sx={{ borderBottom: "1px solid #333" }}
              >
                <Typography fontWeight={500}>4. Data Security</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  We implement appropriate technical and organizational measures
                  to protect your personal information from unauthorized access,
                  disclosure, alteration, and destruction.
                </Typography>
                <Typography variant="body2">
                  However, no internet transmission is completely secure. While
                  we strive to protect your personal information, we cannot
                  guarantee its absolute security.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{ bgcolor: "#252525", mb: 2, border: "1px solid #333" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#00C853" }} />}
                sx={{ borderBottom: "1px solid #333" }}
              >
                <Typography fontWeight={500}>5. Your Privacy Rights</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  Depending on your location, you may have certain rights
                  regarding your personal information, including:
                </Typography>
                <Typography variant="body2" paragraph>
                  • Access to the personal information we have about you
                  <br />
                  • Correction of inaccurate or incomplete information
                  <br />
                  • Deletion of your personal information
                  <br />
                  • Objection to or restriction of certain processing activities
                  <br />• Data portability to transfer your information to
                  another service
                </Typography>
                <Typography variant="body2">
                  To exercise these rights, please contact us using the
                  information provided in the Contact Us section.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body2" color="#aaa">
                Last updated: May 11, 2025
              </Typography>
            </Box>
          </TabPanel>

          {/* Contact Us */}
          <TabPanel value={tabValue} index={2}>
            <Typography
              variant="h5"
              component="h2"
              fontWeight={600}
              mb={3}
              color="#00C853"
            >
              Contact Us
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                  We'd love to hear from you! If you have any questions,
                  concerns, or feedback about SongScore, please don't hesitate
                  to reach out.
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    General Inquiries
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Box
                      component="span"
                      sx={{ color: "#00c853", fontSize: "1.2rem", mr: 1 }}
                    >
                      ✉
                    </Box>
                    <Link
                      href="mailto:info@songscore.com"
                      color="inherit"
                      sx={{ color: "#00c853" }}
                    >
                      info@songscore.com
                    </Link>
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Support
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Box
                      component="span"
                      sx={{ color: "#00c853", fontSize: "1.2rem", mr: 1 }}
                    >
                      ✉
                    </Box>
                    <Link
                      href="mailto:support@songscore.com"
                      color="inherit"
                      sx={{ color: "#00c853" }}
                    >
                      support@songscore.com
                    </Link>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box
                      component="span"
                      sx={{ color: "#00c853", fontSize: "1.2rem", mr: 1 }}
                    >
                      ☎
                    </Box>
                    <Link
                      href="tel:+18001234567"
                      color="inherit"
                      sx={{ color: "#00c853" }}
                    >
                      +92 (323) 668-2688
                    </Link>
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Office Location
                  </Typography>
                  <Typography variant="body1">
                    SongScore, Inc.
                    <br />
                    Madina Town
                    <br />
                    Faisalabad, PJ 06060
                    <br />
                    Pakistan
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                {formSubmitted ? (
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: "rgba(0, 200, 83, 0.1)",
                      border: "1px solid #00C853",
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" gutterBottom color="#00C853">
                      Message Sent!
                    </Typography>
                    <Typography variant="body1">
                      Thank you for reaching out. We'll get back to you as soon
                      as possible.
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 2,
                        color: "#00C853",
                        borderColor: "#00C853",
                        "&:hover": {
                          borderColor: "#00C853",
                          bgcolor: "rgba(0, 200, 83, 0.1)",
                        },
                      }}
                      onClick={() => setFormSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </Paper>
                ) : (
                  <Paper
                    component="form"
                    onSubmit={handleContactSubmit}
                    sx={{
                      p: 3,
                      bgcolor: "#252525",
                      border: "1px solid #333",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Send Us a Message
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={contactForm.name}
                          onChange={handleContactChange}
                          required
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#444",
                              },
                              "&:hover fieldset": {
                                borderColor: "#666",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#00C853",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={handleContactChange}
                          required
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#444",
                              },
                              "&:hover fieldset": {
                                borderColor: "#666",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#00C853",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={contactForm.subject}
                          onChange={handleContactChange}
                          required
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#444",
                              },
                              "&:hover fieldset": {
                                borderColor: "#666",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#00C853",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          value={contactForm.message}
                          onChange={handleContactChange}
                          required
                          multiline
                          rows={4}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#444",
                              },
                              "&:hover fieldset": {
                                borderColor: "#666",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#00C853",
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          sx={{
                            bgcolor: "#00C853",
                            color: "#121212",
                            "&:hover": {
                              bgcolor: "#00A844",
                            },
                            py: 1.5,
                            fontWeight: 600,
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                )}

                <Box sx={{ mt: 4, p: 3, bgcolor: "#1a1a1a", borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Follow Us
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "center",
                      mt: 1,
                    }}
                  >
                    <Link
                      href="#"
                      target="_blank"
                      color="inherit"
                      sx={{
                        color: "#fff",
                        fontSize: "1.5rem",
                        "&:hover": { color: "#00C853" },
                      }}
                    >
                      📱
                    </Link>
                    <Link
                      href="#"
                      target="_blank"
                      color="inherit"
                      sx={{
                        color: "#fff",
                        fontSize: "1.5rem",
                        "&:hover": { color: "#00C853" },
                      }}
                    >
                      💻
                    </Link>
                    <Link
                      href="#"
                      target="_blank"
                      color="inherit"
                      sx={{
                        color: "#fff",
                        fontSize: "1.5rem",
                        "&:hover": { color: "#00C853" },
                      }}
                    >
                      📷
                    </Link>
                    <Link
                      href="#"
                      target="_blank"
                      color="inherit"
                      sx={{
                        color: "#fff",
                        fontSize: "1.5rem",
                        "&:hover": { color: "#00C853" },
                      }}
                    >
                      📺
                    </Link>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>
      </Container>

      {/* Footer */}
      <Footer
        bgColor="#1e1e1e"
        sx={{
          bgcolor: "#1e1e1e",
          color: "white",
          py: 4,
          px: 2,
          textAlign: "center",
          mt: "auto",
        }}
      />
    </Box>
  );
}
