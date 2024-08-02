import React, {
  ComponentType,
  forwardRef,
  MutableRefObject,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  findNodeHandle,
  requireNativeComponent,
  UIManager,
  ViewProps,
} from 'react-native';

// Defina as propriedades específicas do seu componente nativo
interface RCTCustomWebviewProps extends ViewProps {
  // Adicione aqui as propriedades personalizadas do seu componente
  url?: string;
}

// requireNativeComponent automatically resolves 'RCTCustomWebview' to 'RCTCustomWebviewManager'
const RCTCustomWebviewNativeComponent: ComponentType<RCTCustomWebviewProps> =
  requireNativeComponent<RCTCustomWebviewProps>('RCTCustomWebview');

const CustomWebview = forwardRef<RCTCustomWebviewRef, RCTCustomWebviewProps>(
  (props, ref) => {
    const webviewRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      loadUrl: (url: string) =>
        dispatchNativeEvent('RCTCustomWebview', webviewRef, 'loadUrl', [url]),
      setZoom: (factor: number) =>
        dispatchNativeEvent('RCTCustomWebview', webviewRef, 'setZoom', [
          factor,
        ]),
    }));

    return (
      <RCTCustomWebviewNativeComponent
        style={{
          height: '50%',
          // flex: 1,
        }}
        {...props}
        ref={webviewRef}
      />
    );
  },
);

export interface RCTCustomWebviewRef {
  loadUrl: (url: string) => void;
  setZoom: (factor: number) => void;
}

export const useCustomWebviewRef = () => useRef<RCTCustomWebviewRef>(null);

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

  console.log(viewManager.Commands);

  UIManager.dispatchViewManagerCommand(
    reactTag,
    // Is different from ios (.toString())
    viewManager.Commands[command].toString(),
    args,
  );
};

export default CustomWebview;
