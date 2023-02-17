import { Typography, Box, Stack } from '@pankod/refine-mui';
import { useDelete, useGetIdentity,  useShow } from '@pankod/refine-core';
import { useParams, useNavigate } from '@pankod/refine-react-router-v6';
import { ChatBubble, Delete, Edit, Phone, Place, Star } from '@mui/icons-material';

import { CustomButton } from 'components';

const PropertyDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    const { id } = useParams();
    const { queryResult } = useShow();
    const { mutate } = useDelete();

    const { data, isLoading, isError } = queryResult;

    const propertyDetails = data?.data ?? {};

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return (
        <Box
            borderRadius="15px"
            padding="20px"
            bgcolor="#FCFCFC"
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Details
            </Typography>

            <Box mt="20px" display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>

                <Box flex={1} maxWidth={750}>
                    <img 
                        src={propertyDetails.photo} 
                        alt={propertyDetails.title} 
                        height={500}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="property_details_img"
                    />
                </Box>

            </Box>
        </Box>
    )
}

export default PropertyDetails;