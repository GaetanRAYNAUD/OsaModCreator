import { StateContext } from '@components/layout/Default.tsx';
import { InputProps, InputType } from '@components/layout/form.type.ts';
import { ModFormLayout } from '@components/layout/ModFormLayout.tsx';
import { Eu4FileList, loadTechnologyGroups } from '@eu4/folders';
import { TechnologyGroups } from '@eu4/types.ts';
import { getRoutes } from '@routes.ts';
import { cleanBlank } from '@utils/strings.utils.ts';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export function TechnologyGroupPage() {
  const navigate = useNavigate();
  const routes = getRoutes();
  const { id } = useParams();
  const { t } = useTranslation();
  const { globalState, setGlobalState } = useContext(StateContext)!;

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [startLevel, setStartLevel] = useState<string>('0');
  const [primitive, setPrimitive] = useState<boolean>(false);
  const [nationDesignerUnitType, setNationDesignerUnitType] = useState<string>('0');

  useEffect(() => {
    if (!globalState || !globalState.handle) {
      navigate(routes.HOME);
    } else {
      (async () => {
        if (id && globalState.item && globalState.item.file && globalState.handle && globalState.item.file instanceof Eu4FileList && !loading) {
          setLoading(true);
          const groups: TechnologyGroups | undefined = await loadTechnologyGroups(globalState, setGlobalState, true);

          if (!groups) {
            return;
          }

          console.log(groups);

          const group = groups.groups[id];

          if (!group) {
            return;
          }

          console.log(group);

          if (globalState && globalState.descriptor && globalState.category && globalState.item) {
            document.title = globalState.descriptor.name + ' - ' + t(
              `category.${globalState.category.name}.${globalState.item.name}.title`) + ' - ' + id;
          }

          setStartLevel(group.start_level ? group.start_level.toString() : '0');
          setPrimitive(group.is_primitive ?? false);
          setNationDesignerUnitType(group.nation_designer_unit_type ?? '');
        }
      })();
    }
  }, [globalState, id]);

  const handleSubmit = async () => {
    setSubmitting(true);

    if (id && globalState && globalState.item && globalState.item.file && globalState.handle && globalState.item.file instanceof Eu4FileList) {
      const groups: TechnologyGroups = await globalState.item.file.getData(globalState.handle);
      const group = groups.groups[id];

      if (!group) {
        return;
      }

      group.start_level = Number.parseInt(startLevel);
      group.is_primitive = primitive ? primitive : undefined;
      group.nation_designer_unit_type = cleanBlank(nationDesignerUnitType) ?? undefined;

      await globalState.item.file.writeFile(globalState.handle, groups);
    }

    setSubmitting(false);
  };

  const inputs: InputProps<any>[] = [
    {
      type: InputType.NUMBER,
      required: true,
      label: 'input.technology_groups.startLevel',
      value: startLevel,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setStartLevel(event.target.value),
      min: 0,
    },
    {
      type: InputType.BOOLEAN,
      required: false,
      label: 'input.technology_groups.primitive',
      value: primitive,
      onChange: (_: ChangeEvent<HTMLInputElement>, checked: boolean) => setPrimitive(checked),
    },
    {
      type: InputType.TEXT,
      required: false,
      label: 'input.technology_groups.nationDesignerUnitType',
      value: nationDesignerUnitType,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setNationDesignerUnitType(event.target.value),
      tooltip: 'input.technology_groups.nationDesignerUnitType.tooltip',
    },
  ];

  return (
    <ModFormLayout name={id} handleSubmit={handleSubmit} submitting={submitting}
                   inputs={inputs} loading={!loading || !globalState || !globalState.technologyGroups} />
  );
}