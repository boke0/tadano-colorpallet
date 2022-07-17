import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Grid, IconButton, Input, Spacer, useClipboard, useToast } from "@chakra-ui/react";
import { ComponentProps } from "react";

interface CellCardProps extends ComponentProps<typeof Grid> {
  id: string;
  name: string;
  color: string;
  selected?: boolean;
  onUpdateName?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
}

const CellCard = ({
  id,
  name,
  color,
  selected = false,
  onUpdateName,
  onRemove,
  ...props
}: CellCardProps) => {
  const { onCopy } = useClipboard(color)
  const toast = useToast();
  const copy = () => {
    onCopy()
    toast({
      title: 'コピーしました',
      status: 'success'
    })
  }
  return (
    <Grid
      {...props}
      borderColor={selected ? 'yellow.200' : 'transparent'}
      borderWidth={1}
      borderStyle={'solid'}
      p={4}
      borderRadius={8}
      templateColumns={'auto auto 1fr auto'}
      alignItems='center'
      mb={4}
    >
      <Box
        bg={color}
        w={'72px'}
        h={'72px'}
        borderRadius={8}
        borderWidth={2}
        borderColor={selected ? 'yellow.500' : 'gray.400'}
        borderStyle={'solid'}
        mr={4}
      ></Box>
      <Box>
        <Box>
          <Input type='text' value={name} onChange={onUpdateName} />
        </Box>
        <Box mt={2} fontWeight='bold' color='gray.600'>
          {color}
        </Box>
      </Box>
      <Spacer />
      <Box>
        <Button
          leftIcon={<CopyIcon />}
          mr={4}
          onClick={copy}
        >
          コピー
        </Button>
        <IconButton aria-label='削除' colorScheme='red' onClick={() => onRemove ? onRemove() : false}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Grid>
  )
}

export default CellCard;
