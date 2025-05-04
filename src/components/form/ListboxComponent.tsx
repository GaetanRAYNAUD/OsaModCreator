import { Box, List } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Children, forwardRef, type HTMLAttributes, ReactElement, useRef } from 'react';

const size = 48;
const ListboxComponent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, role, ...other } = props;

  const items = Children.toArray(children) as ReactElement[];
  const itemCount = items.length;

  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: itemCount,
    estimateSize: () => size,
    getScrollElement: () => scrollRef.current,
    overscan: 10,
    initialOffset: () => {
      if (items.length > 0) {
        if (!Array.isArray(items[0].props.children)) {
          return items.findIndex(
            item => item.props['aria-selected'] && item.props['aria-selected'] === true);
        }
      }

      return 0;
    },
  });

  return (
    <div ref={ ref }>
      <List
        { ...other }
        role={ role }
        ref={ scrollRef }
        component="div"
        sx={ {
          position: 'relative',
          height: virtualizer.getTotalSize(),
        } }
      >
        { virtualizer.getVirtualItems().map(item => (
          <Box
            key={ item.key }
            sx={ {
              width: '100%',
              position: 'absolute',
              transform: `translateY(${ item.start }px)`,
            } }
          >
            { items[item.index] }
          </Box>
        )) }
      </List>
    </div>
  );
});

export default ListboxComponent;