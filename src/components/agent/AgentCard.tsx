import { EmailOutlined, LocationCity, Phone, Place } from '@mui/icons-material';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { Link } from '@pankod/refine-react-router-v6';

import { useGetIdentity } from '@pankod/refine-core';
import { AgentCardProp, InfoBarProps } from 'interfaces/agent';
import InfoBar from './InfoBar';

const AgentCard = ({ id, name, email, avatar, noOfProperties }: AgentCardProp) => {
  const { data: currentUser } = useGetIdentity();

  const generateLink = () => {
    if (currentUser.email === email) return '/my-profile'

    return `/agents/show/${id}`;
  }

  return (
    <Box
      component={Link}
      to={generateLink()}
      width="100%"
      sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "20px",
          padding: "20px",
          "&:hover": {
              boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
          },
      }}>

      <img
          src={avatar}
          alt="user"
          width={90}
          height={90}
          style={{ borderRadius: 8, objectFit: "cover" }}
      />

      <Stack direction="column" justifyContent="space-between" flex={1} gap={{ xs: 4, sm: 2}}>
        <Stack direction="row" flexWrap="wrap" alignItems="center" gap={2} >
          <Typography fontSize={22} fontWeight={600} color="#11142D">
            {name}
          </Typography>
          <Typography fontSize={14} color="#808191">
            Real-Estate Agent
          </Typography>
        </Stack>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
          <InfoBar 
            icon={<EmailOutlined sx={{ color: "#808191" }} /> }
            name={email}
          />
          <InfoBar 
            icon={<Place sx={{ color: "#808191" }} /> }
            name={"Edinburgh"}
          />
          <InfoBar 
            icon={<Phone sx={{ color: "#808191" }} /> }
            name={"+44 7492 371 238"}
          />
          <InfoBar 
            icon={<LocationCity sx={{ color: "#808191" }} /> }
            name={`${noOfProperties} Properties`}
          />
          
        </Stack>
      </Stack>
    </Box>
  )
}

export default AgentCard