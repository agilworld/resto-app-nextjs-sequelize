// Sample card from Airbnb
import React from "react"
import { BranchItemData } from "../_types/BranchProps"
import { Box, Badge } from "@chakra-ui/react"
import { useRouter } from 'next/router'

const Card = (props:any) => {
    const item:BranchItemData = props.data
    const router = useRouter()
    return (<Box maxW="sm" borderWidth="1px" style={{cursor:"pointer"}} onClick={()=>router.push(`branch?id=${item.id}`)} borderRadius="lg" overflow="hidden">
        <Box p="6">
            <Box
                mt="1"
                fontWeight="bold"
                as="h3"
                lineHeight="tight"
                isTruncated
            >
                {item.name}
            </Box>
            <Box d="flex" alignItems="baseline">
                <Box color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                >
                    open at {item.open} &bull; closed at {item.close}
                </Box>
            </Box>
            
        </Box>
    </Box>)
}

export default Card