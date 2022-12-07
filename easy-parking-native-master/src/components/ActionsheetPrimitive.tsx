import React, { ReactNode, useRef, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Actionsheet, IActionsheetProps } from 'native-base';

interface ActionsheetProps extends IActionsheetProps {
  children: ReactNode;
}

export function ActionsheetPrimitive({ children, ...rest }: ActionsheetProps) {
  const [bottom, setBottom] = useState(-15);
  const subscriptions = useRef<any>([]);

  React.useEffect(() => {
    subscriptions.current = [
      Keyboard.addListener('keyboardDidHide', e => setBottom(-15)),
      Keyboard.addListener('keyboardDidShow', e => {
        if (Platform.OS === 'android') {
          setBottom(e.endCoordinates.height);
        } else {
          setBottom(
            Math.max(e.startCoordinates!.height, e.endCoordinates.height) - 15
          );
        }
      }),
    ];

    return () => {
      subscriptions.current.forEach((subscription: any) => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);

  return (
    <Actionsheet {...rest}>
      <Actionsheet.Content bg="white" bottom={bottom}>
        {children}
      </Actionsheet.Content>
    </Actionsheet>
  );
}
