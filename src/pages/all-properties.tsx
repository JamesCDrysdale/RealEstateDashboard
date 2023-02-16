import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import { Box, Stack, Typography, TextField, Select, MenuItem } from '@pankod/refine-mui'
import { useNavigate } from "@pankod/refine-react-router-v6";

import { PropertyCard, CustomButton } from "components";

const AllProperties = () => {
  const navigate = useNavigate();

  const { 
    tableQueryResult: {data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter, setSorter,
    filters, setFilters,
  } = useTable();

  // Check we have the data and is not default to an empty array
  const allProperties = data?.data ?? [];

  if (isLoading) return <Typography>Loading... </Typography>
  if (isError) return <Typography>Error...</Typography>

  return (
    <Box>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3}}>
        <Stack direction="column" width="100%" >
          <Typography fontSize={25} fontWeight={700} color="#11142D">
            {!allProperties.length ? 'There are no properties right now. Please check back again soon.' : 'All Properties'}
          </Typography>
          <Box mb={2} mt={3} display="flex" flexWrap="wrap" width="85%" justifyContent="space-between">
            <Box display="flex" flexWrap="wrap" gap={2} mb={{ xs: '20px', sm: 0 }} >
              <CustomButton 
                title={`Sort price`}
                color="#FCFCFC"
                backgroundColor="#475BE8"
                handleClick={() => {}}
              />
              <TextField 
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value = ""
                onChange={() => {}}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value=""
                onChange={() => {}}
              >
                <MenuItem
                  value=""
                >
                  All
                </MenuItem>
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>


      <Stack direction="row" justifyContent="space-between" alignItems="center"> 
        <CustomButton 
          title="Add Property"
          handleClick={() => navigate('/properties/create')}
          backgroundColor="#475BE8"
          color="#FCFCFC"
          icon={<Add />}
        />
      </Stack>

      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3}}>
        {allProperties.map((property) => (
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
  )
}

export default AllProperties;