import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Box, Grid, Typography } from "@mui/material";

export default function AboutSection() {
  return (
    <Box sx={{ bgcolor: "white", width: "100%", overflow: "hidden", pt: { xs: 6, lg: 0 } }}>
      <Box sx={{ width: "100%", display: "flex", position: "relative" }}>
        
        {/* LEFT IMAGE (LG ONLY) */}
        <Box
          component="img"
          src="/About/nutrition-bowl 3.svg"
          alt="Food Plate"
          sx={{
            display: { xs: "none", lg: "block" },
            width: "460px",
            height: "575px",
            objectFit: "cover",
            pt: "20px",
          }}
        />

        {/* CONTENT AREA */}
        <Box sx={{ width: "100%", ml: { xl: "150px" } }}>

          {/* HEADING */}
          <Box sx={{ display: "flex", flexDirection: "column", position: "relative", pl: { xs: 4, lg: 10, xl: 20 }, pt: { lg: "180px" } }}>
            
            {/* ANIMATION BOX */}
            <Box sx={{ position: "relative", width: { xs: "200px", sm: "300px", md: "450px", lg: "556px" }, pt: 8 }}>
              <Typography
                sx={{
                  fontFamily: "RedHatDisplay",
                  fontWeight: "900",
                  lineHeight: 1.1,
                  color: "black",
                  pl: { md: "11px", lg: 0 },
                  fontSize: { xs: "22px", sm: "20px", md: "30px", lg: "40px" },
                }}
              >
                <TypeAnimation
                  sequence={[
                    "Nourishing Lives with Balanced, Delicious Meals —",
                    1000,
                    "Nourishing Lives with Balanced, Delicious Meals — Thoughtfully designed",
                    1000,
                    "Nourishing Lives with Balanced, Delicious Meals — Thoughtfully designed and perfected with Care",
                    5000,
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ display: "inline-block" }}
                  repeat={Infinity}
                />
              </Typography>
            </Box>

            {/* RIGHT FLOAT IMAGE (MOBILE ONLY) */}
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: "75px",
                display: { lg: "none" },
              }}
            >
              <Box
                component="img"
                src="/About/rightcut.svg"
                alt="Food Plate"
                sx={{
                  width: { xs: "160px", sm: "170px" },
                  height: "280px",
                }}
              />
            </Box>
          </Box>

          {/* FEATURES GRID */}
          <Grid
            container
            spacing={4}
            sx={{
              mt: "20px",
              pb: { xs: 4, lg: "44px" },
              pl: { xs: 4, md: "44px", lg: 10, xl: 20 },
              pr: 2,
            }}
          >
            {/* Feature 1 */}
            <Grid item xs={12} sm={6}>
              <Box>
                <Box
                  component="img"
                  src="/About/plate-eating (1) 1.svg"
                  sx={{ width: "40px", height: "40px" }}
                />
                <Typography sx={{ fontWeight: 900, fontFamily: "RedHatDisplay", fontSize: { xs: "18px", lg: "22px" }, mt: 1, color: "#38754E" }}>
                  Flavorful Wellness. Every Bite
                </Typography>
                <Typography sx={{ mt: 1, width: { xs: "300px", lg: "280px" }, fontSize: "14px", color: "#808080", fontFamily: "RedHatDisplay" }}>
                  Our kitchen is a hub of tasteful innovation. We're not just crafting meals; we're creating culinary experiences that redefine healthy eating.
                </Typography>
              </Box>
            </Grid>

            {/* Feature 2 */}
            <Grid item xs={12} sm={6}>
              <Box>
                <Box
                  component="img"
                  src="/About/salad (1) 1.svg"
                  sx={{ width: "40px", height: "40px" }}
                />
                <Typography sx={{ fontWeight: 900, mt: 1, color: "#38754E", fontSize: { xs: "18px", lg: "22px" }, fontFamily: "RedHatDisplay" }}>
                  Quantified Nutrition, No Compromise
                </Typography>
                <Typography sx={{ mt: 1, width: { xs: "240px", lg: "280px" }, fontSize: "14px", color: "#808080", fontFamily: "RedHatDisplay" }}>
                  Experience the perfect blend of taste and nutrition, with meals packed with essential goodness without compromising flavor.
                </Typography>
              </Box>
            </Grid>

            {/* Feature 3 */}
            <Grid item xs={12} sm={6}>
              <Box>
                <Box
                  component="img"
                  src="/About/user-chef 1.svg"
                  sx={{ width: "40px", height: "40px" }}
                />
                <Typography sx={{ fontWeight: 900, mt: 1, color: "#38754E", fontSize: { xs: "18px", lg: "22px" }, fontFamily: "RedHatDisplay" }}>
                  Chef-Nutrition Expert Collaboration
                </Typography>
                <Typography sx={{ mt: 1, width: { xs: "240px", lg: "280px" }, fontSize: "14px", color: "#808080", fontFamily: "RedHatDisplay" }}>
                  Our chefs and nutrition experts work together to create meals that match your health goals.
                </Typography>
              </Box>
            </Grid>

            {/* Feature 4 */}
            <Grid item xs={12} sm={6}>
              <Box>
                <Box
                  component="img"
                  src="/About/heart-health-muscle 1.svg"
                  sx={{ width: "40px", height: "40px" }}
                />
                <Typography sx={{ fontWeight: 900, mt: 1, color: "#38754E", fontSize: { xs: "18px", lg: "22px" }, fontFamily: "RedHatDisplay" }}>
                  Health for Everyone
                </Typography>
                <Typography sx={{ mt: 1, width: { xs: "240px", lg: "280px" }, fontSize: "14px", color: "#808080", fontFamily: "RedHatDisplay" }}>
                  We're committed to making health accessible for everyone with personalized plans and tasty options.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
