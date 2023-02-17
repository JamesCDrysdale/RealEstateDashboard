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
        <div>Property Details</div>
    )
}

export default PropertyDetails;