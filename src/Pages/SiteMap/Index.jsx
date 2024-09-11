import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HelpIcon from '@mui/icons-material/Help';
import PolicyIcon from '@mui/icons-material/Policy';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import RoomIcon from '@mui/icons-material/Room';

const SiteMap = () => {
  return (
    <Box sx={styles.container}>
    

      <Grid container spacing={3}>
        {/* Main Pages */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={styles.sectionHeader}>Main Pages</Typography>
          <Box>
            <Link href="https://treasurebox.live/cart" sx={styles.link}>
              <ShoppingCartIcon sx={styles.icon} /> Cart
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/about" sx={styles.link}>
              <InfoIcon sx={styles.icon} /> About Us
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/contact" sx={styles.link}>
              <ContactMailIcon sx={styles.icon} /> Contact
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/help" sx={styles.link}>
              <HelpIcon sx={styles.icon} /> Help
            </Link>
          </Box>
        </Grid>

        {/* Product Pages */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={styles.sectionHeader}>Product Pages</Typography>
          <Box>
            <Link href="https://treasurebox.live/product" sx={styles.link}>
              <HomeIcon sx={styles.icon} /> Products
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/product/1/Accessories" sx={styles.link}>
              Accessories
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/product/5/Bags" sx={styles.link}>
              Bags
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/product/10/Digitals" sx={styles.link}>
              Digital Products
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/product/11/Home%20Decor" sx={styles.link}>
              Home Decor
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/product/12/Kitchen%20and%20Dinning" sx={styles.link}>
              Kitchen and Dining
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/product/13/Stationery" sx={styles.link}>
              Stationery
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/product/14/Storage%20and%20Organiser" sx={styles.link}>
              Storage and Organizer
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/productDetails/230/Makeup%20Sponge%20Set" sx={styles.link}>
              Makeup Sponge Set
            </Link>
          </Box>
        </Grid>

        {/* Policies and Social */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={styles.sectionHeader}>Policies</Typography>
          <Box>
            <Link href="https://treasurebox.live/terms" sx={styles.link}>
              Terms of Service
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/privacy" sx={styles.link}>
              <PolicyIcon sx={styles.icon} /> Privacy Policy
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/return" sx={styles.link}>
              Return Policy
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/refund" sx={styles.link}>
              Refund Policy
            </Link>
          </Box>
          <Box>
            <Link href="https://treasurebox.live/shipping" sx={styles.link}>
              Shipping Policy
            </Link>
          </Box>

          <Typography variant="h6" sx={styles.sectionHeader}>Follow Us</Typography>
          <Box>
            <Link href="https://www.facebook.com/batracards123?mibextid=LQQJ4d" sx={styles.link}>
              <FacebookIcon sx={styles.icon} /> Facebook
            </Link>
          </Box>
          <Box>
            <Link href="https://www.instagram.com/treasureboxlife/" sx={styles.link}>
              <InstagramIcon sx={styles.icon} /> Instagram
            </Link>
          </Box>
        </Grid>

        {/* Location */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={styles.sectionHeader}>Our Location</Typography>
          <Box>
            <Link href="https://www.google.com/maps/place/TREASURE+BOX/@22.6993657,75.8477109,17z/data=!3m1!4b1!4m6!3m5!1s0x3962fdf8143cc3e5:0x54bc4ea63891ccef!8m2!3d22.6993657!4d75.8502858!16s%2Fg%2F11n0dxv59c?entry=ttu" sx={styles.link}>
              <RoomIcon sx={styles.icon} /> View on Google Maps
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  sectionHeader: {
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      textDecoration: 'underline',
      color: 'var(--primary-color)',
    },
  },
  icon: {
    marginRight: '8px',
  },
};

export default SiteMap;
