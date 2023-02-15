import { 
  Box, 
  Typography, 
  FormControl, 
  FormHelperText, 
  TextField, 
  TextareaAutosize, 
  Stack, 
  Select, 
  MenuItem, 
  Button 
} from '@pankod/refine-mui';

import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';

const Form = ({type, register, handleSubmit, handleImageChange, formLoading, onFinishHandler, propertyImage}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        {type} a Property
      </Typography>
      
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
        <form style={{ 
            marginTop: '20px', 
            width: '100%', 
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText sx={{
              fontWeight: 500,
              margin: '10px 0',
              fontSize: 16,
              color: '#11142D'
            }}>
                Enter Property Name
            </FormHelperText>
            <TextField 
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
            />
          </FormControl>
        </form>
      </Box>
    </Box>
  )
}

export default Form