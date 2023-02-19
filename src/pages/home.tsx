import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import {
    PieChart,
    PropertyReferrals,
    TotalRevenue,
    PropertyCard,
    TopAgent
} from 'components';

const Home = () => {
    const { data, isLoading, isError } = useList({
        resource: 'properties',
        config: {
            pagination: {
                pageSize: 4
            } 
        }
    })

    // If we don't get any properties, make it an empty array
    const latestProperties = data?.data ?? [];

    if (isLoading) return <Typography>Loading...</Typography>
    if (isError) return <Typography>Error...</Typography>  

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Dashboard
            </Typography>
            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart 
                    title="Properties for sale"
                    value={684}
                    series={[75, 25]}
                    colors={['#475BE8', '#E4B8EF']}
                />
                <PieChart 
                    title="Properties for rent"
                    value={550}
                    series={[60, 40]}
                    colors={['#475BE8', '#E4B8EF']}
                />
                <PieChart 
                    title="Total Customers"
                    value={5684}
                    series={[85, 15]}
                    colors={['#475BE8', '#E4B8EF']}
                />
                <PieChart 
                    title="Properties for cities"
                    value={555}
                    series={[55, 45]}
                    colors={['#475BE8', '#E4B8EF']}
                />
            </Box> 
            <Stack mt="25px" width="100%" direction={{ xs: 'column', lg: 'row'}} gap={4}>
                <TotalRevenue />
                <PropertyReferrals />
            </Stack>

            <Box
                display="flex"
                flexDirection="column"
                flex={1}
                padding="20px"
                mt="25px"
                minWidth="100%"
                borderRadius="15px"
                bgcolor="#FCFCFC"
            >
                <Typography fontSize={18} fontWeight={600} color="#11142D">Latest Properties</Typography>

                <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4}}>
                    {latestProperties.map((property) => (
                        <PropertyCard 
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            price={property.price}
                            location={property.location}
                            photo={property.photo}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Home;