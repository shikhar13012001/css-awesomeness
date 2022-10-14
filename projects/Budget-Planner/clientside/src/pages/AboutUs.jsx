import React from 'react';
import { Container, Typography, Paper, Box,Button } from '@mui/material';
import Marquee from 'react-fast-marquee';
import Mui from '../assets/mui.png';
import Node from '../assets/nodejs.png';
import ReactLogo from '../assets/react.png';
import Chart from '../assets/chartjs.jpg';
import AvatarGroup from '../components/AvatarGroup';
import Github from '../assets/github.svg'; 
import { SiGithubsponsors } from 'react-icons/si';

const AboutUs = () => {
  return (
    <React.Fragment>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ width: '100%', fontSize: 64, fontWeight: 'bold', textAlign: 'center' }}>
          About Us and Our{' '}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: 64,
            color: 'white',
            pl: 2,
            pr: 2,
            fontWeight: 'bold',
            backgroundColor: 'blue',
            width: 'fit-content',
            textAlign: 'center',
          }}
        >
          Product
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
          Manage your budgets like never before
        </Typography>
        <Paper sx={{ width: '100%', height: 580, mt: 20 }} elevation={12} className="paper-abt-us"></Paper>
        <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 'bold', mt: 30, mb: 10 }}>
          Built Using
        </Typography>
        <Marquee speed={200}>
          <img src={Mui} alt="mui" width="200px" height="200px" style={{ margin: 20 }} />
          <img src={Node} alt="node" width="200px" height="200px" style={{ margin: 20 }} />
          <img src={ReactLogo} alt="react" width="200px" height="200px" style={{ margin: 20 }} />
          <img src={Chart} alt="chart" width="300px" height="200px" style={{ margin: 20 }} />
        </Marquee>
        <Box sx={{ width: '70%', height: 'fit-content', mb: 1 }}>
          <Typography variant="body2" sx={{ textAlign: 'left', fontWeight: 'light', mt: 10 }}>
            About Barbara
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'left', fontWeight: 'bold', mt: 2, mb: 2 }}>
            We build amazing products that help people. We deliver high-quality, high-value products that are blazingly
            fast, and that are easy to use.
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'left', fontWeight: 'light', mt: 2, mb: 2,color:'gray' }}>
            A successful budget planner helps you decide how to best spend your money while avoiding or reducing debt.
            NerdWallet recommends the 50/30/20 budget, which suggests that 50% of your income goes toward needs, 30%
            toward wants and 20% toward savings and debt repayment.
          </Typography>
        </Box>
        <AvatarGroup />
        <Box sx={{ width: '100%', height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center',mt:10 }}>
          <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 'bold',  mb: 10 }}>
            Our Team and Contributors
          </Typography>
          <img src={Github} alt="github" width="80%" height="80%" />
          <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'light', mt: 10 }}>
            We are a team of developers who love to build products. If you want to sponsor us, please contact us.
          </Typography>
          <Button sx={{ width: '15em', marginTop: 2, backgroundColor: 'black',p:1.5,color: 'white' }} startIcon={<SiGithubsponsors size={24} color="pink" />}>
            Sponsor
            </Button>
        </Box> 
      </Container>
    </React.Fragment>
  );
};
export default AboutUs;
