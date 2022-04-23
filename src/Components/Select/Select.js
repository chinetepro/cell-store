import React, { useState, useMemo, useEffect } from 'react';
import Select from 'react-select';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';

const CustomSelect = ({
    error,
    label,
    value,
    options,
    onChange,
    onChangeLabel,
    multiple,
    hiddenLabel,
    positionUpLabel = false,
    useBoxShadow = false,
    isClearable = false,
    useBold = true,
    ...props
}) => {
    const [currentValue, setCurrentValue] = useState({});
    const customOptions = useMemo(() => {
        return _map(options, (label, value) => {
            return { label, value };
        });
    }, [options]);

    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (error) {
            setShowMessage(true);
        }
    }, [error]);

    useEffect(() => {
        if (!_isEmpty(customOptions)) {
            if (multiple) {
                setCurrentValue(_map(value, (v) => _find(customOptions, { value: v }) || {}));
            } else {
                setCurrentValue(
                    _find(customOptions, { value: onChangeLabel ? value?.value : value }) || {},
                );
            }
        }
    }, [value, customOptions]);

    const handleChange = (selected) => {
        setCurrentValue(selected);
        onChange && multiple
            ? onChange(_map(selected, (i) => i?.value))
            : onChange && onChange(selected?.value);
        onChangeLabel && multiple
            ? onChangeLabel(_map(selected, (i) => i))
            : onChangeLabel && onChangeLabel(selected);
    };
    return (
        <div className="relative w-full">
            <Select
                options={customOptions}
                value={currentValue}
                onChange={handleChange}
                isMulti={multiple}
                isClearable={isClearable}
                placeholder=""
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                    },
                })}
                styles={{
                    menuList: (provided) => ({
                        ...provided,
                        maxHeight: 150,
                        zIndex: 999,
                        ...(hiddenLabel && {
                            maxHeight: 120,
                        }),
                    }),
                    control: (provided) => ({
                        ...provided,
                        ...(!useBoxShadow && {
                            boxShadow: null,
                            borderRadius: 0,
                            borderWidth: '0 0 1px 0',
                            minHeight: '33px',
                        }),                        
                    }),
                    menu: (provided) => ({
                        ...provided,
                        zIndex: 2,
                    }),
                    valueContainer: (provided) => ({
                        ...provided,
                        maxHeight: '12rem',
                        overflowY: 'auto',
                        padding: 0,
                        paddingLeft: '8px',
                    }),
                    multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: '#F2F2F2',
                        borderRadius: 5,
                        margin: '3px',
                        padding: '3px',
                        fontSize: '.85rem',
                    }),
                    multiValueRemove: (provided) => ({
                        ...provided,
                        ':hover': {
                            cursor: 'pointer',
                        },
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        fontSize: '0.75rem',
                        fontFamily: 'darwin_proregular',
                        color: '#3F3D56',
                    }),
                    option: (provided) => ({
                        ...provided,
                        lineHeight: '1.5rem',
                        cursor: 'pointer',
                    }),
                    dropdownIndicator: (provided) => ({
                        ...provided,
                        padding: '6px',
                    }),
                }}
                {...props}
            />
            <div
                className={`bg-white text-sm text-red-500 mt-1 arrow-top arrow-start w-full ` }
                hidden={!(error && showMessage)} 
                onClick={() => setShowMessage(false)}
            >
                {error}
            </div>
        </div>
    );
};

export default CustomSelect;
