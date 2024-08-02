import React, {
  findNodeHandle,
  requireNativeComponent,
  UIManager,
  ViewProps,
} from 'react-native';
import {
  ComponentType,
  forwardRef,
  MutableRefObject,
  useImperativeHandle,
  useRef,
} from 'react';

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

// Defina as propriedades específicas do seu componente nativo
interface RNTMapProps extends ViewProps {
  // Adicione aqui as propriedades personalizadas do seu componente
  zoomEnabled?: boolean;
  region?: Region;
}

// requireNativeComponent automatically resolves 'RNTMap' to 'RNTMapManager'
const RNTMapNativeComponent: ComponentType<RNTMapProps> =
  requireNativeComponent<RNTMapProps>('RNTMap');

const RNTMap = forwardRef<RNTMapRef, RNTMapProps>((props, ref) => {
  const mapRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    nativeMethod: () => dispatchNativeEvent('RNTMap', mapRef, 'nativeMethod'),
    logMessage: (message: string) =>
      dispatchNativeEvent('RNTMap', mapRef, 'logMessage', [message]),
    focusRegion: (region: Region) =>
      dispatchNativeEvent('RNTMap', mapRef, 'focusRegion', [region]),
  }));

  return <RNTMapNativeComponent {...props} ref={mapRef} />;
});

export interface RNTMapRef {
  nativeMethod: () => void;
  logMessage: (message: string) => void;
  focusRegion: (region: Region) => void;
}

export const useMapRef = () => useRef<RNTMapRef>(null);

export const dispatchNativeEvent = (
  viewManagerName: string,
  elementRef: MutableRefObject<null>,
  command: string,
  args?: unknown[],
) => {
  const reactTag = findNodeHandle(elementRef.current);

  if (!reactTag) {
    throw new Error('Invalid element ref');
  }

  const viewManager = UIManager.getViewManagerConfig(viewManagerName);

  if (!viewManager) {
    throw new Error(`View [${viewManagerName}] manager not found`);
  }

  UIManager.dispatchViewManagerCommand(
    reactTag,
    viewManager.Commands[command],
    args,
  );
};

export default RNTMap;
