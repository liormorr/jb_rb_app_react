import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';




export default function BusinessSocials({Socials}) {
  
  const handleClickonSocials = (link) => {
    if (link) {
      window.open(link);
    }
  };

  const buttons = [
    {
      key: 'one',
      icon: <LanguageIcon />,
      link: Socials?.website,
    },
    {
      key: 'two',
      icon: <FacebookIcon />,
      link: Socials?.facebook_link,
    },
    {
      key: 'three',
      icon: <InstagramIcon />,
      link: Socials?.instagram_link,
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="horizontal"
        aria-label="vertical outlined button group"
      >
        <div onClick={(e) => e.stopPropagation()}>
          {buttons.map((button) => (
            <Button
              key={button.key}
              onClick={() => handleClickonSocials(button.link)}
              disabled={!button.link}
            >
              {button.icon}
            </Button>
          ))}
        </div>
      </ButtonGroup>
    </Box>
  );
}