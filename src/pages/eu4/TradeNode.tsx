import { StateContext } from '@components/layout/Default.tsx';
import { InputProps, InputType } from '@components/layout/form.type.ts';
import { ModFormLayout } from '@components/layout/ModFormLayout.tsx';
import { Eu4FileList } from '@eu4/folders';
import { Province, TradeNode } from '@eu4/types.ts';
import { AutocompleteValue } from '@mui/material/useAutocomplete/useAutocomplete';
import { getRoutes } from '@routes.ts';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export function TradeNodePage() {
  const navigate = useNavigate();
  const routes = getRoutes();
  const { id } = useParams();
  const { t } = useTranslation();
  const { globalState } = useContext(StateContext)!;

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [nodes, setNodes] = useState<Record<string, TradeNode>>({});
  const [location, setLocation] = useState<number>(1);
  const [members, setMembers] = useState<number[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [end, setEnd] = useState<boolean>(false);
  const [inland, setInland] = useState<boolean>(false);

  useEffect(() => {
    if (!globalState || !globalState.handle) {
      navigate(routes.HOME);
    } else {
      (async () => {
        if (id && globalState.item && globalState.item.file && globalState.handle && globalState.item.file instanceof Eu4FileList) {
          if (!globalState.provinces) {
            return;
          }

          const nodes: Record<string, TradeNode> = await globalState.item.file.getData(globalState.handle);

          if (!nodes) {
            return;
          }

          const node = nodes[id];

          if (!node) {
            return;
          }

          if (globalState && globalState.descriptor && globalState.category && globalState.item) {
            document.title = globalState.descriptor.name + ' - ' + t(
              `category.${ globalState.category.name }.${ globalState.item.name }.title`) + ' - ' + id;
          }

          setLocation(node.location);
          setMembers(node.members ?? []);
          setColor(node.color ? node.color.map(value => value.toString()) : []);
          setInland(node.inland ?? false);
          setEnd(node.end ?? false);
          setNodes(nodes);
        }
      })();
    }
  }, [globalState, id]);

  const handleSubmit = async () => {
    setSubmitting(true);

    if (id && globalState && globalState.item && globalState.item.file && globalState.handle && globalState.item.file instanceof Eu4FileList) {
      const nodes: Record<string, TradeNode> = await globalState.item.file.getFile(globalState.handle);
      const node = nodes[id];

      if (!node) {
        return;
      }

      console.log(node);

      // await globalState.item.file.writeFile(globalState.handle, nodes);
    }

    setSubmitting(false);
  };

  const inputs: InputProps<Province>[] = globalState?.provinces ? [
    {
      type: InputType.SELECT,
      required: true,
      label: 'input.trade_node.location',
      value: globalState.provinces[location],
      onChange: (event: AutocompleteValue<Province, false, false, false>) => {
        if (event) {
          setLocation(event.id);
        }
      },
      values: Object.values(globalState.provinces),
      translation: p => p.id + (p.definitionName ? ` - ${ p.definitionName }` : ''),
      keyExtractor: p => p.id.toString(),
    },
    {
      type: InputType.BOOLEAN,
      required: false,
      label: 'input.trade_node.inland',
      value: inland,
      onChange: (_: ChangeEvent<HTMLInputElement>, checked: boolean) => setInland(checked),
    },
    {
      type: InputType.BOOLEAN,
      required: false,
      label: 'input.trade_node.end',
      value: end,
      onChange: (_: ChangeEvent<HTMLInputElement>, checked: boolean) => setEnd(checked),
    },
    {
      type: InputType.MULTI_SELECT,
      required: true,
      label: 'input.trade_node.members',
      value: members.map(value => globalState.provinces && globalState.provinces[value]).filter(value => !!value),
      onChange: (event: AutocompleteValue<Province, true, false, false>) => {
        setMembers(event.map(value => value.id));
      },
      values: Object.values(globalState.provinces),
      translation: p => p.id + (p.definitionName ? ` - ${ p.definitionName }` : ''),
      keyExtractor: p => p.id.toString(),
/*      optionDisabled: p => nodes &&
        Object.entries(nodes).find(([key, value]) => key !== id && value.members.includes(p.id)),*/
    },
  ] : [];

  return (
    <ModFormLayout name={ id } handleSubmit={ handleSubmit } submitting={ submitting }
                   inputs={ inputs } loading={ !nodes } />
  );
}