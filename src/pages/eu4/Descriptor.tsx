import { StateContext } from '@components/layout/Default.tsx';
import { InputProps, InputType } from '@components/layout/form.type.ts';
import { ModFormLayout } from '@components/layout/ModFormLayout.tsx';
import { Descriptor, SteamTag } from '@eu4/types.ts';
import { AutocompleteValue } from '@mui/material/useAutocomplete/useAutocomplete';
import { getRoutes } from '@routes.ts';
import { fileFromPath, writeFile } from '@utils/handle.utils.ts';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function DescriptorPage() {
  const navigate = useNavigate();
  const routes = getRoutes();
  const { globalState } = useContext(StateContext)!;

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [version, setVersion] = useState<string>('');
  const [supportedVersion, setSupportedVersion] = useState<string>('');
  const [tags, setTags] = useState<SteamTag[]>([]);
  const [replacePath, setReplacePath] = useState<string[]>([]);
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [picture, setPicture] = useState<string>('');
  const [pictureFile, setPictureFile] = useState<File | undefined>(undefined);
  const [pictureFileChanged, setPictureFileChanged] = useState<boolean>(false);

  useEffect(() => {
    if (!globalState || !globalState.handle) {
      navigate(routes.HOME);
    } else {
      (async () => {
        if (globalState.item && globalState.item.file && globalState.handle) {
          const descriptor: Descriptor = await globalState.item.file.getFile(globalState.handle);

          setName(descriptor.name ?? '');
          setVersion(descriptor.version ?? '');
          setSupportedVersion(descriptor.supported_version ?? '');
          setTags(descriptor.tags);
          setReplacePath([...descriptor.replace_path]);
          setDependencies([...descriptor.dependencies]);
          setPicture(descriptor.picture ?? '');
        }
      })();
    }
  }, [globalState]);

  useEffect(() => {
    (async () => {
      if (globalState && globalState.handle) {
        setPictureFile(await fileFromPath(globalState.handle, 'thumbnail.png'));
      }
    })();
  }, [picture, globalState]);

  const handleSubmit = async () => {
    setLoading(true);

    if (pictureFileChanged && pictureFile && globalState && globalState.handle) {
      await writeFile(pictureFile, globalState.handle, 'thumbnail.png');
    }

    if (globalState && globalState.item && globalState.item.file && globalState.handle) {
      const descriptor = await globalState.item.file.getFile(globalState.handle);
      descriptor.name = name;
      descriptor.version = version && !!version ? version : undefined;
      descriptor.dependencies = dependencies.length > 0 ? dependencies : undefined;
      descriptor.replace_path = replacePath.length > 0 ? replacePath : undefined;
      descriptor.picture = picture && !!picture ? picture : undefined;
      descriptor.supported_version = supportedVersion;
      descriptor.tags = tags.length > 0 ? tags : undefined;

      if (typeof descriptor.remote_file_id === 'number') {
        descriptor.remote_file_id = descriptor.remote_file_id.toString();
      }

      await globalState.item.file.writeFile(globalState.handle, descriptor);
    }

    setLoading(false);
  };

  const inputs: InputProps<any>[] = [
    {
      type: InputType.TEXT,
      required: true,
      label: 'input.descriptor.name',
      value: name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value),
    },
    {
      type: InputType.TEXT,
      required: false,
      label: 'input.descriptor.version',
      value: version,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setVersion(event.target.value),
    },
    {
      type: InputType.TEXT,
      required: true,
      label: 'input.descriptor.supportedVersion',
      value: supportedVersion,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setSupportedVersion(event.target.value.startsWith('v') ? event.target.value : 'v' + event.target.value),
      regex: /v?\d\.(\d{1,3}|\*)\.?(\d{1,3}|\*)?\.?(\d{1,3}|\*)?/,
      tooltip: 'input.descriptor.supportedVersion.tooltip',
    },
    {
      type: InputType.MULTI_SELECT,
      required: false,
      label: 'input.descriptor.tags',
      value: tags,
      onChange: (event: AutocompleteValue<SteamTag, true, true, false>) => {
        setTags((event ?? []).sort());
      },
      values: Object.values(SteamTag),
      keyExtractor: s => s,
    },
    {
      type: InputType.MULTI_TEXT,
      required: false,
      label: 'input.descriptor.replacePath',
      value: replacePath,
      onChange: setReplacePath,
      tooltip: 'input.descriptor.replacePath.tooltip',
      keyExtractor: s => s,
    },
    {
      type: InputType.MULTI_TEXT,
      required: false,
      label: 'input.descriptor.dependencies',
      value: dependencies,
      onChange: setDependencies,
      tooltip: 'input.descriptor.dependencies.tooltip',
      keyExtractor: s => s,
    },
    {
      type: InputType.FILE,
      required: false,
      label: 'input.descriptor.picture',
      value: pictureFile,
      onChange: value => {
        setPictureFile(value);
        setPicture('thumbnail.png');
        setPictureFileChanged(true);
      },
      accept: 'image/png',
      maxWidth: 200,
    },
  ];

  return (
    <ModFormLayout handleSubmit={ handleSubmit } submitting={ loading } inputs={ inputs } />
  );
}