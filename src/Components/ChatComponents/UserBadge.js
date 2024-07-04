import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react';

export const UserBadge = ({user, handleDelete }) => {


    return(
        <Box
        px={2}
        py={1}
        borderRadius={7}
        m={1}
        variant="solid"
        fontSize={12}
        backgroundColor="#E8E8E8"
        cursor="pointer"
        onClick={handleDelete}
        >
            {user.name}
            <CloseIcon pl={1} />
        </Box>
    )
}
