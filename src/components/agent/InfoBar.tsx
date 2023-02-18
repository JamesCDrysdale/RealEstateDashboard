import { Stack, Typography } from '@pankod/refine-mui';

import { InfoBarProps } from "interfaces/agent";

const InfoBar = ({ icon, name }: InfoBarProps) => (
    <Stack direction="row" flex={1} minWidth={{ xs: "100%", sm: 300}} gap={1.5} >
        {icon}
        <Typography fontSize={14} color="#808191">
            {name}
        </Typography>
    </Stack>
);

export default InfoBar;