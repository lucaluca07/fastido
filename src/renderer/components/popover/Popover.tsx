/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/aria-role */
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { createPopper, Instance } from '@popperjs/core';

interface IProps {
  content: React.ReactNode;
  children: React.ReactNode;
  trigger?: 'click' | 'focus';
  style?: React.CSSProperties;
  clickContentHide?: boolean;
  afterVisible?: () => void;
  afterHidden?: () => void;
}

const Example: React.FC<IProps> = ({
  children,
  content,
  trigger = 'click',
  style,
  clickContentHide,
  afterVisible,
  afterHidden,
}) => {
  const [visible, setVisible] = useState(false);
  const popperRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<{ instance: Instance | null }>({ instance: null });

  const showPopper = useCallback(() => {
    const popperElement = popperRef.current;
    if (popperElement) {
      popperElement.setAttribute('data-popover-visible', 'visible');
      setVisible(true);
    }
  }, []);

  const hidePopper = useCallback(() => {
    const popperElement = popperRef.current;
    if (popperElement) {
      popperElement.removeAttribute('data-popover-visible');
      setVisible(false);
    }
  }, []);

  const initPopper = useCallback((referenceElement, popperElement) => {
    if (!instanceRef.current.instance) {
      instanceRef.current.instance = createPopper(
        referenceElement,
        popperElement,
        {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 4],
              },
            },
          ],
        }
      );
    }
  }, []);

  const onClick = useCallback(
    (event) => {
      if (trigger !== 'click') return;
      const referenceElement = event.currentTarget;
      const popperElement = popperRef.current;
      if (!popperElement) return;
      initPopper(referenceElement, popperElement);
      if (popperElement.hasAttribute('data-popover-visible')) {
        hidePopper();
      } else {
        showPopper();
      }
    },
    [trigger, initPopper, hidePopper, showPopper]
  );

  const onFocus = useCallback(
    (event) => {
      const referenceElement = event.currentTarget;
      const popperElement = popperRef.current;
      if (trigger !== 'focus' || !popperElement) return;
      initPopper(referenceElement, popperElement);
      showPopper();
    },
    [initPopper, showPopper, trigger]
  );

  const onBlur = useCallback(() => {
    if (trigger !== 'focus') return;
    hidePopper();
  }, [hidePopper, trigger]);

  const onMouseDown = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleClickPopover = useCallback(
    (e) => {
      const popperElement = popperRef.current;
      const target = e.target as HTMLElement;
      if (
        !(clickContentHide || target.hasAttribute('data-popover-hide')) ||
        !popperElement
      ) {
        return;
      }
      hidePopper();
    },
    [clickContentHide, hidePopper]
  );

  useEffect(() => {
    if (visible) {
      afterVisible?.();
    } else {
      afterHidden?.();
    }
  }, [afterHidden, afterVisible, visible]);

  const childNode = useMemo(() => {
    const child = React.Children.only(children) as React.ReactElement;
    return React.cloneElement(child, { onClick, onFocus, onBlur, onMouseDown });
  }, [onClick, onFocus, onBlur, onMouseDown, children]);

  useEffect(() => {
    window.addEventListener('mousedown', (e) => {
      const popperElement = popperRef.current;
      if (!popperElement) return;
      const node = e.target as HTMLElement;
      if (!popperElement.contains(node)) {
        hidePopper();
      }
    });
  }, [hidePopper]);

  return (
    <>
      {childNode}
      {ReactDOM.createPortal(
        <div
          className="popover"
          onClick={handleClickPopover}
          aria-hidden="true"
          ref={popperRef}
          role="popover"
          style={style}
        >
          <div className="arrow" data-popper-arrow />
          <div className="popover-content">{visible ? content : null}</div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Example;
