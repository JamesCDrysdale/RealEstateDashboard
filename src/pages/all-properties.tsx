import { useMemo } from "react";
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

  // Sort by Price
  const currentPrice = sorter.find((item) => item.field === 'price')?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }]);
  }

  // Filter by title
  const currentFilterValues = useMemo(() => {
    const filtersLogic = filters.flatMap((item) => ('field' in item ? item : []));

    return {
      title: filtersLogic.find((item) => item.field === 'title')?.value || "",
      propertyType: filtersLogic.find((item) => item.field === 'propertyType')?.value || "",
    }
  }, [filters])

  

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
                title={`Sort price ${currentPrice === 'asc' ? '↑' : '↓'}`}
                color="#FCFCFC"
                backgroundColor="#475BE8"
                handleClick={() => toggleSort('price')}
              />
              <TextField 
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value = {currentFilterValues.title}
                onChange={(e) => {setFilters([
                  {
                    field: 'title',
                    operator: 'contains',
                    value: e.currentTarget.value ? e.currentTarget.value : undefined
                  }
                ])
              }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value = {currentFilterValues.propertyType}
                onChange={(e) => {setFilters([
                  {
                    field: 'propertyType',
                    operator: 'eq',
                    value: e.target.value
                  }
                ], 'replace' )
              }}
              >
                <MenuItem value="">All</MenuItem>
                {[
                  'Bungalow', 
                  'Chalet', 
                  'Cottage', 
                  'Duplex', 
                  'Flat', 
                  'House',
                  'Mansion',
                  'Studio',
                ].map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>
                ))}
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
      
      {allProperties.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
          <CustomButton 
            title="Previous"
            color="#FCFCFC"
            backgroundColor="#475BE8"
            handleClick={() => setCurrent((prev) => prev - 1)}
            disabled={!(current > 1)}
          />
          <Box display={{ xs: "hidden", sm: "flex" }} alignItems="center" gap="5px">
            Page{' '}<strong>{current} of {pageCount}</strong>
          </Box>
          <CustomButton 
            title="Next"
            color="#FCFCFC"
            backgroundColor="#475BE8"
            handleClick={() => setCurrent((prev) => prev + 1)}
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={10}
            onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>Show {size}</MenuItem>
            ))}
            
          </Select>
        </Box>
      )}
    </Box>
  )
}

export default AllProperties;