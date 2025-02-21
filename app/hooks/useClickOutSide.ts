import {RefObject, useEffect} from 'react';

type ClickHandler = (event: MouseEvent | TouchEvent) => void;

// 이벤트 타입 선정 이유
// - mousedown: 기본 이벤트, 클릭 시 즉시 반응
// - mouseup: 마우스 땔 때, 드래그 같은 동작
// - touchstart: 모바일 기본 이벤트
// - touchend: 모바일 터치 땔 때, 스크롤이나 스와이프 동작
type UseClickOutsideOptions = {
  eventTypes?: Array<'mousedown' | 'mouseup' | 'touchstart' | 'touchend'>;
};

// 모달이나 캘린더 드롭다운 끄기 위한 훅
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  clickHandler: ClickHandler,
  options: UseClickOutsideOptions = {},
) => {
  const {eventTypes = ['mousedown', 'touchstart']} = options;

  // const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      const target = event.target as Node;

      // 내부를 클릭하거나, ref가 없는 경우는 동작 x
      if (!el || el.contains(target)) {
        return;
      }

      clickHandler(event);
    };

    eventTypes.forEach(eventType => {
      document.addEventListener(eventType, listener);
    });

    return () => {
      eventTypes.forEach(eventType => {
        document.removeEventListener(eventType, listener);
      });
    };
  }, [ref, clickHandler, eventTypes]);

  // return ref;
};
