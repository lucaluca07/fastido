import React, { useMemo, useRef, useCallback } from 'react';
import classNames from 'classnames';
import Popover from '@/components/popover';

interface IProps {
  data: { label: string; value: string }[];
  value: string;
  onChange?: (value: string, label?: string) => void;
  renderLabel?: (label: string) => string;
}

const defaultRenderLabel = (label: string) => label;

const Select: React.FC<IProps> = ({
  data,
  onChange,
  value,
  renderLabel = defaultRenderLabel,
}) => {
  const optionsRef = useRef<HTMLUListElement>(null);
  const content = useMemo(() => {
    return (
      <ul ref={optionsRef} className={classNames('select-options')}>
        {data.map((item, i) => (
          <li
            onClick={() => {
              onChange?.(item.value, item.label);
            }}
            onKeyDown={() => {}}
            role="option"
            aria-selected={value === item.value}
            aria-labelledby={item.label || '-'}
            tabIndex={i}
            className={classNames('select-option', {
              'select-option-selected': value === item.value,
            })}
            data-popover-hide
            key={item.value}
          >
            {item.label || '-'}
          </li>
        ))}
      </ul>
    );
  }, [data, value, onChange]);

  const afterVisible = useCallback(() => {
    const node = optionsRef.current;
    if (!node) return;
    const selectedNode: HTMLLIElement | null = node.querySelector(
      '.select-option-selected'
    );
    if (!selectedNode) return;
    const { height } = node.getBoundingClientRect();
    const { offsetTop } = selectedNode;
    if (offsetTop < 0) {
      node.scrollTo({ top: height + offsetTop });
    } else if (offsetTop > height) {
      node.scrollTo({ top: offsetTop - height + 30 });
    }
  }, []);

  const label = useMemo(() => {
    const item = data.find((el) => el.value === value);
    return item?.label || '-';
  }, [data, value]);

  return (
    <Popover
      afterVisible={afterVisible}
      style={{ padding: 0 }}
      content={content}
    >
      <div className="select">{renderLabel(label)}</div>
    </Popover>
  );
};

export default Select;
