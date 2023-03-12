import { useEffect, useRef, useState } from 'react';

import infoSVG from '../../assets/icons/info.svg';
import InlineSVG from '../InlineSVG';
import './ToolTip.scss';

interface ToolTipProps {
  hookedElementId: string;
  children: JSX.Element;
}

const ToolTip = ({ hookedElementId, children }: ToolTipProps) => {
  const [show, setShow] = useState(false);
  const [hookedElementDimensions, setHookedElementDimensions] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ x: 0, y: 0, width: 0, height: 0 });
  const tooltipRef = useRef(null);

  /*
    Attach mouse events to hooked element.
    This needs to wait for the element creation.
    It can be checked with: document.getElementById(hookedElementId).
    It also needs to wait for the element to get it's width and height to get shown below it.
    It can be checked with: document.getElementById(hookedElementId)?.offsetWidth,
    document.getElementById(hookedElementId)?.offsetHeight.
  */
  useEffect(() => {
    const hookedElement = document.getElementById(hookedElementId);
    hookedElement?.addEventListener('mouseenter', () => {
      setShow(true);
    });
    hookedElement?.addEventListener('mouseleave', () => {
      setShow(false);
    });
    hookedElement?.addEventListener('touchstart', () => {
      setShow(true);
    });
    hookedElement?.addEventListener('touchend', () => {
      setShow(false);
    });

    if (hookedElement) {
      setHookedElementDimensions({
        x: hookedElement.offsetLeft,
        y: hookedElement.offsetTop,
        width: hookedElement.offsetWidth,
        height: hookedElement.offsetHeight,
      });
    }

    return () => {
      hookedElement?.removeEventListener('mouseenter', () => {
        setShow(true);
      });

      hookedElement?.removeEventListener('mouseleave', () => {
        setShow(false);
      });
      hookedElement?.removeEventListener('touchstart', () => {
        setShow(true);
      });
      hookedElement?.removeEventListener('touchend', () => {
        setShow(false);
      });
    };
  }, [
    hookedElementId,
    document.getElementById(hookedElementId),
    document.getElementById(hookedElementId)?.offsetLeft,
    document.getElementById(hookedElementId)?.offsetWidth,
    document.getElementById(hookedElementId)?.offsetTop,
    document.getElementById(hookedElementId)?.offsetHeight,
  ]);

  return (
    <div
      ref={tooltipRef}
      className={`components-tooltip-wrapper ${
        hookedElementDimensions.x >=
          (tooltipRef?.current as unknown as HTMLElement)?.offsetWidth ?? 0
          ? 'start-from-top-right'
          : 'start-from-top-left'
      } ${show ? 'show' : ''}`}
      style={{
        left:
          hookedElementDimensions.x >=
            (tooltipRef?.current as unknown as HTMLElement)?.offsetWidth ?? 0
            ? hookedElementDimensions.x +
              hookedElementDimensions.width -
              (tooltipRef?.current as unknown as HTMLElement)?.offsetWidth
            : hookedElementDimensions.x,
        top: hookedElementDimensions.y + hookedElementDimensions.height,
        zIndex: 20,
      }}
    >
      <div className="content">
        <InlineSVG src={infoSVG} className="icon" />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ToolTip;
